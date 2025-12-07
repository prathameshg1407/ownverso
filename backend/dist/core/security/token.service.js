"use strict";
// ==== FILE: src/core/security/token.service.ts ====
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
/**
 * Token Service
 *
 * Handles verification tokens for email, password reset, MFA setup, etc.
 */
const crypto_1 = require("crypto");
const config_1 = require("../../config");
const database_1 = require("../../core/database");
const logger_1 = require("../../core/logger");
const http_errors_1 = require("../../common/errors/http.errors");
const error_codes_constants_1 = require("../../common/constants/error-codes.constants");
/**
 * Get expiration time for token type
 */
function getExpirationTime(type) {
    const tokenConfigs = config_1.config.auth.tokens;
    let expiresInMs;
    switch (type) {
        case 'EMAIL_VERIFICATION':
            expiresInMs = tokenConfigs.emailVerification.expiresInMs;
            break;
        case 'PASSWORD_RESET':
            expiresInMs = tokenConfigs.passwordReset.expiresInMs;
            break;
        case 'EMAIL_CHANGE':
            expiresInMs = tokenConfigs.emailChange.expiresInMs;
            break;
        case 'MFA_SETUP':
            expiresInMs = tokenConfigs.mfaSetup.expiresInMs;
            break;
        case 'ACCOUNT_RECOVERY':
            expiresInMs = tokenConfigs.accountRecovery.expiresInMs;
            break;
        default:
            expiresInMs = 24 * 60 * 60 * 1000; // Default 24 hours
    }
    return new Date(Date.now() + expiresInMs);
}
/**
 * Hash a token for storage
 */
function hashToken(token) {
    return (0, crypto_1.createHash)('sha256').update(token).digest('hex');
}
/**
 * Token Service
 */
exports.tokenService = {
    /**
     * Generate a random token
     */
    generateRandomToken(length = 32) {
        const token = (0, crypto_1.randomBytes)(length).toString('base64url');
        const hashedToken = hashToken(token);
        return {
            token,
            hashedToken,
            expiresAt: new Date(), // Will be set by caller
        };
    },
    /**
     * Create a verification token
     */
    async createToken(options) {
        const { userId, type, newEmail, requestedIp } = options;
        // Invalidate any existing tokens of the same type for this user
        await database_1.prisma.verificationToken.updateMany({
            where: {
                userId,
                type,
                isUsed: false,
                expiresAt: { gt: new Date() },
            },
            data: {
                isUsed: true,
                usedAt: new Date(),
            },
        });
        // Generate new token
        const { token, hashedToken } = this.generateRandomToken();
        const expiresAt = getExpirationTime(type);
        // Store in database
        await database_1.prisma.verificationToken.create({
            data: {
                userId,
                tokenHash: hashedToken,
                type,
                newEmail,
                requestedIp,
                expiresAt,
            },
        });
        logger_1.logger.debug({ userId: userId.toString(), type }, 'Verification token created');
        return token;
    },
    /**
     * Verify a token
     */
    async verifyToken(token, expectedType) {
        const hashedToken = hashToken(token);
        const verificationToken = await database_1.prisma.verificationToken.findUnique({
            where: { tokenHash: hashedToken },
        });
        if (!verificationToken) {
            return {
                valid: false,
                error: 'Invalid token',
            };
        }
        if (verificationToken.type !== expectedType) {
            return {
                valid: false,
                error: 'Invalid token type',
            };
        }
        if (verificationToken.isUsed) {
            return {
                valid: false,
                error: 'Token has already been used',
            };
        }
        if (verificationToken.expiresAt < new Date()) {
            return {
                valid: false,
                error: 'Token has expired',
            };
        }
        return {
            valid: true,
            token: {
                id: verificationToken.id,
                userId: verificationToken.userId,
                type: verificationToken.type,
                newEmail: verificationToken.newEmail,
                expiresAt: verificationToken.expiresAt,
            },
        };
    },
    /**
     * Mark a token as used
     */
    async markTokenAsUsed(tokenId, usedIp) {
        await database_1.prisma.verificationToken.update({
            where: { id: tokenId },
            data: {
                isUsed: true,
                usedAt: new Date(),
                usedIp,
            },
        });
    },
    /**
     * Invalidate all tokens of a type for a user
     */
    async invalidateUserTokens(userId, type) {
        const where = {
            userId,
            isUsed: false,
            ...(type && { type }),
        };
        const result = await database_1.prisma.verificationToken.updateMany({
            where,
            data: {
                isUsed: true,
                usedAt: new Date(),
            },
        });
        return result.count;
    },
    /**
     * Clean up expired tokens (should be run periodically)
     */
    async cleanupExpiredTokens() {
        const result = await database_1.prisma.verificationToken.deleteMany({
            where: {
                OR: [
                    { expiresAt: { lt: new Date() } },
                    { isUsed: true, usedAt: { lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
                ],
            },
        });
        logger_1.logger.info({ count: result.count }, 'Cleaned up expired verification tokens');
        return result.count;
    },
    /**
     * Verify and consume token in one operation
     */
    async verifyAndConsumeToken(token, expectedType, usedIp) {
        const result = await this.verifyToken(token, expectedType);
        if (result.valid && result.token) {
            await this.markTokenAsUsed(result.token.id, usedIp);
        }
        return result;
    },
    /**
     * Get token URL for email links
     */
    getTokenUrl(type, token) {
        const frontendUrls = config_1.config.auth.frontendUrls;
        switch (type) {
            case 'EMAIL_VERIFICATION':
                return `${frontendUrls.verifyEmail}?token=${encodeURIComponent(token)}`;
            case 'PASSWORD_RESET':
                return `${frontendUrls.resetPassword}?token=${encodeURIComponent(token)}`;
            case 'EMAIL_CHANGE':
                return `${frontendUrls.confirmEmailChange}?token=${encodeURIComponent(token)}`;
            default:
                throw new http_errors_1.BadRequestError(`Cannot generate URL for token type: ${type}`, error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
        }
    },
};
//# sourceMappingURL=token.service.js.map