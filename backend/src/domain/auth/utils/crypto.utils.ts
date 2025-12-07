// ==== FILE: src/domain/auth/utils/crypto.utils.ts ====
/**
 * Auth Crypto Utilities
 * Domain-specific cryptographic operations
 */

import { createHash, randomBytes, timingSafeEqual } from 'crypto';

const TOKEN_BYTES = 32;
const SESSION_ID_BYTES = 16;

/**
 * Hash a token using SHA-256 for storage
 */
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Generate a cryptographically secure token
 */
export function generateToken(prefix = ''): string {
  const random = randomBytes(TOKEN_BYTES).toString('base64url');
  return prefix ? `${prefix}_${random}` : random;
}

/**
 * Generate a unique session identifier
 */
export function generateSessionId(): string {
  return `sess_${Date.now()}_${randomBytes(SESSION_ID_BYTES).toString('hex')}`;
}

/**
 * Mask an IP address for privacy (showing only network portion)
 */
export function maskIpAddress(ip: string | null): string | null {
  if (!ip) return null;

  if (ip.includes('.')) {
    const parts = ip.split('.');
    return parts.length >= 2 ? `${parts[0]}.${parts[1]}.*.*` : '***';
  }

  if (ip.includes(':')) {
    const parts = ip.split(':');
    return parts.length >= 2 ? `${parts[0]}:${parts[1]}:****:****` : '***';
  }

  return '***';
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}