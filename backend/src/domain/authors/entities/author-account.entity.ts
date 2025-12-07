// ==== FILE: src/domain/authors/entities/author-account.entity.ts ====
/**
 * Author Account Entity Types and Helpers
 */

import type { AuthorAccount, PlatformTier } from '@prisma/client';

/**
 * Platform tier display names
 */
export const PLATFORM_TIER_NAMES: Record<PlatformTier, string> = {
  FREE: 'Free',
  STARTER: 'Starter',
  GROWTH: 'Growth',
  PROFESSIONAL: 'Professional',
  ENTERPRISE: 'Enterprise',
};

/**
 * Check if author has active subscription
 */
export function hasActiveSubscription(account: AuthorAccount): boolean {
  return (
    account.platformTierStatus === 'ACTIVE' ||
    account.platformTierStatus === 'TRIALING'
  );
}

/**
 * Check if author is on trial
 */
export function isOnTrial(account: AuthorAccount): boolean {
  return (
    account.platformTierStatus === 'TRIALING' &&
    account.platformTrialEndsAt !== null &&
    account.platformTrialEndsAt > new Date()
  );
}

/**
 * Check if subscription is expiring soon (within 7 days)
 */
export function isExpiringSoon(account: AuthorAccount): boolean {
  if (!account.platformTierExpiresAt) return false;
  const daysUntilExpiry = Math.ceil(
    (account.platformTierExpiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
}

/**
 * Get tier level for comparison (higher = better)
 */
export function getTierLevel(tier: PlatformTier): number {
  const levels: Record<PlatformTier, number> = {
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
export function isUpgrade(fromTier: PlatformTier, toTier: PlatformTier): boolean {
  return getTierLevel(toTier) > getTierLevel(fromTier);
}