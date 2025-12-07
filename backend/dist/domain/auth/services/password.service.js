"use strict";
// ==== FILE: src/domain/auth/services/password.service.ts ====
/**
 * Password Domain Service
 * Password reset and change operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordDomainService = void 0;
const logger_1 = require("../../../core/logger");
const security_1 = require("../../../core/security");
const email_1 = require("../../../core/email");
const http_errors_1 = require("../../../common/errors/http.errors");
const error_codes_constants_1 = require("../../../common/constants/error-codes.constants");
const user_repository_1 = require("../../../domain/users/repositories/user.repository");
const user_security_repository_1 = require("../../../domain/users/repositories/user-security.repository");
const session_repository_1 = require("../repositories/session.repository");
exports.passwordDomainService = {
    /**
     * Request password reset (sends email)
     */
    async requestReset(email, requestedIp) {
        const user = await user_repository_1.userRepository.findByEmail(email);
        if (!user || !user.passwordHash) {
            logger_1.logger.debug({ email }, 'Password reset requested for non-existent/OAuth email');
            return;
        }
        const resetToken = await security_1.tokenService.createToken({
            userId: user.id,
            type: 'PASSWORD_RESET',
            requestedIp,
        });
        const resetUrl = security_1.tokenService.getTokenUrl('PASSWORD_RESET', resetToken);
        await email_1.emailService.sendPasswordResetEmail(user.email, resetUrl);
        logger_1.logger.info({ userId: user.publicId }, 'Password reset email sent');
    },
    /**
     * Reset password using token
     */
    async resetPassword(token, newPassword, usedIp) {
        const validation = security_1.passwordService.validate(newPassword);
        if (!validation.isValid) {
            throw new http_errors_1.BadRequestError(validation.errors[0] ?? 'Invalid password', error_codes_constants_1.ERROR_CODES.USER_PASSWORD_TOO_WEAK);
        }
        const tokenResult = await security_1.tokenService.verifyAndConsumeToken(token, 'PASSWORD_RESET', usedIp);
        if (!tokenResult.valid || !tokenResult.token) {
            throw new http_errors_1.BadRequestError(tokenResult.error ?? 'Invalid or expired token', error_codes_constants_1.ERROR_CODES.VERIFICATION_TOKEN_INVALID);
        }
        const user = await user_repository_1.userRepository.findById(tokenResult.token.userId);
        if (!user) {
            throw new http_errors_1.NotFoundError('User not found', error_codes_constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        if (user.passwordHash) {
            const isSame = await security_1.passwordService.verify(user.passwordHash, newPassword);
            if (isSame) {
                throw new http_errors_1.BadRequestError('New password must be different', error_codes_constants_1.ERROR_CODES.USER_SAME_PASSWORD);
            }
        }
        const passwordHash = await security_1.passwordService.hash(newPassword);
        await user_repository_1.userRepository.update(user.id, { passwordHash });
        await user_security_repository_1.userSecurityRepository.setPasswordChanged(user.id);
        await session_repository_1.sessionRepository.revokeAllForUser(user.id, 'Password reset');
        await security_1.tokenService.invalidateUserTokens(user.id, 'PASSWORD_RESET');
        await email_1.emailService.sendPasswordChangedEmail(user.email);
        logger_1.logger.info({ userId: user.publicId }, 'Password reset completed');
    },
    /**
     * Change password (authenticated user)
     */
    async changePassword(userId, currentPassword, newPassword, currentSessionId) {
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user) {
            throw new http_errors_1.NotFoundError('User not found', error_codes_constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        if (!user.passwordHash) {
            throw new http_errors_1.BadRequestError('Cannot change password for OAuth account', error_codes_constants_1.ERROR_CODES.USER_INVALID_PASSWORD);
        }
        const isValid = await security_1.passwordService.verify(user.passwordHash, currentPassword);
        if (!isValid) {
            throw new http_errors_1.UnauthorizedError('Current password is incorrect', error_codes_constants_1.ERROR_CODES.USER_INVALID_PASSWORD);
        }
        const validation = security_1.passwordService.validate(newPassword);
        if (!validation.isValid) {
            throw new http_errors_1.BadRequestError(validation.errors[0] ?? 'Invalid password', error_codes_constants_1.ERROR_CODES.USER_PASSWORD_TOO_WEAK);
        }
        const isSame = await security_1.passwordService.verify(user.passwordHash, newPassword);
        if (isSame) {
            throw new http_errors_1.BadRequestError('New password must be different', error_codes_constants_1.ERROR_CODES.USER_SAME_PASSWORD);
        }
        const passwordHash = await security_1.passwordService.hash(newPassword);
        await user_repository_1.userRepository.update(userId, { passwordHash });
        await user_security_repository_1.userSecurityRepository.setPasswordChanged(userId);
        if (currentSessionId) {
            await session_repository_1.sessionRepository.revokeAllExcept(userId, currentSessionId, 'Password changed');
        }
        await email_1.emailService.sendPasswordChangedEmail(user.email);
        logger_1.logger.info({ userId: user.publicId }, 'Password changed');
    },
    /**
     * Check password strength
     */
    checkStrength(password) {
        return security_1.passwordService.checkStrength(password);
    },
};
//# sourceMappingURL=password.service.js.map