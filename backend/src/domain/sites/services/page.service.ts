// ==== FILE: src/domain/sites/services/page.service.ts ====
/**
 * Page Service
 */

import { logger } from '@/core/logger';
import { NotFoundError, ConflictError, BadRequestError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { pageRepository } from '../repositories/page.repository';
import { siteRepository } from '../repositories/site.repository';
import { pageMapper } from '../mappers/site.mapper';
import { isValidSlug } from '../entities/site.entity';
import type {
  CreatePageInput,
  UpdatePageInput,
  ReorderPagesInput,
  PageDTO,
  PageSummaryDTO,
} from '../types/site.types';

export const pageService = {
  /**
   * Create a new page
   */
  async createPage(input: CreatePageInput): Promise<PageDTO> {
    // Validate site exists
    const site = await siteRepository.findById(input.siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    // Validate slug format
    if (!isValidSlug(input.slug)) {
      throw new BadRequestError(
        'Invalid slug format. Use lowercase letters, numbers, and hyphens only.',
        ERROR_CODES.VALIDATION_ERROR
      );
    }

    // Check if slug exists
    const slugExists = await pageRepository.slugExists(input.siteId, input.slug);
    if (slugExists) {
      throw new ConflictError(
        'A page with this slug already exists',
        ERROR_CODES.PAGE_SLUG_TAKEN
      );
    }

    const page = await pageRepository.create(input);

    // TODO: Render markdown to HTML if needed
    // await pageRepository.updateContentHtml(page.id, renderedHtml);

    logger.info({ pageId: page.id, siteId: input.siteId }, 'Page created');

    return pageMapper.toDTO(page);
  },

  /**
   * Get page by ID
   */
  async getPage(pageId: string): Promise<PageDTO> {
    const page = await pageRepository.findById(pageId);
    if (!page) {
      throw new NotFoundError('Page not found', ERROR_CODES.PAGE_NOT_FOUND);
    }
    return pageMapper.toDTO(page);
  },

  /**
   * Get page by site and slug (public)
   */
  async getPageBySlug(siteId: string, slug: string): Promise<PageDTO> {
    const page = await pageRepository.findBySiteAndSlug(siteId, slug);
    if (!page || !page.isPublished) {
      throw new NotFoundError('Page not found', ERROR_CODES.PAGE_NOT_FOUND);
    }
    return pageMapper.toDTO(page);
  },

  /**
   * List pages for site
   */
  async listPages(siteId: string): Promise<PageSummaryDTO[]> {
    const pages = await pageRepository.findBySite(siteId);
    return pages.map((page) => pageMapper.toSummaryDTO(page));
  },

  /**
   * List published pages for site (public)
   */
  async listPublishedPages(siteId: string): Promise<PageSummaryDTO[]> {
    const pages = await pageRepository.findPublishedBySite(siteId);
    return pages.map((page) => pageMapper.toSummaryDTO(page));
  },

  /**
   * Update page
   */
  async updatePage(pageId: string, input: UpdatePageInput): Promise<PageDTO> {
    const page = await pageRepository.findById(pageId);
    if (!page) {
      throw new NotFoundError('Page not found', ERROR_CODES.PAGE_NOT_FOUND);
    }

    // Validate slug if changing
    if (input.slug && input.slug !== page.slug) {
      if (!isValidSlug(input.slug)) {
        throw new BadRequestError(
          'Invalid slug format',
          ERROR_CODES.VALIDATION_ERROR
        );
      }

      const slugExists = await pageRepository.slugExists(
        page.siteId,
        input.slug,
        pageId
      );
      if (slugExists) {
        throw new ConflictError(
          'A page with this slug already exists',
          ERROR_CODES.PAGE_SLUG_TAKEN
        );
      }
    }

    const updated = await pageRepository.update(pageId, input);

    // TODO: Re-render markdown to HTML if content changed
    // if (input.content !== undefined) {
    //   await pageRepository.updateContentHtml(pageId, renderedHtml);
    // }

    logger.info({ pageId }, 'Page updated');

    return pageMapper.toDTO(updated);
  },

  /**
   * Delete page
   */
  async deletePage(pageId: string): Promise<void> {
    const page = await pageRepository.findById(pageId);
    if (!page) {
      throw new NotFoundError('Page not found', ERROR_CODES.PAGE_NOT_FOUND);
    }

    await pageRepository.delete(pageId);

    logger.info({ pageId }, 'Page deleted');
  },

  /**
   * Reorder pages
   */
  async reorderPages(siteId: string, input: ReorderPagesInput): Promise<PageSummaryDTO[]> {
    // Validate all pages belong to the site
    for (const { pageId } of input.orders) {
      const page = await pageRepository.findById(pageId);
      if (!page || page.siteId !== siteId) {
        throw new BadRequestError(
          `Page ${pageId} not found or does not belong to this site`,
          ERROR_CODES.VALIDATION_ERROR
        );
      }
    }

    await pageRepository.reorder(input.orders);

    logger.info({ siteId, count: input.orders.length }, 'Pages reordered');

    return this.listPages(siteId);
  },

  /**
   * Check if page belongs to site
   */
  async belongsToSite(pageId: string, siteId: string): Promise<boolean> {
    const page = await pageRepository.findById(pageId);
    return page?.siteId === siteId;
  },
};

export type PageService = typeof pageService;