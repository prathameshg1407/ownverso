/**
 * Cryptography Utilities
 */

import { randomBytes, createHash, createHmac, timingSafeEqual } from 'crypto';
import { hash, verify, Options as Argon2Options } from 'argon2';

import { config } from '@/config';

/**
 * Generate a random token
 */
export function generateToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * Generate a URL-safe random token
 */
export function generateUrlSafeToken(length: number = 32): string {
  return randomBytes(length).toString('base64url');
}

/**
 * Hash a string using SHA-256
 */
export function sha256(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

/**
 * Hash a string using SHA-512
 */
export function sha512(data: string): string {
  return createHash('sha512').update(data).digest('hex');
}

/**
 * Create HMAC signature
 */
export function hmacSign(data: string, secret: string): string {
  return createHmac('sha256', secret).update(data).digest('hex');
}

/**
 * Verify HMAC signature (timing-safe)
 */
export function hmacVerify(data: string, signature: string, secret: string): boolean {
  const expectedSignature = hmacSign(data, secret);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (sigBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(sigBuffer, expectedBuffer);
}

/**
 * Hash a password using Argon2
 */
export async function hashPassword(password: string): Promise<string> {
  const options: Argon2Options = {
    memoryCost: config.argon2.memoryCost,
    timeCost: config.argon2.timeCost,
    parallelism: config.argon2.parallelism,
    type: 2, // Argon2id
  };

  return hash(password, options);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  try {
    return await verify(hash, password);
  } catch {
    return false;
  }
}

/**
 * Generate API key
 */
export function generateApiKey(prefix: string = 'ov'): { key: string; hash: string } {
  const token = generateToken(32);
  const key = `${prefix}_${token}`;
  const keyHash = sha256(key);
  return { key, hash: keyHash };
}

/**
 * Hash an API key for storage
 */
export function hashApiKey(key: string): string {
  return sha256(key);
}

/**
 * Generate a short code (for verification, referral, etc.)
 */
export function generateShortCode(length: number = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  const bytes = randomBytes(length);
  for (let i = 0; i < length; i++) {
    code += chars[bytes[i]! % chars.length];
  }
  return code;
}

/**
 * Generate a numeric OTP
 */
export function generateOTP(length: number = 6): string {
  const max = Math.pow(10, length) - 1;
  const min = Math.pow(10, length - 1);
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num.toString();
}

/**
 * Timing-safe string comparison
 */
export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}