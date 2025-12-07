"use strict";
// ==== FILE: src/domain/auth/services/email-verification.service.ts ====
/**
 * Email Verification Service
 * Handles email verification and email change flows
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerificationService = void 0;
const logger_1 = require("../../../core/logger");
const security_1 = require("../../../core/security");
const email_1 = require("../../../core/email");
const http_errors_1 = require("../../../common/errors/http.errors");
const error_codes_constants_1 = require("../../../common/constants/error-codes.constants");
const user_repository_1 = require("../../../domain/users/repositories/user.repository");
const user_security_repository_1 = require("../../../domain/users/repositories/user-security.repository");
exports.emailVerificationService = {
    /**
     * Verify email with token
     */
    async verifyEmail(token, usedIp) {
        const tokenResult = await security_1.tokenService.verifyAndConsumeToken(token, 'EMAIL_VERIFICATION', usedIp);
        if (!tokenResult.valid || !tokenResult.token) {
            throw new http_errors_1.BadRequestError(tokenResult.error ?? 'Invalid or expired token', error_codes_constants_1.ERROR_CODES.VERIFICATION_TOKEN_INVALID);
        }
        const user = await user_repository_1.userRepository.findById(tokenResult.token.userId);
        if (!user) {
            throw new http_errors_1.NotFoundError('User not found', error_codes_constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        if (user.emailVerified) {
            logger_1.logger.debug({ userId: user.publicId }, 'Email already verified');
            return;
        }
        await user_security_repository_1.userSecurityRepository.setEmailVerified(tokenResult.token.userId);
        await security_1.tokenService.invalidateUserTokens(tokenResult.token.userId, 'EMAIL_VERIFICATION');
        logger_1.logger.info({ userId: user.publicId }, 'Email verified');
    },
    /**
     * Resend verification email
     */
    async resendVerification(userId, requestedIp) {
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user) {
            throw new http_errors_1.NotFoundError('User not found', error_codes_constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        if (user.emailVerified) {
            throw new http_errors_1.BadRequestError('Email already verified', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
        }
        const verificationToken = await security_1.tokenService.createToken({
            userId: user.id,
            type: 'EMAIL_VERIFICATION',
            requestedIp,
        });
        const verificationUrl = security_1.tokenService.getTokenUrl('EMAIL_VERIFICATION', verificationToken);
        await email_1.emailService.sendVerificationEmail(user.email, verificationUrl);
        logger_1.logger.info({ userId: user.publicId }, 'Verification email resent');
    },
    /**
     * Request email change
     */
    async requestEmailChange(userId, newEmail, requestedIp) {
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user) {
            throw new http_errors_1.NotFoundError('User not found', error_codes_constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        const normalizedEmail = newEmail.toLowerCase().trim();
        if (normalizedEmail === user.email) {
            throw new http_errors_1.BadRequestError('New email is same as current', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
        }
        if (await user_repository_1.userRepository.emailExists(normalizedEmail, userId)) {
            throw new http_errors_1.ConflictError('Email already in use', error_codes_constants_1.ERROR_CODES.USER_EMAIL_TAKEN);
        }
        const changeToken = await security_1.tokenService.createToken({
            userId: user.id,
            type: 'EMAIL_CHANGE',
            newEmail: normalizedEmail,
            requestedIp,
        });
        const confirmationUrl = security_1.tokenService.getTokenUrl('EMAIL_CHANGE', changeToken);
        await email_1.emailService.sendEmailChangeRequestEmail(normalizedEmail, normalizedEmail, confirmationUrl);
        logger_1.logger.info({ userId: user.publicId, newEmail: normalizedEmail }, 'Email change requested');
    },
    /**
     * Confirm email change with token
     */
    async confirmEmailChange(token, usedIp) {
        const tokenResult = await security_1.tokenService.verifyAndConsumeToken(token, 'EMAIL_CHANGE', usedIp);
        if (!tokenResult.valid || !tokenResult.token?.newEmail) {
            throw new http_errors_1.BadRequestError(tokenResult.error ?? 'Invalid or expired token', error_codes_constants_1.ERROR_CODES.VERIFICATION_TOKEN_INVALID);
        }
        const { userId, newEmail } = tokenResult.token;
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user) {
            throw new http_errors_1.NotFoundError('User not found', error_codes_constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        const oldEmail = user.email;
        if (await user_repository_1.userRepository.emailExists(newEmail, userId)) {
            throw new http_errors_1.ConflictError('Email no longer available', error_codes_constants_1.ERROR_CODES.USER_EMAIL_TAKEN);
        }
        await user_repository_1.userRepository.update(userId, { email: newEmail });
        await security_1.tokenService.invalidateUserTokens(userId, 'EMAIL_CHANGE');
        await email_1.emailService.send({
            to: oldEmail,
            subject: 'Your email address has been changed',
            template: 'email-change-confirmation',
            data: { oldEmail, newEmail },
        });
        logger_1.logger.info({ userId: user.publicId, oldEmail, newEmail }, 'Email changed');
        return { oldEmail, newEmail };
    },
};
//# sourceMappingURL=email-verification.service.js.map