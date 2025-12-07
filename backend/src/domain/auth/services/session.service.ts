// ==== FILE: src/domain/auth/services/session.service.ts ====
/**
 * Session Domain Service
 * Session management operations with caching
 */

import type { Session, AuthProvider } from '@prisma/client';
import { logger } from '@/core/logger';
import { redis } from '@/core/cache';
import { NotFoundError, ForbiddenError, BadRequestError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';
import { sessionRepository } from '../repositories/session.repository';
import { sessionMapper } from '../mappers/auth.mapper';
import { invalidateSessionCache } from '@/plugins/auth.plugin';
import type { SessionDTO } from '../types/auth.types';

// ─────────────────────────────────────────────────────────────────────────
// Cache Configuration
// ─────────────────────────────────────────────────────────────────────────

const CACHE = {
  PREFIX: {
    activeSessions: 'sessions:active',
    sessionCount: 'sessions:count',
  },
  TTL: {
    activeSessions: 30,
    sessionCount: 60,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// Cache Serialization
// ─────────────────────────────────────────────────────────────────────────

interface SerializedSession {
  id: string;
  userId: string;
  tokenHash: string;
  refreshTokenHash: string;
  userAgent: string | null;
  ipAddress: string | null;
  deviceType: string | null;
  deviceOs: string | null;
  browser: string | null;
  country: string | null;
  city: string | null;
  isRevoked: boolean;
  revokedAt: string | null;
  revokedReason: string | null;
  authProvider: AuthProvider | null;
  expiresAt: string;
  lastActiveAt: string | null;
  createdAt: string;
  updatedAt: string;
}

function serializeSession(session: Session): SerializedSession {
  return {
    id: session.id.toString(),
    userId: session.userId.toString(),
    tokenHash: session.tokenHash,
    refreshTokenHash: session.refreshTokenHash,
    userAgent: session.userAgent,
    ipAddress: session.ipAddress,
    deviceType: session.deviceType,
    deviceOs: session.deviceOs,
    browser: session.browser,
    country: session.country,
    city: session.city,
    isRevoked: session.isRevoked,
    revokedAt: session.revokedAt?.toISOString() ?? null,
    revokedReason: session.revokedReason,
    authProvider: session.authProvider,
    expiresAt: session.expiresAt.toISOString(),
    lastActiveAt: session.lastActiveAt?.toISOString() ?? null,
    createdAt: session.createdAt.toISOString(),
    updatedAt: session.updatedAt.toISOString(),
  };
}

function deserializeSession(data: SerializedSession): Session {
  return {
    id: BigInt(data.id),
    userId: BigInt(data.userId),
    tokenHash: data.tokenHash,
    refreshTokenHash: data.refreshTokenHash,
    userAgent: data.userAgent,
    ipAddress: data.ipAddress,
    deviceType: data.deviceType,
    deviceOs: data.deviceOs,
    browser: data.browser,
    country: data.country,
    city: data.city,
    isRevoked: data.isRevoked,
    revokedAt: data.revokedAt ? new Date(data.revokedAt) : null,
    revokedReason: data.revokedReason,
    authProvider: data.authProvider,
    expiresAt: new Date(data.expiresAt),
    lastActiveAt: data.lastActiveAt ? new Date(data.lastActiveAt) : null,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  } as Session;
}

function serializeSessions(sessions: Session[]): string {
  return JSON.stringify(sessions.map(serializeSession));
}

function deserializeSessions(cached: string): Session[] {
  try {
    const parsed = JSON.parse(cached) as SerializedSession[];
    return parsed.map(deserializeSession);
  } catch {
    return [];
  }
}

function getCacheKey(type: keyof typeof CACHE.PREFIX, userId: bigint): string {
  return `${CACHE.PREFIX[type]}:${userId.toString()}`;
}

// ─────────────────────────────────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────────────────────────────────

export const sessionDomainService = {
  /**
   * Get all active sessions for a user (cached)
   */
  async getActiveSessions(userId: bigint, currentSessionId?: bigint): Promise<SessionDTO[]> {
    const cacheKey = getCacheKey('activeSessions', userId);

    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        logger.debug({ userId: userId.toString() }, 'Active sessions cache HIT');
        const sessions = deserializeSessions(cached);
        if (sessions.length > 0) {
          return sessionMapper.toDTOList(sessions, currentSessionId);
        }
      }
    } catch (error) {
      logger.debug({ error }, 'Sessions cache read error');
    }

    logger.debug({ userId: userId.toString() }, 'Active sessions cache MISS');
    const sessions = await sessionRepository.findActiveByUserId(userId);

    redis
      .setex(cacheKey, CACHE.TTL.activeSessions, serializeSessions(sessions))
      .catch(error => logger.debug({ error }, 'Sessions cache write error'));

    return sessionMapper.toDTOList(sessions, currentSessionId);
  },

  /**
   * Get a specific session
   */
  async getSession(userId: bigint, sessionId: bigint, currentSessionId?: bigint): Promise<SessionDTO> {
    const session = await sessionRepository.findById(sessionId);

    if (!session) {
      throw new NotFoundError('Session not found', ERROR_CODES.NOT_FOUND);
    }

    if (session.userId !== userId) {
      throw new ForbiddenError('Access denied', ERROR_CODES.FORBIDDEN);
    }

    return sessionMapper.toDTO(session, currentSessionId);
  },

  /**
   * Revoke a specific session
   */
  async revokeSession(userId: bigint, sessionId: bigint, currentSessionId?: bigint): Promise<void> {
    const session = await sessionRepository.findById(sessionId);

    if (!session) {
      throw new NotFoundError('Session not found', ERROR_CODES.NOT_FOUND);
    }

    if (session.userId !== userId) {
      throw new ForbiddenError('Access denied', ERROR_CODES.FORBIDDEN);
    }

    if (currentSessionId && session.id === currentSessionId) {
      throw new BadRequestError(
        'Cannot revoke current session. Use logout instead.',
        ERROR_CODES.BAD_REQUEST
      );
    }

    await sessionRepository.revoke(sessionId, 'User revoked session');

    await Promise.all([
      invalidateSessionCache(sessionId),
      this.invalidateUserSessionCaches(userId),
    ]);

    logger.info({ userId: userId.toString(), sessionId: sessionId.toString() }, 'Session revoked');
  },

  /**
   * Revoke all sessions except the current one
   */
  async revokeOtherSessions(userId: bigint, currentSessionId: bigint): Promise<number> {
    const sessions = await sessionRepository.findActiveByUserId(userId);
    const sessionsToInvalidate = sessions.filter(s => s.id !== currentSessionId);

    const count = await sessionRepository.revokeAllExcept(userId, currentSessionId, 'User revoked other sessions');

    const invalidationPromises: Promise<void>[] = [this.invalidateUserSessionCaches(userId)];
    for (const session of sessionsToInvalidate) {
      invalidationPromises.push(invalidateSessionCache(session.id));
    }

    await Promise.all(invalidationPromises);

    logger.info({ userId: userId.toString(), count }, 'Other sessions revoked');

    return count;
  },

  /**
   * Get active session count for a user (cached)
   */
  async getSessionCount(userId: bigint): Promise<number> {
    const cacheKey = getCacheKey('sessionCount', userId);

    try {
      const cached = await redis.get(cacheKey);
      if (cached !== null) {
        return parseInt(cached, 10);
      }
    } catch (error) {
      logger.debug({ error }, 'Session count cache read error');
    }

    const count = await sessionRepository.countActiveForUser(userId);

    redis
      .setex(cacheKey, CACHE.TTL.sessionCount, count.toString())
      .catch(error => logger.debug({ error }, 'Session count cache write error'));

    return count;
  },

  /**
   * Update session last activity timestamp
   */
  async updateActivity(sessionId: bigint): Promise<void> {
    await sessionRepository.updateLastActive(sessionId);
  },

  /**
   * Cleanup expired sessions
   */
  async cleanupExpired(): Promise<number> {
    const count = await sessionRepository.cleanupExpired();
    if (count > 0) {
      logger.info({ count }, 'Cleaned up expired sessions');
    }
    return count;
  },

  /**
   * Invalidate all session-related caches for a user
   */
  async invalidateUserSessionCaches(userId: bigint): Promise<void> {
    const keys = [
      getCacheKey('activeSessions', userId),
      getCacheKey('sessionCount', userId),
    ];

    try {
      await redis.del(...keys);
      logger.debug({ userId: userId.toString() }, 'User session caches invalidated');
    } catch (error) {
      logger.debug({ error }, 'Session caches invalidation error');
    }
  },

  /**
   * Revoke all sessions for a user
   */
  async revokeAllSessions(userId: bigint, reason: string): Promise<number> {
    const sessions = await sessionRepository.findActiveByUserId(userId);

    const count = await sessionRepository.revokeAllForUser(userId, reason);

    const invalidationPromises: Promise<void>[] = [this.invalidateUserSessionCaches(userId)];
    for (const session of sessions) {
      invalidationPromises.push(invalidateSessionCache(session.id));
    }

    await Promise.all(invalidationPromises);

    logger.info({ userId: userId.toString(), count, reason }, 'All sessions revoked');

    return count;
  },
} as const;

export type SessionDomainService = typeof sessionDomainService;