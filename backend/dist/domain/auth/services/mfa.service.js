"use strict";
// ==== FILE: src/domain/auth/services/mfa.service.ts ====
/**
 * MFA Domain Service
 * Multi-factor authentication operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mfaDomainService = void 0;
const logger_1 = require("../../../core/logger");
const security_1 = require("../../../core/security");
const email_1 = require("../../../core/email");
const http_errors_1 = require("../../../common/errors/http.errors");
const error_codes_constants_1 = require("../../../common/constants/error-codes.constants");
const user_repository_1 = require("../../../domain/users/repositories/user.repository");
const user_security_repository_1 = require("../../../domain/users/repositories/user-security.repository");
const session_repository_1 = require("../repositories/session.repository");
exports.mfaDomainService = {
    /**
     * Initialize MFA setup
     */
    async initSetup(userId) {
        const user = await user_repository_1.userRepository.findWithSecurity(userId);
        if (!user) {
            throw new http_errors_1.NotFoundError('User not found', error_codes_constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        if (user.security?.mfaEnabled) {
            throw new http_errors_1.BadRequestError('MFA already enabled', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
        }
        const setup = await security_1.mfaService.setupMfa(user.email);
        await user_security_repository_1.userSecurityRepository.setMfaSecret(userId, setup.secret, setup.backupCodes);
        logger_1.logger.info({ userId: user.publicId }, 'MFA setup initiated');
        return setup;
    },
    /**
     * Verify and complete MFA setup
     */
    async verifySetup(userId, code) {
        const user = await user_repository_1.userRepository.findWithSecurity(userId);
        if (!user) {
            throw new http_errors_1.NotFoundError('User not found', error_codes_constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        if (!user.security?.mfaSecret) {
            throw new http_errors_1.BadRequestError('MFA setup not initiated', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
        }
        if (user.security.mfaEnabled) {
            throw new http_errors_1.BadRequestError('MFA already enabled', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
        }
        const isValid = security_1.mfaService.verifyTotp(user.security.mfaSecret, code);
        if (!isValid) {
            throw new http_errors_1.UnauthorizedError('Invalid code', error_codes_constants_1.ERROR_CODES.AUTH_MFA_INVALID);
        }
        await user_security_repository_1.userSecurityRepository.enableMfa(userId);
        await email_1.emailService.send({
            to: user.email,
            subject: 'Two-factor authentication enabled',
            template: 'mfa-enabled',
            data: {},
        });
        logger_1.logger.info({ userId: user.publicId }, 'MFA enabled');
        return { backupCodes: user.security.mfaBackupCodes };
    },
    /**
     * Disable MFA
     */
    async disable(userId, password, code) {
        const user = await user_repository_1.userRepository.findWithSecurity(userId);
        if (!user) {
            throw new http_errors_1.NotFoundError('User not found', error_codes_constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        if (!user.security?.mfaEnabled) {
            throw new http_errors_1.BadRequestError('MFA not enabled', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
        }
        if (!user.passwordHash) {
            throw new http_errors_1.BadRequestError('Cannot disable MFA for OAuth account', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
        }
        const isValidPassword = await security_1.passwordService.verify(user.passwordHash, password);
        if (!isValidPassword) {
            throw new http_errors_1.UnauthorizedError('Invalid password', error_codes_constants_1.ERROR_CODES.USER_INVALID_PASSWORD);
        }
        if (code && user.security.mfaSecret) {
            const isValidCode = security_1.mfaService.verifyTotp(user.security.mfaSecret, code);
            if (!isValidCode) {
                throw new http_errors_1.UnauthorizedError('Invalid code', error_codes_constants_1.ERROR_CODES.AUTH_MFA_INVALID);
            }
        }
        await user_security_repository_1.userSecurityRepository.disableMfa(userId);
        await email_1.emailService.send({
            to: user.email,
            subject: 'Two-factor authentication disabled',
            template: 'mfa-disabled',
            data: {},
        });
        logger_1.logger.info({ userId: user.publicId }, 'MFA disabled');
    },
    /**
     * Regenerate backup codes
     */
    async regenerateBackupCodes(userId, password) {
        const user = await user_repository_1.userRepository.findWithSecurity(userId);
        if (!user) {
            throw new http_errors_1.NotFoundError('User not found', error_codes_constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        if (!user.security?.mfaEnabled) {
            throw new http_errors_1.BadRequestError('MFA not enabled', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
        }
        if (!user.passwordHash) {
            throw new http_errors_1.BadRequestError('Cannot regenerate for OAuth account', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
        }
        const isValidPassword = await security_1.passwordService.verify(user.passwordHash, password);
        if (!isValidPassword) {
            throw new http_errors_1.UnauthorizedError('Invalid password', error_codes_constants_1.ERROR_CODES.USER_INVALID_PASSWORD);
        }
        const backupCodes = security_1.mfaService.generateBackupCodes();
        await user_security_repository_1.userSecurityRepository.updateBackupCodes(userId, backupCodes);
        logger_1.logger.info({ userId: user.publicId }, 'MFA backup codes regenerated');
        return backupCodes;
    },
    /**
     * Recover account using backup code
     */
    async recoverWithBackupCode(email, backupCode) {
        const user = await user_repository_1.userRepository.findWithSecurityByEmail(email);
        if (!user?.security?.mfaEnabled || !user.security.mfaBackupCodes.length) {
            throw new http_errors_1.UnauthorizedError('Invalid recovery attempt', error_codes_constants_1.ERROR_CODES.AUTH_MFA_INVALID);
        }
        const result = security_1.mfaService.verifyBackupCode(user.security.mfaBackupCodes, backupCode);
        if (!result.valid) {
            throw new http_errors_1.UnauthorizedError('Invalid backup code', error_codes_constants_1.ERROR_CODES.AUTH_MFA_INVALID);
        }
        await user_security_repository_1.userSecurityRepository.updateBackupCodes(user.id, result.remainingCodes);
        await user_security_repository_1.userSecurityRepository.disableMfa(user.id);
        await session_repository_1.sessionRepository.revokeAllForUser(user.id, 'MFA recovery');
        logger_1.logger.info({ userId: user.publicId }, 'Account recovered with backup code');
        return { success: true, remainingCodes: result.remainingCodes.length };
    },
    /**
     * Get MFA status
     */
    async getStatus(userId) {
        const user = await user_repository_1.userRepository.findWithSecurity(userId);
        if (!user) {
            throw new http_errors_1.NotFoundError('User not found', error_codes_constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        return {
            enabled: user.security?.mfaEnabled ?? false,
            backupCodesRemaining: user.security?.mfaBackupCodes.length ?? 0,
        };
    },
};
//# sourceMappingURL=mfa.service.js.map