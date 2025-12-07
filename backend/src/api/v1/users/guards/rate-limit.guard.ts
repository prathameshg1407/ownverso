/**
 * User Management Rate Limit Guards
 */

import { createRateLimitGuard, type RateLimitConfig } from '@/api/v1/auth/guards';

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

export const userRateLimitGuards = {
  /** Avatar uploads: 5 per hour */
  avatarUpload: createRateLimitGuard({
    max: 5,
    windowMs: HOUR_MS,
    keyPrefix: 'user:avatar-upload',
  }),

  /** Profile updates: 20 per hour */
  profileUpdate: createRateLimitGuard({
    max: 20,
    windowMs: HOUR_MS,
    keyPrefix: 'user:profile-update',
  }),

  /** Account deletion: 1 per day */
  accountDeletion: createRateLimitGuard({
    max: 1,
    windowMs: DAY_MS,
    keyPrefix: 'user:account-deletion',
  }),

  /** Force logout: 3 per hour */
  forceLogout: createRateLimitGuard({
    max: 3,
    windowMs: HOUR_MS,
    keyPrefix: 'user:force-logout',
  }),

  /** Admin impersonation: 10 per hour */
  impersonate: createRateLimitGuard({
    max: 10,
    windowMs: HOUR_MS,
    keyPrefix: 'admin:impersonate',
  }),

  /** Username availability check: 30 per minute */
  usernameCheck: createRateLimitGuard({
    max: 30,
    windowMs: MINUTE_MS,
    keyPrefix: 'user:username-check',
  }),
} as const;

export type { RateLimitConfig };