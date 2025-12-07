// ==== FILE: src/domain/sites/repositories/site.repository.ts ====
/**
 * Site Repository
 */

import { Prisma } from '@prisma/client';
import { prisma } from '@/core/database';
import { logger } from '@/core/logger';
import type {
  CreateSiteInput,
  UpdateSiteInput,
  FindSitesOptions,
  SiteWithTheme,
  SiteWithAuthor,
  SiteWithCounts,
} from '../types/site.types';

const SITE_WITH_THEME_INCLUDE = {
  theme: true,
} as const;

const SITE_WITH_AUTHOR_INCLUDE = {
  author: {
    select: {
      publicId: true,
      username: true,
      email: true,
      displayName: true,
    },
  },
} as const;

const SITE_WITH_COUNTS_INCLUDE = {
  _count: {
    select: {
      series: true,
      pages: true,
      collaborators: true,
    },
  },
} as const;

export const siteRepository = {
  /**
   * Create a new site
   */
  async create(input: CreateSiteInput) {
    const site = await prisma.site.create({
      data: {
        authorId: input.authorId,
        name: input.name.trim(),
        slug: input.slug.toLowerCase().trim(),
        tagline: input.tagline?.trim(),
        description: input.description?.trim(),
      },
    });

    logger.debug({ siteId: site.id }, 'Site created');
    return site;
  },

  /**
   * Find by ID
   */
  async findById(id: string) {
    return prisma.site.findUnique({
      where: { id },
    });
  },

  /**
   * Find by ID with theme
   */
  async findByIdWithTheme(id: string): Promise<SiteWithTheme | null> {
    return prisma.site.findUnique({
      where: { id },
      include: SITE_WITH_THEME_INCLUDE,
    });
  },

  /**
   * Find by ID with author
   */
  async findByIdWithAuthor(id: string): Promise<SiteWithAuthor | null> {
    return prisma.site.findUnique({
      where: { id },
      include: SITE_WITH_AUTHOR_INCLUDE,
    });
  },

  /**
   * Find by ID with counts
   */
  async findByIdWithCounts(id: string): Promise<SiteWithCounts | null> {
    return prisma.site.findUnique({
      where: { id },
      include: SITE_WITH_COUNTS_INCLUDE,
    });
  },

  /**
   * Find by ID with all relations for admin
   */
  async findByIdFull(
    id: string
  ): Promise<(SiteWithAuthor & SiteWithCounts) | null> {
    return prisma.site.findUnique({
      where: { id },
      include: {
        ...SITE_WITH_AUTHOR_INCLUDE,
        ...SITE_WITH_COUNTS_INCLUDE,
      },
    });
  },

  /**
   * Find by slug
   */
  async findBySlug(slug: string) {
    return prisma.site.findUnique({
      where: { slug: slug.toLowerCase() },
    });
  },

  /**
   * Find by author ID and slug
   */
  async findByAuthorAndSlug(authorId: bigint, slug: string) {
    return prisma.site.findUnique({
      where: {
        authorId_slug: {
          authorId,
          slug: slug.toLowerCase(),
        },
      },
    });
  },

  /**
   * Find by custom domain
   */
  async findByCustomDomain(domain: string) {
    return prisma.site.findUnique({
      where: { customDomain: domain.toLowerCase() },
    });
  },

  /**
   * Check if slug exists for author
   */
  async slugExists(authorId: bigint, slug: string, excludeSiteId?: string): Promise<boolean> {
    const count = await prisma.site.count({
      where: {
        authorId,
        slug: slug.toLowerCase(),
        ...(excludeSiteId && { id: { not: excludeSiteId } }),
      },
    });
    return count > 0;
  },

  /**
   * Check if custom domain is taken
   */
  async domainExists(domain: string, excludeSiteId?: string): Promise<boolean> {
    const count = await prisma.site.count({
      where: {
        customDomain: domain.toLowerCase(),
        ...(excludeSiteId && { id: { not: excludeSiteId } }),
      },
    });
    return count > 0;
  },

  /**
   * Update site
   */
  async update(id: string, input: UpdateSiteInput) {
    const data: Prisma.SiteUpdateInput = {};

    if (input.name !== undefined) data.name = input.name.trim();
    if (input.slug !== undefined) data.slug = input.slug.toLowerCase().trim();
    if (input.tagline !== undefined) data.tagline = input.tagline?.trim() || null;
    if (input.description !== undefined)
      data.description = input.description?.trim() || null;
    if (input.status !== undefined) data.status = input.status;

    return prisma.site.update({ where: { id }, data });
  },

  /**
   * Update site branding
   */
  async updateBranding(
    id: string,
    input: {
      logoUrl?: string | null;
      faviconUrl?: string | null;
      coverImageUrl?: string | null;
      primaryColor?: string | null;
      secondaryColor?: string | null;
      accentColor?: string | null;
    }
  ) {
    return prisma.site.update({
      where: { id },
      data: input,
    });
  },

  /**
   * Update site theme
   */
  async updateTheme(
    id: string,
    input: {
      themeId?: string | null;
      customCssEnabled?: boolean;
      customCss?: string | null;
    }
  ) {
    return prisma.site.update({
      where: { id },
      data: input,
    });
  },

  /**
   * Update site SEO
   */
  async updateSeo(
    id: string,
    input: {
      metaTitle?: string | null;
      metaDescription?: string | null;
      ogImageUrl?: string | null;
    }
  ) {
    return prisma.site.update({
      where: { id },
      data: input,
    });
  },

  /**
   * Update site analytics
   */
  async updateAnalytics(
    id: string,
    input: {
      googleAnalyticsId?: string | null;
      analyticsEnabled?: boolean;
    }
  ) {
    return prisma.site.update({
      where: { id },
      data: input,
    });
  },

  /**
   * Update site comments settings
   */
  async updateComments(
    id: string,
    input: {
      commentsEnabled?: boolean;
      commentsModerationMode?: 'NONE' | 'PRE_APPROVE' | 'POST_APPROVE' | 'TRUSTED_ONLY';
    }
  ) {
    return prisma.site.update({
      where: { id },
      data: input,
    });
  },

  /**
   * Update custom domain
   */
  async updateCustomDomain(
    id: string,
    domain: string | null,
    verified: boolean = false
  ) {
    return prisma.site.update({
      where: { id },
      data: {
        customDomain: domain?.toLowerCase() || null,
        customDomainVerified: domain ? verified : false,
        customDomainVerifiedAt: verified ? new Date() : null,
      },
    });
  },


  /**
   * Verify custom domain
   */
  async verifyCustomDomain(id: string) {
    return prisma.site.update({
      where: { id },
      data: {
        customDomainVerified: true,
        customDomainVerifiedAt: new Date(),
      },
    });
  },

  /**
   * Update SSL status
   */
  async updateSslStatus(id: string, enabled: boolean, expiresAt?: Date) {
    return prisma.site.update({
      where: { id },
      data: {
        sslEnabled: enabled,
        sslExpiresAt: expiresAt || null,
      },
    });
  },

  /**
   * Update site status
   */
  async updateStatus(
    id: string,
    status: 'DRAFT' | 'ACTIVE' | 'MAINTENANCE' | 'SUSPENDED' | 'DELETED',
    reason?: string
  ) {
    const data: Prisma.SiteUpdateInput = { status };

    if (status === 'SUSPENDED') {
      data.suspensionReason = reason || null;
      data.suspendedAt = new Date();
    } else if (status === 'ACTIVE') {
      data.suspensionReason = null;
      data.suspendedAt = null;
    }

    return prisma.site.update({ where: { id }, data });
  },

  /**
   * Soft delete site
   */
  async softDelete(id: string) {
    return prisma.site.update({
      where: { id },
      data: { status: 'DELETED' },
    });
  },

  /**
   * Find sites by author
   */
  async findByAuthorId(authorId: bigint) {
    return prisma.site.findMany({
      where: {
        authorId,
        status: { not: 'DELETED' },
      },
      include: SITE_WITH_COUNTS_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  },

  /**
   * Find many sites with pagination
   */
  async findMany(options: FindSitesOptions = {}) {
    const {
      authorId,
      status,
      isPublic,
      search,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = options;

    const where: Prisma.SiteWhereInput = {
      status: status || { not: 'DELETED' },
      ...(authorId && { authorId }),
      ...(isPublic !== undefined && { isPublic }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { slug: { contains: search, mode: 'insensitive' } },
          { customDomain: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [sites, total] = await Promise.all([
      prisma.site.findMany({
        where,
        include: {
          ...SITE_WITH_AUTHOR_INCLUDE,
          ...SITE_WITH_COUNTS_INCLUDE,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.site.count({ where }),
    ]);

    return { sites, total };
  },

  /**
   * Count sites by author
   */
  async countByAuthorId(authorId: bigint): Promise<number> {
    return prisma.site.count({
      where: {
        authorId,
        status: { not: 'DELETED' },
      },
    });
  },

  /**
   * Update last published timestamp
   */
  async updateLastPublished(id: string) {
    return prisma.site.update({
      where: { id },
      data: { lastPublishedAt: new Date() },
    });
  },
};

export type SiteRepository = typeof siteRepository;