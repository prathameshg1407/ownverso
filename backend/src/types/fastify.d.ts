/**
 * Fastify Type Declarations
 *
 * Augments Fastify types with custom properties.
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import type { PrismaClient, UserRole } from '@prisma/client';
import type { Redis } from 'ioredis';

/**
 * User profile information
 */
export interface UserProfile {
  avatarUrl?: string | null;
  bio?: string | null;
  locale: string;
  timezone: string;
}

/**
 * Authenticated user attached to request
 */
export interface AuthenticatedUser {
  id: bigint;
  publicId: string;
  email: string;
  username: string;
  displayName: string;
  role: UserRole;
  status: string;
  emailVerified: boolean;
  createdAt: Date;
  profile?: UserProfile | null;
}

/**
 * Device information extracted from request
 */
export interface SessionDeviceInfo {
  userAgent: string | null;
  ipAddress: string | null;
  deviceType: import('@prisma/client').DeviceType;
  deviceOs: string | null;
  browser: string | null;
  country: string | null;
  city: string | null;
}

/**
 * JWT payload for access tokens
 */
export interface AccessTokenPayload {
  type: 'access';
  sub: string;
  email: string;
  role: UserRole;
  sessionId: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

/**
 * JWT payload for refresh tokens
 */
export interface RefreshTokenPayload {
  type: 'refresh';
  sub: string;
  sessionId: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

/**
 * Union of all JWT payload types
 */
export type JwtPayload = AccessTokenPayload | RefreshTokenPayload;

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JwtPayload;
    user: AuthenticatedUser;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    redis: Redis;
    config: typeof import('@/config').config;
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authenticateOptional: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    updateSessionActivity: (sessionId: string) => Promise<void>;
  }

  interface FastifyRequest {
    requestId: string;
    startTime: bigint;
    user?: AuthenticatedUser;
    jwtPayload?: AccessTokenPayload;
    deviceInfo?: SessionDeviceInfo;
  }

  interface FastifyReply {
    setAuthCookies: (accessToken: string, refreshToken: string) => FastifyReply;
    clearAuthCookies: () => FastifyReply;
  }

  interface FastifyContextConfig {
    roles?: UserRole[];
    permissions?: string[];
    auth?: boolean;
    authOptional?: boolean;
    skipRateLimit?: boolean;
    rateLimit?: {
      max: number;
      timeWindow: number;
    };
  }
}