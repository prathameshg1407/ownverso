"use strict";
// ==== FILE: src/domain/authors/entities/author-account.entity.ts ====
/**
 * Author Account Entity Types and Helpers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLATFORM_TIER_NAMES = void 0;
exports.hasActiveSubscription = hasActiveSubscription;
exports.isOnTrial = isOnTrial;
exports.isExpiringSoon = isExpiringSoon;
exports.getTierLevel = getTierLevel;
exports.isUpgrade = isUpgrade;
/**
 * Platform tier display names
 */
exports.PLATFORM_TIER_NAMES = {
    FREE: 'Free',
    STARTER: 'Starter',
    GROWTH: 'Growth',
    PROFESSIONAL: 'Professional',
    ENTERPRISE: 'Enterprise',
};
/**
 * Check if author has active subscription
 */
function hasActiveSubscription(account) {
    return (account.platformTierStatus === 'ACTIVE' ||
        account.platformTierStatus === 'TRIALING');
}
/**
 * Check if author is on trial
 */
function isOnTrial(account) {
    return (account.platformTierStatus === 'TRIALING' &&
        account.platformTrialEndsAt !== null &&
        account.platformTrialEndsAt > new Date());
}
/**
 * Check if subscription is expiring soon (within 7 days)
 */
function isExpiringSoon(account) {
    if (!account.platformTierExpiresAt)
        return false;
    const daysUntilExpiry = Math.ceil((account.platformTierExpiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
}
/**
 * Get tier level for comparison (higher = better)
 */
function getTierLevel(tier) {
    const levels = {
        FREE: 0,
        STARTER: 1,
        GROWTH: 2,
        PROFESSIONAL: 3,
        ENTERPRISE: 4,
    };
    return levels[tier];
}
/**
 * Check if upgrading from one tier to another
 */
function isUpgrade(fromTier, toTier) {
    return getTierLevel(toTier) > getTierLevel(fromTier);
}
//# sourceMappingURL=author-account.entity.js.map