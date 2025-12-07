"use strict";
// ==== FILE: src/domain/auth/utils/crypto.utils.ts ====
/**
 * Auth Crypto Utilities
 * Domain-specific cryptographic operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashToken = hashToken;
exports.generateToken = generateToken;
exports.generateSessionId = generateSessionId;
exports.maskIpAddress = maskIpAddress;
exports.secureCompare = secureCompare;
const crypto_1 = require("crypto");
const TOKEN_BYTES = 32;
const SESSION_ID_BYTES = 16;
/**
 * Hash a token using SHA-256 for storage
 */
function hashToken(token) {
    return (0, crypto_1.createHash)('sha256').update(token).digest('hex');
}
/**
 * Generate a cryptographically secure token
 */
function generateToken(prefix = '') {
    const random = (0, crypto_1.randomBytes)(TOKEN_BYTES).toString('base64url');
    return prefix ? `${prefix}_${random}` : random;
}
/**
 * Generate a unique session identifier
 */
function generateSessionId() {
    return `sess_${Date.now()}_${(0, crypto_1.randomBytes)(SESSION_ID_BYTES).toString('hex')}`;
}
/**
 * Mask an IP address for privacy (showing only network portion)
 */
function maskIpAddress(ip) {
    if (!ip)
        return null;
    if (ip.includes('.')) {
        const parts = ip.split('.');
        return parts.length >= 2 ? `${parts[0]}.${parts[1]}.*.*` : '***';
    }
    if (ip.includes(':')) {
        const parts = ip.split(':');
        return parts.length >= 2 ? `${parts[0]}:${parts[1]}:****:****` : '***';
    }
    return '***';
}
/**
 * Constant-time string comparison to prevent timing attacks
 */
function secureCompare(a, b) {
    if (a.length !== b.length)
        return false;
    try {
        return (0, crypto_1.timingSafeEqual)(Buffer.from(a), Buffer.from(b));
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=crypto.utils.js.map