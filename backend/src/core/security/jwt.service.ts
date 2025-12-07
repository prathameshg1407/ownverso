// ==== FILE: src/core/security/jwt.service.ts ====

/**
 * JWT Service
 *
 * Handles JWT token generation, verification, and management.
 */

import { createSigner, createVerifier, createDecoder } from 'fast-jwt';
import type { UserRole } from '@prisma/client';

import { config } from '@/config';
import { logger } from '@/core/logger';
import { UnauthorizedError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';

/**
 * Valid user roles for runtime validation
 */
const VALID_ROLES: readonly UserRole[] = ['READER', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'] as const;

/**
 * Token types
 */
export type TokenType = 'access' | 'refresh';

/**
 * Base JWT payload
 */
export interface BaseJwtPayload {
  sub: string; // User publicId
  type: TokenType;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

/**
 * Access token payload
 */
export interface AccessTokenPayload extends BaseJwtPayload {
  type: 'access';
  email: string;
  role: UserRole;      // ← Changed from string to UserRole
  sessionId: string;
}

/**
 * Refresh token payload
 */
export interface RefreshTokenPayload extends BaseJwtPayload {
  type: 'refresh';
  sessionId: string;
  tokenVersion: number;
}

/**
 * Token pair
 */
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
}

/**
 * User data for token generation
 */
export interface TokenUserData {
  publicId: string;
  email: string;
  role: UserRole;      // ← Changed from string to UserRole
  sessionId: string;
  tokenVersion?: number;
}

// Create signers and verifiers
const accessTokenSigner = createSigner({
  key: config.jwt.access.secret,
  algorithm: 'HS256',
  expiresIn: config.jwt.access.expiresInMs,
  iss: config.jwt.issuer,
  aud: config.jwt.audience,
});

const refreshTokenSigner = createSigner({
  key: config.jwt.refresh.secret,
  algorithm: 'HS256',
  expiresIn: config.jwt.refresh.expiresInMs,
  iss: config.jwt.issuer,
  aud: config.jwt.audience,
});

const accessTokenVerifier = createVerifier({
  key: config.jwt.access.secret,
  algorithms: ['HS256'],
  allowedIss: config.jwt.issuer,
  allowedAud: config.jwt.audience,
  cache: true,
  cacheTTL: 60000, // 1 minute cache
});

const refreshTokenVerifier = createVerifier({
  key: config.jwt.refresh.secret,
  algorithms: ['HS256'],
  allowedIss: config.jwt.issuer,
  allowedAud: config.jwt.audience,
  cache: true,
  cacheTTL: 60000,
});

const tokenDecoder = createDecoder({ complete: false });

/**
 * Check if a value is a valid UserRole
 */
function isValidUserRole(role: unknown): role is UserRole {
  return typeof role === 'string' && VALID_ROLES.includes(role as UserRole);
}

/**
 * JWT Service
 */
export const jwtService = {
  /**
   * Generate access token
   */
  generateAccessToken(userData: TokenUserData): string {
    const payload = {
      sub: userData.publicId,
      type: 'access' as const,
      email: userData.email,
      role: userData.role,
      sessionId: userData.sessionId,
    };

    return accessTokenSigner(payload);
  },

  /**
   * Generate refresh token
   */
  generateRefreshToken(userData: TokenUserData): string {
    const payload = {
      sub: userData.publicId,
      type: 'refresh' as const,
      sessionId: userData.sessionId,
      tokenVersion: userData.tokenVersion || 0,
    };

    return refreshTokenSigner(payload);
  },

  /**
   * Generate token pair
   */
  generateTokenPair(userData: TokenUserData): TokenPair {
    const now = new Date();

    const accessToken = this.generateAccessToken(userData);
    const refreshToken = this.generateRefreshToken(userData);

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresAt: new Date(now.getTime() + config.jwt.access.expiresInMs),
      refreshTokenExpiresAt: new Date(now.getTime() + config.jwt.refresh.expiresInMs),
    };
  },

  /**
   * Verify access token
   */
  verifyAccessToken(token: string): AccessTokenPayload {
    try {
      const payload = accessTokenVerifier(token) as Record<string, unknown>;

      if (payload.type !== 'access') {
        throw new UnauthorizedError(
          'Invalid token type',
          ERROR_CODES.AUTH_INVALID_TOKEN
        );
      }

      // Validate role is a valid UserRole
      if (!isValidUserRole(payload.role)) {
        throw new UnauthorizedError(
          'Invalid role in token',
          ERROR_CODES.AUTH_INVALID_TOKEN
        );
      }

     return payload as unknown as AccessTokenPayload;
    } catch (error) {
      logger.debug({ error }, 'Access token verification failed');

      if (error instanceof UnauthorizedError) {
        throw error;
      }

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (errorMessage.includes('expired')) {
        throw new UnauthorizedError(
          'Access token has expired',
          ERROR_CODES.AUTH_TOKEN_EXPIRED
        );
      }

      throw new UnauthorizedError(
        'Invalid access token',
        ERROR_CODES.AUTH_INVALID_TOKEN
      );
    }
  },

  /**
   * Verify refresh token
   */
  verifyRefreshToken(token: string): RefreshTokenPayload {
    try {
      const payload = refreshTokenVerifier(token) as RefreshTokenPayload;

      if (payload.type !== 'refresh') {
        throw new UnauthorizedError(
          'Invalid token type',
          ERROR_CODES.AUTH_REFRESH_TOKEN_INVALID
        );
      }

      return payload;
    } catch (error) {
      logger.debug({ error }, 'Refresh token verification failed');

      if (error instanceof UnauthorizedError) {
        throw error;
      }

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (errorMessage.includes('expired')) {
        throw new UnauthorizedError(
          'Refresh token has expired',
          ERROR_CODES.AUTH_REFRESH_TOKEN_EXPIRED
        );
      }

      throw new UnauthorizedError(
        'Invalid refresh token',
        ERROR_CODES.AUTH_REFRESH_TOKEN_INVALID
      );
    }
  },

  /**
   * Decode token without verification (for debugging/logging)
   */
  decodeToken(token: string): BaseJwtPayload | null {
    try {
      return tokenDecoder(token) as BaseJwtPayload;
    } catch {
      return null;
    }
  },

  /**
   * Extract token from Authorization header
   */
  extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader) {
      return null;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0]?.toLowerCase() !== 'bearer') {
      return null;
    }

    return parts[1] || null;
  },

  /**
   * Check if token is about to expire (within threshold)
   */
  isTokenExpiringSoon(payload: BaseJwtPayload, thresholdMs: number = 60000): boolean {
    const expiresAt = payload.exp * 1000;
    const now = Date.now();
    return expiresAt - now <= thresholdMs;
  },

  /**
   * Get token expiration date
   */
  getTokenExpiration(payload: BaseJwtPayload): Date {
    return new Date(payload.exp * 1000);
  },
};

export type JwtService = typeof jwtService;