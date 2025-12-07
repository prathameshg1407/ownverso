// ==== FILE: src/api/v1/author/author.schema.ts ====
/**
 * Author Management Schemas
 */

import { Type, Static } from '@sinclair/typebox';
import { createSuccessResponseSchema } from '@/schemas/common/response.schema';

// ─────────────────────────────────────────────────────────────────────────
// Enum Schemas
// ─────────────────────────────────────────────────────────────────────────

export const PlatformTierSchema = Type.Union([
  Type.Literal('FREE'),
  Type.Literal('STARTER'),
  Type.Literal('GROWTH'),
  Type.Literal('PROFESSIONAL'),
  Type.Literal('ENTERPRISE'),
]);

export const PlatformSubscriptionStatusSchema = Type.Union([
  Type.Literal('ACTIVE'),
  Type.Literal('TRIALING'),
  Type.Literal('PAST_DUE'),
  Type.Literal('CANCELLED'),
  Type.Literal('SUSPENDED'),
  Type.Literal('EXPIRED'),
]);

export const BillingCycleSchema = Type.Union([
  Type.Literal('MONTHLY'),
  Type.Literal('YEARLY'),
]);

// ─────────────────────────────────────────────────────────────────────────
// Base Schemas
// ─────────────────────────────────────────────────────────────────────────

export const NullableStringSchema = Type.Union([Type.String(), Type.Null()]);
export const DateTimeSchema = Type.String({ format: 'date-time' });
export const NullableDateTimeSchema = Type.Union([DateTimeSchema, Type.Null()]);

// ─────────────────────────────────────────────────────────────────────────
// Author Account Schemas
// ─────────────────────────────────────────────────────────────────────────

export const AuthorAccountSchema = Type.Object({
  penName: NullableStringSchema,
  tagline: NullableStringSchema,
  fullBio: NullableStringSchema,
  isVerified: Type.Boolean(),
  verifiedAt: NullableDateTimeSchema,
  platformTier: PlatformTierSchema,
  platformTierStatus: PlatformSubscriptionStatusSchema,
  platformTierExpiresAt: NullableDateTimeSchema,
  platformTrialEndsAt: NullableDateTimeSchema,
  seriesCount: Type.Integer(),
  totalChapterCount: Type.Integer(),
  activeSubscriberCount: Type.Integer(),
  storageUsedBytes: Type.String(), // BigInt as string
  acceptingCommissions: Type.Boolean(),
  commissionInfo: NullableStringSchema,
  commissionMinPrice: Type.Union([Type.Integer(), Type.Null()]),
  commissionMaxPrice: Type.Union([Type.Integer(), Type.Null()]),
  commissionCurrency: Type.String(),
  createdAt: DateTimeSchema,
});

export const PlatformSubscriptionSchema = Type.Object({
  tier: PlatformTierSchema,
  status: PlatformSubscriptionStatusSchema,
  billingCycle: Type.Union([BillingCycleSchema, Type.Null()]),
  startedAt: NullableDateTimeSchema,
  expiresAt: NullableDateTimeSchema,
  trialEndsAt: NullableDateTimeSchema,
  currentMonthRevenue: Type.String(),
  currentMonthUsageFee: Type.String(),
  currentMonthCurrency: Type.String(),
});

export const AuthorStatsSchema = Type.Object({
  totalRevenue: Type.Number(),
  totalRevenueCurrency: Type.String(),
  monthlyRevenue: Type.Number(),
  subscriberCount: Type.Integer(),
  subscriberGrowth: Type.Number(),
  seriesCount: Type.Integer(),
  chapterCount: Type.Integer(),
  totalViews: Type.Integer(),
  viewsGrowth: Type.Number(),
});

export const AuthorActivitySchema = Type.Object({
  type: Type.String(),
  title: Type.String(),
  description: Type.String(),
  timestamp: DateTimeSchema,
  metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
});

export const AuthorDashboardSchema = Type.Object({
  account: AuthorAccountSchema,
  stats: AuthorStatsSchema,
  recentActivity: Type.Array(AuthorActivitySchema),
  platformSubscription: PlatformSubscriptionSchema,
});

export const PlatformPlanLimitsSchema = Type.Object({
  maxSeries: Type.Union([Type.Integer(), Type.Null()]),
  maxChaptersPerSeries: Type.Union([Type.Integer(), Type.Null()]),
  maxStorageBytes: Type.Integer(),
  maxBandwidthBytes: Type.Integer(),
  maxEmailBroadcasts: Type.Integer(),
  aiTranslationWords: Type.Integer(),
  aiWritingTokens: Type.Integer(),
  aiCoverGenerations: Type.Integer(),
  customDomain: Type.Boolean(),
  advancedAnalytics: Type.Boolean(),
  prioritySupport: Type.Boolean(),
});

export const PlatformPlanSchema = Type.Object({
  tier: PlatformTierSchema,
  name: Type.String(),
  description: Type.String(),
  monthlyPrice: Type.Number(),
  yearlyPrice: Type.Number(),
  currency: Type.String(),
  features: Type.Array(Type.String()),
  limits: PlatformPlanLimitsSchema,
  isPopular: Type.Optional(Type.Boolean()),
});

// ─────────────────────────────────────────────────────────────────────────
// Request Schemas
// ─────────────────────────────────────────────────────────────────────────

export const RegisterAuthorRequestSchema = Type.Object({
  penName: Type.Optional(Type.String({ minLength: 1, maxLength: 100 })),
  tagline: Type.Optional(Type.String({ maxLength: 200 })),
  fullBio: Type.Optional(Type.String({ maxLength: 5000 })),
});
export type RegisterAuthorRequest = Static<typeof RegisterAuthorRequestSchema>;

export const UpdateAuthorAccountRequestSchema = Type.Object({
  penName: Type.Optional(Type.String({ minLength: 1, maxLength: 100 })),
  tagline: Type.Optional(Type.String({ maxLength: 200 })),
  fullBio: Type.Optional(Type.String({ maxLength: 5000 })),
  acceptingCommissions: Type.Optional(Type.Boolean()),
  commissionInfo: Type.Optional(Type.String({ maxLength: 2000 })),
  commissionMinPrice: Type.Optional(Type.Integer({ minimum: 0 })),
  commissionMaxPrice: Type.Optional(Type.Integer({ minimum: 0 })),
  commissionCurrency: Type.Optional(Type.String({ minLength: 3, maxLength: 3 })),
});
export type UpdateAuthorAccountRequest = Static<typeof UpdateAuthorAccountRequestSchema>;

export const SubscribePlatformRequestSchema = Type.Object({
  tier: PlatformTierSchema,
  billingCycle: BillingCycleSchema,
  paymentMethodId: Type.Optional(Type.String()),
});
export type SubscribePlatformRequest = Static<typeof SubscribePlatformRequestSchema>;

export const ChangePlatformPlanRequestSchema = Type.Object({
  tier: PlatformTierSchema,
});
export type ChangePlatformPlanRequest = Static<typeof ChangePlatformPlanRequestSchema>;

// ─────────────────────────────────────────────────────────────────────────
// Response Schemas
// ─────────────────────────────────────────────────────────────────────────

export const RegisterAuthorResponseSchema = createSuccessResponseSchema(
  Type.Object({
    account: AuthorAccountSchema,
  })
);
export type RegisterAuthorResponse = Static<typeof RegisterAuthorResponseSchema>;

export const GetAuthorAccountResponseSchema = createSuccessResponseSchema(
  Type.Object({
    account: AuthorAccountSchema,
  })
);
export type GetAuthorAccountResponse = Static<typeof GetAuthorAccountResponseSchema>;

export const UpdateAuthorAccountResponseSchema = createSuccessResponseSchema(
  Type.Object({
    account: AuthorAccountSchema,
  })
);
export type UpdateAuthorAccountResponse = Static<typeof UpdateAuthorAccountResponseSchema>;

export const GetAuthorDashboardResponseSchema = createSuccessResponseSchema(
  Type.Object({
    dashboard: AuthorDashboardSchema,
  })
);
export type GetAuthorDashboardResponse = Static<typeof GetAuthorDashboardResponseSchema>;

export const GetAuthorStatsResponseSchema = createSuccessResponseSchema(
  Type.Object({
    stats: AuthorStatsSchema,
  })
);
export type GetAuthorStatsResponse = Static<typeof GetAuthorStatsResponseSchema>;

export const GetPlatformSubscriptionResponseSchema = createSuccessResponseSchema(
  Type.Object({
    subscription: PlatformSubscriptionSchema,
  })
);
export type GetPlatformSubscriptionResponse = Static<typeof GetPlatformSubscriptionResponseSchema>;

export const ListPlatformPlansResponseSchema = createSuccessResponseSchema(
  Type.Object({
    plans: Type.Array(PlatformPlanSchema),
  })
);
export type ListPlatformPlansResponse = Static<typeof ListPlatformPlansResponseSchema>;

export const MessageResponseSchema = createSuccessResponseSchema(
  Type.Object({
    message: Type.String(),
  })
);
export type MessageResponse = Static<typeof MessageResponseSchema>;

// ─────────────────────────────────────────────────────────────────────────
// Admin Schemas
// ─────────────────────────────────────────────────────────────────────────

export const AdminAuthorSummarySchema = Type.Object({
  userId: Type.String(),
  publicId: Type.String(),
  email: Type.String(),
  username: Type.String(),
  penName: NullableStringSchema,
  isVerified: Type.Boolean(),
  platformTier: PlatformTierSchema,
  platformTierStatus: PlatformSubscriptionStatusSchema,
  seriesCount: Type.Integer(),
  activeSubscriberCount: Type.Integer(),
  createdAt: DateTimeSchema,
});

export const AdminAuthorDetailSchema = Type.Intersect([
  AuthorAccountSchema,
  Type.Object({
    userId: Type.String(),
    publicId: Type.String(),
    email: Type.String(),
    username: Type.String(),
    displayName: Type.String(),
    verificationNote: NullableStringSchema,
    stripeCustomerId: NullableStringSchema,
    razorpayCustomerId: NullableStringSchema,
    xenditCustomerId: NullableStringSchema,
    currentMonthRevenue: Type.String(),
    currentMonthUsageFee: Type.String(),
    aiTranslationWordsUsed: Type.Integer(),
    aiWritingTokensUsed: Type.Integer(),
    aiCoverGenerationsUsed: Type.Integer(),
    referralCode: NullableStringSchema,
    referralRewardMonths: Type.Integer(),
  }),
]);

export const AdminAuthorQuerySchema = Type.Object({
  page: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 20 })),
  search: Type.Optional(Type.String()),
  platformTier: Type.Optional(PlatformTierSchema),
  platformTierStatus: Type.Optional(PlatformSubscriptionStatusSchema),
  isVerified: Type.Optional(Type.Boolean()),
  sortBy: Type.Optional(Type.String()),
  sortOrder: Type.Optional(Type.Union([Type.Literal('asc'), Type.Literal('desc')])),
});
export type AdminAuthorQuery = Static<typeof AdminAuthorQuerySchema>;

export const AdminVerifyAuthorRequestSchema = Type.Object({
  isVerified: Type.Boolean(),
  note: Type.Optional(Type.String({ maxLength: 500 })),
});
export type AdminVerifyAuthorRequest = Static<typeof AdminVerifyAuthorRequestSchema>;

export const AdminUpdatePlatformTierRequestSchema = Type.Object({
  tier: PlatformTierSchema,
  status: Type.Optional(PlatformSubscriptionStatusSchema),
  reason: Type.Optional(Type.String({ maxLength: 500 })),
});
export type AdminUpdatePlatformTierRequest = Static<typeof AdminUpdatePlatformTierRequestSchema>;

// Admin Response Schemas
export const AdminListAuthorsResponseSchema = Type.Object({
  success: Type.Literal(true),
  data: Type.Array(AdminAuthorSummarySchema),
  meta: Type.Object({
    page: Type.Integer(),
    limit: Type.Integer(),
    total: Type.Integer(),
    totalPages: Type.Integer(),
    hasNext: Type.Boolean(),
    hasPrev: Type.Boolean(),
  }),
  timestamp: DateTimeSchema,
  requestId: Type.Optional(Type.String()),
});
export type AdminListAuthorsResponse = Static<typeof AdminListAuthorsResponseSchema>;

export const AdminGetAuthorResponseSchema = createSuccessResponseSchema(
  Type.Object({
    author: AdminAuthorDetailSchema,
  })
);
export type AdminGetAuthorResponse = Static<typeof AdminGetAuthorResponseSchema>;