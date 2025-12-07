"use strict";
/**
 * Cryptography Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.generateUrlSafeToken = generateUrlSafeToken;
exports.sha256 = sha256;
exports.sha512 = sha512;
exports.hmacSign = hmacSign;
exports.hmacVerify = hmacVerify;
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
exports.generateApiKey = generateApiKey;
exports.hashApiKey = hashApiKey;
exports.generateShortCode = generateShortCode;
exports.generateOTP = generateOTP;
exports.safeCompare = safeCompare;
const crypto_1 = require("crypto");
const argon2_1 = require("argon2");
const config_1 = require("../../config");
/**
 * Generate a random token
 */
function generateToken(length = 32) {
    return (0, crypto_1.randomBytes)(length).toString('hex');
}
/**
 * Generate a URL-safe random token
 */
function generateUrlSafeToken(length = 32) {
    return (0, crypto_1.randomBytes)(length).toString('base64url');
}
/**
 * Hash a string using SHA-256
 */
function sha256(data) {
    return (0, crypto_1.createHash)('sha256').update(data).digest('hex');
}
/**
 * Hash a string using SHA-512
 */
function sha512(data) {
    return (0, crypto_1.createHash)('sha512').update(data).digest('hex');
}
/**
 * Create HMAC signature
 */
function hmacSign(data, secret) {
    return (0, crypto_1.createHmac)('sha256', secret).update(data).digest('hex');
}
/**
 * Verify HMAC signature (timing-safe)
 */
function hmacVerify(data, signature, secret) {
    const expectedSignature = hmacSign(data, secret);
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);
    if (sigBuffer.length !== expectedBuffer.length) {
        return false;
    }
    return (0, crypto_1.timingSafeEqual)(sigBuffer, expectedBuffer);
}
/**
 * Hash a password using Argon2
 */
async function hashPassword(password) {
    const options = {
        memoryCost: config_1.config.argon2.memoryCost,
        timeCost: config_1.config.argon2.timeCost,
        parallelism: config_1.config.argon2.parallelism,
        type: 2, // Argon2id
    };
    return (0, argon2_1.hash)(password, options);
}
/**
 * Verify a password against a hash
 */
async function verifyPassword(hash, password) {
    try {
        return await (0, argon2_1.verify)(hash, password);
    }
    catch {
        return false;
    }
}
/**
 * Generate API key
 */
function generateApiKey(prefix = 'ov') {
    const token = generateToken(32);
    const key = `${prefix}_${token}`;
    const keyHash = sha256(key);
    return { key, hash: keyHash };
}
/**
 * Hash an API key for storage
 */
function hashApiKey(key) {
    return sha256(key);
}
/**
 * Generate a short code (for verification, referral, etc.)
 */
function generateShortCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    const bytes = (0, crypto_1.randomBytes)(length);
    for (let i = 0; i < length; i++) {
        code += chars[bytes[i] % chars.length];
    }
    return code;
}
/**
 * Generate a numeric OTP
 */
function generateOTP(length = 6) {
    const max = Math.pow(10, length) - 1;
    const min = Math.pow(10, length - 1);
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString();
}
/**
 * Timing-safe string comparison
 */
function safeCompare(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    return (0, crypto_1.timingSafeEqual)(Buffer.from(a), Buffer.from(b));
}
//# sourceMappingURL=crypto.utils.js.map