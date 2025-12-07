/**
 * Author API Types
 */

import type { SuccessResponse } from './common.types';

// ─────────────────────────────────────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────────────────────────────────────

export type PlatformTier = 'FREE' | 'STARTER' | 'GROWTH' | 'PROFESSIONAL' | 'ENTERPRISE';
export type PlatformSubscriptionStatus = 'ACTIVE' | 'TRIALING' | 'PAST_DUE' | 'CANCELLED' | 'SUSPENDED' | 'EXPIRED';
export type BillingCycle = 'MONTHLY' | 'ANNUAL';

// ─────────────────────────────────────────────────────────────────────────────
// Author Account
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthorAccount {
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
  storageUsedBytes: string;
  acceptingCommissions: boolean;
  commissionInfo: string | null;
  commissionMinPrice: number | null;
  commissionMaxPrice: number | null;
  commissionCurrency: string;
  createdAt: string;
}

export interface PlatformSubscription {
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

export interface AuthorStats {
  totalRevenue: number;
  totalRevenueCurrency: string;
  monthlyRevenue: number;
  subscriberCount: number;
  subscriberGrowth: number;
  seriesCount: number;
  chapterCount: number;
  totalViews: number;
  viewsGrowth: number;
}

export interface AuthorActivity {
  type: 'chapter_published' | 'new_subscriber' | 'comment' | 'review' | 'payout';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface AuthorDashboard {
  account: AuthorAccount;
  stats: AuthorStats;
  recentActivity: AuthorActivity[];
  platformSubscription: PlatformSubscription;
}

// ─────────────────────────────────────────────────────────────────────────────
// Platform Plans
// ─────────────────────────────────────────────────────────────────────────────

export interface PlatformPlanLimits {
  maxSeries: number | null;
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

export interface PlatformPlan {
  tier: PlatformTier;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  features: string[];
  limits: PlatformPlanLimits;
  isPopular?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Request Types
// ─────────────────────────────────────────────────────────────────────────────

export interface RegisterAuthorRequest {
  penName?: string;
  tagline?: string;
  fullBio?: string;
}

export interface UpdateAuthorAccountRequest {
  penName?: string;
  tagline?: string;
  fullBio?: string;
  acceptingCommissions?: boolean;
  commissionInfo?: string;
  commissionMinPrice?: number;
  commissionMaxPrice?: number;
  commissionCurrency?: string;
}

export interface SubscribePlatformRequest {
  tier: PlatformTier;
  billingCycle: 'MONTHLY' | 'YEARLY';
  paymentMethodId?: string;
}

export interface ChangePlatformPlanRequest {
  tier: PlatformTier;
}

// ─────────────────────────────────────────────────────────────────────────────
// Response Types
// ─────────────────────────────────────────────────────────────────────────────

export type AuthorAccountResponse = SuccessResponse<{ account: AuthorAccount }>;
export type AuthorDashboardResponse = SuccessResponse<{ dashboard: AuthorDashboard }>;
export type AuthorStatsResponse = SuccessResponse<{ stats: AuthorStats }>;
export type PlatformSubscriptionResponse = SuccessResponse<{ subscription: PlatformSubscription; message?: string }>;
export type PlatformPlansResponse = SuccessResponse<{ plans: PlatformPlan[] }>;