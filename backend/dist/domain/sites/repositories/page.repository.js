"use strict";
// ==== FILE: src/domain/sites/repositories/page.repository.ts ====
/**
 * Page Repository
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageRepository = void 0;
const database_1 = require("../../../core/database");
const logger_1 = require("../../../core/logger");
exports.pageRepository = {
    /**
     * Create a new page
     */
    async create(input) {
        const page = await database_1.prisma.page.create({
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
        logger_1.logger.debug({ pageId: page.id, siteId: input.siteId }, 'Page created');
        return page;
    },
    /**
     * Find by ID
     */
    async findById(id) {
        return database_1.prisma.page.findUnique({ where: { id } });
    },
    /**
     * Find by site and slug
     */
    async findBySiteAndSlug(siteId, slug) {
        return database_1.prisma.page.findUnique({
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
    async slugExists(siteId, slug, excludePageId) {
        const count = await database_1.prisma.page.count({
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
    async update(id, input) {
        const data = {};
        if (input.slug !== undefined)
            data.slug = input.slug.toLowerCase().trim();
        if (input.title !== undefined)
            data.title = input.title.trim();
        if (input.content !== undefined)
            data.content = input.content;
        if (input.showInNav !== undefined)
            data.showInNav = input.showInNav;
        if (input.navLabel !== undefined)
            data.navLabel = input.navLabel?.trim() || null;
        if (input.navOrder !== undefined)
            data.navOrder = input.navOrder;
        if (input.metaTitle !== undefined)
            data.metaTitle = input.metaTitle?.trim() || null;
        if (input.metaDescription !== undefined)
            data.metaDescription = input.metaDescription?.trim() || null;
        if (input.isPublished !== undefined) {
            data.isPublished = input.isPublished;
            if (input.isPublished) {
                data.publishedAt = new Date();
            }
        }
        return database_1.prisma.page.update({ where: { id }, data });
    },
    /**
     * Update content HTML (after markdown rendering)
     */
    async updateContentHtml(id, contentHtml) {
        return database_1.prisma.page.update({
            where: { id },
            data: { contentHtml },
        });
    },
    /**
     * Delete page
     */
    async delete(id) {
        return database_1.prisma.page.delete({ where: { id } });
    },
    /**
     * Find all pages for a site
     */
    async findBySite(siteId) {
        return database_1.prisma.page.findMany({
            where: { siteId },
            orderBy: [{ showInNav: 'desc' }, { navOrder: 'asc' }, { createdAt: 'desc' }],
        });
    },
    /**
     * Find published pages for site (public)
     */
    async findPublishedBySite(siteId) {
        return database_1.prisma.page.findMany({
            where: { siteId, isPublished: true },
            orderBy: [{ showInNav: 'desc' }, { navOrder: 'asc' }],
        });
    },
    /**
     * Find navigation pages for site
     */
    async findNavPages(siteId) {
        return database_1.prisma.page.findMany({
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
    async reorder(orders) {
        await database_1.prisma.$transaction(orders.map(({ pageId, navOrder }) => database_1.prisma.page.update({
            where: { id: pageId },
            data: { navOrder },
        })));
    },
    /**
     * Count pages by site
     */
    async countBySite(siteId) {
        return database_1.prisma.page.count({ where: { siteId } });
    },
};
//# sourceMappingURL=page.repository.js.map