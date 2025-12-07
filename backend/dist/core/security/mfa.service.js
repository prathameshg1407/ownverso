"use strict";
// ==== FILE: src/core/security/mfa.service.ts ====
Object.defineProperty(exports, "__esModule", { value: true });
exports.mfaService = void 0;
/**
 * MFA Service
 *
 * Handles Multi-Factor Authentication with TOTP.
 */
const crypto_1 = require("crypto");
const config_1 = require("../../config");
const logger_1 = require("../../core/logger");
/**
 * TOTP configuration
 */
const TOTP_CONFIG = {
    digits: 6,
    period: 30, // seconds
    algorithm: 'SHA1',
};
/**
 * Base32 encoding helpers
 */
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function base32Encode(buffer) {
    let bits = 0;
    let value = 0;
    let output = '';
    for (let i = 0; i < buffer.length; i++) {
        value = (value << 8) | buffer[i];
        bits += 8;
        while (bits >= 5) {
            output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
            bits -= 5;
        }
    }
    if (bits > 0) {
        output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
    }
    return output;
}
function base32Decode(encoded) {
    const cleanedInput = encoded.replace(/=+$/, '').toUpperCase();
    const output = [];
    let bits = 0;
    let value = 0;
    for (let i = 0; i < cleanedInput.length; i++) {
        const idx = BASE32_ALPHABET.indexOf(cleanedInput[i]);
        if (idx === -1)
            continue;
        value = (value << 5) | idx;
        bits += 5;
        if (bits >= 8) {
            output.push((value >>> (bits - 8)) & 255);
            bits -= 8;
        }
    }
    return Buffer.from(output);
}
/**
 * Generate TOTP code
 */
function generateTOTP(secret, timestamp = Date.now()) {
    const counter = Math.floor(timestamp / 1000 / TOTP_CONFIG.period);
    const counterBuffer = Buffer.alloc(8);
    // Write counter as big-endian 64-bit integer
    for (let i = 7; i >= 0; i--) {
        counterBuffer[i] = counter & 0xff;
    }
    const secretBuffer = base32Decode(secret);
    const hmac = (0, crypto_1.createHmac)('sha1', secretBuffer);
    hmac.update(counterBuffer);
    const hash = hmac.digest();
    // Dynamic truncation
    const offset = hash[hash.length - 1] & 0xf;
    const binary = ((hash[offset] & 0x7f) << 24) |
        ((hash[offset + 1] & 0xff) << 16) |
        ((hash[offset + 2] & 0xff) << 8) |
        (hash[offset + 3] & 0xff);
    const otp = binary % Math.pow(10, TOTP_CONFIG.digits);
    return otp.toString().padStart(TOTP_CONFIG.digits, '0');
}
/**
 * Generate simple QR code as SVG (basic implementation)
 * In production, use a proper QR library like 'qrcode'
 */
function generateQRCodeSvg(data) {
    // This is a placeholder - in production, use a proper QR code library
    // For now, we'll return a simple SVG with the URL encoded
    const encodedData = encodeURIComponent(data);
    // Use an online QR code service for development
    // In production, generate locally with 'qrcode' package
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`;
}
/**
 * MFA Service
 */
exports.mfaService = {
    /**
     * Generate a new MFA secret
     */
    generateSecret() {
        const buffer = (0, crypto_1.randomBytes)(20);
        return base32Encode(buffer);
    },
    /**
     * Generate OTP Auth URL for authenticator apps
     */
    generateOtpAuthUrl(secret, email, issuer = config_1.config.auth.mfa.issuer) {
        const encodedIssuer = encodeURIComponent(issuer);
        const encodedEmail = encodeURIComponent(email);
        return `otpauth://totp/${encodedIssuer}:${encodedEmail}?secret=${secret}&issuer=${encodedIssuer}&algorithm=${TOTP_CONFIG.algorithm}&digits=${TOTP_CONFIG.digits}&period=${TOTP_CONFIG.period}`;
    },
    /**
     * Setup MFA for a user
     */
    async setupMfa(email) {
        const secret = this.generateSecret();
        const otpAuthUrl = this.generateOtpAuthUrl(secret, email);
        const qrCodeDataUrl = generateQRCodeSvg(otpAuthUrl);
        const backupCodes = this.generateBackupCodes();
        return {
            secret,
            otpAuthUrl,
            qrCodeDataUrl,
            backupCodes,
        };
    },
    /**
     * Verify a TOTP code
     */
    verifyTotp(secret, code, window = config_1.config.auth.mfa.totpWindow) {
        if (!code || code.length !== TOTP_CONFIG.digits) {
            return false;
        }
        const now = Date.now();
        // Check current and adjacent time windows
        for (let i = -window; i <= window; i++) {
            const timestamp = now + (i * TOTP_CONFIG.period * 1000);
            const expectedCode = generateTOTP(secret, timestamp);
            if (code === expectedCode) {
                logger_1.logger.debug({ window: i }, 'TOTP verified');
                return true;
            }
        }
        return false;
    },
    /**
     * Generate backup codes
     */
    generateBackupCodes(count = config_1.config.auth.mfa.backupCodesCount) {
        const codes = [];
        const codeLength = config_1.config.auth.mfa.backupCodeLength;
        for (let i = 0; i < count; i++) {
            const bytes = (0, crypto_1.randomBytes)(Math.ceil(codeLength / 2));
            const code = bytes
                .toString('hex')
                .toUpperCase()
                .slice(0, codeLength);
            // Format as XXXX-XXXX
            const formatted = `${code.slice(0, 4)}-${code.slice(4)}`;
            codes.push(formatted);
        }
        return codes;
    },
    /**
     * Verify a backup code
     */
    verifyBackupCode(storedCodes, providedCode) {
        const normalizedCode = providedCode.toUpperCase().replace(/[^A-Z0-9]/g, '');
        const matchIndex = storedCodes.findIndex((code) => {
            const normalizedStored = code.toUpperCase().replace(/[^A-Z0-9]/g, '');
            return normalizedStored === normalizedCode;
        });
        if (matchIndex === -1) {
            return { valid: false, remainingCodes: storedCodes };
        }
        // Remove used code
        const remainingCodes = [...storedCodes];
        remainingCodes.splice(matchIndex, 1);
        return { valid: true, remainingCodes };
    },
    /**
     * Hash backup codes for storage
     */
    hashBackupCodes(codes) {
        return codes.map((code) => {
            const normalized = code.toUpperCase().replace(/[^A-Z0-9]/g, '');
            return (0, crypto_1.createHmac)('sha256', config_1.config.jwt.access.secret)
                .update(normalized)
                .digest('hex');
        });
    },
    /**
     * Get current TOTP code (for testing)
     */
    getCurrentCode(secret) {
        return generateTOTP(secret);
    },
};
//# sourceMappingURL=mfa.service.js.map