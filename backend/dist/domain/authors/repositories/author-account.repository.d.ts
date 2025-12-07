/**
 * Author Account Repository
 */
import type { RegisterAuthorInput, UpdateAuthorAccountInput, UpdatePlatformSubscriptionInput, FindAuthorsOptions, AuthorAccountWithUser } from '../types/author.types';
export declare const authorAccountRepository: {
    /**
     * Create a new author account
     */
    create(input: RegisterAuthorInput): Promise<{
        userId: bigint;
        createdAt: Date;
        updatedAt: Date;
        penName: string | null;
        tagline: string | null;
        fullBio: string | null;
        isVerified: boolean;
        verifiedAt: Date | null;
        verificationNote: string | null;
        platformTier: import("@prisma/client").$Enums.PlatformTier;
        platformTierStatus: import("@prisma/client").$Enums.PlatformSubscriptionStatus;
        platformTierStartedAt: Date | null;
        platformTierExpiresAt: Date | null;
        platformBillingCycle: import("@prisma/client").$Enums.BillingCycle | null;
        platformTrialEndsAt: Date | null;
        stripeCustomerId: string | null;
        razorpayCustomerId: string | null;
        xenditCustomerId: string | null;
        currentMonthRevenue: bigint;
        currentMonthUsageFee: bigint;
        currentMonthCurrency: string;
        lastUsageFeeInvoiceAt: Date | null;
        seriesCount: number;
        totalChapterCount: number;
        activeSubscriberCount: number;
        storageUsedBytes: bigint;
        bandwidthUsedBytes: bigint;
        emailBroadcastsThisMonth: number;
        aiTranslationWordsUsed: number;
        aiWritingTokensUsed: number;
        aiCoverGenerationsUsed: number;
        aiUsageResetAt: Date;
        referralCode: string | null;
        referralRewardMonths: number;
        acceptingCommissions: boolean;
        commissionInfo: string | null;
        commissionMinPrice: number | null;
        commissionMaxPrice: number | null;
        commissionCurrency: string;
    }>;
    /**
     * Find by user ID
     */
    findByUserId(userId: bigint): Promise<{
        userId: bigint;
        createdAt: Date;
        updatedAt: Date;
        penName: string | null;
        tagline: string | null;
        fullBio: string | null;
        isVerified: boolean;
        verifiedAt: Date | null;
        verificationNote: string | null;
        platformTier: import("@prisma/client").$Enums.PlatformTier;
        platformTierStatus: import("@prisma/client").$Enums.PlatformSubscriptionStatus;
        platformTierStartedAt: Date | null;
        platformTierExpiresAt: Date | null;
        platformBillingCycle: import("@prisma/client").$Enums.BillingCycle | null;
        platformTrialEndsAt: Date | null;
        stripeCustomerId: string | null;
        razorpayCustomerId: string | null;
        xenditCustomerId: string | null;
        currentMonthRevenue: bigint;
        currentMonthUsageFee: bigint;
        currentMonthCurrency: string;
        lastUsageFeeInvoiceAt: Date | null;
        seriesCount: number;
        totalChapterCount: number;
        activeSubscriberCount: number;
        storageUsedBytes: bigint;
        bandwidthUsedBytes: bigint;
        emailBroadcastsThisMonth: number;
        aiTranslationWordsUsed: number;
        aiWritingTokensUsed: number;
        aiCoverGenerationsUsed: number;
        aiUsageResetAt: Date;
        referralCode: string | null;
        referralRewardMonths: number;
        acceptingCommissions: boolean;
        commissionInfo: string | null;
        commissionMinPrice: number | null;
        commissionMaxPrice: number | null;
        commissionCurrency: string;
    } | null>;
    /**
     * Find by user ID with user data
     */
    findByUserIdWithUser(userId: bigint): Promise<AuthorAccountWithUser | null>;
    /**
     * Find by user public ID
     */
    findByUserPublicId(publicId: string): Promise<{
        userId: bigint;
        createdAt: Date;
        updatedAt: Date;
        penName: string | null;
        tagline: string | null;
        fullBio: string | null;
        isVerified: boolean;
        verifiedAt: Date | null;
        verificationNote: string | null;
        platformTier: import("@prisma/client").$Enums.PlatformTier;
        platformTierStatus: import("@prisma/client").$Enums.PlatformSubscriptionStatus;
        platformTierStartedAt: Date | null;
        platformTierExpiresAt: Date | null;
        platformBillingCycle: import("@prisma/client").$Enums.BillingCycle | null;
        platformTrialEndsAt: Date | null;
        stripeCustomerId: string | null;
        razorpayCustomerId: string | null;
        xenditCustomerId: string | null;
        currentMonthRevenue: bigint;
        currentMonthUsageFee: bigint;
        currentMonthCurrency: string;
        lastUsageFeeInvoiceAt: Date | null;
        seriesCount: number;
        totalChapterCount: number;
        activeSubscriberCount: number;
        storageUsedBytes: bigint;
        bandwidthUsedBytes: bigint;
        emailBroadcastsThisMonth: number;
        aiTranslationWordsUsed: number;
        aiWritingTokensUsed: number;
        aiCoverGenerationsUsed: number;
        aiUsageResetAt: Date;
        referralCode: string | null;
        referralRewardMonths: number;
        acceptingCommissions: boolean;
        commissionInfo: string | null;
        commissionMinPrice: number | null;
        commissionMaxPrice: number | null;
        commissionCurrency: string;
    } | null>;
    /**
     * Find by user public ID with user data
     */
    findByUserPublicIdWithUser(publicId: string): Promise<AuthorAccountWithUser | null>;
    /**
     * Check if user is an author
     */
    exists(userId: bigint): Promise<boolean>;
    /**
     * Update author account
     */
    update(userId: bigint, input: UpdateAuthorAccountInput): Promise<{
        userId: bigint;
        createdAt: Date;
        updatedAt: Date;
        penName: string | null;
        tagline: string | null;
        fullBio: string | null;
        isVerified: boolean;
        verifiedAt: Date | null;
        verificationNote: string | null;
        platformTier: import("@prisma/client").$Enums.PlatformTier;
        platformTierStatus: import("@prisma/client").$Enums.PlatformSubscriptionStatus;
        platformTierStartedAt: Date | null;
        platformTierExpiresAt: Date | null;
        platformBillingCycle: import("@prisma/client").$Enums.BillingCycle | null;
        platformTrialEndsAt: Date | null;
        stripeCustomerId: string | null;
        razorpayCustomerId: string | null;
        xenditCustomerId: string | null;
        currentMonthRevenue: bigint;
        currentMonthUsageFee: bigint;
        currentMonthCurrency: string;
        lastUsageFeeInvoiceAt: Date | null;
        seriesCount: number;
        totalChapterCount: number;
        activeSubscriberCount: number;
        storageUsedBytes: bigint;
        bandwidthUsedBytes: bigint;
        emailBroadcastsThisMonth: number;
        aiTranslationWordsUsed: number;
        aiWritingTokensUsed: number;
        aiCoverGenerationsUsed: number;
        aiUsageResetAt: Date;
        referralCode: string | null;
        referralRewardMonths: number;
        acceptingCommissions: boolean;
        commissionInfo: string | null;
        commissionMinPrice: number | null;
        commissionMaxPrice: number | null;
        commissionCurrency: string;
    }>;
    /**
     * Update platform subscription
     */
    updatePlatformSubscription(userId: bigint, input: UpdatePlatformSubscriptionInput): Promise<{
        userId: bigint;
        createdAt: Date;
        updatedAt: Date;
        penName: string | null;
        tagline: string | null;
        fullBio: string | null;
        isVerified: boolean;
        verifiedAt: Date | null;
        verificationNote: string | null;
        platformTier: import("@prisma/client").$Enums.PlatformTier;
        platformTierStatus: import("@prisma/client").$Enums.PlatformSubscriptionStatus;
        platformTierStartedAt: Date | null;
        platformTierExpiresAt: Date | null;
        platformBillingCycle: import("@prisma/client").$Enums.BillingCycle | null;
        platformTrialEndsAt: Date | null;
        stripeCustomerId: string | null;
        razorpayCustomerId: string | null;
        xenditCustomerId: string | null;
        currentMonthRevenue: bigint;
        currentMonthUsageFee: bigint;
        currentMonthCurrency: string;
        lastUsageFeeInvoiceAt: Date | null;
        seriesCount: number;
        totalChapterCount: number;
        activeSubscriberCount: number;
        storageUsedBytes: bigint;
        bandwidthUsedBytes: bigint;
        emailBroadcastsThisMonth: number;
        aiTranslationWordsUsed: number;
        aiWritingTokensUsed: number;
        aiCoverGenerationsUsed: number;
        aiUsageResetAt: Date;
        referralCode: string | null;
        referralRewardMonths: number;
        acceptingCommissions: boolean;
        commissionInfo: string | null;
        commissionMinPrice: number | null;
        commissionMaxPrice: number | null;
        commissionCurrency: string;
    }>;
    /**
     * Update verification status
     */
    updateVerification(userId: bigint, isVerified: boolean, note?: string): Promise<{
        userId: bigint;
        createdAt: Date;
        updatedAt: Date;
        penName: string | null;
        tagline: string | null;
        fullBio: string | null;
        isVerified: boolean;
        verifiedAt: Date | null;
        verificationNote: string | null;
        platformTier: import("@prisma/client").$Enums.PlatformTier;
        platformTierStatus: import("@prisma/client").$Enums.PlatformSubscriptionStatus;
        platformTierStartedAt: Date | null;
        platformTierExpiresAt: Date | null;
        platformBillingCycle: import("@prisma/client").$Enums.BillingCycle | null;
        platformTrialEndsAt: Date | null;
        stripeCustomerId: string | null;
        razorpayCustomerId: string | null;
        xenditCustomerId: string | null;
        currentMonthRevenue: bigint;
        currentMonthUsageFee: bigint;
        currentMonthCurrency: string;
        lastUsageFeeInvoiceAt: Date | null;
        seriesCount: number;
        totalChapterCount: number;
        activeSubscriberCount: number;
        storageUsedBytes: bigint;
        bandwidthUsedBytes: bigint;
        emailBroadcastsThisMonth: number;
        aiTranslationWordsUsed: number;
        aiWritingTokensUsed: number;
        aiCoverGenerationsUsed: number;
        aiUsageResetAt: Date;
        referralCode: string | null;
        referralRewardMonths: number;
        acceptingCommissions: boolean;
        commissionInfo: string | null;
        commissionMinPrice: number | null;
        commissionMaxPrice: number | null;
        commissionCurrency: string;
    }>;
    /**
     * Increment series count
     */
    incrementSeriesCount(userId: bigint, delta?: number): Promise<{
        userId: bigint;
        createdAt: Date;
        updatedAt: Date;
        penName: string | null;
        tagline: string | null;
        fullBio: string | null;
        isVerified: boolean;
        verifiedAt: Date | null;
        verificationNote: string | null;
        platformTier: import("@prisma/client").$Enums.PlatformTier;
        platformTierStatus: import("@prisma/client").$Enums.PlatformSubscriptionStatus;
        platformTierStartedAt: Date | null;
        platformTierExpiresAt: Date | null;
        platformBillingCycle: import("@prisma/client").$Enums.BillingCycle | null;
        platformTrialEndsAt: Date | null;
        stripeCustomerId: string | null;
        razorpayCustomerId: string | null;
        xenditCustomerId: string | null;
        currentMonthRevenue: bigint;
        currentMonthUsageFee: bigint;
        currentMonthCurrency: string;
        lastUsageFeeInvoiceAt: Date | null;
        seriesCount: number;
        totalChapterCount: number;
        activeSubscriberCount: number;
        storageUsedBytes: bigint;
        bandwidthUsedBytes: bigint;
        emailBroadcastsThisMonth: number;
        aiTranslationWordsUsed: number;
        aiWritingTokensUsed: number;
        aiCoverGenerationsUsed: number;
        aiUsageResetAt: Date;
        referralCode: string | null;
        referralRewardMonths: number;
        acceptingCommissions: boolean;
        commissionInfo: string | null;
        commissionMinPrice: number | null;
        commissionMaxPrice: number | null;
        commissionCurrency: string;
    }>;
    /**
     * Increment chapter count
     */
    incrementChapterCount(userId: bigint, delta?: number): Promise<{
        userId: bigint;
        createdAt: Date;
        updatedAt: Date;
        penName: string | null;
        tagline: string | null;
        fullBio: string | null;
        isVerified: boolean;
        verifiedAt: Date | null;
        verificationNote: string | null;
        platformTier: import("@prisma/client").$Enums.PlatformTier;
        platformTierStatus: import("@prisma/client").$Enums.PlatformSubscriptionStatus;
        platformTierStartedAt: Date | null;
        platformTierExpiresAt: Date | null;
        platformBillingCycle: import("@prisma/client").$Enums.BillingCycle | null;
        platformTrialEndsAt: Date | null;
        stripeCustomerId: string | null;
        razorpayCustomerId: string | null;
        xenditCustomerId: string | null;
        currentMonthRevenue: bigint;
        currentMonthUsageFee: bigint;
        currentMonthCurrency: string;
        lastUsageFeeInvoiceAt: Date | null;
        seriesCount: number;
        totalChapterCount: number;
        activeSubscriberCount: number;
        storageUsedBytes: bigint;
        bandwidthUsedBytes: bigint;
        emailBroadcastsThisMonth: number;
        aiTranslationWordsUsed: number;
        aiWritingTokensUsed: number;
        aiCoverGenerationsUsed: number;
        aiUsageResetAt: Date;
        referralCode: string | null;
        referralRewardMonths: number;
        acceptingCommissions: boolean;
        commissionInfo: string | null;
        commissionMinPrice: number | null;
        commissionMaxPrice: number | null;
        commissionCurrency: string;
    }>;
    /**
     * Update subscriber count
     */
    updateSubscriberCount(userId: bigint, count: number): Promise<{
        userId: bigint;
        createdAt: Date;
        updatedAt: Date;
        penName: string | null;
        tagline: string | null;
        fullBio: string | null;
        isVerified: boolean;
        verifiedAt: Date | null;
        verificationNote: string | null;
        platformTier: import("@prisma/client").$Enums.PlatformTier;
        platformTierStatus: import("@prisma/client").$Enums.PlatformSubscriptionStatus;
        platformTierStartedAt: Date | null;
        platformTierExpiresAt: Date | null;
        platformBillingCycle: import("@prisma/client").$Enums.BillingCycle | null;
        platformTrialEndsAt: Date | null;
        stripeCustomerId: string | null;
        razorpayCustomerId: string | null;
        xenditCustomerId: string | null;
        currentMonthRevenue: bigint;
        currentMonthUsageFee: bigint;
        currentMonthCurrency: string;
        lastUsageFeeInvoiceAt: Date | null;
        seriesCount: number;
        totalChapterCount: number;
        activeSubscriberCount: number;
        storageUsedBytes: bigint;
        bandwidthUsedBytes: bigint;
        emailBroadcastsThisMonth: number;
        aiTranslationWordsUsed: number;
        aiWritingTokensUsed: number;
        aiCoverGenerationsUsed: number;
        aiUsageResetAt: Date;
        referralCode: string | null;
        referralRewardMonths: number;
        acceptingCommissions: boolean;
        commissionInfo: string | null;
        commissionMinPrice: number | null;
        commissionMaxPrice: number | null;
        commissionCurrency: string;
    }>;
    /**
     * Find many authors with pagination
     */
    findMany(options?: FindAuthorsOptions): Promise<{
        accounts: ({
            user: {
                email: string;
                publicId: string;
                username: string;
                displayName: string;
            };
        } & {
            userId: bigint;
            createdAt: Date;
            updatedAt: Date;
            penName: string | null;
            tagline: string | null;
            fullBio: string | null;
            isVerified: boolean;
            verifiedAt: Date | null;
            verificationNote: string | null;
            platformTier: import("@prisma/client").$Enums.PlatformTier;
            platformTierStatus: import("@prisma/client").$Enums.PlatformSubscriptionStatus;
            platformTierStartedAt: Date | null;
            platformTierExpiresAt: Date | null;
            platformBillingCycle: import("@prisma/client").$Enums.BillingCycle | null;
            platformTrialEndsAt: Date | null;
            stripeCustomerId: string | null;
            razorpayCustomerId: string | null;
            xenditCustomerId: string | null;
            currentMonthRevenue: bigint;
            currentMonthUsageFee: bigint;
            currentMonthCurrency: string;
            lastUsageFeeInvoiceAt: Date | null;
            seriesCount: number;
            totalChapterCount: number;
            activeSubscriberCount: number;
            storageUsedBytes: bigint;
            bandwidthUsedBytes: bigint;
            emailBroadcastsThisMonth: number;
            aiTranslationWordsUsed: number;
            aiWritingTokensUsed: number;
            aiCoverGenerationsUsed: number;
            aiUsageResetAt: Date;
            referralCode: string | null;
            referralRewardMonths: number;
            acceptingCommissions: boolean;
            commissionInfo: string | null;
            commissionMinPrice: number | null;
            commissionMaxPrice: number | null;
            commissionCurrency: string;
        })[];
        total: number;
    }>;
    /**
     * Find by referral code
     */
    findByReferralCode(code: string): Promise<{
        userId: bigint;
        createdAt: Date;
        updatedAt: Date;
        penName: string | null;
        tagline: string | null;
        fullBio: string | null;
        isVerified: boolean;
        verifiedAt: Date | null;
        verificationNote: string | null;
        platformTier: import("@prisma/client").$Enums.PlatformTier;
        platformTierStatus: import("@prisma/client").$Enums.PlatformSubscriptionStatus;
        platformTierStartedAt: Date | null;
        platformTierExpiresAt: Date | null;
        platformBillingCycle: import("@prisma/client").$Enums.BillingCycle | null;
        platformTrialEndsAt: Date | null;
        stripeCustomerId: string | null;
        razorpayCustomerId: string | null;
        xenditCustomerId: string | null;
        currentMonthRevenue: bigint;
        currentMonthUsageFee: bigint;
        currentMonthCurrency: string;
        lastUsageFeeInvoiceAt: Date | null;
        seriesCount: number;
        totalChapterCount: number;
        activeSubscriberCount: number;
        storageUsedBytes: bigint;
        bandwidthUsedBytes: bigint;
        emailBroadcastsThisMonth: number;
        aiTranslationWordsUsed: number;
        aiWritingTokensUsed: number;
        aiCoverGenerationsUsed: number;
        aiUsageResetAt: Date;
        referralCode: string | null;
        referralRewardMonths: number;
        acceptingCommissions: boolean;
        commissionInfo: string | null;
        commissionMinPrice: number | null;
        commissionMaxPrice: number | null;
        commissionCurrency: string;
    } | null>;
    /**
     * Generate unique referral code
     */
    generateReferralCode(userId: bigint): Promise<string>;
};
export type AuthorAccountRepository = typeof authorAccountRepository;
//# sourceMappingURL=author-account.repository.d.ts.map