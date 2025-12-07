// ==== FILE: src/domain/authors/types/author.types.ts ====
/**
 * Author Domain Types
 */

import type {
  AuthorAccount,
  PlatformTier,
  PlatformSubscriptionStatus,
  BillingCycle,
} from '@prisma/client';

// ─────────────────────────────────────────────────────────────────────────
// Input Types
// ─────────────────────────────────────────────────────────────────────────

export interface RegisterAuthorInput {
  userId: bigint;
  penName?: string;
  tagline?: string;
  fullBio?: string;
}

export interface UpdateAuthorAccountInput {
  penName?: string;
  tagline?: string;
  fullBio?: string;
  acceptingCommissions?: boolean;
  commissionInfo?: string;
  commissionMinPrice?: number;
  commissionMaxPrice?: number;
  commissionCurrency?: string;
}

export interface UpdatePlatformSubscriptionInput {
  platformTier: PlatformTier;
  platformTierStatus?: PlatformSubscriptionStatus;
  platformBillingCycle?: BillingCycle;
  platformTierStartedAt?: Date;
  platformTierExpiresAt?: Date;
  platformTrialEndsAt?: Date;
}

export interface FindAuthorsOptions {
  page?: number;
  limit?: number;
  search?: string;
  platformTier?: PlatformTier;
  platformTierStatus?: PlatformSubscriptionStatus;
  isVerified?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ─────────────────────────────────────────────────────────────────────────
// DTO Types
// ─────────────────────────────────────────────────────────────────────────

export interface AuthorAccountDTO {
  penName: string | null;
  tagline: string | null;
  fullBio: string | null;
  isVerified: boolean;
  verifiedAt: string | null;
  platformTier: PlatformTier;
  platformTierStatus: PlatformSubscriptionStatus;
  platformTierExpiresAt: string | null;
  platformTrialEndsAt: string | null;
  seriesCount: number;
  totalChapterCount: number;
  activeSubscriberCount: number;
  storageUsedBytes: string; // BigInt as string
  acceptingCommissions: boolean;
  commissionInfo: string | null;
  commissionMinPrice: number | null;
  commissionMaxPrice: number | null;
  commissionCurrency: string;
  createdAt: string;
}

export interface AuthorDashboardDTO {
  account: AuthorAccountDTO;
  stats: AuthorStatsDTO;
  recentActivity: AuthorActivityDTO[];
  platformSubscription: PlatformSubscriptionDTO;
}

export interface AuthorStatsDTO {
  totalRevenue: number;
  totalRevenueCurrency: string;
  monthlyRevenue: number;
  subscriberCount: number;
  subscriberGrowth: number; // percentage
  seriesCount: number;
  chapterCount: number;
  totalViews: number;
  viewsGrowth: number; // percentage
}

export interface AuthorActivityDTO {
  type: 'chapter_published' | 'new_subscriber' | 'comment' | 'review' | 'payout';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface PlatformSubscriptionDTO {
  tier: PlatformTier;
  status: PlatformSubscriptionStatus;
  billingCycle: BillingCycle | null;
  startedAt: string | null;
  expiresAt: string | null;
  trialEndsAt: string | null;
  currentMonthRevenue: string;
  currentMonthUsageFee: string;
  currentMonthCurrency: string;
}

export interface PlatformPlanDTO {
  tier: PlatformTier;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  features: string[];
  limits: PlatformPlanLimitsDTO;
  isPopular?: boolean;
}

export interface PlatformPlanLimitsDTO {
  maxSeries: number | null; // null = unlimited
  maxChaptersPerSeries: number | null;
  maxStorageBytes: number;
  maxBandwidthBytes: number;
  maxEmailBroadcasts: number;
  aiTranslationWords: number;
  aiWritingTokens: number;
  aiCoverGenerations: number;
  customDomain: boolean;
  advancedAnalytics: boolean;
  prioritySupport: boolean;
}

export interface AdminAuthorSummaryDTO {
  userId: string;
  publicId: string;
  email: string;
  username: string;
  penName: string | null;
  isVerified: boolean;
  platformTier: PlatformTier;
  platformTierStatus: PlatformSubscriptionStatus;
  seriesCount: number;
  activeSubscriberCount: number;
  createdAt: string;
}

export interface AdminAuthorDetailDTO extends AuthorAccountDTO {
  userId: string;
  publicId: string;
  email: string;
  username: string;
  displayName: string;
  verificationNote: string | null;
  stripeCustomerId: string | null;
  razorpayCustomerId: string | null;
  xenditCustomerId: string | null;
  currentMonthRevenue: string;
  currentMonthUsageFee: string;
  aiTranslationWordsUsed: number;
  aiWritingTokensUsed: number;
  aiCoverGenerationsUsed: number;
  referralCode: string | null;
  referralRewardMonths: number;
}

// ─────────────────────────────────────────────────────────────────────────
// Composite Types
// ─────────────────────────────────────────────────────────────────────────

export type AuthorAccountWithUser = AuthorAccount & {
  user: {
    publicId: string;
    email: string;
    username: string;
    displayName: string;
  };
};