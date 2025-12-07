// ==== FILE: src/domain/auth/repositories/session.repository.ts ====
/**
 * Session Repository
 * Data access layer for user sessions
 */

import type { Session } from '@prisma/client';
import { prisma } from '@/core/database';
import { logger } from '@/core/logger';
import { config } from '@/config';
import type { CreateSessionInput } from '../types/auth.types';
import { hashToken } from '../utils/crypto.utils';

// ─────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────

const CLEANUP_RETENTION_DAYS = 7;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const SESSION_LIST_SELECT = {
  id: true,
  userId: true,
  userAgent: true,
  ipAddress: true,
  deviceType: true,
  deviceOs: true,
  browser: true,
  country: true,
  city: true,
  isRevoked: true,
  revokedAt: true,
  revokedReason: true,
  authProvider: true,
  expiresAt: true,
  lastActiveAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

// ─────────────────────────────────────────────────────────────────────────
// Repository
// ─────────────────────────────────────────────────────────────────────────

export const sessionRepository = {
  async create(input: CreateSessionInput): Promise<Session> {
    await this.enforceSessionLimit(input.userId);

    const session = await prisma.session.create({
      data: {
        userId: input.userId,
        tokenHash: input.tokenHash ?? `pending_${Date.now()}`,
        refreshTokenHash: input.refreshTokenHash ?? `pending_${Date.now()}`,
        userAgent: input.userAgent,
        ipAddress: input.ipAddress,
        deviceType: input.deviceType,
        deviceOs: input.deviceOs,
        browser: input.browser,
        country: input.country,
        city: input.city,
        authProvider: input.authProvider,
        expiresAt: input.expiresAt,
        lastActiveAt: new Date(),
      },
    });

    logger.debug({ sessionId: session.id.toString() }, 'Session created');
    return session;
  },

  async findById(id: bigint): Promise<Session | null> {
    return prisma.session.findUnique({ where: { id } });
  },

  async findByIdMinimal(
    id: bigint
  ): Promise<{ id: bigint; isRevoked: boolean; expiresAt: Date } | null> {
    return prisma.session.findUnique({
      where: { id },
      select: { id: true, isRevoked: true, expiresAt: true },
    });
  },

  async findByTokenHash(tokenHash: string): Promise<Session | null> {
    return prisma.session.findUnique({ where: { tokenHash } });
  },

  async findByRefreshTokenHash(refreshTokenHash: string): Promise<Session | null> {
    return prisma.session.findUnique({ where: { refreshTokenHash } });
  },

  async findByAccessToken(accessToken: string): Promise<Session | null> {
    return this.findByTokenHash(hashToken(accessToken));
  },

  async findByRefreshToken(refreshToken: string): Promise<Session | null> {
    return this.findByRefreshTokenHash(hashToken(refreshToken));
  },

  async findActiveByUserId(userId: bigint): Promise<Session[]> {
    return prisma.session.findMany({
      where: {
        userId,
        isRevoked: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { lastActiveAt: 'desc' },
    });
  },

  async findActiveByUserIdMinimal(
    userId: bigint
  ): Promise<Array<Omit<Session, 'tokenHash' | 'refreshTokenHash'>>> {
    return prisma.session.findMany({
      where: {
        userId,
        isRevoked: false,
        expiresAt: { gt: new Date() },
      },
      select: SESSION_LIST_SELECT,
      orderBy: { lastActiveAt: 'desc' },
    }) as Promise<Array<Omit<Session, 'tokenHash' | 'refreshTokenHash'>>>;
  },

  async updateLastActive(id: bigint): Promise<void> {
    await prisma.session.update({
      where: { id },
      data: { lastActiveAt: new Date() },
    });
  },

  async updateTokens(
    id: bigint,
    tokenHash: string,
    refreshTokenHash: string,
    expiresAt: Date
  ): Promise<void> {
    await prisma.session.update({
      where: { id },
      data: {
        tokenHash,
        refreshTokenHash,
        expiresAt,
        lastActiveAt: new Date(),
      },
    });
  },

  async revoke(id: bigint, reason = 'User logout'): Promise<void> {
    await prisma.session.update({
      where: { id },
      data: {
        isRevoked: true,
        revokedAt: new Date(),
        revokedReason: reason,
      },
    });
    logger.debug({ sessionId: id.toString(), reason }, 'Session revoked');
  },

  async revokeByTokenHash(tokenHash: string, reason = 'User logout'): Promise<void> {
    await prisma.session.updateMany({
      where: { tokenHash },
      data: {
        isRevoked: true,
        revokedAt: new Date(),
        revokedReason: reason,
      },
    });
  },

  async revokeAllForUser(userId: bigint, reason = 'Logout all'): Promise<number> {
    const result = await prisma.session.updateMany({
      where: { userId, isRevoked: false },
      data: {
        isRevoked: true,
        revokedAt: new Date(),
        revokedReason: reason,
      },
    });

    logger.info({ userId: userId.toString(), count: result.count }, 'All sessions revoked');
    return result.count;
  },

  async revokeAllExcept(
    userId: bigint,
    exceptSessionId: bigint,
    reason = 'Logout other devices'
  ): Promise<number> {
    const result = await prisma.session.updateMany({
      where: {
        userId,
        isRevoked: false,
        id: { not: exceptSessionId },
      },
      data: {
        isRevoked: true,
        revokedAt: new Date(),
        revokedReason: reason,
      },
    });

    logger.info({ userId: userId.toString(), count: result.count }, 'Other sessions revoked');
    return result.count;
  },

  async countActiveForUser(userId: bigint): Promise<number> {
    return prisma.session.count({
      where: {
        userId,
        isRevoked: false,
        expiresAt: { gt: new Date() },
      },
    });
  },

  async cleanupExpired(): Promise<number> {
    const retentionDate = new Date(Date.now() - CLEANUP_RETENTION_DAYS * MS_PER_DAY);

    const result = await prisma.session.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: new Date() } },
          { isRevoked: true, revokedAt: { lt: retentionDate } },
        ],
      },
    });

    if (result.count > 0) {
      logger.info({ count: result.count }, 'Cleaned up expired sessions');
    }

    return result.count;
  },

  async enforceSessionLimit(userId: bigint): Promise<void> {
    const maxSessions = config.auth.session.maxSessionsPerUser;
    const sessionCount = await this.countActiveForUser(userId);

    if (sessionCount < maxSessions) return;

    const sessionsToRevoke = sessionCount - maxSessions + 1;
    const oldestSessions = await prisma.session.findMany({
      where: {
        userId,
        isRevoked: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { lastActiveAt: 'asc' },
      take: sessionsToRevoke,
      select: { id: true },
    });

    if (oldestSessions.length === 0) return;

    await prisma.session.updateMany({
      where: { id: { in: oldestSessions.map(s => s.id) } },
      data: {
        isRevoked: true,
        revokedAt: new Date(),
        revokedReason: 'Session limit exceeded',
      },
    });

    logger.info(
      { userId: userId.toString(), revokedCount: oldestSessions.length },
      'Revoked old sessions due to limit'
    );
  },

  async getActiveSessionIds(userId: bigint): Promise<bigint[]> {
    const sessions = await prisma.session.findMany({
      where: {
        userId,
        isRevoked: false,
        expiresAt: { gt: new Date() },
      },
      select: { id: true },
    });
    return sessions.map(s => s.id);
  },
} as const;

export type SessionRepository = typeof sessionRepository;