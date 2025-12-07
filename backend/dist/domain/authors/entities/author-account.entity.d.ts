/**
 * Author Account Entity Types and Helpers
 */
import type { AuthorAccount, PlatformTier } from '@prisma/client';
/**
 * Platform tier display names
 */
export declare const PLATFORM_TIER_NAMES: Record<PlatformTier, string>;
/**
 * Check if author has active subscription
 */
export declare function hasActiveSubscription(account: AuthorAccount): boolean;
/**
 * Check if author is on trial
 */
export declare function isOnTrial(account: AuthorAccount): boolean;
/**
 * Check if subscription is expiring soon (within 7 days)
 */
export declare function isExpiringSoon(account: AuthorAccount): boolean;
/**
 * Get tier level for comparison (higher = better)
 */
export declare function getTierLevel(tier: PlatformTier): number;
/**
 * Check if upgrading from one tier to another
 */
export declare function isUpgrade(fromTier: PlatformTier, toTier: PlatformTier): boolean;
//# sourceMappingURL=author-account.entity.d.ts.map