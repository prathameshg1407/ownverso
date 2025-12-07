"use strict";
// ==== FILE: src/domain/authors/services/author-platform-sub.service.ts ====
/**
 * Author Platform Subscription Service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorPlatformSubService = void 0;
const logger_1 = require("../../../core/logger");
const errors_1 = require("../../../common/errors");
const constants_1 = require("../../../common/constants");
const author_account_repository_1 = require("../repositories/author-account.repository");
const author_mapper_1 = require("../mappers/author.mapper");
const author_account_entity_1 = require("../entities/author-account.entity");
// ─────────────────────────────────────────────────────────────────────────
// Platform Plans Configuration
// ─────────────────────────────────────────────────────────────────────────
const PLATFORM_PLANS = [
    {
        tier: 'FREE',
        name: 'Free',
        description: 'Get started with basic features',
        monthlyPrice: 0,
        yearlyPrice: 0,
        currency: 'INR',
        features: [
            'Up to 3 series',
            '50 chapters per series',
            '1 GB storage',
            'Basic analytics',
            'Community support',
        ],
        limits: {
            maxSeries: 3,
            maxChaptersPerSeries: 50,
            maxStorageBytes: 1073741824, // 1 GB
            maxBandwidthBytes: 10737418240, // 10 GB
            maxEmailBroadcasts: 100,
            aiTranslationWords: 1000,
            aiWritingTokens: 5000,
            aiCoverGenerations: 3,
            customDomain: false,
            advancedAnalytics: false,
            prioritySupport: false,
        },
    },
    {
        tier: 'STARTER',
        name: 'Starter',
        description: 'For growing authors',
        monthlyPrice: 499,
        yearlyPrice: 4990,
        currency: 'INR',
        features: [
            'Up to 10 series',
            'Unlimited chapters',
            '10 GB storage',
            'Advanced analytics',
            'Email support',
            'Custom branding',
        ],
        limits: {
            maxSeries: 10,
            maxChaptersPerSeries: null,
            maxStorageBytes: 10737418240, // 10 GB
            maxBandwidthBytes: 107374182400, // 100 GB
            maxEmailBroadcasts: 1000,
            aiTranslationWords: 10000,
            aiWritingTokens: 50000,
            aiCoverGenerations: 10,
            customDomain: false,
            advancedAnalytics: true,
            prioritySupport: false,
        },
        isPopular: true,
    },
    {
        tier: 'GROWTH',
        name: 'Growth',
        description: 'Scale your audience',
        monthlyPrice: 1499,
        yearlyPrice: 14990,
        currency: 'INR',
        features: [
            'Unlimited series',
            'Unlimited chapters',
            '50 GB storage',
            'Advanced analytics',
            'Priority email support',
            'Custom domain',
            'API access',
        ],
        limits: {
            maxSeries: null,
            maxChaptersPerSeries: null,
            maxStorageBytes: 53687091200, // 50 GB
            maxBandwidthBytes: 536870912000, // 500 GB
            maxEmailBroadcasts: 5000,
            aiTranslationWords: 50000,
            aiWritingTokens: 200000,
            aiCoverGenerations: 30,
            customDomain: true,
            advancedAnalytics: true,
            prioritySupport: true,
        },
    },
    {
        tier: 'PROFESSIONAL',
        name: 'Professional',
        description: 'For established authors',
        monthlyPrice: 3999,
        yearlyPrice: 39990,
        currency: 'INR',
        features: [
            'Everything in Growth',
            '200 GB storage',
            'White-label options',
            'Dedicated support',
            'Early access to features',
            'Team collaboration',
        ],
        limits: {
            maxSeries: null,
            maxChaptersPerSeries: null,
            maxStorageBytes: 214748364800, // 200 GB
            maxBandwidthBytes: 2147483648000, // 2 TB
            maxEmailBroadcasts: 20000,
            aiTranslationWords: 200000,
            aiWritingTokens: 1000000,
            aiCoverGenerations: 100,
            customDomain: true,
            advancedAnalytics: true,
            prioritySupport: true,
        },
    },
    {
        tier: 'ENTERPRISE',
        name: 'Enterprise',
        description: 'Custom solutions for large publishers',
        monthlyPrice: 0, // Custom pricing
        yearlyPrice: 0,
        currency: 'INR',
        features: [
            'Everything in Professional',
            'Unlimited storage',
            'Custom integrations',
            'Dedicated account manager',
            'SLA guarantee',
            'Custom contracts',
        ],
        limits: {
            maxSeries: null,
            maxChaptersPerSeries: null,
            maxStorageBytes: -1, // Unlimited
            maxBandwidthBytes: -1, // Unlimited
            maxEmailBroadcasts: -1, // Unlimited
            aiTranslationWords: -1, // Unlimited
            aiWritingTokens: -1, // Unlimited
            aiCoverGenerations: -1, // Unlimited
            customDomain: true,
            advancedAnalytics: true,
            prioritySupport: true,
        },
    },
];
// ─────────────────────────────────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────────────────────────────────
exports.authorPlatformSubService = {
    /**
     * Get all available platform plans
     */
    async listPlans() {
        return PLATFORM_PLANS;
    },
    /**
     * Get specific plan by tier
     */
    async getPlan(tier) {
        const plan = PLATFORM_PLANS.find((p) => p.tier === tier);
        if (!plan) {
            throw new errors_1.NotFoundError('Plan not found', constants_1.ERROR_CODES.NOT_FOUND);
        }
        return plan;
    },
    /**
     * Get current subscription
     */
    async getSubscription(userId) {
        const account = await author_account_repository_1.authorAccountRepository.findByUserId(userId);
        if (!account) {
            throw new errors_1.NotFoundError('Author account not found', constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
        }
        return author_mapper_1.authorAccountMapper.toPlatformSubscriptionDTO(account);
    },
    /**
     * Subscribe to a plan
     */
    async subscribe(userId, tier, billingCycle) {
        const account = await author_account_repository_1.authorAccountRepository.findByUserId(userId);
        if (!account) {
            throw new errors_1.NotFoundError('Author account not found', constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
        }
        // Cannot subscribe if already on a paid plan
        if (account.platformTier !== 'FREE') {
            throw new errors_1.BadRequestError('Already subscribed to a plan. Use change plan instead.', constants_1.ERROR_CODES.BAD_REQUEST);
        }
        // Enterprise requires custom handling
        if (tier === 'ENTERPRISE') {
            throw new errors_1.BadRequestError('Enterprise plan requires contacting sales', constants_1.ERROR_CODES.BAD_REQUEST);
        }
        const now = new Date();
        const expiresAt = new Date(now);
        if (billingCycle === 'MONTHLY') {
            expiresAt.setMonth(expiresAt.getMonth() + 1);
        }
        else {
            expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        }
        // TODO: Integrate with payment gateway
        // For now, just update the subscription status
        const updated = await author_account_repository_1.authorAccountRepository.updatePlatformSubscription(userId, {
            platformTier: tier,
            platformTierStatus: 'ACTIVE',
            platformBillingCycle: billingCycle,
            platformTierStartedAt: now,
            platformTierExpiresAt: expiresAt,
        });
        logger_1.logger.info({ userId: userId.toString(), tier, billingCycle }, 'Platform subscription created');
        return author_mapper_1.authorAccountMapper.toPlatformSubscriptionDTO(updated);
    },
    /**
     * Change subscription plan
     */
    async changePlan(userId, newTier) {
        const account = await author_account_repository_1.authorAccountRepository.findByUserId(userId);
        if (!account) {
            throw new errors_1.NotFoundError('Author account not found', constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
        }
        if (account.platformTier === newTier) {
            throw new errors_1.BadRequestError('Already on this plan', constants_1.ERROR_CODES.BAD_REQUEST);
        }
        // Enterprise requires custom handling
        if (newTier === 'ENTERPRISE') {
            throw new errors_1.BadRequestError('Enterprise plan requires contacting sales', constants_1.ERROR_CODES.BAD_REQUEST);
        }
        const upgrading = (0, author_account_entity_1.isUpgrade)(account.platformTier, newTier);
        // TODO: Handle proration and payment gateway integration
        const updated = await author_account_repository_1.authorAccountRepository.updatePlatformSubscription(userId, {
            platformTier: newTier,
            platformTierStatus: 'ACTIVE',
            // Keep existing billing cycle and dates for now
        });
        logger_1.logger.info({
            userId: userId.toString(),
            fromTier: account.platformTier,
            toTier: newTier,
            upgrading,
        }, 'Platform subscription changed');
        return author_mapper_1.authorAccountMapper.toPlatformSubscriptionDTO(updated);
    },
    /**
     * Cancel subscription
     */
    async cancel(userId) {
        const account = await author_account_repository_1.authorAccountRepository.findByUserId(userId);
        if (!account) {
            throw new errors_1.NotFoundError('Author account not found', constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
        }
        if (account.platformTier === 'FREE') {
            throw new errors_1.BadRequestError('No active subscription to cancel', constants_1.ERROR_CODES.BAD_REQUEST);
        }
        // Mark as cancelled - will revert to FREE at period end
        const updated = await author_account_repository_1.authorAccountRepository.updatePlatformSubscription(userId, {
            platformTier: account.platformTier,
            platformTierStatus: 'CANCELLED',
        });
        logger_1.logger.info({ userId: userId.toString(), tier: account.platformTier }, 'Platform subscription cancelled');
        return author_mapper_1.authorAccountMapper.toPlatformSubscriptionDTO(updated);
    },
    /**
     * Reactivate cancelled subscription
     */
    async reactivate(userId) {
        const account = await author_account_repository_1.authorAccountRepository.findByUserId(userId);
        if (!account) {
            throw new errors_1.NotFoundError('Author account not found', constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
        }
        if (account.platformTierStatus !== 'CANCELLED') {
            throw new errors_1.BadRequestError('Subscription is not cancelled', constants_1.ERROR_CODES.BAD_REQUEST);
        }
        // Check if still within the subscription period
        if (account.platformTierExpiresAt &&
            account.platformTierExpiresAt < new Date()) {
            throw new errors_1.BadRequestError('Subscription has expired. Please subscribe again.', constants_1.ERROR_CODES.BAD_REQUEST);
        }
        const updated = await author_account_repository_1.authorAccountRepository.updatePlatformSubscription(userId, {
            platformTier: account.platformTier,
            platformTierStatus: 'ACTIVE',
        });
        logger_1.logger.info({ userId: userId.toString(), tier: account.platformTier }, 'Platform subscription reactivated');
        return author_mapper_1.authorAccountMapper.toPlatformSubscriptionDTO(updated);
    },
};
//# sourceMappingURL=author-platform-sub.service.js.map