/**
 * User Service
 */

import { ERROR_CODES } from '@/common/constants';
import { ConflictError, NotFoundError } from '@/common/errors';
import { redis } from '@/core/cache';
import { logger } from '@/core/logger';
import { invalidateUserAuthCache } from '@/plugins/auth.plugin';
import { fullUserMapper } from '../mappers/user.mapper';
import { userSecurityRepository } from '../repositories/user-security.repository';
import { userRepository } from '../repositories/user.repository';
import type { FullUserDTO } from '../types/user.types';

const CACHE_PREFIX = 'user:full';
const CACHE_TTL = 300; // 5 minutes

export interface UpdateUserData {
  displayName?: string;
  username?: string;
}

function getCacheKey(userId: bigint): string {
  return `${CACHE_PREFIX}:${userId}`;
}

async function getCachedUser(userId: bigint): Promise<FullUserDTO | null> {
  const cacheKey = getCacheKey(userId);

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      logger.debug({ userId: userId.toString() }, 'User cache hit');
      return JSON.parse(cached);
    }
  } catch (error) {
    logger.debug({ error }, 'User cache read error');
  }

  return null;
}

async function cacheUser(userId: bigint, user: FullUserDTO): Promise<void> {
  const cacheKey = getCacheKey(userId);

  try {
    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(user));
  } catch (error) {
    logger.debug({ error }, 'User cache write error');
  }
}

async function invalidateUserCache(userId: bigint, publicId?: string): Promise<void> {
  const cacheKey = getCacheKey(userId);

  try {
    await redis.del(cacheKey);
    if (publicId) {
      await invalidateUserAuthCache(publicId);
    }
    logger.debug({ userId: userId.toString() }, 'User cache invalidated');
  } catch (error) {
    logger.debug({ error }, 'User cache invalidation error');
  }
}

export const userService = {
  async getCurrentUser(userId: bigint): Promise<FullUserDTO> {
    const cached = await getCachedUser(userId);
    if (cached) {
      return cached;
    }

    const user = await userRepository.findFull(userId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    const dto = fullUserMapper.toDTO(user);

    // Cache async, don&apos;t block response
    cacheUser(userId, dto).catch(() => {});

    return dto;
  },

  async updateUser(userId: bigint, data: UpdateUserData): Promise<FullUserDTO> {
    if (data.username) {
      const exists = await userRepository.usernameExists(data.username, userId);
      if (exists) {
        throw new ConflictError('Username is already taken', ERROR_CODES.USER_USERNAME_TAKEN);
      }
    }

    const user = await userRepository.findById(userId);
    await userRepository.update(userId, data);

    await invalidateUserCache(userId, user?.publicId);

    logger.info({ userId: userId.toString() }, 'User updated');
    return this.getCurrentUser(userId);
  },

  async initiateAccountDeletion(userId: bigint): Promise<void> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    await userRepository.update(userId, { status: 'DEACTIVATED' });
    await userSecurityRepository.addStatusHistory(
      userId,
      'DEACTIVATED',
      'User initiated account deletion',
    );

    await invalidateUserCache(userId, user.publicId);

    logger.info({ userId: userId.toString() }, 'Account deletion initiated');
  },

  async getByPublicId(publicId: string): Promise<FullUserDTO> {
    const user = await userRepository.findFullByPublicId(publicId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }
    return fullUserMapper.toDTO(user);
  },

  async getUserIdFromPublicId(publicId: string): Promise<bigint> {
    const user = await userRepository.findByPublicId(publicId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }
    return user.id;
  },
};

export type UserService = typeof userService;