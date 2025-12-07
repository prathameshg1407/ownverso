"use strict";
// ==== FILE: src/api/v1/auth/utils/oauth.utils.ts ====
/**
 * OAuth Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOAuthState = generateOAuthState;
exports.verifyOAuthState = verifyOAuthState;
exports.maskEmail = maskEmail;
const crypto_1 = require("crypto");
const STATE_BYTES = 32;
const DEFAULT_MAX_AGE_MS = 10 * 60 * 1000;
function generateOAuthState() {
    const timestamp = Date.now().toString(36);
    const random = (0, crypto_1.randomBytes)(STATE_BYTES).toString('base64url');
    return `${timestamp}.${random}`;
}
function verifyOAuthState(state, maxAgeMs = DEFAULT_MAX_AGE_MS) {
    try {
        const [timestampStr] = state.split('.');
        if (!timestampStr)
            return false;
        const timestamp = parseInt(timestampStr, 36);
        if (isNaN(timestamp))
            return false;
        const age = Date.now() - timestamp;
        return age >= 0 && age <= maxAgeMs;
    }
    catch {
        return false;
    }
}
function maskEmail(email) {
    const atIndex = email.indexOf('@');
    if (atIndex === -1)
        return email;
    const local = email.slice(0, atIndex);
    const domain = email.slice(atIndex);
    if (local.length <= 2)
        return '*'.repeat(local.length) + domain;
    return local[0] + '*'.repeat(local.length - 2) + local.slice(-1) + domain;
}
//# sourceMappingURL=oauth.utils.js.map