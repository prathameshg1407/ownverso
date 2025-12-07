// ==== FILE: src/domain/authors/services/author.service.ts ====
/**
 * Author Service
 */

import { logger } from '@/core/logger';
import { redis } from '@/core/cache';
import { NotFoundError, ConflictError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { prisma } from '@/core/database';
import { authorAccountRepository } from '../repositories/author-account.repository';
import { authorAccountMapper } from '../mappers/author.mapper';
import type {
  RegisterAuthorInput,
  UpdateAuthorAccountInput,
  AuthorAccountDTO,
  AuthorDashboardDTO,
  AuthorStatsDTO,
  AuthorActivityDTO,
} from '../types/author.types';

// Cache configuration
const CACHE_PREFIX = 'author';
const CACHE_TTL = 300; // 5 minutes

// ─────────────────────────────────────────────────────────────────────────
// Cache Helpers
// ─────────────────────────────────────────────────────────────────────────

async function getCachedAuthor(userId: bigint): Promise<AuthorAccountDTO | null> {
  const cacheKey = `${CACHE_PREFIX}:${userId}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      logger.debug({ userId: userId.toString() }, 'Author cache HIT');
      return JSON.parse(cached);
    }
  } catch (error) {
    logger.debug({ error }, 'Author cache read error');
  }
  return null;
}

async function cacheAuthor(userId: bigint, dto: AuthorAccountDTO): Promise<void> {
  const cacheKey = `${CACHE_PREFIX}:${userId}`;
  try {
    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(dto));
  } catch (error) {
    logger.debug({ error }, 'Author cache write error');
  }
}

async function invalidateAuthorCache(userId: bigint): Promise<void> {
  const cacheKey = `${CACHE_PREFIX}:${userId}`;
  try {
    await redis.del(cacheKey);
    logger.debug({ userId: userId.toString() }, 'Author cache invalidated');
  } catch (error) {
    logger.debug({ error }, 'Author cache invalidation error');
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────────────────────────────────

export const authorService = {
  /**
   * Register user as author
   */
  async registerAuthor(input: RegisterAuthorInput): Promise<AuthorAccountDTO> {
    // Check if already an author
    const exists = await authorAccountRepository.exists(input.userId);
    if (exists) {
      throw new ConflictError(
        'User is already registered as an author',
        ERROR_CODES.AUTHOR_ALREADY_EXISTS
      );
    }

    // Create author account and update user role in transaction
    const account = await prisma.$transaction(async (tx) => {
      // Create author account
      const authorAccount = await tx.authorAccount.create({
        data: {
          userId: input.userId,
          penName: input.penName?.trim(),
          tagline: input.tagline?.trim(),
          fullBio: input.fullBio?.trim(),
        },
      });

      // Update user role to AUTHOR if currently READER
      await tx.user.update({
        where: { id: input.userId },
        data: {
          role: 'AUTHOR',
        },
      });

      return authorAccount;
    });

    logger.info({ userId: input.userId.toString() }, 'Author registered');

    return authorAccountMapper.toDTO(account);
  },

  /**
   * Get author account by user ID
   */
  async getAccount(userId: bigint): Promise<AuthorAccountDTO> {
    // Try cache first
    const cached = await getCachedAuthor(userId);
    if (cached) return cached;

    const account = await authorAccountRepository.findByUserId(userId);
    if (!account) {
      throw new NotFoundError(
        'Author account not found',
        ERROR_CODES.AUTHOR_NOT_FOUND
      );
    }

    const dto = authorAccountMapper.toDTO(account);
    cacheAuthor(userId, dto).catch(() => {});

    return dto;
  },

  /**
   * Update author account
   */
  async updateAccount(
    userId: bigint,
    input: UpdateAuthorAccountInput
  ): Promise<AuthorAccountDTO> {
    const account = await authorAccountRepository.findByUserId(userId);
    if (!account) {
      throw new NotFoundError(
        'Author account not found',
        ERROR_CODES.AUTHOR_NOT_FOUND
      );
    }

    const updated = await authorAccountRepository.update(userId, input);
    await invalidateAuthorCache(userId);

    logger.info({ userId: userId.toString() }, 'Author account updated');

    return authorAccountMapper.toDTO(updated);
  },

  /**
   * Get author dashboard data
   */
  async getDashboard(userId: bigint): Promise<AuthorDashboardDTO> {
    const account = await authorAccountRepository.findByUserId(userId);
    if (!account) {
      throw new NotFoundError(
        'Author account not found',
        ERROR_CODES.AUTHOR_NOT_FOUND
      );
    }

    // Get stats and recent activity in parallel
    const [stats, recentActivity] = await Promise.all([
      this.getStats(userId),
      this.getRecentActivity(userId),
    ]);

    return {
      account: authorAccountMapper.toDTO(account),
      stats,
      recentActivity,
      platformSubscription: authorAccountMapper.toPlatformSubscriptionDTO(account),
    };
  },

  /**
   * Get author statistics
   */
  async getStats(userId: bigint): Promise<AuthorStatsDTO> {
    const account = await authorAccountRepository.findByUserId(userId);
    if (!account) {
      throw new NotFoundError(
        'Author account not found',
        ERROR_CODES.AUTHOR_NOT_FOUND
      );
    }

    // TODO: Implement actual stats calculation from Series, Subscriptions, etc.
    // For now, return data from cached counts on AuthorAccount
    return {
      totalRevenue: Number(account.currentMonthRevenue), // This should be lifetime
      totalRevenueCurrency: account.currentMonthCurrency,
      monthlyRevenue: Number(account.currentMonthRevenue),
      subscriberCount: account.activeSubscriberCount,
      subscriberGrowth: 0, // TODO: Calculate from historical data
      seriesCount: account.seriesCount,
      chapterCount: account.totalChapterCount,
      totalViews: 0, // TODO: Calculate from analytics
      viewsGrowth: 0, // TODO: Calculate from historical data
    };
  },

  /**
   * Get recent activity for dashboard
   */
  async getRecentActivity(
    _userId: bigint,
    _limit: number = 10
  ): Promise<AuthorActivityDTO[]> {
    // TODO: Implement actual activity fetching from various tables
    // For now, return empty array
    return [];
  },

  /**
   * Check if user is an author
   */
  async isAuthor(userId: bigint): Promise<boolean> {
    return authorAccountRepository.exists(userId);
  },

  /**
   * Get author by public ID (for public profiles)
   */
  async getByPublicId(publicId: string): Promise<AuthorAccountDTO> {
    const account = await authorAccountRepository.findByUserPublicId(publicId);
    if (!account) {
      throw new NotFoundError(
        'Author not found',
        ERROR_CODES.AUTHOR_NOT_FOUND
      );
    }
    return authorAccountMapper.toDTO(account);
  },
};

export type AuthorService = typeof authorService;