"use strict";
// ==== FILE: src/domain/sites/services/page.service.ts ====
/**
 * Page Service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageService = void 0;
const logger_1 = require("../../../core/logger");
const errors_1 = require("../../../common/errors");
const constants_1 = require("../../../common/constants");
const page_repository_1 = require("../repositories/page.repository");
const site_repository_1 = require("../repositories/site.repository");
const site_mapper_1 = require("../mappers/site.mapper");
const site_entity_1 = require("../entities/site.entity");
exports.pageService = {
    /**
     * Create a new page
     */
    async createPage(input) {
        // Validate site exists
        const site = await site_repository_1.siteRepository.findById(input.siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        // Validate slug format
        if (!(0, site_entity_1.isValidSlug)(input.slug)) {
            throw new errors_1.BadRequestError('Invalid slug format. Use lowercase letters, numbers, and hyphens only.', constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
        // Check if slug exists
        const slugExists = await page_repository_1.pageRepository.slugExists(input.siteId, input.slug);
        if (slugExists) {
            throw new errors_1.ConflictError('A page with this slug already exists', constants_1.ERROR_CODES.PAGE_SLUG_TAKEN);
        }
        const page = await page_repository_1.pageRepository.create(input);
        // TODO: Render markdown to HTML if needed
        // await pageRepository.updateContentHtml(page.id, renderedHtml);
        logger_1.logger.info({ pageId: page.id, siteId: input.siteId }, 'Page created');
        return site_mapper_1.pageMapper.toDTO(page);
    },
    /**
     * Get page by ID
     */
    async getPage(pageId) {
        const page = await page_repository_1.pageRepository.findById(pageId);
        if (!page) {
            throw new errors_1.NotFoundError('Page not found', constants_1.ERROR_CODES.PAGE_NOT_FOUND);
        }
        return site_mapper_1.pageMapper.toDTO(page);
    },
    /**
     * Get page by site and slug (public)
     */
    async getPageBySlug(siteId, slug) {
        const page = await page_repository_1.pageRepository.findBySiteAndSlug(siteId, slug);
        if (!page || !page.isPublished) {
            throw new errors_1.NotFoundError('Page not found', constants_1.ERROR_CODES.PAGE_NOT_FOUND);
        }
        return site_mapper_1.pageMapper.toDTO(page);
    },
    /**
     * List pages for site
     */
    async listPages(siteId) {
        const pages = await page_repository_1.pageRepository.findBySite(siteId);
        return pages.map((page) => site_mapper_1.pageMapper.toSummaryDTO(page));
    },
    /**
     * List published pages for site (public)
     */
    async listPublishedPages(siteId) {
        const pages = await page_repository_1.pageRepository.findPublishedBySite(siteId);
        return pages.map((page) => site_mapper_1.pageMapper.toSummaryDTO(page));
    },
    /**
     * Update page
     */
    async updatePage(pageId, input) {
        const page = await page_repository_1.pageRepository.findById(pageId);
        if (!page) {
            throw new errors_1.NotFoundError('Page not found', constants_1.ERROR_CODES.PAGE_NOT_FOUND);
        }
        // Validate slug if changing
        if (input.slug && input.slug !== page.slug) {
            if (!(0, site_entity_1.isValidSlug)(input.slug)) {
                throw new errors_1.BadRequestError('Invalid slug format', constants_1.ERROR_CODES.VALIDATION_ERROR);
            }
            const slugExists = await page_repository_1.pageRepository.slugExists(page.siteId, input.slug, pageId);
            if (slugExists) {
                throw new errors_1.ConflictError('A page with this slug already exists', constants_1.ERROR_CODES.PAGE_SLUG_TAKEN);
            }
        }
        const updated = await page_repository_1.pageRepository.update(pageId, input);
        // TODO: Re-render markdown to HTML if content changed
        // if (input.content !== undefined) {
        //   await pageRepository.updateContentHtml(pageId, renderedHtml);
        // }
        logger_1.logger.info({ pageId }, 'Page updated');
        return site_mapper_1.pageMapper.toDTO(updated);
    },
    /**
     * Delete page
     */
    async deletePage(pageId) {
        const page = await page_repository_1.pageRepository.findById(pageId);
        if (!page) {
            throw new errors_1.NotFoundError('Page not found', constants_1.ERROR_CODES.PAGE_NOT_FOUND);
        }
        await page_repository_1.pageRepository.delete(pageId);
        logger_1.logger.info({ pageId }, 'Page deleted');
    },
    /**
     * Reorder pages
     */
    async reorderPages(siteId, input) {
        // Validate all pages belong to the site
        for (const { pageId } of input.orders) {
            const page = await page_repository_1.pageRepository.findById(pageId);
            if (!page || page.siteId !== siteId) {
                throw new errors_1.BadRequestError(`Page ${pageId} not found or does not belong to this site`, constants_1.ERROR_CODES.VALIDATION_ERROR);
            }
        }
        await page_repository_1.pageRepository.reorder(input.orders);
        logger_1.logger.info({ siteId, count: input.orders.length }, 'Pages reordered');
        return this.listPages(siteId);
    },
    /**
     * Check if page belongs to site
     */
    async belongsToSite(pageId, siteId) {
        const page = await page_repository_1.pageRepository.findById(pageId);
        return page?.siteId === siteId;
    },
};
//# sourceMappingURL=page.service.js.map