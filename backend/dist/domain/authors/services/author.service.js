"use strict";
// ==== FILE: src/domain/authors/services/author.service.ts ====
/**
 * Author Service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorService = void 0;
const logger_1 = require("../../../core/logger");
const cache_1 = require("../../../core/cache");
const errors_1 = require("../../../common/errors");
const constants_1 = require("../../../common/constants");
const database_1 = require("../../../core/database");
const author_account_repository_1 = require("../repositories/author-account.repository");
const author_mapper_1 = require("../mappers/author.mapper");
// Cache configuration
const CACHE_PREFIX = 'author';
const CACHE_TTL = 300; // 5 minutes
// ─────────────────────────────────────────────────────────────────────────
// Cache Helpers
// ─────────────────────────────────────────────────────────────────────────
async function getCachedAuthor(userId) {
    const cacheKey = `${CACHE_PREFIX}:${userId}`;
    try {
        const cached = await cache_1.redis.get(cacheKey);
        if (cached) {
            logger_1.logger.debug({ userId: userId.toString() }, 'Author cache HIT');
            return JSON.parse(cached);
        }
    }
    catch (error) {
        logger_1.logger.debug({ error }, 'Author cache read error');
    }
    return null;
}
async function cacheAuthor(userId, dto) {
    const cacheKey = `${CACHE_PREFIX}:${userId}`;
    try {
        await cache_1.redis.setex(cacheKey, CACHE_TTL, JSON.stringify(dto));
    }
    catch (error) {
        logger_1.logger.debug({ error }, 'Author cache write error');
    }
}
async function invalidateAuthorCache(userId) {
    const cacheKey = `${CACHE_PREFIX}:${userId}`;
    try {
        await cache_1.redis.del(cacheKey);
        logger_1.logger.debug({ userId: userId.toString() }, 'Author cache invalidated');
    }
    catch (error) {
        logger_1.logger.debug({ error }, 'Author cache invalidation error');
    }
}
// ─────────────────────────────────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────────────────────────────────
exports.authorService = {
    /**
     * Register user as author
     */
    async registerAuthor(input) {
        // Check if already an author
        const exists = await author_account_repository_1.authorAccountRepository.exists(input.userId);
        if (exists) {
            throw new errors_1.ConflictError('User is already registered as an author', constants_1.ERROR_CODES.AUTHOR_ALREADY_EXISTS);
        }
        // Create author account and update user role in transaction
        const account = await database_1.prisma.$transaction(async (tx) => {
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
        logger_1.logger.info({ userId: input.userId.toString() }, 'Author registered');
        return author_mapper_1.authorAccountMapper.toDTO(account);
    },
    /**
     * Get author account by user ID
     */
    async getAccount(userId) {
        // Try cache first
        const cached = await getCachedAuthor(userId);
        if (cached)
            return cached;
        const account = await author_account_repository_1.authorAccountRepository.findByUserId(userId);
        if (!account) {
            throw new errors_1.NotFoundError('Author account not found', constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
        }
        const dto = author_mapper_1.authorAccountMapper.toDTO(account);
        cacheAuthor(userId, dto).catch(() => { });
        return dto;
    },
    /**
     * Update author account
     */
    async updateAccount(userId, input) {
        const account = await author_account_repository_1.authorAccountRepository.findByUserId(userId);
        if (!account) {
            throw new errors_1.NotFoundError('Author account not found', constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
        }
        const updated = await author_account_repository_1.authorAccountRepository.update(userId, input);
        await invalidateAuthorCache(userId);
        logger_1.logger.info({ userId: userId.toString() }, 'Author account updated');
        return author_mapper_1.authorAccountMapper.toDTO(updated);
    },
    /**
     * Get author dashboard data
     */
    async getDashboard(userId) {
        const account = await author_account_repository_1.authorAccountRepository.findByUserId(userId);
        if (!account) {
            throw new errors_1.NotFoundError('Author account not found', constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
        }
        // Get stats and recent activity in parallel
        const [stats, recentActivity] = await Promise.all([
            this.getStats(userId),
            this.getRecentActivity(userId),
        ]);
        return {
            account: author_mapper_1.authorAccountMapper.toDTO(account),
            stats,
            recentActivity,
            platformSubscription: author_mapper_1.authorAccountMapper.toPlatformSubscriptionDTO(account),
        };
    },
    /**
     * Get author statistics
     */
    async getStats(userId) {
        const account = await author_account_repository_1.authorAccountRepository.findByUserId(userId);
        if (!account) {
            throw new errors_1.NotFoundError('Author account not found', constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
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
    async getRecentActivity(_userId, _limit = 10) {
        // TODO: Implement actual activity fetching from various tables
        // For now, return empty array
        return [];
    },
    /**
     * Check if user is an author
     */
    async isAuthor(userId) {
        return author_account_repository_1.authorAccountRepository.exists(userId);
    },
    /**
     * Get author by public ID (for public profiles)
     */
    async getByPublicId(publicId) {
        const account = await author_account_repository_1.authorAccountRepository.findByUserPublicId(publicId);
        if (!account) {
            throw new errors_1.NotFoundError('Author not found', constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
        }
        return author_mapper_1.authorAccountMapper.toDTO(account);
    },
};
//# sourceMappingURL=author.service.js.map