"use strict";
/**
 * JWT Configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
/**
 * Parse duration string to milliseconds
 */
function parseDuration(duration) {
    const match = duration.match(/^(\d+)(s|m|h|d)$/);
    if (!match) {
        return 900000; // Default 15 minutes
    }
    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
        case 's':
            return value * 1000;
        case 'm':
            return value * 60 * 1000;
        case 'h':
            return value * 60 * 60 * 1000;
        case 'd':
            return value * 24 * 60 * 60 * 1000;
        default:
            return 900000;
    }
}
exports.jwtConfig = {
    /**
     * Access token configuration
     */
    access: {
        secret: process.env.JWT_ACCESS_SECRET || 'development-access-secret-key',
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
        expiresInMs: parseDuration(process.env.JWT_ACCESS_EXPIRES_IN || '15m'),
    },
    /**
     * Refresh token configuration
     */
    refresh: {
        secret: process.env.JWT_REFRESH_SECRET || 'development-refresh-secret-key',
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
        expiresInMs: parseDuration(process.env.JWT_REFRESH_EXPIRES_IN || '7d'),
    },
    /**
     * Token issuer
     */
    issuer: process.env.JWT_ISSUER || 'ownverso',
    /**
     * Token audience
     */
    audience: process.env.JWT_AUDIENCE || 'ownverso-api',
    /**
     * Algorithm for signing
     */
    algorithm: 'HS256',
};
//# sourceMappingURL=jwt.config.js.map