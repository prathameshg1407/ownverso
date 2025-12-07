"use strict";
// ==== FILE: src/domain/auth/types/auth.types.ts ====
/**
 * Auth Domain Types
 * Single source of truth for all auth-related types
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROVIDER_DISPLAY_NAMES = void 0;
exports.getProviderDisplayName = getProviderDisplayName;
exports.isSessionValid = isSessionValid;
exports.isAuthAccountActive = isAuthAccountActive;
exports.shouldExtendSession = shouldExtendSession;
// ─────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────
exports.PROVIDER_DISPLAY_NAMES = {
    EMAIL: 'Email',
    GOOGLE: 'Google',
    APPLE: 'Apple',
    TWITTER: 'Twitter/X',
    DISCORD: 'Discord',
    FACEBOOK: 'Facebook',
};
// ─────────────────────────────────────────────────────────────────────────
// Utility Functions
// ─────────────────────────────────────────────────────────────────────────
function getProviderDisplayName(provider) {
    return exports.PROVIDER_DISPLAY_NAMES[provider] ?? provider;
}
function isSessionValid(session) {
    return !session.isRevoked && session.expiresAt > new Date();
}
function isAuthAccountActive(account) {
    return !account.isRevoked;
}
function shouldExtendSession(session, thresholdMs = 5 * 60 * 1000) {
    return session.lastActiveAt
        ? Date.now() - session.lastActiveAt.getTime() > thresholdMs
        : true;
}
//# sourceMappingURL=auth.types.js.map