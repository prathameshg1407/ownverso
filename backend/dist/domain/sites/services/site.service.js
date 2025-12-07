"use strict";
// ==== FILE: src/domain/sites/services/site.service.ts ====
/**
 * Site Service
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteService = void 0;
const logger_1 = require("../../../core/logger");
const cache_1 = require("../../../core/cache");
const errors_1 = require("../../../common/errors");
const constants_1 = require("../../../common/constants");
const database_1 = require("../../../core/database");
const site_repository_1 = require("../repositories/site.repository");
const site_mapper_1 = require("../mappers/site.mapper");
const site_entity_1 = require("../entities/site.entity");
const repositories_1 = require("../../../domain/authors/repositories");
// Cache configuration
const CACHE_PREFIX = 'site';
// ─────────────────────────────────────────────────────────────────────────
// Cache Helpers
// ─────────────────────────────────────────────────────────────────────────
async function invalidateSiteCache(siteId) {
    try {
        await cache_1.redis.del(`${CACHE_PREFIX}:${siteId}`);
        logger_1.logger.debug({ siteId }, 'Site cache invalidated');
    }
    catch (error) {
        logger_1.logger.debug({ error }, 'Site cache invalidation error');
    }
}
// ─────────────────────────────────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────────────────────────────────
exports.siteService = {
    /**
     * Create a new site
     */
    async createSite(input) {
        // Validate slug format
        if (!(0, site_entity_1.isValidSlug)(input.slug)) {
            throw new errors_1.BadRequestError('Invalid slug format. Use lowercase letters, numbers, and hyphens only.', constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
        // Check if slug already exists for this author
        const slugExists = await site_repository_1.siteRepository.slugExists(input.authorId, input.slug);
        if (slugExists) {
            throw new errors_1.ConflictError('A site with this slug already exists', constants_1.ERROR_CODES.SITE_SLUG_TAKEN);
        }
        // Check author's site limit based on platform tier
        const authorAccount = await repositories_1.authorAccountRepository.findByUserId(input.authorId);
        if (!authorAccount) {
            throw new errors_1.ForbiddenError('You must be an author to create a site', constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
        }
        // TODO: Check tier limits for max sites
        // Create site and increment author's site count
        const site = await database_1.prisma.$transaction(async (tx) => {
            const newSite = await tx.site.create({
                data: {
                    authorId: input.authorId,
                    name: input.name.trim(),
                    slug: input.slug.toLowerCase().trim(),
                    tagline: input.tagline?.trim(),
                    description: input.description?.trim(),
                },
            });
            await tx.authorAccount.update({
                where: { userId: input.authorId },
                data: { seriesCount: { increment: 0 } }, // Just touch to update timestamp
            });
            return newSite;
        });
        logger_1.logger.info({ siteId: site.id, authorId: input.authorId.toString() }, 'Site created');
        return site_mapper_1.siteMapper.toDTO(site);
    },
    /**
     * Get site by ID
     */
    async getSite(siteId) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        return site_mapper_1.siteMapper.toDTO(site);
    },
    /**
     * Get site by slug (public)
     */
    async getSiteBySlug(slug) {
        const site = await site_repository_1.siteRepository.findBySlug(slug);
        if (!site || site.status === 'DELETED') {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        return site_mapper_1.siteMapper.toDTO(site);
    },
    /**
     * List sites for author
     */
    async listAuthorSites(authorId) {
        const sites = await site_repository_1.siteRepository.findByAuthorId(authorId);
        return sites.map((site) => site_mapper_1.siteMapper.toSummaryDTO(site));
    },
    /**
     * Update site
     */
    async updateSite(siteId, input) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        if (!(0, site_entity_1.canEdit)(site)) {
            throw new errors_1.ForbiddenError('This site cannot be edited', constants_1.ERROR_CODES.FORBIDDEN);
        }
        // If updating slug, check for conflicts
        if (input.slug && input.slug !== site.slug) {
            if (!(0, site_entity_1.isValidSlug)(input.slug)) {
                throw new errors_1.BadRequestError('Invalid slug format', constants_1.ERROR_CODES.VALIDATION_ERROR);
            }
            const slugExists = await site_repository_1.siteRepository.slugExists(site.authorId, input.slug, siteId);
            if (slugExists) {
                throw new errors_1.ConflictError('A site with this slug already exists', constants_1.ERROR_CODES.SITE_SLUG_TAKEN);
            }
        }
        const updated = await site_repository_1.siteRepository.update(siteId, input);
        await invalidateSiteCache(siteId);
        logger_1.logger.info({ siteId }, 'Site updated');
        return site_mapper_1.siteMapper.toDTO(updated);
    },
    /**
     * Delete site (soft delete)
     */
    async deleteSite(siteId) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        await site_repository_1.siteRepository.softDelete(siteId);
        await invalidateSiteCache(siteId);
        logger_1.logger.info({ siteId }, 'Site deleted');
    },
    /**
     * Get site statistics
     */
    async getSiteStats(siteId) {
        const site = await site_repository_1.siteRepository.findByIdWithCounts(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        // TODO: Implement actual stats calculation from analytics, subscriptions, etc.
        return {
            totalViews: 0,
            totalSubscribers: 0,
            totalRevenue: 0,
            revenueCurrency: 'INR',
            seriesCount: site._count.series,
            chapterCount: 0, // TODO: Sum from series
            pageCount: site._count.pages,
            collaboratorCount: site._count.collaborators,
        };
    },
    /**
     * Get site overview (combined data for dashboard)
     */
    async getSiteOverview(siteId) {
        const [site, stats] = await Promise.all([
            this.getSite(siteId),
            this.getSiteStats(siteId),
        ]);
        // TODO: Get recent activity from analytics/events
        const recentActivity = [];
        return {
            site,
            stats,
            recentActivity,
        };
    },
    /**
     * Check if user owns the site
     */
    async isOwner(siteId, userId) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        return site?.authorId === userId;
    },
    /**
     * Check if user can access site (owner or collaborator)
     */
    async canAccess(siteId, userId) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site)
            return false;
        if (site.authorId === userId)
            return true;
        // Check if user is an active collaborator
        const { collaboratorRepository } = await Promise.resolve().then(() => __importStar(require('../repositories/collaborator.repository')));
        return collaboratorRepository.isCollaborator(siteId, userId);
    },
};
//# sourceMappingURL=site.service.js.map