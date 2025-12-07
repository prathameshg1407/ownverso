// ==== FILE: src/domain/authors/mappers/author.mapper.ts ====
/**
 * Author Mappers
 */

import type { AuthorAccount } from '@prisma/client';
import type {
  AuthorAccountDTO,
  PlatformSubscriptionDTO,
  AdminAuthorSummaryDTO,
  AdminAuthorDetailDTO,
  AuthorAccountWithUser,
} from '../types/author.types';

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────

const toISOString = (date: Date | null): string | null =>
  date?.toISOString() ?? null;

const bigIntToString = (value: bigint): string => value.toString();

// ─────────────────────────────────────────────────────────────────────────
// Author Account Mapper
// ─────────────────────────────────────────────────────────────────────────

export const authorAccountMapper = {
  toDTO(account: AuthorAccount): AuthorAccountDTO {
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

  toPlatformSubscriptionDTO(account: AuthorAccount): PlatformSubscriptionDTO {
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

export const adminAuthorMapper = {
  toSummaryDTO(
    account: AuthorAccount & {
      user: { publicId: string; email: string; username: string };
    }
  ): AdminAuthorSummaryDTO {
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

  toDetailDTO(account: AuthorAccountWithUser): AdminAuthorDetailDTO {
    return {
      ...authorAccountMapper.toDTO(account),
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