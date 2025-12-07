/**
 * Author Management Schemas
 */
import { Static } from '@sinclair/typebox';
export declare const PlatformTierSchema: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
export declare const PlatformSubscriptionStatusSchema: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
export declare const BillingCycleSchema: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"MONTHLY">, import("@sinclair/typebox").TLiteral<"YEARLY">]>;
export declare const NullableStringSchema: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
export declare const DateTimeSchema: import("@sinclair/typebox").TString;
export declare const NullableDateTimeSchema: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
export declare const AuthorAccountSchema: import("@sinclair/typebox").TObject<{
    penName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    fullBio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    isVerified: import("@sinclair/typebox").TBoolean;
    verifiedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    platformTier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
    platformTierStatus: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
    platformTierExpiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    platformTrialEndsAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    seriesCount: import("@sinclair/typebox").TInteger;
    totalChapterCount: import("@sinclair/typebox").TInteger;
    activeSubscriberCount: import("@sinclair/typebox").TInteger;
    storageUsedBytes: import("@sinclair/typebox").TString;
    acceptingCommissions: import("@sinclair/typebox").TBoolean;
    commissionInfo: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    commissionMinPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
    commissionMaxPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
    commissionCurrency: import("@sinclair/typebox").TString;
    createdAt: import("@sinclair/typebox").TString;
}>;
export declare const PlatformSubscriptionSchema: import("@sinclair/typebox").TObject<{
    tier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
    status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
    billingCycle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"MONTHLY">, import("@sinclair/typebox").TLiteral<"YEARLY">]>, import("@sinclair/typebox").TNull]>;
    startedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    expiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    trialEndsAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    currentMonthRevenue: import("@sinclair/typebox").TString;
    currentMonthUsageFee: import("@sinclair/typebox").TString;
    currentMonthCurrency: import("@sinclair/typebox").TString;
}>;
export declare const AuthorStatsSchema: import("@sinclair/typebox").TObject<{
    totalRevenue: import("@sinclair/typebox").TNumber;
    totalRevenueCurrency: import("@sinclair/typebox").TString;
    monthlyRevenue: import("@sinclair/typebox").TNumber;
    subscriberCount: import("@sinclair/typebox").TInteger;
    subscriberGrowth: import("@sinclair/typebox").TNumber;
    seriesCount: import("@sinclair/typebox").TInteger;
    chapterCount: import("@sinclair/typebox").TInteger;
    totalViews: import("@sinclair/typebox").TInteger;
    viewsGrowth: import("@sinclair/typebox").TNumber;
}>;
export declare const AuthorActivitySchema: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TString;
    title: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TString;
    timestamp: import("@sinclair/typebox").TString;
    metadata: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TUnknown>>;
}>;
export declare const AuthorDashboardSchema: import("@sinclair/typebox").TObject<{
    account: import("@sinclair/typebox").TObject<{
        penName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        fullBio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        isVerified: import("@sinclair/typebox").TBoolean;
        verifiedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        platformTier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
        platformTierStatus: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
        platformTierExpiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        platformTrialEndsAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        seriesCount: import("@sinclair/typebox").TInteger;
        totalChapterCount: import("@sinclair/typebox").TInteger;
        activeSubscriberCount: import("@sinclair/typebox").TInteger;
        storageUsedBytes: import("@sinclair/typebox").TString;
        acceptingCommissions: import("@sinclair/typebox").TBoolean;
        commissionInfo: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        commissionMinPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
        commissionMaxPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
        commissionCurrency: import("@sinclair/typebox").TString;
        createdAt: import("@sinclair/typebox").TString;
    }>;
    stats: import("@sinclair/typebox").TObject<{
        totalRevenue: import("@sinclair/typebox").TNumber;
        totalRevenueCurrency: import("@sinclair/typebox").TString;
        monthlyRevenue: import("@sinclair/typebox").TNumber;
        subscriberCount: import("@sinclair/typebox").TInteger;
        subscriberGrowth: import("@sinclair/typebox").TNumber;
        seriesCount: import("@sinclair/typebox").TInteger;
        chapterCount: import("@sinclair/typebox").TInteger;
        totalViews: import("@sinclair/typebox").TInteger;
        viewsGrowth: import("@sinclair/typebox").TNumber;
    }>;
    recentActivity: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        type: import("@sinclair/typebox").TString;
        title: import("@sinclair/typebox").TString;
        description: import("@sinclair/typebox").TString;
        timestamp: import("@sinclair/typebox").TString;
        metadata: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TUnknown>>;
    }>>;
    platformSubscription: import("@sinclair/typebox").TObject<{
        tier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
        status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
        billingCycle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"MONTHLY">, import("@sinclair/typebox").TLiteral<"YEARLY">]>, import("@sinclair/typebox").TNull]>;
        startedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        expiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        trialEndsAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        currentMonthRevenue: import("@sinclair/typebox").TString;
        currentMonthUsageFee: import("@sinclair/typebox").TString;
        currentMonthCurrency: import("@sinclair/typebox").TString;
    }>;
}>;
export declare const PlatformPlanLimitsSchema: import("@sinclair/typebox").TObject<{
    maxSeries: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
    maxChaptersPerSeries: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
    maxStorageBytes: import("@sinclair/typebox").TInteger;
    maxBandwidthBytes: import("@sinclair/typebox").TInteger;
    maxEmailBroadcasts: import("@sinclair/typebox").TInteger;
    aiTranslationWords: import("@sinclair/typebox").TInteger;
    aiWritingTokens: import("@sinclair/typebox").TInteger;
    aiCoverGenerations: import("@sinclair/typebox").TInteger;
    customDomain: import("@sinclair/typebox").TBoolean;
    advancedAnalytics: import("@sinclair/typebox").TBoolean;
    prioritySupport: import("@sinclair/typebox").TBoolean;
}>;
export declare const PlatformPlanSchema: import("@sinclair/typebox").TObject<{
    tier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
    name: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TString;
    monthlyPrice: import("@sinclair/typebox").TNumber;
    yearlyPrice: import("@sinclair/typebox").TNumber;
    currency: import("@sinclair/typebox").TString;
    features: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    limits: import("@sinclair/typebox").TObject<{
        maxSeries: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
        maxChaptersPerSeries: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
        maxStorageBytes: import("@sinclair/typebox").TInteger;
        maxBandwidthBytes: import("@sinclair/typebox").TInteger;
        maxEmailBroadcasts: import("@sinclair/typebox").TInteger;
        aiTranslationWords: import("@sinclair/typebox").TInteger;
        aiWritingTokens: import("@sinclair/typebox").TInteger;
        aiCoverGenerations: import("@sinclair/typebox").TInteger;
        customDomain: import("@sinclair/typebox").TBoolean;
        advancedAnalytics: import("@sinclair/typebox").TBoolean;
        prioritySupport: import("@sinclair/typebox").TBoolean;
    }>;
    isPopular: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export declare const RegisterAuthorRequestSchema: import("@sinclair/typebox").TObject<{
    penName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    tagline: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    fullBio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type RegisterAuthorRequest = Static<typeof RegisterAuthorRequestSchema>;
export declare const UpdateAuthorAccountRequestSchema: import("@sinclair/typebox").TObject<{
    penName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    tagline: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    fullBio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    acceptingCommissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    commissionInfo: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    commissionMinPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    commissionMaxPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    commissionCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type UpdateAuthorAccountRequest = Static<typeof UpdateAuthorAccountRequestSchema>;
export declare const SubscribePlatformRequestSchema: import("@sinclair/typebox").TObject<{
    tier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
    billingCycle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"MONTHLY">, import("@sinclair/typebox").TLiteral<"YEARLY">]>;
    paymentMethodId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type SubscribePlatformRequest = Static<typeof SubscribePlatformRequestSchema>;
export declare const ChangePlatformPlanRequestSchema: import("@sinclair/typebox").TObject<{
    tier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
}>;
export type ChangePlatformPlanRequest = Static<typeof ChangePlatformPlanRequestSchema>;
export declare const RegisterAuthorResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        account: import("@sinclair/typebox").TObject<{
            penName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            fullBio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            isVerified: import("@sinclair/typebox").TBoolean;
            verifiedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            platformTier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
            platformTierStatus: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
            platformTierExpiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            platformTrialEndsAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            seriesCount: import("@sinclair/typebox").TInteger;
            totalChapterCount: import("@sinclair/typebox").TInteger;
            activeSubscriberCount: import("@sinclair/typebox").TInteger;
            storageUsedBytes: import("@sinclair/typebox").TString;
            acceptingCommissions: import("@sinclair/typebox").TBoolean;
            commissionInfo: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            commissionMinPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
            commissionMaxPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
            commissionCurrency: import("@sinclair/typebox").TString;
            createdAt: import("@sinclair/typebox").TString;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type RegisterAuthorResponse = Static<typeof RegisterAuthorResponseSchema>;
export declare const GetAuthorAccountResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        account: import("@sinclair/typebox").TObject<{
            penName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            fullBio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            isVerified: import("@sinclair/typebox").TBoolean;
            verifiedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            platformTier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
            platformTierStatus: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
            platformTierExpiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            platformTrialEndsAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            seriesCount: import("@sinclair/typebox").TInteger;
            totalChapterCount: import("@sinclair/typebox").TInteger;
            activeSubscriberCount: import("@sinclair/typebox").TInteger;
            storageUsedBytes: import("@sinclair/typebox").TString;
            acceptingCommissions: import("@sinclair/typebox").TBoolean;
            commissionInfo: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            commissionMinPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
            commissionMaxPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
            commissionCurrency: import("@sinclair/typebox").TString;
            createdAt: import("@sinclair/typebox").TString;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type GetAuthorAccountResponse = Static<typeof GetAuthorAccountResponseSchema>;
export declare const UpdateAuthorAccountResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        account: import("@sinclair/typebox").TObject<{
            penName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            fullBio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            isVerified: import("@sinclair/typebox").TBoolean;
            verifiedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            platformTier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
            platformTierStatus: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
            platformTierExpiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            platformTrialEndsAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            seriesCount: import("@sinclair/typebox").TInteger;
            totalChapterCount: import("@sinclair/typebox").TInteger;
            activeSubscriberCount: import("@sinclair/typebox").TInteger;
            storageUsedBytes: import("@sinclair/typebox").TString;
            acceptingCommissions: import("@sinclair/typebox").TBoolean;
            commissionInfo: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            commissionMinPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
            commissionMaxPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
            commissionCurrency: import("@sinclair/typebox").TString;
            createdAt: import("@sinclair/typebox").TString;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type UpdateAuthorAccountResponse = Static<typeof UpdateAuthorAccountResponseSchema>;
export declare const GetAuthorDashboardResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        dashboard: import("@sinclair/typebox").TObject<{
            account: import("@sinclair/typebox").TObject<{
                penName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                fullBio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                isVerified: import("@sinclair/typebox").TBoolean;
                verifiedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                platformTier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
                platformTierStatus: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
                platformTierExpiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                platformTrialEndsAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                seriesCount: import("@sinclair/typebox").TInteger;
                totalChapterCount: import("@sinclair/typebox").TInteger;
                activeSubscriberCount: import("@sinclair/typebox").TInteger;
                storageUsedBytes: import("@sinclair/typebox").TString;
                acceptingCommissions: import("@sinclair/typebox").TBoolean;
                commissionInfo: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                commissionMinPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
                commissionMaxPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
                commissionCurrency: import("@sinclair/typebox").TString;
                createdAt: import("@sinclair/typebox").TString;
            }>;
            stats: import("@sinclair/typebox").TObject<{
                totalRevenue: import("@sinclair/typebox").TNumber;
                totalRevenueCurrency: import("@sinclair/typebox").TString;
                monthlyRevenue: import("@sinclair/typebox").TNumber;
                subscriberCount: import("@sinclair/typebox").TInteger;
                subscriberGrowth: import("@sinclair/typebox").TNumber;
                seriesCount: import("@sinclair/typebox").TInteger;
                chapterCount: import("@sinclair/typebox").TInteger;
                totalViews: import("@sinclair/typebox").TInteger;
                viewsGrowth: import("@sinclair/typebox").TNumber;
            }>;
            recentActivity: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                type: import("@sinclair/typebox").TString;
                title: import("@sinclair/typebox").TString;
                description: import("@sinclair/typebox").TString;
                timestamp: import("@sinclair/typebox").TString;
                metadata: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TUnknown>>;
            }>>;
            platformSubscription: import("@sinclair/typebox").TObject<{
                tier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
                status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
                billingCycle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"MONTHLY">, import("@sinclair/typebox").TLiteral<"YEARLY">]>, import("@sinclair/typebox").TNull]>;
                startedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                expiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                trialEndsAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                currentMonthRevenue: import("@sinclair/typebox").TString;
                currentMonthUsageFee: import("@sinclair/typebox").TString;
                currentMonthCurrency: import("@sinclair/typebox").TString;
            }>;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type GetAuthorDashboardResponse = Static<typeof GetAuthorDashboardResponseSchema>;
export declare const GetAuthorStatsResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        stats: import("@sinclair/typebox").TObject<{
            totalRevenue: import("@sinclair/typebox").TNumber;
            totalRevenueCurrency: import("@sinclair/typebox").TString;
            monthlyRevenue: import("@sinclair/typebox").TNumber;
            subscriberCount: import("@sinclair/typebox").TInteger;
            subscriberGrowth: import("@sinclair/typebox").TNumber;
            seriesCount: import("@sinclair/typebox").TInteger;
            chapterCount: import("@sinclair/typebox").TInteger;
            totalViews: import("@sinclair/typebox").TInteger;
            viewsGrowth: import("@sinclair/typebox").TNumber;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type GetAuthorStatsResponse = Static<typeof GetAuthorStatsResponseSchema>;
export declare const GetPlatformSubscriptionResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        subscription: import("@sinclair/typebox").TObject<{
            tier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
            status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
            billingCycle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"MONTHLY">, import("@sinclair/typebox").TLiteral<"YEARLY">]>, import("@sinclair/typebox").TNull]>;
            startedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            expiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            trialEndsAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            currentMonthRevenue: import("@sinclair/typebox").TString;
            currentMonthUsageFee: import("@sinclair/typebox").TString;
            currentMonthCurrency: import("@sinclair/typebox").TString;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type GetPlatformSubscriptionResponse = Static<typeof GetPlatformSubscriptionResponseSchema>;
export declare const ListPlatformPlansResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        plans: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            tier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
            name: import("@sinclair/typebox").TString;
            description: import("@sinclair/typebox").TString;
            monthlyPrice: import("@sinclair/typebox").TNumber;
            yearlyPrice: import("@sinclair/typebox").TNumber;
            currency: import("@sinclair/typebox").TString;
            features: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            limits: import("@sinclair/typebox").TObject<{
                maxSeries: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
                maxChaptersPerSeries: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
                maxStorageBytes: import("@sinclair/typebox").TInteger;
                maxBandwidthBytes: import("@sinclair/typebox").TInteger;
                maxEmailBroadcasts: import("@sinclair/typebox").TInteger;
                aiTranslationWords: import("@sinclair/typebox").TInteger;
                aiWritingTokens: import("@sinclair/typebox").TInteger;
                aiCoverGenerations: import("@sinclair/typebox").TInteger;
                customDomain: import("@sinclair/typebox").TBoolean;
                advancedAnalytics: import("@sinclair/typebox").TBoolean;
                prioritySupport: import("@sinclair/typebox").TBoolean;
            }>;
            isPopular: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        }>>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ListPlatformPlansResponse = Static<typeof ListPlatformPlansResponseSchema>;
export declare const MessageResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        message: import("@sinclair/typebox").TString;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type MessageResponse = Static<typeof MessageResponseSchema>;
export declare const AdminAuthorSummarySchema: import("@sinclair/typebox").TObject<{
    userId: import("@sinclair/typebox").TString;
    publicId: import("@sinclair/typebox").TString;
    email: import("@sinclair/typebox").TString;
    username: import("@sinclair/typebox").TString;
    penName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    isVerified: import("@sinclair/typebox").TBoolean;
    platformTier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
    platformTierStatus: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
    seriesCount: import("@sinclair/typebox").TInteger;
    activeSubscriberCount: import("@sinclair/typebox").TInteger;
    createdAt: import("@sinclair/typebox").TString;
}>;
export declare const AdminAuthorDetailSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    penName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    fullBio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    isVerified: import("@sinclair/typebox").TBoolean;
    verifiedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    platformTier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
    platformTierStatus: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
    platformTierExpiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    platformTrialEndsAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    seriesCount: import("@sinclair/typebox").TInteger;
    totalChapterCount: import("@sinclair/typebox").TInteger;
    activeSubscriberCount: import("@sinclair/typebox").TInteger;
    storageUsedBytes: import("@sinclair/typebox").TString;
    acceptingCommissions: import("@sinclair/typebox").TBoolean;
    commissionInfo: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    commissionMinPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
    commissionMaxPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
    commissionCurrency: import("@sinclair/typebox").TString;
    createdAt: import("@sinclair/typebox").TString;
}>, import("@sinclair/typebox").TObject<{
    userId: import("@sinclair/typebox").TString;
    publicId: import("@sinclair/typebox").TString;
    email: import("@sinclair/typebox").TString;
    username: import("@sinclair/typebox").TString;
    displayName: import("@sinclair/typebox").TString;
    verificationNote: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    stripeCustomerId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    razorpayCustomerId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    xenditCustomerId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    currentMonthRevenue: import("@sinclair/typebox").TString;
    currentMonthUsageFee: import("@sinclair/typebox").TString;
    aiTranslationWordsUsed: import("@sinclair/typebox").TInteger;
    aiWritingTokensUsed: import("@sinclair/typebox").TInteger;
    aiCoverGenerationsUsed: import("@sinclair/typebox").TInteger;
    referralCode: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    referralRewardMonths: import("@sinclair/typebox").TInteger;
}>]>;
export declare const AdminAuthorQuerySchema: import("@sinclair/typebox").TObject<{
    page: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    search: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    platformTier: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>>;
    platformTierStatus: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>>;
    isVerified: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    sortBy: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sortOrder: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"asc">, import("@sinclair/typebox").TLiteral<"desc">]>>;
}>;
export type AdminAuthorQuery = Static<typeof AdminAuthorQuerySchema>;
export declare const AdminVerifyAuthorRequestSchema: import("@sinclair/typebox").TObject<{
    isVerified: import("@sinclair/typebox").TBoolean;
    note: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type AdminVerifyAuthorRequest = Static<typeof AdminVerifyAuthorRequestSchema>;
export declare const AdminUpdatePlatformTierRequestSchema: import("@sinclair/typebox").TObject<{
    tier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
    status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>>;
    reason: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type AdminUpdatePlatformTierRequest = Static<typeof AdminUpdatePlatformTierRequestSchema>;
export declare const AdminListAuthorsResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        userId: import("@sinclair/typebox").TString;
        publicId: import("@sinclair/typebox").TString;
        email: import("@sinclair/typebox").TString;
        username: import("@sinclair/typebox").TString;
        penName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        isVerified: import("@sinclair/typebox").TBoolean;
        platformTier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
        platformTierStatus: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
        seriesCount: import("@sinclair/typebox").TInteger;
        activeSubscriberCount: import("@sinclair/typebox").TInteger;
        createdAt: import("@sinclair/typebox").TString;
    }>>;
    meta: import("@sinclair/typebox").TObject<{
        page: import("@sinclair/typebox").TInteger;
        limit: import("@sinclair/typebox").TInteger;
        total: import("@sinclair/typebox").TInteger;
        totalPages: import("@sinclair/typebox").TInteger;
        hasNext: import("@sinclair/typebox").TBoolean;
        hasPrev: import("@sinclair/typebox").TBoolean;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type AdminListAuthorsResponse = Static<typeof AdminListAuthorsResponseSchema>;
export declare const AdminGetAuthorResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        author: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            penName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            fullBio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            isVerified: import("@sinclair/typebox").TBoolean;
            verifiedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            platformTier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
            platformTierStatus: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"TRIALING">, import("@sinclair/typebox").TLiteral<"PAST_DUE">, import("@sinclair/typebox").TLiteral<"CANCELLED">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"EXPIRED">]>;
            platformTierExpiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            platformTrialEndsAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            seriesCount: import("@sinclair/typebox").TInteger;
            totalChapterCount: import("@sinclair/typebox").TInteger;
            activeSubscriberCount: import("@sinclair/typebox").TInteger;
            storageUsedBytes: import("@sinclair/typebox").TString;
            acceptingCommissions: import("@sinclair/typebox").TBoolean;
            commissionInfo: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            commissionMinPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
            commissionMaxPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TInteger, import("@sinclair/typebox").TNull]>;
            commissionCurrency: import("@sinclair/typebox").TString;
            createdAt: import("@sinclair/typebox").TString;
        }>, import("@sinclair/typebox").TObject<{
            userId: import("@sinclair/typebox").TString;
            publicId: import("@sinclair/typebox").TString;
            email: import("@sinclair/typebox").TString;
            username: import("@sinclair/typebox").TString;
            displayName: import("@sinclair/typebox").TString;
            verificationNote: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            stripeCustomerId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            razorpayCustomerId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            xenditCustomerId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            currentMonthRevenue: import("@sinclair/typebox").TString;
            currentMonthUsageFee: import("@sinclair/typebox").TString;
            aiTranslationWordsUsed: import("@sinclair/typebox").TInteger;
            aiWritingTokensUsed: import("@sinclair/typebox").TInteger;
            aiCoverGenerationsUsed: import("@sinclair/typebox").TInteger;
            referralCode: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            referralRewardMonths: import("@sinclair/typebox").TInteger;
        }>]>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type AdminGetAuthorResponse = Static<typeof AdminGetAuthorResponseSchema>;
//# sourceMappingURL=author.schema.d.ts.map