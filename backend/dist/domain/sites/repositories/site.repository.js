"use strict";
// ==== FILE: src/domain/sites/repositories/site.repository.ts ====
/**
 * Site Repository
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteRepository = void 0;
const database_1 = require("../../../core/database");
const logger_1 = require("../../../core/logger");
const SITE_WITH_THEME_INCLUDE = {
    theme: true,
};
const SITE_WITH_AUTHOR_INCLUDE = {
    author: {
        select: {
            publicId: true,
            username: true,
            email: true,
            displayName: true,
        },
    },
};
const SITE_WITH_COUNTS_INCLUDE = {
    _count: {
        select: {
            series: true,
            pages: true,
            collaborators: true,
        },
    },
};
exports.siteRepository = {
    /**
     * Create a new site
     */
    async create(input) {
        const site = await database_1.prisma.site.create({
            data: {
                authorId: input.authorId,
                name: input.name.trim(),
                slug: input.slug.toLowerCase().trim(),
                tagline: input.tagline?.trim(),
                description: input.description?.trim(),
            },
        });
        logger_1.logger.debug({ siteId: site.id }, 'Site created');
        return site;
    },
    /**
     * Find by ID
     */
    async findById(id) {
        return database_1.prisma.site.findUnique({
            where: { id },
        });
    },
    /**
     * Find by ID with theme
     */
    async findByIdWithTheme(id) {
        return database_1.prisma.site.findUnique({
            where: { id },
            include: SITE_WITH_THEME_INCLUDE,
        });
    },
    /**
     * Find by ID with author
     */
    async findByIdWithAuthor(id) {
        return database_1.prisma.site.findUnique({
            where: { id },
            include: SITE_WITH_AUTHOR_INCLUDE,
        });
    },
    /**
     * Find by ID with counts
     */
    async findByIdWithCounts(id) {
        return database_1.prisma.site.findUnique({
            where: { id },
            include: SITE_WITH_COUNTS_INCLUDE,
        });
    },
    /**
     * Find by ID with all relations for admin
     */
    async findByIdFull(id) {
        return database_1.prisma.site.findUnique({
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
    async findBySlug(slug) {
        return database_1.prisma.site.findUnique({
            where: { slug: slug.toLowerCase() },
        });
    },
    /**
     * Find by author ID and slug
     */
    async findByAuthorAndSlug(authorId, slug) {
        return database_1.prisma.site.findUnique({
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
    async findByCustomDomain(domain) {
        return database_1.prisma.site.findUnique({
            where: { customDomain: domain.toLowerCase() },
        });
    },
    /**
     * Check if slug exists for author
     */
    async slugExists(authorId, slug, excludeSiteId) {
        const count = await database_1.prisma.site.count({
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
    async domainExists(domain, excludeSiteId) {
        const count = await database_1.prisma.site.count({
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
    async update(id, input) {
        const data = {};
        if (input.name !== undefined)
            data.name = input.name.trim();
        if (input.slug !== undefined)
            data.slug = input.slug.toLowerCase().trim();
        if (input.tagline !== undefined)
            data.tagline = input.tagline?.trim() || null;
        if (input.description !== undefined)
            data.description = input.description?.trim() || null;
        if (input.status !== undefined)
            data.status = input.status;
        return database_1.prisma.site.update({ where: { id }, data });
    },
    /**
     * Update site branding
     */
    async updateBranding(id, input) {
        return database_1.prisma.site.update({
            where: { id },
            data: input,
        });
    },
    /**
     * Update site theme
     */
    async updateTheme(id, input) {
        return database_1.prisma.site.update({
            where: { id },
            data: input,
        });
    },
    /**
     * Update site SEO
     */
    async updateSeo(id, input) {
        return database_1.prisma.site.update({
            where: { id },
            data: input,
        });
    },
    /**
     * Update site analytics
     */
    async updateAnalytics(id, input) {
        return database_1.prisma.site.update({
            where: { id },
            data: input,
        });
    },
    /**
     * Update site comments settings
     */
    async updateComments(id, input) {
        return database_1.prisma.site.update({
            where: { id },
            data: input,
        });
    },
    /**
     * Update custom domain
     */
    async updateCustomDomain(id, domain, verified = false) {
        return database_1.prisma.site.update({
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
    async verifyCustomDomain(id) {
        return database_1.prisma.site.update({
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
    async updateSslStatus(id, enabled, expiresAt) {
        return database_1.prisma.site.update({
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
    async updateStatus(id, status, reason) {
        const data = { status };
        if (status === 'SUSPENDED') {
            data.suspensionReason = reason || null;
            data.suspendedAt = new Date();
        }
        else if (status === 'ACTIVE') {
            data.suspensionReason = null;
            data.suspendedAt = null;
        }
        return database_1.prisma.site.update({ where: { id }, data });
    },
    /**
     * Soft delete site
     */
    async softDelete(id) {
        return database_1.prisma.site.update({
            where: { id },
            data: { status: 'DELETED' },
        });
    },
    /**
     * Find sites by author
     */
    async findByAuthorId(authorId) {
        return database_1.prisma.site.findMany({
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
    async findMany(options = {}) {
        const { authorId, status, isPublic, search, page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc', } = options;
        const where = {
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
            database_1.prisma.site.findMany({
                where,
                include: {
                    ...SITE_WITH_AUTHOR_INCLUDE,
                    ...SITE_WITH_COUNTS_INCLUDE,
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            database_1.prisma.site.count({ where }),
        ]);
        return { sites, total };
    },
    /**
     * Count sites by author
     */
    async countByAuthorId(authorId) {
        return database_1.prisma.site.count({
            where: {
                authorId,
                status: { not: 'DELETED' },
            },
        });
    },
    /**
     * Update last published timestamp
     */
    async updateLastPublished(id) {
        return database_1.prisma.site.update({
            where: { id },
            data: { lastPublishedAt: new Date() },
        });
    },
};
//# sourceMappingURL=site.repository.js.map