"use strict";
// ==== FILE: src/domain/auth/services/auth.service.ts ====
/**
 * Auth Service
 * Core authentication business logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const config_1 = require("../../../config");
const logger_1 = require("../../../core/logger");
const security_1 = require("../../../core/security");
const email_1 = require("../../../core/email");
const cache_1 = require("../../../core/cache");
const http_errors_1 = require("../../../common/errors/http.errors");
const error_codes_constants_1 = require("../../../common/constants/error-codes.constants");
const user_repository_1 = require("../../../domain/users/repositories/user.repository");
const user_security_repository_1 = require("../../../domain/users/repositories/user-security.repository");
const session_repository_1 = require("../repositories/session.repository");
const crypto_utils_1 = require("../utils/crypto.utils");
// ─────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────
const MFA_PENDING_PREFIX = 'mfa:pending:';
const MFA_PENDING_TTL_SECONDS = 5 * 60;
const SESSION_EXPIRY_DAYS = 7;
const INVALID_LOGIN_STATUSES = new Set([
    'PENDING_VERIFICATION',
    'SUSPENDED',
    'BANNED',
    'DELETED',
    'DEACTIVATED',
]);
const STATUS_CONFIG = {
    PENDING_VERIFICATION: { message: 'Email verification required', code: error_codes_constants_1.ERROR_CODES.AUTH_EMAIL_NOT_VERIFIED },
    SUSPENDED: { message: 'Account suspended', code: error_codes_constants_1.ERROR_CODES.AUTH_ACCOUNT_SUSPENDED },
    BANNED: { message: 'Account banned', code: error_codes_constants_1.ERROR_CODES.AUTH_ACCOUNT_BANNED },
    DELETED: { message: 'Account deleted', code: error_codes_constants_1.ERROR_CODES.AUTH_ACCOUNT_DELETED },
    DEACTIVATED: { message: 'Account deactivated', code: error_codes_constants_1.ERROR_CODES.AUTH_ACCOUNT_DELETED },
};
// ─────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────
function toUserDTO(user) {
    return {
        publicId: user.publicId,
        email: user.email,
        emailVerified: user.emailVerified,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt.toISOString(),
    };
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// ─────────────────────────────────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────────────────────────────────
exports.authService = {
    /**
     * Register a new user
     */
    async register(input, deviceInfo) {
        const { email, password, username, displayName } = input;
        const passwordValidation = security_1.passwordService.validate(password);
        if (!passwordValidation.isValid) {
            throw new http_errors_1.BadRequestError(passwordValidation.errors[0] ?? 'Invalid password', error_codes_constants_1.ERROR_CODES.USER_PASSWORD_TOO_WEAK);
        }
        const [emailExists, usernameExists] = await Promise.all([
            user_repository_1.userRepository.emailExists(email),
            user_repository_1.userRepository.usernameExists(username),
        ]);
        if (emailExists) {
            throw new http_errors_1.ConflictError('Email already exists', error_codes_constants_1.ERROR_CODES.USER_EMAIL_TAKEN);
        }
        if (usernameExists) {
            throw new http_errors_1.ConflictError('Username already taken', error_codes_constants_1.ERROR_CODES.USER_USERNAME_TAKEN);
        }
        const passwordHash = await security_1.passwordService.hash(password);
        const user = await user_repository_1.userRepository.create({
            email,
            username,
            displayName,
            passwordHash,
            status: 'PENDING_VERIFICATION',
            emailVerified: false,
        });
        const verificationToken = await security_1.tokenService.createToken({
            userId: user.id,
            type: 'EMAIL_VERIFICATION',
            requestedIp: deviceInfo.ipAddress ?? undefined,
        });
        const verificationUrl = security_1.tokenService.getTokenUrl('EMAIL_VERIFICATION', verificationToken);
        await email_1.emailService.sendWelcomeEmail(user.email, user.displayName, verificationUrl);
        logger_1.logger.info({ userId: user.publicId, email: user.email }, 'User registered');
        return { userId: user.publicId, requiresEmailVerification: true };
    },
    /**
     * Login with email/password
     */
    async login(input, deviceInfo) {
        const { emailOrUsername, password, rememberMe = false } = input;
        const user = await this.findUserForLogin(emailOrUsername);
        if (!user) {
            await security_1.passwordService.verify('$argon2id$v=19$m=65536,t=3,p=4$dummy$dummy', password);
            throw new http_errors_1.UnauthorizedError('Invalid credentials', error_codes_constants_1.ERROR_CODES.AUTH_INVALID_CREDENTIALS);
        }
        const lockStatus = await user_security_repository_1.userSecurityRepository.isAccountLocked(user.id);
        if (lockStatus.locked) {
            throw new http_errors_1.ForbiddenError(`Account locked until ${lockStatus.until?.toISOString()}`, error_codes_constants_1.ERROR_CODES.AUTH_ACCOUNT_LOCKED, { lockedUntil: lockStatus.until });
        }
        if (INVALID_LOGIN_STATUSES.has(user.status)) {
            const statusConfig = STATUS_CONFIG[user.status];
            throw new http_errors_1.ForbiddenError(statusConfig?.message ?? 'Cannot login', statusConfig?.code ?? error_codes_constants_1.ERROR_CODES.FORBIDDEN);
        }
        if (!user.passwordHash) {
            throw new http_errors_1.UnauthorizedError('Use social login', error_codes_constants_1.ERROR_CODES.AUTH_INVALID_CREDENTIALS);
        }
        const isValidPassword = await security_1.passwordService.verify(user.passwordHash, password);
        if (!isValidPassword) {
            await this.handleFailedLogin(user.id, user.email);
            throw new http_errors_1.UnauthorizedError('Invalid credentials', error_codes_constants_1.ERROR_CODES.AUTH_INVALID_CREDENTIALS);
        }
        if (user.security?.mfaEnabled) {
            const mfaPendingToken = await this.createMfaPendingToken(user.id, deviceInfo);
            return this.createMfaPendingResult(user, mfaPendingToken);
        }
        return this.createAuthenticatedSession(user, deviceInfo, rememberMe ? 'EMAIL' : null);
    },
    /**
     * Create an authenticated session with tokens
     */
    async createAuthenticatedSession(user, deviceInfo, authProvider) {
        const session = await session_repository_1.sessionRepository.create({
            userId: user.id,
            userAgent: deviceInfo.userAgent,
            ipAddress: deviceInfo.ipAddress,
            deviceType: deviceInfo.deviceType,
            deviceOs: deviceInfo.deviceOs,
            browser: deviceInfo.browser,
            country: deviceInfo.country,
            city: deviceInfo.city,
            authProvider,
            expiresAt: new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
        });
        const tokens = security_1.jwtService.generateTokenPair({
            publicId: user.publicId,
            email: user.email,
            role: user.role,
            sessionId: session.id.toString(),
        });
        await session_repository_1.sessionRepository.updateTokens(session.id, (0, crypto_utils_1.hashToken)(tokens.accessToken), (0, crypto_utils_1.hashToken)(tokens.refreshToken), tokens.refreshTokenExpiresAt);
        await user_security_repository_1.userSecurityRepository.updateLoginInfo(user.id, {
            lastLoginAt: new Date(),
            lastLoginIp: deviceInfo.ipAddress,
            lastLoginUserAgent: deviceInfo.userAgent,
        });
        logger_1.logger.info({ userId: user.publicId, sessionId: session.id.toString() }, 'User logged in');
        return {
            user: toUserDTO(user),
            tokens,
            sessionId: session.id.toString(),
            mfaRequired: false,
        };
    },
    /**
     * Verify MFA and complete login
     */
    async verifyMfaLogin(mfaPendingToken, code) {
        const pendingData = await cache_1.cacheService.get(`${MFA_PENDING_PREFIX}${mfaPendingToken}`);
        if (!pendingData) {
            throw new http_errors_1.UnauthorizedError('MFA session expired', error_codes_constants_1.ERROR_CODES.AUTH_SESSION_EXPIRED);
        }
        const userId = BigInt(pendingData.userId);
        const user = await user_repository_1.userRepository.findWithSecurity(userId);
        if (!user?.security?.mfaSecret) {
            throw new http_errors_1.UnauthorizedError('Invalid MFA session', error_codes_constants_1.ERROR_CODES.AUTH_MFA_INVALID);
        }
        let isValid = security_1.mfaService.verifyTotp(user.security.mfaSecret, code);
        if (!isValid) {
            const backupResult = security_1.mfaService.verifyBackupCode(user.security.mfaBackupCodes, code);
            if (backupResult.valid) {
                await user_security_repository_1.userSecurityRepository.updateBackupCodes(userId, backupResult.remainingCodes);
                isValid = true;
            }
        }
        if (!isValid) {
            throw new http_errors_1.UnauthorizedError('Invalid code', error_codes_constants_1.ERROR_CODES.AUTH_MFA_INVALID);
        }
        await cache_1.cacheService.del(`${MFA_PENDING_PREFIX}${mfaPendingToken}`);
        return this.createAuthenticatedSession(user, pendingData.deviceInfo, 'EMAIL');
    },
    /**
     * Refresh access and refresh tokens
     */
    async refreshTokens(refreshToken) {
        let payload;
        try {
            payload = security_1.jwtService.verifyRefreshToken(refreshToken);
        }
        catch {
            throw new http_errors_1.UnauthorizedError('Invalid refresh token', error_codes_constants_1.ERROR_CODES.AUTH_REFRESH_TOKEN_INVALID);
        }
        const session = await session_repository_1.sessionRepository.findByRefreshToken(refreshToken);
        if (!session || session.isRevoked || session.expiresAt < new Date()) {
            throw new http_errors_1.UnauthorizedError('Session invalid or expired', error_codes_constants_1.ERROR_CODES.AUTH_SESSION_INVALID);
        }
        const user = await user_repository_1.userRepository.findByPublicId(payload.sub);
        if (!user) {
            throw new http_errors_1.UnauthorizedError('User not found', error_codes_constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        const security = await user_security_repository_1.userSecurityRepository.findByUserId(user.id);
        if (security?.forceLogoutAt && session.createdAt < security.forceLogoutAt) {
            await session_repository_1.sessionRepository.revoke(session.id, 'Force logout');
            throw new http_errors_1.UnauthorizedError('Session invalidated', error_codes_constants_1.ERROR_CODES.AUTH_SESSION_INVALID);
        }
        const newTokens = security_1.jwtService.generateTokenPair({
            publicId: user.publicId,
            email: user.email,
            role: user.role,
            sessionId: session.id.toString(),
        });
        await session_repository_1.sessionRepository.updateTokens(session.id, (0, crypto_utils_1.hashToken)(newTokens.accessToken), (0, crypto_utils_1.hashToken)(newTokens.refreshToken), newTokens.refreshTokenExpiresAt);
        return newTokens;
    },
    /**
     * Logout current session
     */
    async logout(accessToken) {
        const session = await session_repository_1.sessionRepository.findByAccessToken(accessToken);
        if (session) {
            await session_repository_1.sessionRepository.revoke(session.id, 'User logout');
        }
    },
    /**
     * Logout all sessions for a user
     */
    async logoutAll(userId) {
        await user_security_repository_1.userSecurityRepository.setForceLogout(userId);
        return session_repository_1.sessionRepository.revokeAllForUser(userId, 'Logout all devices');
    },
    /**
     * Validate an access token session
     */
    async validateSession(payload) {
        const user = await user_repository_1.userRepository.findByPublicId(payload.sub);
        if (!user)
            return false;
        const userWithSecurity = await user_repository_1.userRepository.findWithSecurity(user.id);
        if (!userWithSecurity)
            return false;
        if (INVALID_LOGIN_STATUSES.has(userWithSecurity.status))
            return false;
        if (userWithSecurity.security?.forceLogoutAt) {
            const tokenIssuedAt = new Date(payload.iat * 1000);
            if (tokenIssuedAt < userWithSecurity.security.forceLogoutAt) {
                return false;
            }
        }
        return true;
    },
    // ─────────────────────────────────────────────────────────────────────
    // Private Helpers
    // ─────────────────────────────────────────────────────────────────────
    async findUserForLogin(emailOrUsername) {
        const byEmail = await user_repository_1.userRepository.findWithSecurityByEmail(emailOrUsername);
        if (byEmail)
            return byEmail;
        const byUsername = await user_repository_1.userRepository.findByUsername(emailOrUsername);
        if (!byUsername)
            return null;
        const withSecurity = await user_repository_1.userRepository.findWithSecurity(byUsername.id);
        return withSecurity;
    },
    async createMfaPendingToken(userId, deviceInfo) {
        const token = `mfa_${Date.now()}_${Math.random().toString(36).slice(2)}`;
        await cache_1.cacheService.set(`${MFA_PENDING_PREFIX}${token}`, { userId: userId.toString(), deviceInfo }, MFA_PENDING_TTL_SECONDS);
        return token;
    },
    createMfaPendingResult(user, mfaPendingToken) {
        return {
            user: toUserDTO(user),
            tokens: {
                accessToken: '',
                refreshToken: '',
                accessTokenExpiresAt: new Date(),
                refreshTokenExpiresAt: new Date(),
            },
            sessionId: '',
            mfaRequired: true,
            mfaPendingToken,
        };
    },
    async handleFailedLogin(userId, email) {
        const { failedCount, lockedUntil } = await user_security_repository_1.userSecurityRepository.incrementFailedLoginCount(userId);
        if (failedCount >= config_1.config.auth.lockout.delayAfterAttempts) {
            await delay(config_1.config.auth.lockout.delayMs);
        }
        if (lockedUntil) {
            await email_1.emailService.sendAccountLockedEmail(email, lockedUntil);
        }
    },
};
//# sourceMappingURL=auth.service.js.map