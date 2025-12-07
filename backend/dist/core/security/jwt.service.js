"use strict";
// ==== FILE: src/core/security/jwt.service.ts ====
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
/**
 * JWT Service
 *
 * Handles JWT token generation, verification, and management.
 */
const fast_jwt_1 = require("fast-jwt");
const config_1 = require("../../config");
const logger_1 = require("../../core/logger");
const http_errors_1 = require("../../common/errors/http.errors");
const error_codes_constants_1 = require("../../common/constants/error-codes.constants");
/**
 * Valid user roles for runtime validation
 */
const VALID_ROLES = ['READER', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'];
// Create signers and verifiers
const accessTokenSigner = (0, fast_jwt_1.createSigner)({
    key: config_1.config.jwt.access.secret,
    algorithm: 'HS256',
    expiresIn: config_1.config.jwt.access.expiresInMs,
    iss: config_1.config.jwt.issuer,
    aud: config_1.config.jwt.audience,
});
const refreshTokenSigner = (0, fast_jwt_1.createSigner)({
    key: config_1.config.jwt.refresh.secret,
    algorithm: 'HS256',
    expiresIn: config_1.config.jwt.refresh.expiresInMs,
    iss: config_1.config.jwt.issuer,
    aud: config_1.config.jwt.audience,
});
const accessTokenVerifier = (0, fast_jwt_1.createVerifier)({
    key: config_1.config.jwt.access.secret,
    algorithms: ['HS256'],
    allowedIss: config_1.config.jwt.issuer,
    allowedAud: config_1.config.jwt.audience,
    cache: true,
    cacheTTL: 60000, // 1 minute cache
});
const refreshTokenVerifier = (0, fast_jwt_1.createVerifier)({
    key: config_1.config.jwt.refresh.secret,
    algorithms: ['HS256'],
    allowedIss: config_1.config.jwt.issuer,
    allowedAud: config_1.config.jwt.audience,
    cache: true,
    cacheTTL: 60000,
});
const tokenDecoder = (0, fast_jwt_1.createDecoder)({ complete: false });
/**
 * Check if a value is a valid UserRole
 */
function isValidUserRole(role) {
    return typeof role === 'string' && VALID_ROLES.includes(role);
}
/**
 * JWT Service
 */
exports.jwtService = {
    /**
     * Generate access token
     */
    generateAccessToken(userData) {
        const payload = {
            sub: userData.publicId,
            type: 'access',
            email: userData.email,
            role: userData.role,
            sessionId: userData.sessionId,
        };
        return accessTokenSigner(payload);
    },
    /**
     * Generate refresh token
     */
    generateRefreshToken(userData) {
        const payload = {
            sub: userData.publicId,
            type: 'refresh',
            sessionId: userData.sessionId,
            tokenVersion: userData.tokenVersion || 0,
        };
        return refreshTokenSigner(payload);
    },
    /**
     * Generate token pair
     */
    generateTokenPair(userData) {
        const now = new Date();
        const accessToken = this.generateAccessToken(userData);
        const refreshToken = this.generateRefreshToken(userData);
        return {
            accessToken,
            refreshToken,
            accessTokenExpiresAt: new Date(now.getTime() + config_1.config.jwt.access.expiresInMs),
            refreshTokenExpiresAt: new Date(now.getTime() + config_1.config.jwt.refresh.expiresInMs),
        };
    },
    /**
     * Verify access token
     */
    verifyAccessToken(token) {
        try {
            const payload = accessTokenVerifier(token);
            if (payload.type !== 'access') {
                throw new http_errors_1.UnauthorizedError('Invalid token type', error_codes_constants_1.ERROR_CODES.AUTH_INVALID_TOKEN);
            }
            // Validate role is a valid UserRole
            if (!isValidUserRole(payload.role)) {
                throw new http_errors_1.UnauthorizedError('Invalid role in token', error_codes_constants_1.ERROR_CODES.AUTH_INVALID_TOKEN);
            }
            return payload;
        }
        catch (error) {
            logger_1.logger.debug({ error }, 'Access token verification failed');
            if (error instanceof http_errors_1.UnauthorizedError) {
                throw error;
            }
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage.includes('expired')) {
                throw new http_errors_1.UnauthorizedError('Access token has expired', error_codes_constants_1.ERROR_CODES.AUTH_TOKEN_EXPIRED);
            }
            throw new http_errors_1.UnauthorizedError('Invalid access token', error_codes_constants_1.ERROR_CODES.AUTH_INVALID_TOKEN);
        }
    },
    /**
     * Verify refresh token
     */
    verifyRefreshToken(token) {
        try {
            const payload = refreshTokenVerifier(token);
            if (payload.type !== 'refresh') {
                throw new http_errors_1.UnauthorizedError('Invalid token type', error_codes_constants_1.ERROR_CODES.AUTH_REFRESH_TOKEN_INVALID);
            }
            return payload;
        }
        catch (error) {
            logger_1.logger.debug({ error }, 'Refresh token verification failed');
            if (error instanceof http_errors_1.UnauthorizedError) {
                throw error;
            }
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage.includes('expired')) {
                throw new http_errors_1.UnauthorizedError('Refresh token has expired', error_codes_constants_1.ERROR_CODES.AUTH_REFRESH_TOKEN_EXPIRED);
            }
            throw new http_errors_1.UnauthorizedError('Invalid refresh token', error_codes_constants_1.ERROR_CODES.AUTH_REFRESH_TOKEN_INVALID);
        }
    },
    /**
     * Decode token without verification (for debugging/logging)
     */
    decodeToken(token) {
        try {
            return tokenDecoder(token);
        }
        catch {
            return null;
        }
    },
    /**
     * Extract token from Authorization header
     */
    extractTokenFromHeader(authHeader) {
        if (!authHeader) {
            return null;
        }
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0]?.toLowerCase() !== 'bearer') {
            return null;
        }
        return parts[1] || null;
    },
    /**
     * Check if token is about to expire (within threshold)
     */
    isTokenExpiringSoon(payload, thresholdMs = 60000) {
        const expiresAt = payload.exp * 1000;
        const now = Date.now();
        return expiresAt - now <= thresholdMs;
    },
    /**
     * Get token expiration date
     */
    getTokenExpiration(payload) {
        return new Date(payload.exp * 1000);
    },
};
//# sourceMappingURL=jwt.service.js.map