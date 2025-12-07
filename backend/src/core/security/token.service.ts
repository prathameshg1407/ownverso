// ==== FILE: src/core/security/token.service.ts ====

/**
 * Token Service
 *
 * Handles verification tokens for email, password reset, MFA setup, etc.
 */

import { randomBytes, createHash } from 'crypto';

import { config } from '@/config';
import { prisma } from '@/core/database';
import { logger } from '@/core/logger';
import { BadRequestError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';
import { VerificationTokenType } from '@prisma/client';

/**
 * Token generation options
 */
export interface TokenGenerationOptions {
  userId: bigint;
  type: VerificationTokenType;
  newEmail?: string;
  requestedIp?: string;
}

/**
 * Token verification result
 */
export interface TokenVerificationResult {
  valid: boolean;
  token?: {
    id: bigint;
    userId: bigint;
    type: VerificationTokenType;
    newEmail: string | null;
    expiresAt: Date;
  };
  error?: string;
}

/**
 * Generated token result
 */
export interface GeneratedToken {
  token: string;
  hashedToken: string;
  expiresAt: Date;
}

/**
 * Get expiration time for token type
 */
function getExpirationTime(type: VerificationTokenType): Date {
  const tokenConfigs = config.auth.tokens;
  let expiresInMs: number;

  switch (type) {
    case 'EMAIL_VERIFICATION':
      expiresInMs = tokenConfigs.emailVerification.expiresInMs;
      break;
    case 'PASSWORD_RESET':
      expiresInMs = tokenConfigs.passwordReset.expiresInMs;
      break;
    case 'EMAIL_CHANGE':
      expiresInMs = tokenConfigs.emailChange.expiresInMs;
      break;
    case 'MFA_SETUP':
      expiresInMs = tokenConfigs.mfaSetup.expiresInMs;
      break;
    case 'ACCOUNT_RECOVERY':
      expiresInMs = tokenConfigs.accountRecovery.expiresInMs;
      break;
    default:
      expiresInMs = 24 * 60 * 60 * 1000; // Default 24 hours
  }

  return new Date(Date.now() + expiresInMs);
}

/**
 * Hash a token for storage
 */
function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Token Service
 */
export const tokenService = {
  /**
   * Generate a random token
   */
  generateRandomToken(length: number = 32): GeneratedToken {
    const token = randomBytes(length).toString('base64url');
    const hashedToken = hashToken(token);
    
    return {
      token,
      hashedToken,
      expiresAt: new Date(), // Will be set by caller
    };
  },

  /**
   * Create a verification token
   */
  async createToken(options: TokenGenerationOptions): Promise<string> {
    const { userId, type, newEmail, requestedIp } = options;

    // Invalidate any existing tokens of the same type for this user
    await prisma.verificationToken.updateMany({
      where: {
        userId,
        type,
        isUsed: false,
        expiresAt: { gt: new Date() },
      },
      data: {
        isUsed: true,
        usedAt: new Date(),
      },
    });

    // Generate new token
    const { token, hashedToken } = this.generateRandomToken();
    const expiresAt = getExpirationTime(type);

    // Store in database
    await prisma.verificationToken.create({
      data: {
        userId,
        tokenHash: hashedToken,
        type,
        newEmail,
        requestedIp,
        expiresAt,
      },
    });

    logger.debug(
      { userId: userId.toString(), type },
      'Verification token created'
    );

    return token;
  },

  /**
   * Verify a token
   */
  async verifyToken(
    token: string,
    expectedType: VerificationTokenType
  ): Promise<TokenVerificationResult> {
    const hashedToken = hashToken(token);

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { tokenHash: hashedToken },
    });

    if (!verificationToken) {
      return {
        valid: false,
        error: 'Invalid token',
      };
    }

    if (verificationToken.type !== expectedType) {
      return {
        valid: false,
        error: 'Invalid token type',
      };
    }

    if (verificationToken.isUsed) {
      return {
        valid: false,
        error: 'Token has already been used',
      };
    }

    if (verificationToken.expiresAt < new Date()) {
      return {
        valid: false,
        error: 'Token has expired',
      };
    }

    return {
      valid: true,
      token: {
        id: verificationToken.id,
        userId: verificationToken.userId,
        type: verificationToken.type,
        newEmail: verificationToken.newEmail,
        expiresAt: verificationToken.expiresAt,
      },
    };
  },

  /**
   * Mark a token as used
   */
  async markTokenAsUsed(tokenId: bigint, usedIp?: string): Promise<void> {
    await prisma.verificationToken.update({
      where: { id: tokenId },
      data: {
        isUsed: true,
        usedAt: new Date(),
        usedIp,
      },
    });
  },

  /**
   * Invalidate all tokens of a type for a user
   */
  async invalidateUserTokens(
    userId: bigint,
    type?: VerificationTokenType
  ): Promise<number> {
    const where = {
      userId,
      isUsed: false,
      ...(type && { type }),
    };

    const result = await prisma.verificationToken.updateMany({
      where,
      data: {
        isUsed: true,
        usedAt: new Date(),
      },
    });

    return result.count;
  },

  /**
   * Clean up expired tokens (should be run periodically)
   */
  async cleanupExpiredTokens(): Promise<number> {
    const result = await prisma.verificationToken.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: new Date() } },
          { isUsed: true, usedAt: { lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
        ],
      },
    });

    logger.info({ count: result.count }, 'Cleaned up expired verification tokens');
    return result.count;
  },

  /**
   * Verify and consume token in one operation
   */
  async verifyAndConsumeToken(
    token: string,
    expectedType: VerificationTokenType,
    usedIp?: string
  ): Promise<TokenVerificationResult> {
    const result = await this.verifyToken(token, expectedType);

    if (result.valid && result.token) {
      await this.markTokenAsUsed(result.token.id, usedIp);
    }

    return result;
  },

  /**
   * Get token URL for email links
   */
  getTokenUrl(type: VerificationTokenType, token: string): string {
    const frontendUrls = config.auth.frontendUrls;

    switch (type) {
      case 'EMAIL_VERIFICATION':
        return `${frontendUrls.verifyEmail}?token=${encodeURIComponent(token)}`;
      case 'PASSWORD_RESET':
        return `${frontendUrls.resetPassword}?token=${encodeURIComponent(token)}`;
      case 'EMAIL_CHANGE':
        return `${frontendUrls.confirmEmailChange}?token=${encodeURIComponent(token)}`;
      default:
        throw new BadRequestError(
          `Cannot generate URL for token type: ${type}`,
          ERROR_CODES.BAD_REQUEST
        );
    }
  },
};

export type TokenService = typeof tokenService;