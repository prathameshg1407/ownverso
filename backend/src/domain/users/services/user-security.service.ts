/**
 * User Security Service
 */

import { logger } from '@/core/logger';
import { redis } from '@/core/cache';
import { userSecurityRepository } from '../repositories/user-security.repository';
import { sessionRepository } from '@/domain/auth/repositories/session.repository';
import { securityMapper, sessionMapper } from '../mappers/user.mapper';
import { invalidateSessionCache } from '@/plugins/auth.plugin';
import type {
  UserSecurityDTO,
  LoginHistoryDTO,
  UpdateSecuritySettingsInput,
} from '../types/user.types';

const CACHE_KEYS = {
  security: (userId: bigint) => `user:security:${userId}`,
  sessions: (userId: bigint) => `user:sessions:${userId}`,
} as const;

const CACHE_TTL = {
  security: 60,
  sessions: 30,
} as const;

const DEFAULT_SECURITY: UserSecurityDTO = {
  mfaEnabled: false,
  emailVerifiedAt: null,
  lastLoginAt: null,
  lastLoginIp: null,
  lastLoginUserAgent: null,
  passwordChangedAt: null,
  failedLoginCount: 0,
  lockedUntil: null,
};

async function getFromCache<T>(key: string): Promise<T | null> {
  try {
    const cached = await redis.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    logger.debug({ error, key }, 'Cache read error');
    return null;
  }
}

async function setCache(key: string, data: unknown, ttl: number): Promise<void> {
  try {
    await redis.setex(key, ttl, JSON.stringify(data));
  } catch (error) {
    logger.debug({ error, key }, 'Cache write error');
  }
}

async function deleteCache(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    logger.debug({ error, key }, 'Cache delete error');
  }
}

export const userSecurityService = {
  async getSecurityInfo(userId: bigint): Promise<UserSecurityDTO> {
    const cacheKey = CACHE_KEYS.security(userId);

    const cached = await getFromCache<UserSecurityDTO>(cacheKey);
    if (cached) {
      logger.debug({ userId: userId.toString() }, 'Security cache hit');
      return cached;
    }

    const security = await userSecurityRepository.findByUserId(userId);
    if (!security) {
      return DEFAULT_SECURITY;
    }

    const dto = securityMapper.toDTO(security);
    await setCache(cacheKey, dto, CACHE_TTL.security);

    return dto;
  },

  async getLoginHistory(userId: bigint, currentSessionId?: string): Promise<LoginHistoryDTO[]> {
    const cacheKey = CACHE_KEYS.sessions(userId);

    const cached = await getFromCache<LoginHistoryDTO[]>(cacheKey);
    if (cached) {
      logger.debug({ userId: userId.toString() }, 'Sessions cache hit');
      // Re-apply current session flag since it might differ per request
      return cached.map((session) => ({
        ...session,
        isCurrent: currentSessionId === session.id,
      }));
    }

    const sessions = await sessionRepository.findActiveByUserId(userId);
    const dtos = sessions.map((s) => sessionMapper.toLoginHistoryDTO(s, currentSessionId));

    await setCache(cacheKey, dtos, CACHE_TTL.sessions);

    return dtos;
  },

  async updateSecuritySettings(
    userId: bigint,
    input: UpdateSecuritySettingsInput,
  ): Promise<UserSecurityDTO> {
    logger.info(
      { userId: userId.toString(), settings: Object.keys(input) },
      'Security settings update requested',
    );

    await this.invalidateSecurityCache(userId);
    return this.getSecurityInfo(userId);
  },

  async forceLogoutAll(userId: bigint): Promise<number> {
    await userSecurityRepository.setForceLogout(userId);

    const sessions = await sessionRepository.findActiveByUserId(userId);
    const revokedCount = await sessionRepository.revokeAllForUser(userId, 'Force logout all');

    // Invalidate all related caches
    await Promise.all([
      this.invalidateSecurityCache(userId),
      this.invalidateSessionsCache(userId),
      ...sessions.map((s) => invalidateSessionCache(s.id)),
    ]);

    logger.info({ userId: userId.toString(), revokedCount }, 'Force logout all devices');
    return revokedCount;
  },

  async invalidateSecurityCache(userId: bigint): Promise<void> {
    await deleteCache(CACHE_KEYS.security(userId));
  },

  async invalidateSessionsCache(userId: bigint): Promise<void> {
    await deleteCache(CACHE_KEYS.sessions(userId));
  },
};

export type UserSecurityService = typeof userSecurityService;