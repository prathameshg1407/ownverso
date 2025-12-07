/**
 * User Utility Functions
 */

import type { UserWithSecurity } from '../types/user.types';

const BLOCKED_STATUSES = new Set([
  'PENDING_VERIFICATION',
  'SUSPENDED',
  'BANNED',
  'DELETED',
  'DEACTIVATED',
]);

const STATUS_REASONS: Readonly<Record<string, string>> = {
  PENDING_VERIFICATION: 'Email verification required',
  SUSPENDED: 'Account is suspended',
  BANNED: 'Account is banned',
  DELETED: 'Account has been deleted',
  DEACTIVATED: 'Account is deactivated',
};

export interface LoginCheckResult {
  canLogin: boolean;
  reason?: string;
}

/**
 * Check if a user can login based on their status and security settings
 */
export function canUserLogin(user: UserWithSecurity): LoginCheckResult {
  if (BLOCKED_STATUSES.has(user.status)) {
    return {
      canLogin: false,
      reason: STATUS_REASONS[user.status] ?? 'Account access denied',
    };
  }

  if (user.security?.lockedUntil && user.security.lockedUntil > new Date()) {
    return {
      canLogin: false,
      reason: `Account is locked until ${user.security.lockedUntil.toISOString()}`,
    };
  }

  return { canLogin: true };
}

/**
 * Check if user has a password set (vs OAuth-only)
 */
export function hasPassword(user: { passwordHash: string | null }): boolean {
  return user.passwordHash !== null;
}

/**
 * Check if user needs to verify their email
 */
export function needsEmailVerification(user: {
  emailVerified: boolean;
  status: string;
}): boolean {
  return !user.emailVerified && user.status === 'PENDING_VERIFICATION';
}

/**
 * Check if user has MFA enabled
 */
export function hasMfaEnabled(user: UserWithSecurity): boolean {
  return user.security?.mfaEnabled === true;
}

/**
 * Check if user account is active
 */
export function isActiveUser(user: { status: string; deletedAt: Date | null }): boolean {
  return user.status === 'ACTIVE' && user.deletedAt === null;
}

/**
 * Mask email for privacy display
 */
export function maskEmail(email: string): string {
  const atIndex = email.indexOf('@');
  if (atIndex === -1) return email;

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (local.length <= 2) {
    return `${'*'.repeat(local.length)}@${domain}`;
  }

  const maskedLength = Math.min(local.length - 2, 5);
  const masked = `${local[0]}${'*'.repeat(maskedLength)}${local[local.length - 1]}`;
  return `${masked}@${domain}`;
}

/**
 * Mask IP address for privacy display
 */
export function maskIpAddress(ip: string | null): string | null {
  if (!ip) return null;

  // IPv4: show first two octets
  if (ip.includes('.')) {
    const parts = ip.split('.');
    return parts.length >= 2 ? `${parts[0]}.${parts[1]}.*.*` : ip;
  }

  // IPv6: show first three groups
  if (ip.includes(':')) {
    const parts = ip.split(':');
    return parts.length >= 3 ? `${parts.slice(0, 3).join(':')}:***` : ip;
  }

  return ip;
}