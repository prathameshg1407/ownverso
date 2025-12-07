// ==== FILE: src/domain/sites/services/site.service.ts ====
/**
 * Site Service
 */

import { logger } from '@/core/logger';
import { redis } from '@/core/cache';
import { NotFoundError, ConflictError, ForbiddenError, BadRequestError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { prisma } from '@/core/database';
import { siteRepository } from '../repositories/site.repository';
import { siteMapper } from '../mappers/site.mapper';
import { isValidSlug, canEdit } from '../entities/site.entity';
import { authorAccountRepository } from '@/domain/authors/repositories';
import type {
  CreateSiteInput,
  UpdateSiteInput,
  SiteDTO,
  SiteSummaryDTO,
  SiteStatsDTO,
  SiteOverviewDTO,
  SiteActivityDTO,
  SiteWithCounts,
} from '../types/site.types';

// Cache configuration
const CACHE_PREFIX = 'site';

// ─────────────────────────────────────────────────────────────────────────
// Cache Helpers
// ─────────────────────────────────────────────────────────────────────────

async function invalidateSiteCache(siteId: string): Promise<void> {
  try {
    await redis.del(`${CACHE_PREFIX}:${siteId}`);
    logger.debug({ siteId }, 'Site cache invalidated');
  } catch (error) {
    logger.debug({ error }, 'Site cache invalidation error');
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────────────────────────────────

export const siteService = {
  /**
   * Create a new site
   */
  async createSite(input: CreateSiteInput): Promise<SiteDTO> {
    // Validate slug format
    if (!isValidSlug(input.slug)) {
      throw new BadRequestError(
        'Invalid slug format. Use lowercase letters, numbers, and hyphens only.',
        ERROR_CODES.VALIDATION_ERROR
      );
    }

    // Check if slug already exists for this author
    const slugExists = await siteRepository.slugExists(input.authorId, input.slug);
    if (slugExists) {
      throw new ConflictError(
        'A site with this slug already exists',
        ERROR_CODES.SITE_SLUG_TAKEN
      );
    }

    // Check author's site limit based on platform tier
    const authorAccount = await authorAccountRepository.findByUserId(input.authorId);
    if (!authorAccount) {
      throw new ForbiddenError(
        'You must be an author to create a site',
        ERROR_CODES.AUTHOR_NOT_FOUND
      );
    }

    // TODO: Check tier limits for max sites

    // Create site and increment author's site count
    const site = await prisma.$transaction(async (tx) => {
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

    logger.info({ siteId: site.id, authorId: input.authorId.toString() }, 'Site created');

    return siteMapper.toDTO(site);
  },

  /**
   * Get site by ID
   */
  async getSite(siteId: string): Promise<SiteDTO> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }
    return siteMapper.toDTO(site);
  },

  /**
   * Get site by slug (public)
   */
  async getSiteBySlug(slug: string): Promise<SiteDTO> {
    const site = await siteRepository.findBySlug(slug);
    if (!site || site.status === 'DELETED') {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }
    return siteMapper.toDTO(site);
  },

  /**
   * List sites for author
   */
  async listAuthorSites(authorId: bigint): Promise<SiteSummaryDTO[]> {
    const sites = await siteRepository.findByAuthorId(authorId);
    return sites.map((site: SiteWithCounts) => siteMapper.toSummaryDTO(site));
  },

  /**
   * Update site
   */
  async updateSite(siteId: string, input: UpdateSiteInput): Promise<SiteDTO> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    if (!canEdit(site)) {
      throw new ForbiddenError(
        'This site cannot be edited',
        ERROR_CODES.FORBIDDEN
      );
    }

    // If updating slug, check for conflicts
    if (input.slug && input.slug !== site.slug) {
      if (!isValidSlug(input.slug)) {
        throw new BadRequestError(
          'Invalid slug format',
          ERROR_CODES.VALIDATION_ERROR
        );
      }

      const slugExists = await siteRepository.slugExists(
        site.authorId,
        input.slug,
        siteId
      );
      if (slugExists) {
        throw new ConflictError(
          'A site with this slug already exists',
          ERROR_CODES.SITE_SLUG_TAKEN
        );
      }
    }

    const updated = await siteRepository.update(siteId, input);
    await invalidateSiteCache(siteId);

    logger.info({ siteId }, 'Site updated');

    return siteMapper.toDTO(updated);
  },

  /**
   * Delete site (soft delete)
   */
  async deleteSite(siteId: string): Promise<void> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    await siteRepository.softDelete(siteId);
    await invalidateSiteCache(siteId);

    logger.info({ siteId }, 'Site deleted');
  },

  /**
   * Get site statistics
   */
  async getSiteStats(siteId: string): Promise<SiteStatsDTO> {
    const site = await siteRepository.findByIdWithCounts(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
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
  async getSiteOverview(siteId: string): Promise<SiteOverviewDTO> {
    const [site, stats] = await Promise.all([
      this.getSite(siteId),
      this.getSiteStats(siteId),
    ]);

    // TODO: Get recent activity from analytics/events
    const recentActivity: SiteActivityDTO[] = [];

    return {
      site,
      stats,
      recentActivity,
    };
  },

  /**
   * Check if user owns the site
   */
  async isOwner(siteId: string, userId: bigint): Promise<boolean> {
    const site = await siteRepository.findById(siteId);
    return site?.authorId === userId;
  },

  /**
   * Check if user can access site (owner or collaborator)
   */
  async canAccess(siteId: string, userId: bigint): Promise<boolean> {
    const site = await siteRepository.findById(siteId);
    if (!site) return false;

    if (site.authorId === userId) return true;

    // Check if user is an active collaborator
    const { collaboratorRepository } = await import('../repositories/collaborator.repository');
    return collaboratorRepository.isCollaborator(siteId, userId);
  },
};

export type SiteService = typeof siteService;