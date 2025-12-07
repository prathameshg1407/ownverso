"use strict";
// ==== FILE: src/api/v1/author/author.schema.ts ====
/**
 * Author Management Schemas
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGetAuthorResponseSchema = exports.AdminListAuthorsResponseSchema = exports.AdminUpdatePlatformTierRequestSchema = exports.AdminVerifyAuthorRequestSchema = exports.AdminAuthorQuerySchema = exports.AdminAuthorDetailSchema = exports.AdminAuthorSummarySchema = exports.MessageResponseSchema = exports.ListPlatformPlansResponseSchema = exports.GetPlatformSubscriptionResponseSchema = exports.GetAuthorStatsResponseSchema = exports.GetAuthorDashboardResponseSchema = exports.UpdateAuthorAccountResponseSchema = exports.GetAuthorAccountResponseSchema = exports.RegisterAuthorResponseSchema = exports.ChangePlatformPlanRequestSchema = exports.SubscribePlatformRequestSchema = exports.UpdateAuthorAccountRequestSchema = exports.RegisterAuthorRequestSchema = exports.PlatformPlanSchema = exports.PlatformPlanLimitsSchema = exports.AuthorDashboardSchema = exports.AuthorActivitySchema = exports.AuthorStatsSchema = exports.PlatformSubscriptionSchema = exports.AuthorAccountSchema = exports.NullableDateTimeSchema = exports.DateTimeSchema = exports.NullableStringSchema = exports.BillingCycleSchema = exports.PlatformSubscriptionStatusSchema = exports.PlatformTierSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const response_schema_1 = require("../../../schemas/common/response.schema");
// ─────────────────────────────────────────────────────────────────────────
// Enum Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.PlatformTierSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('FREE'),
    typebox_1.Type.Literal('STARTER'),
    typebox_1.Type.Literal('GROWTH'),
    typebox_1.Type.Literal('PROFESSIONAL'),
    typebox_1.Type.Literal('ENTERPRISE'),
]);
exports.PlatformSubscriptionStatusSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('ACTIVE'),
    typebox_1.Type.Literal('TRIALING'),
    typebox_1.Type.Literal('PAST_DUE'),
    typebox_1.Type.Literal('CANCELLED'),
    typebox_1.Type.Literal('SUSPENDED'),
    typebox_1.Type.Literal('EXPIRED'),
]);
exports.BillingCycleSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('MONTHLY'),
    typebox_1.Type.Literal('YEARLY'),
]);
// ─────────────────────────────────────────────────────────────────────────
// Base Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.NullableStringSchema = typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]);
exports.DateTimeSchema = typebox_1.Type.String({ format: 'date-time' });
exports.NullableDateTimeSchema = typebox_1.Type.Union([exports.DateTimeSchema, typebox_1.Type.Null()]);
// ─────────────────────────────────────────────────────────────────────────
// Author Account Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.AuthorAccountSchema = typebox_1.Type.Object({
    penName: exports.NullableStringSchema,
    tagline: exports.NullableStringSchema,
    fullBio: exports.NullableStringSchema,
    isVerified: typebox_1.Type.Boolean(),
    verifiedAt: exports.NullableDateTimeSchema,
    platformTier: exports.PlatformTierSchema,
    platformTierStatus: exports.PlatformSubscriptionStatusSchema,
    platformTierExpiresAt: exports.NullableDateTimeSchema,
    platformTrialEndsAt: exports.NullableDateTimeSchema,
    seriesCount: typebox_1.Type.Integer(),
    totalChapterCount: typebox_1.Type.Integer(),
    activeSubscriberCount: typebox_1.Type.Integer(),
    storageUsedBytes: typebox_1.Type.String(), // BigInt as string
    acceptingCommissions: typebox_1.Type.Boolean(),
    commissionInfo: exports.NullableStringSchema,
    commissionMinPrice: typebox_1.Type.Union([typebox_1.Type.Integer(), typebox_1.Type.Null()]),
    commissionMaxPrice: typebox_1.Type.Union([typebox_1.Type.Integer(), typebox_1.Type.Null()]),
    commissionCurrency: typebox_1.Type.String(),
    createdAt: exports.DateTimeSchema,
});
exports.PlatformSubscriptionSchema = typebox_1.Type.Object({
    tier: exports.PlatformTierSchema,
    status: exports.PlatformSubscriptionStatusSchema,
    billingCycle: typebox_1.Type.Union([exports.BillingCycleSchema, typebox_1.Type.Null()]),
    startedAt: exports.NullableDateTimeSchema,
    expiresAt: exports.NullableDateTimeSchema,
    trialEndsAt: exports.NullableDateTimeSchema,
    currentMonthRevenue: typebox_1.Type.String(),
    currentMonthUsageFee: typebox_1.Type.String(),
    currentMonthCurrency: typebox_1.Type.String(),
});
exports.AuthorStatsSchema = typebox_1.Type.Object({
    totalRevenue: typebox_1.Type.Number(),
    totalRevenueCurrency: typebox_1.Type.String(),
    monthlyRevenue: typebox_1.Type.Number(),
    subscriberCount: typebox_1.Type.Integer(),
    subscriberGrowth: typebox_1.Type.Number(),
    seriesCount: typebox_1.Type.Integer(),
    chapterCount: typebox_1.Type.Integer(),
    totalViews: typebox_1.Type.Integer(),
    viewsGrowth: typebox_1.Type.Number(),
});
exports.AuthorActivitySchema = typebox_1.Type.Object({
    type: typebox_1.Type.String(),
    title: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    timestamp: exports.DateTimeSchema,
    metadata: typebox_1.Type.Optional(typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Unknown())),
});
exports.AuthorDashboardSchema = typebox_1.Type.Object({
    account: exports.AuthorAccountSchema,
    stats: exports.AuthorStatsSchema,
    recentActivity: typebox_1.Type.Array(exports.AuthorActivitySchema),
    platformSubscription: exports.PlatformSubscriptionSchema,
});
exports.PlatformPlanLimitsSchema = typebox_1.Type.Object({
    maxSeries: typebox_1.Type.Union([typebox_1.Type.Integer(), typebox_1.Type.Null()]),
    maxChaptersPerSeries: typebox_1.Type.Union([typebox_1.Type.Integer(), typebox_1.Type.Null()]),
    maxStorageBytes: typebox_1.Type.Integer(),
    maxBandwidthBytes: typebox_1.Type.Integer(),
    maxEmailBroadcasts: typebox_1.Type.Integer(),
    aiTranslationWords: typebox_1.Type.Integer(),
    aiWritingTokens: typebox_1.Type.Integer(),
    aiCoverGenerations: typebox_1.Type.Integer(),
    customDomain: typebox_1.Type.Boolean(),
    advancedAnalytics: typebox_1.Type.Boolean(),
    prioritySupport: typebox_1.Type.Boolean(),
});
exports.PlatformPlanSchema = typebox_1.Type.Object({
    tier: exports.PlatformTierSchema,
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    monthlyPrice: typebox_1.Type.Number(),
    yearlyPrice: typebox_1.Type.Number(),
    currency: typebox_1.Type.String(),
    features: typebox_1.Type.Array(typebox_1.Type.String()),
    limits: exports.PlatformPlanLimitsSchema,
    isPopular: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
// ─────────────────────────────────────────────────────────────────────────
// Request Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.RegisterAuthorRequestSchema = typebox_1.Type.Object({
    penName: typebox_1.Type.Optional(typebox_1.Type.String({ minLength: 1, maxLength: 100 })),
    tagline: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 200 })),
    fullBio: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 5000 })),
});
exports.UpdateAuthorAccountRequestSchema = typebox_1.Type.Object({
    penName: typebox_1.Type.Optional(typebox_1.Type.String({ minLength: 1, maxLength: 100 })),
    tagline: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 200 })),
    fullBio: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 5000 })),
    acceptingCommissions: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    commissionInfo: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 2000 })),
    commissionMinPrice: typebox_1.Type.Optional(typebox_1.Type.Integer({ minimum: 0 })),
    commissionMaxPrice: typebox_1.Type.Optional(typebox_1.Type.Integer({ minimum: 0 })),
    commissionCurrency: typebox_1.Type.Optional(typebox_1.Type.String({ minLength: 3, maxLength: 3 })),
});
exports.SubscribePlatformRequestSchema = typebox_1.Type.Object({
    tier: exports.PlatformTierSchema,
    billingCycle: exports.BillingCycleSchema,
    paymentMethodId: typebox_1.Type.Optional(typebox_1.Type.String()),
});
exports.ChangePlatformPlanRequestSchema = typebox_1.Type.Object({
    tier: exports.PlatformTierSchema,
});
// ─────────────────────────────────────────────────────────────────────────
// Response Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.RegisterAuthorResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({
    account: exports.AuthorAccountSchema,
}));
exports.GetAuthorAccountResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({
    account: exports.AuthorAccountSchema,
}));
exports.UpdateAuthorAccountResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({
    account: exports.AuthorAccountSchema,
}));
exports.GetAuthorDashboardResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({
    dashboard: exports.AuthorDashboardSchema,
}));
exports.GetAuthorStatsResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({
    stats: exports.AuthorStatsSchema,
}));
exports.GetPlatformSubscriptionResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({
    subscription: exports.PlatformSubscriptionSchema,
}));
exports.ListPlatformPlansResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({
    plans: typebox_1.Type.Array(exports.PlatformPlanSchema),
}));
exports.MessageResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({
    message: typebox_1.Type.String(),
}));
// ─────────────────────────────────────────────────────────────────────────
// Admin Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.AdminAuthorSummarySchema = typebox_1.Type.Object({
    userId: typebox_1.Type.String(),
    publicId: typebox_1.Type.String(),
    email: typebox_1.Type.String(),
    username: typebox_1.Type.String(),
    penName: exports.NullableStringSchema,
    isVerified: typebox_1.Type.Boolean(),
    platformTier: exports.PlatformTierSchema,
    platformTierStatus: exports.PlatformSubscriptionStatusSchema,
    seriesCount: typebox_1.Type.Integer(),
    activeSubscriberCount: typebox_1.Type.Integer(),
    createdAt: exports.DateTimeSchema,
});
exports.AdminAuthorDetailSchema = typebox_1.Type.Intersect([
    exports.AuthorAccountSchema,
    typebox_1.Type.Object({
        userId: typebox_1.Type.String(),
        publicId: typebox_1.Type.String(),
        email: typebox_1.Type.String(),
        username: typebox_1.Type.String(),
        displayName: typebox_1.Type.String(),
        verificationNote: exports.NullableStringSchema,
        stripeCustomerId: exports.NullableStringSchema,
        razorpayCustomerId: exports.NullableStringSchema,
        xenditCustomerId: exports.NullableStringSchema,
        currentMonthRevenue: typebox_1.Type.String(),
        currentMonthUsageFee: typebox_1.Type.String(),
        aiTranslationWordsUsed: typebox_1.Type.Integer(),
        aiWritingTokensUsed: typebox_1.Type.Integer(),
        aiCoverGenerationsUsed: typebox_1.Type.Integer(),
        referralCode: exports.NullableStringSchema,
        referralRewardMonths: typebox_1.Type.Integer(),
    }),
]);
exports.AdminAuthorQuerySchema = typebox_1.Type.Object({
    page: typebox_1.Type.Optional(typebox_1.Type.Integer({ minimum: 1, default: 1 })),
    limit: typebox_1.Type.Optional(typebox_1.Type.Integer({ minimum: 1, maximum: 100, default: 20 })),
    search: typebox_1.Type.Optional(typebox_1.Type.String()),
    platformTier: typebox_1.Type.Optional(exports.PlatformTierSchema),
    platformTierStatus: typebox_1.Type.Optional(exports.PlatformSubscriptionStatusSchema),
    isVerified: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    sortBy: typebox_1.Type.Optional(typebox_1.Type.String()),
    sortOrder: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Literal('asc'), typebox_1.Type.Literal('desc')])),
});
exports.AdminVerifyAuthorRequestSchema = typebox_1.Type.Object({
    isVerified: typebox_1.Type.Boolean(),
    note: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 500 })),
});
exports.AdminUpdatePlatformTierRequestSchema = typebox_1.Type.Object({
    tier: exports.PlatformTierSchema,
    status: typebox_1.Type.Optional(exports.PlatformSubscriptionStatusSchema),
    reason: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 500 })),
});
// Admin Response Schemas
exports.AdminListAuthorsResponseSchema = typebox_1.Type.Object({
    success: typebox_1.Type.Literal(true),
    data: typebox_1.Type.Array(exports.AdminAuthorSummarySchema),
    meta: typebox_1.Type.Object({
        page: typebox_1.Type.Integer(),
        limit: typebox_1.Type.Integer(),
        total: typebox_1.Type.Integer(),
        totalPages: typebox_1.Type.Integer(),
        hasNext: typebox_1.Type.Boolean(),
        hasPrev: typebox_1.Type.Boolean(),
    }),
    timestamp: exports.DateTimeSchema,
    requestId: typebox_1.Type.Optional(typebox_1.Type.String()),
});
exports.AdminGetAuthorResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({
    author: exports.AdminAuthorDetailSchema,
}));
//# sourceMappingURL=author.schema.js.map