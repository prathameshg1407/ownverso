// ==== FILE: src/core/security/mfa.service.ts ====

/**
 * MFA Service
 *
 * Handles Multi-Factor Authentication with TOTP.
 */

import { createHmac, randomBytes } from 'crypto';

import { config } from '@/config';
import { logger } from '@/core/logger';

/**
 * TOTP configuration
 */
const TOTP_CONFIG = {
  digits: 6,
  period: 30, // seconds
  algorithm: 'SHA1',
};

/**
 * MFA setup result
 */
export interface MfaSetupResult {
  secret: string;
  otpAuthUrl: string;
  qrCodeDataUrl: string;
  backupCodes: string[];
}

/**
 * Base32 encoding helpers
 */
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32Encode(buffer: Buffer): string {
  let bits = 0;
  let value = 0;
  let output = '';

  for (let i = 0; i < buffer.length; i++) {
    value = (value << 8) | buffer[i]!;
    bits += 8;

    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }

  return output;
}

function base32Decode(encoded: string): Buffer {
  const cleanedInput = encoded.replace(/=+$/, '').toUpperCase();
  const output: number[] = [];
  let bits = 0;
  let value = 0;

  for (let i = 0; i < cleanedInput.length; i++) {
    const idx = BASE32_ALPHABET.indexOf(cleanedInput[i]!);
    if (idx === -1) continue;

    value = (value << 5) | idx;
    bits += 5;

    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(output);
}

/**
 * Generate TOTP code
 */
function generateTOTP(secret: string, timestamp: number = Date.now()): string {
  const counter = Math.floor(timestamp / 1000 / TOTP_CONFIG.period);
  const counterBuffer = Buffer.alloc(8);
  
  // Write counter as big-endian 64-bit integer
  for (let i = 7; i >= 0; i--) {
    counterBuffer[i] = counter & 0xff;
  }
  
  const secretBuffer = base32Decode(secret);
  const hmac = createHmac('sha1', secretBuffer);
  hmac.update(counterBuffer);
  const hash = hmac.digest();
  
  // Dynamic truncation
  const offset = hash[hash.length - 1]! & 0xf;
  const binary =
    ((hash[offset]! & 0x7f) << 24) |
    ((hash[offset + 1]! & 0xff) << 16) |
    ((hash[offset + 2]! & 0xff) << 8) |
    (hash[offset + 3]! & 0xff);
  
  const otp = binary % Math.pow(10, TOTP_CONFIG.digits);
  return otp.toString().padStart(TOTP_CONFIG.digits, '0');
}

/**
 * Generate simple QR code as SVG (basic implementation)
 * In production, use a proper QR library like 'qrcode'
 */
function generateQRCodeSvg(data: string): string {
  // This is a placeholder - in production, use a proper QR code library
  // For now, we'll return a simple SVG with the URL encoded
  const encodedData = encodeURIComponent(data);
  
  // Use an online QR code service for development
  // In production, generate locally with 'qrcode' package
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`;
}

/**
 * MFA Service
 */
export const mfaService = {
  /**
   * Generate a new MFA secret
   */
  generateSecret(): string {
    const buffer = randomBytes(20);
    return base32Encode(buffer);
  },

  /**
   * Generate OTP Auth URL for authenticator apps
   */
  generateOtpAuthUrl(
    secret: string,
    email: string,
    issuer: string = config.auth.mfa.issuer
  ): string {
    const encodedIssuer = encodeURIComponent(issuer);
    const encodedEmail = encodeURIComponent(email);
    
    return `otpauth://totp/${encodedIssuer}:${encodedEmail}?secret=${secret}&issuer=${encodedIssuer}&algorithm=${TOTP_CONFIG.algorithm}&digits=${TOTP_CONFIG.digits}&period=${TOTP_CONFIG.period}`;
  },

  /**
   * Setup MFA for a user
   */
  async setupMfa(email: string): Promise<MfaSetupResult> {
    const secret = this.generateSecret();
    const otpAuthUrl = this.generateOtpAuthUrl(secret, email);
    const qrCodeDataUrl = generateQRCodeSvg(otpAuthUrl);
    const backupCodes = this.generateBackupCodes();

    return {
      secret,
      otpAuthUrl,
      qrCodeDataUrl,
      backupCodes,
    };
  },

  /**
   * Verify a TOTP code
   */
  verifyTotp(secret: string, code: string, window: number = config.auth.mfa.totpWindow): boolean {
    if (!code || code.length !== TOTP_CONFIG.digits) {
      return false;
    }

    const now = Date.now();
    
    // Check current and adjacent time windows
    for (let i = -window; i <= window; i++) {
      const timestamp = now + (i * TOTP_CONFIG.period * 1000);
      const expectedCode = generateTOTP(secret, timestamp);
      
      if (code === expectedCode) {
        logger.debug({ window: i }, 'TOTP verified');
        return true;
      }
    }

    return false;
  },

  /**
   * Generate backup codes
   */
  generateBackupCodes(count: number = config.auth.mfa.backupCodesCount): string[] {
    const codes: string[] = [];
    const codeLength = config.auth.mfa.backupCodeLength;

    for (let i = 0; i < count; i++) {
      const bytes = randomBytes(Math.ceil(codeLength / 2));
      const code = bytes
        .toString('hex')
        .toUpperCase()
        .slice(0, codeLength);
      
      // Format as XXXX-XXXX
      const formatted = `${code.slice(0, 4)}-${code.slice(4)}`;
      codes.push(formatted);
    }

    return codes;
  },

  /**
   * Verify a backup code
   */
  verifyBackupCode(storedCodes: string[], providedCode: string): { valid: boolean; remainingCodes: string[] } {
    const normalizedCode = providedCode.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    const matchIndex = storedCodes.findIndex((code) => {
      const normalizedStored = code.toUpperCase().replace(/[^A-Z0-9]/g, '');
      return normalizedStored === normalizedCode;
    });

    if (matchIndex === -1) {
      return { valid: false, remainingCodes: storedCodes };
    }

    // Remove used code
    const remainingCodes = [...storedCodes];
    remainingCodes.splice(matchIndex, 1);

    return { valid: true, remainingCodes };
  },

  /**
   * Hash backup codes for storage
   */
  hashBackupCodes(codes: string[]): string[] {
    return codes.map((code) => {
      const normalized = code.toUpperCase().replace(/[^A-Z0-9]/g, '');
      return createHmac('sha256', config.jwt.access.secret)
        .update(normalized)
        .digest('hex');
    });
  },

  /**
   * Get current TOTP code (for testing)
   */
  getCurrentCode(secret: string): string {
    return generateTOTP(secret);
  },
};

export type MfaService = typeof mfaService;