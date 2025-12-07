"use strict";
// ==== FILE: src/domain/authors/mappers/author.mapper.ts ====
/**
 * Author Mappers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthorMapper = exports.authorAccountMapper = void 0;
// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────
const toISOString = (date) => date?.toISOString() ?? null;
const bigIntToString = (value) => value.toString();
// ─────────────────────────────────────────────────────────────────────────
// Author Account Mapper
// ─────────────────────────────────────────────────────────────────────────
exports.authorAccountMapper = {
    toDTO(account) {
        return {
            penName: account.penName,
            tagline: account.tagline,
            fullBio: account.fullBio,
            isVerified: account.isVerified,
            verifiedAt: toISOString(account.verifiedAt),
            platformTier: account.platformTier,
            platformTierStatus: account.platformTierStatus,
            platformTierExpiresAt: toISOString(account.platformTierExpiresAt),
            platformTrialEndsAt: toISOString(account.platformTrialEndsAt),
            seriesCount: account.seriesCount,
            totalChapterCount: account.totalChapterCount,
            activeSubscriberCount: account.activeSubscriberCount,
            storageUsedBytes: bigIntToString(account.storageUsedBytes),
            acceptingCommissions: account.acceptingCommissions,
            commissionInfo: account.commissionInfo,
            commissionMinPrice: account.commissionMinPrice,
            commissionMaxPrice: account.commissionMaxPrice,
            commissionCurrency: account.commissionCurrency,
            createdAt: account.createdAt.toISOString(),
        };
    },
    toPlatformSubscriptionDTO(account) {
        return {
            tier: account.platformTier,
            status: account.platformTierStatus,
            billingCycle: account.platformBillingCycle,
            startedAt: toISOString(account.platformTierStartedAt),
            expiresAt: toISOString(account.platformTierExpiresAt),
            trialEndsAt: toISOString(account.platformTrialEndsAt),
            currentMonthRevenue: bigIntToString(account.currentMonthRevenue),
            currentMonthUsageFee: bigIntToString(account.currentMonthUsageFee),
            currentMonthCurrency: account.currentMonthCurrency,
        };
    },
};
// ─────────────────────────────────────────────────────────────────────────
// Admin Mappers
// ─────────────────────────────────────────────────────────────────────────
exports.adminAuthorMapper = {
    toSummaryDTO(account) {
        return {
            userId: account.userId.toString(),
            publicId: account.user.publicId,
            email: account.user.email,
            username: account.user.username,
            penName: account.penName,
            isVerified: account.isVerified,
            platformTier: account.platformTier,
            platformTierStatus: account.platformTierStatus,
            seriesCount: account.seriesCount,
            activeSubscriberCount: account.activeSubscriberCount,
            createdAt: account.createdAt.toISOString(),
        };
    },
    toDetailDTO(account) {
        return {
            ...exports.authorAccountMapper.toDTO(account),
            userId: account.userId.toString(),
            publicId: account.user.publicId,
            email: account.user.email,
            username: account.user.username,
            displayName: account.user.displayName,
            verificationNote: account.verificationNote,
            stripeCustomerId: account.stripeCustomerId,
            razorpayCustomerId: account.razorpayCustomerId,
            xenditCustomerId: account.xenditCustomerId,
            currentMonthRevenue: bigIntToString(account.currentMonthRevenue),
            currentMonthUsageFee: bigIntToString(account.currentMonthUsageFee),
            aiTranslationWordsUsed: account.aiTranslationWordsUsed,
            aiWritingTokensUsed: account.aiWritingTokensUsed,
            aiCoverGenerationsUsed: account.aiCoverGenerationsUsed,
            referralCode: account.referralCode,
            referralRewardMonths: account.referralRewardMonths,
        };
    },
};
//# sourceMappingURL=author.mapper.js.map