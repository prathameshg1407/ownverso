// ==== FILE: src/domain/sites/repositories/page.repository.ts ====
/**
 * Page Repository
 */

import { Prisma } from '@prisma/client';
import { prisma } from '@/core/database';
import { logger } from '@/core/logger';
import type { CreatePageInput, UpdatePageInput } from '../types/site.types';

export const pageRepository = {
  /**
   * Create a new page
   */
  async create(input: CreatePageInput) {
    const page = await prisma.page.create({
      data: {
        siteId: input.siteId,
        slug: input.slug.toLowerCase().trim(),
        title: input.title.trim(),
        content: input.content,
        isPublished: input.isPublished ?? false,
        publishedAt: input.isPublished ? new Date() : null,
        showInNav: input.showInNav ?? false,
        navLabel: input.navLabel?.trim(),
        navOrder: input.navOrder ?? 0,
        metaTitle: input.metaTitle?.trim(),
        metaDescription: input.metaDescription?.trim(),
      },
    });

    logger.debug({ pageId: page.id, siteId: input.siteId }, 'Page created');
    return page;
  },

  /**
   * Find by ID
   */
  async findById(id: string) {
    return prisma.page.findUnique({ where: { id } });
  },

  /**
   * Find by site and slug
   */
  async findBySiteAndSlug(siteId: string, slug: string) {
    return prisma.page.findUnique({
      where: {
        siteId_slug: {
          siteId,
          slug: slug.toLowerCase(),
        },
      },
    });
  },

  /**
   * Check if slug exists for site
   */
  async slugExists(
    siteId: string,
    slug: string,
    excludePageId?: string
  ): Promise<boolean> {
    const count = await prisma.page.count({
      where: {
        siteId,
        slug: slug.toLowerCase(),
        ...(excludePageId && { id: { not: excludePageId } }),
      },
    });
    return count > 0;
  },

  /**
   * Update page
   */
  async update(id: string, input: UpdatePageInput) {
    const data: Prisma.PageUpdateInput = {};

    if (input.slug !== undefined) data.slug = input.slug.toLowerCase().trim();
    if (input.title !== undefined) data.title = input.title.trim();
    if (input.content !== undefined) data.content = input.content;
    if (input.showInNav !== undefined) data.showInNav = input.showInNav;
    if (input.navLabel !== undefined) data.navLabel = input.navLabel?.trim() || null;
    if (input.navOrder !== undefined) data.navOrder = input.navOrder;
    if (input.metaTitle !== undefined) data.metaTitle = input.metaTitle?.trim() || null;
    if (input.metaDescription !== undefined)
      data.metaDescription = input.metaDescription?.trim() || null;

    if (input.isPublished !== undefined) {
      data.isPublished = input.isPublished;
      if (input.isPublished) {
        data.publishedAt = new Date();
      }
    }

    return prisma.page.update({ where: { id }, data });
  },

  /**
   * Update content HTML (after markdown rendering)
   */
  async updateContentHtml(id: string, contentHtml: string) {
    return prisma.page.update({
      where: { id },
      data: { contentHtml },
    });
  },

  /**
   * Delete page
   */
  async delete(id: string) {
    return prisma.page.delete({ where: { id } });
  },

  /**
   * Find all pages for a site
   */
  async findBySite(siteId: string) {
    return prisma.page.findMany({
      where: { siteId },
      orderBy: [{ showInNav: 'desc' }, { navOrder: 'asc' }, { createdAt: 'desc' }],
    });
  },

  /**
   * Find published pages for site (public)
   */
  async findPublishedBySite(siteId: string) {
    return prisma.page.findMany({
      where: { siteId, isPublished: true },
      orderBy: [{ showInNav: 'desc' }, { navOrder: 'asc' }],
    });
  },

  /**
   * Find navigation pages for site
   */
  async findNavPages(siteId: string) {
    return prisma.page.findMany({
      where: { siteId, isPublished: true, showInNav: true },
      orderBy: { navOrder: 'asc' },
      select: {
        id: true,
        slug: true,
        title: true,
        navLabel: true,
        navOrder: true,
      },
    });
  },

  /**
   * Reorder pages
   */
  async reorder(orders: Array<{ pageId: string; navOrder: number }>) {
    await prisma.$transaction(
      orders.map(({ pageId, navOrder }) =>
        prisma.page.update({
          where: { id: pageId },
          data: { navOrder },
        })
      )
    );
  },

  /**
   * Count pages by site
   */
  async countBySite(siteId: string): Promise<number> {
    return prisma.page.count({ where: { siteId } });
  },
};

export type PageRepository = typeof pageRepository;