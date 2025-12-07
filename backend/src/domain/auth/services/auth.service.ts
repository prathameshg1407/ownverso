// ==== FILE: src/domain/auth/services/auth.service.ts ====
/**
 * Auth Service
 * Core authentication business logic
 */

import type { AuthProvider } from '@prisma/client';

import { config } from '@/config';
import { logger } from '@/core/logger';
import { jwtService, passwordService, tokenService, mfaService } from '@/core/security';
import { emailService } from '@/core/email';
import { cacheService } from '@/core/cache';
import {
  UnauthorizedError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
} from '@/common/errors/http.errors';
import { ERROR_CODES, type ErrorCode } from '@/common/constants/error-codes.constants';
import { userRepository } from '@/domain/users/repositories/user.repository';
import { userSecurityRepository } from '@/domain/users/repositories/user-security.repository';

import { sessionRepository } from '../repositories/session.repository';
import { hashToken } from '../utils/crypto.utils';
import type {
  RegisterInput,
  LoginInput,
  LoginResult,
  TokenPair,
  DeviceInfo,
  UserDTO,
  UserWithSecurity,
  MfaPendingData,
} from '../types/auth.types';
import type { AccessTokenPayload } from '@/types/fastify';

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

const STATUS_CONFIG: Readonly<Record<string, { message: string; code: ErrorCode }>> = {
  PENDING_VERIFICATION: { message: 'Email verification required', code: ERROR_CODES.AUTH_EMAIL_NOT_VERIFIED },
  SUSPENDED: { message: 'Account suspended', code: ERROR_CODES.AUTH_ACCOUNT_SUSPENDED },
  BANNED: { message: 'Account banned', code: ERROR_CODES.AUTH_ACCOUNT_BANNED },
  DELETED: { message: 'Account deleted', code: ERROR_CODES.AUTH_ACCOUNT_DELETED },
  DEACTIVATED: { message: 'Account deactivated', code: ERROR_CODES.AUTH_ACCOUNT_DELETED },
};

// ─────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────

function toUserDTO(user: UserWithSecurity): UserDTO {
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

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─────────────────────────────────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────────────────────────────────

export const authService = {
  /**
   * Register a new user
   */
  async register(
    input: RegisterInput,
    deviceInfo: DeviceInfo
  ): Promise<{ userId: string; requiresEmailVerification: boolean }> {
    const { email, password, username, displayName } = input;

    const passwordValidation = passwordService.validate(password);
    if (!passwordValidation.isValid) {
      throw new BadRequestError(
        passwordValidation.errors[0] ?? 'Invalid password',
        ERROR_CODES.USER_PASSWORD_TOO_WEAK
      );
    }

    const [emailExists, usernameExists] = await Promise.all([
      userRepository.emailExists(email),
      userRepository.usernameExists(username),
    ]);

    if (emailExists) {
      throw new ConflictError('Email already exists', ERROR_CODES.USER_EMAIL_TAKEN);
    }

    if (usernameExists) {
      throw new ConflictError('Username already taken', ERROR_CODES.USER_USERNAME_TAKEN);
    }

    const passwordHash = await passwordService.hash(password);
    const user = await userRepository.create({
      email,
      username,
      displayName,
      passwordHash,
      status: 'PENDING_VERIFICATION',
      emailVerified: false,
    });

    const verificationToken = await tokenService.createToken({
      userId: user.id,
      type: 'EMAIL_VERIFICATION',
      requestedIp: deviceInfo.ipAddress ?? undefined,
    });

    const verificationUrl = tokenService.getTokenUrl('EMAIL_VERIFICATION', verificationToken);
    await emailService.sendWelcomeEmail(user.email, user.displayName, verificationUrl);

    logger.info({ userId: user.publicId, email: user.email }, 'User registered');

    return { userId: user.publicId, requiresEmailVerification: true };
  },

  /**
   * Login with email/password
   */
  async login(input: LoginInput, deviceInfo: DeviceInfo): Promise<LoginResult> {
    const { emailOrUsername, password, rememberMe = false } = input;

    const user = await this.findUserForLogin(emailOrUsername);

    if (!user) {
      await passwordService.verify('$argon2id$v=19$m=65536,t=3,p=4$dummy$dummy', password);
      throw new UnauthorizedError('Invalid credentials', ERROR_CODES.AUTH_INVALID_CREDENTIALS);
    }

    const lockStatus = await userSecurityRepository.isAccountLocked(user.id);
    if (lockStatus.locked) {
      throw new ForbiddenError(
        `Account locked until ${lockStatus.until?.toISOString()}`,
        ERROR_CODES.AUTH_ACCOUNT_LOCKED,
        { lockedUntil: lockStatus.until }
      );
    }

    if (INVALID_LOGIN_STATUSES.has(user.status)) {
      const statusConfig = STATUS_CONFIG[user.status];
      throw new ForbiddenError(
        statusConfig?.message ?? 'Cannot login',
        statusConfig?.code ?? ERROR_CODES.FORBIDDEN
      );
    }

    if (!user.passwordHash) {
      throw new UnauthorizedError('Use social login', ERROR_CODES.AUTH_INVALID_CREDENTIALS);
    }

    const isValidPassword = await passwordService.verify(user.passwordHash, password);
    if (!isValidPassword) {
      await this.handleFailedLogin(user.id, user.email);
      throw new UnauthorizedError('Invalid credentials', ERROR_CODES.AUTH_INVALID_CREDENTIALS);
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
  async createAuthenticatedSession(
    user: UserWithSecurity,
    deviceInfo: DeviceInfo,
    authProvider: AuthProvider | null
  ): Promise<LoginResult> {
    const session = await sessionRepository.create({
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

    const tokens = jwtService.generateTokenPair({
      publicId: user.publicId,
      email: user.email,
      role: user.role,
      sessionId: session.id.toString(),
    });

    await sessionRepository.updateTokens(
      session.id,
      hashToken(tokens.accessToken),
      hashToken(tokens.refreshToken),
      tokens.refreshTokenExpiresAt
    );

    await userSecurityRepository.updateLoginInfo(user.id, {
      lastLoginAt: new Date(),
      lastLoginIp: deviceInfo.ipAddress,
      lastLoginUserAgent: deviceInfo.userAgent,
    });

    logger.info({ userId: user.publicId, sessionId: session.id.toString() }, 'User logged in');

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
  async verifyMfaLogin(mfaPendingToken: string, code: string): Promise<LoginResult> {
    const pendingData = await cacheService.get<MfaPendingData>(
      `${MFA_PENDING_PREFIX}${mfaPendingToken}`
    );

    if (!pendingData) {
      throw new UnauthorizedError('MFA session expired', ERROR_CODES.AUTH_SESSION_EXPIRED);
    }

    const userId = BigInt(pendingData.userId);
    const user = await userRepository.findWithSecurity(userId);

    if (!user?.security?.mfaSecret) {
      throw new UnauthorizedError('Invalid MFA session', ERROR_CODES.AUTH_MFA_INVALID);
    }

    let isValid = mfaService.verifyTotp(user.security.mfaSecret, code);

    if (!isValid) {
      const backupResult = mfaService.verifyBackupCode(user.security.mfaBackupCodes, code);
      if (backupResult.valid) {
        await userSecurityRepository.updateBackupCodes(userId, backupResult.remainingCodes);
        isValid = true;
      }
    }

    if (!isValid) {
      throw new UnauthorizedError('Invalid code', ERROR_CODES.AUTH_MFA_INVALID);
    }

    await cacheService.del(`${MFA_PENDING_PREFIX}${mfaPendingToken}`);

    return this.createAuthenticatedSession(user as UserWithSecurity, pendingData.deviceInfo, 'EMAIL');
  },

  /**
   * Refresh access and refresh tokens
   */
  async refreshTokens(refreshToken: string): Promise<TokenPair> {
    let payload: { sub: string; sessionId: string };

    try {
      payload = jwtService.verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedError('Invalid refresh token', ERROR_CODES.AUTH_REFRESH_TOKEN_INVALID);
    }

    const session = await sessionRepository.findByRefreshToken(refreshToken);

    if (!session || session.isRevoked || session.expiresAt < new Date()) {
      throw new UnauthorizedError('Session invalid or expired', ERROR_CODES.AUTH_SESSION_INVALID);
    }

    const user = await userRepository.findByPublicId(payload.sub);
    if (!user) {
      throw new UnauthorizedError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    const security = await userSecurityRepository.findByUserId(user.id);
    if (security?.forceLogoutAt && session.createdAt < security.forceLogoutAt) {
      await sessionRepository.revoke(session.id, 'Force logout');
      throw new UnauthorizedError('Session invalidated', ERROR_CODES.AUTH_SESSION_INVALID);
    }

    const newTokens = jwtService.generateTokenPair({
      publicId: user.publicId,
      email: user.email,
      role: user.role,
      sessionId: session.id.toString(),
    });

    await sessionRepository.updateTokens(
      session.id,
      hashToken(newTokens.accessToken),
      hashToken(newTokens.refreshToken),
      newTokens.refreshTokenExpiresAt
    );

    return newTokens;
  },

  /**
   * Logout current session
   */
  async logout(accessToken: string): Promise<void> {
    const session = await sessionRepository.findByAccessToken(accessToken);
    if (session) {
      await sessionRepository.revoke(session.id, 'User logout');
    }
  },

  /**
   * Logout all sessions for a user
   */
  async logoutAll(userId: bigint): Promise<number> {
    await userSecurityRepository.setForceLogout(userId);
    return sessionRepository.revokeAllForUser(userId, 'Logout all devices');
  },

  /**
   * Validate an access token session
   */
  async validateSession(payload: AccessTokenPayload): Promise<boolean> {
    const user = await userRepository.findByPublicId(payload.sub);
    if (!user) return false;

    const userWithSecurity = await userRepository.findWithSecurity(user.id);
    if (!userWithSecurity) return false;

    if (INVALID_LOGIN_STATUSES.has(userWithSecurity.status)) return false;

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

  async findUserForLogin(emailOrUsername: string): Promise<UserWithSecurity | null> {
    const byEmail = await userRepository.findWithSecurityByEmail(emailOrUsername);
    if (byEmail) return byEmail as UserWithSecurity;

    const byUsername = await userRepository.findByUsername(emailOrUsername);
    if (!byUsername) return null;

    const withSecurity = await userRepository.findWithSecurity(byUsername.id);
    return withSecurity as UserWithSecurity | null;
  },

  async createMfaPendingToken(userId: bigint, deviceInfo: DeviceInfo): Promise<string> {
    const token = `mfa_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    await cacheService.set<MfaPendingData>(
      `${MFA_PENDING_PREFIX}${token}`,
      { userId: userId.toString(), deviceInfo },
      MFA_PENDING_TTL_SECONDS
    );

    return token;
  },

  createMfaPendingResult(user: UserWithSecurity, mfaPendingToken: string): LoginResult {
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

  async handleFailedLogin(userId: bigint, email: string): Promise<void> {
    const { failedCount, lockedUntil } = await userSecurityRepository.incrementFailedLoginCount(userId);

    if (failedCount >= config.auth.lockout.delayAfterAttempts) {
      await delay(config.auth.lockout.delayMs);
    }

    if (lockedUntil) {
      await emailService.sendAccountLockedEmail(email, lockedUntil);
    }
  },
} as const;

export type AuthService = typeof authService;