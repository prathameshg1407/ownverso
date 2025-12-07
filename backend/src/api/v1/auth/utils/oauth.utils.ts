// ==== FILE: src/api/v1/auth/utils/oauth.utils.ts ====
/**
 * OAuth Utilities
 */

import { randomBytes } from 'crypto';

const STATE_BYTES = 32;
const DEFAULT_MAX_AGE_MS = 10 * 60 * 1000;

export function generateOAuthState(): string {
  const timestamp = Date.now().toString(36);
  const random = randomBytes(STATE_BYTES).toString('base64url');
  return `${timestamp}.${random}`;
}

export function verifyOAuthState(state: string, maxAgeMs = DEFAULT_MAX_AGE_MS): boolean {
  try {
    const [timestampStr] = state.split('.');
    if (!timestampStr) return false;

    const timestamp = parseInt(timestampStr, 36);
    if (isNaN(timestamp)) return false;

    const age = Date.now() - timestamp;
    return age >= 0 && age <= maxAgeMs;
  } catch {
    return false;
  }
}

export function maskEmail(email: string): string {
  const atIndex = email.indexOf('@');
  if (atIndex === -1) return email;

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex);

  if (local.length <= 2) return '*'.repeat(local.length) + domain;
  return local[0] + '*'.repeat(local.length - 2) + local.slice(-1) + domain;
}