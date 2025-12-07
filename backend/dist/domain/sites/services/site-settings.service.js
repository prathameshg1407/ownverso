"use strict";
// ==== FILE: src/domain/sites/services/site-settings.service.ts ====
/**
 * Site Settings Service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteSettingsService = void 0;
const logger_1 = require("../../../core/logger");
const errors_1 = require("../../../common/errors");
const constants_1 = require("../../../common/constants");
const site_repository_1 = require("../repositories/site.repository");
const theme_repository_1 = require("../repositories/theme.repository");
const site_mapper_1 = require("../mappers/site.mapper");
const site_entity_1 = require("../entities/site.entity");
exports.siteSettingsService = {
    /**
     * Get all site settings
     */
    async getSettings(siteId) {
        const site = await site_repository_1.siteRepository.findByIdWithTheme(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        return site_mapper_1.siteMapper.toSettingsDTO(site);
    },
    /**
     * Update general settings
     */
    async updateGeneral(siteId, input) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        // Validate slug if changing
        if (input.slug && input.slug !== site.slug) {
            const slugExists = await site_repository_1.siteRepository.slugExists(site.authorId, input.slug, siteId);
            if (slugExists) {
                throw new errors_1.BadRequestError('A site with this slug already exists', constants_1.ERROR_CODES.SITE_SLUG_TAKEN);
            }
        }
        const updated = await site_repository_1.siteRepository.update(siteId, {
            name: input.name,
            slug: input.slug,
            tagline: input.tagline,
            description: input.description,
            status: input.status,
        });
        // Update maintenance mode separately if provided
        if (input.maintenanceMode !== undefined || input.maintenanceMessage !== undefined) {
            await site_repository_1.siteRepository.update(siteId, {
            // maintenanceMode and maintenanceMessage would need to be added to UpdateSiteInput
            });
        }
        logger_1.logger.info({ siteId }, 'Site general settings updated');
        return {
            name: updated.name,
            slug: updated.slug,
            tagline: updated.tagline,
            description: updated.description,
            status: updated.status,
            isPublic: updated.isPublic,
            maintenanceMode: updated.maintenanceMode,
            maintenanceMessage: updated.maintenanceMessage,
        };
    },
    /**
     * Update branding settings
     */
    async updateBranding(siteId, input) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        // Validate colors if provided
        const colors = [input.primaryColor, input.secondaryColor, input.accentColor];
        for (const color of colors) {
            if (color && !(0, site_entity_1.isValidHexColor)(color)) {
                throw new errors_1.BadRequestError('Invalid color format. Use hex format like #FF5733', constants_1.ERROR_CODES.VALIDATION_ERROR);
            }
        }
        const updated = await site_repository_1.siteRepository.updateBranding(siteId, input);
        logger_1.logger.info({ siteId }, 'Site branding updated');
        return {
            logoUrl: updated.logoUrl,
            faviconUrl: updated.faviconUrl,
            coverImageUrl: updated.coverImageUrl,
            primaryColor: updated.primaryColor,
            secondaryColor: updated.secondaryColor,
            accentColor: updated.accentColor,
        };
    },
    /**
     * Update theme settings
     */
    async updateTheme(siteId, input) {
        const site = await site_repository_1.siteRepository.findByIdWithTheme(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        // Validate theme exists if changing
        let themeName = site.theme?.name ?? null;
        if (input.themeId !== undefined && input.themeId !== site.themeId) {
            if (input.themeId) {
                const theme = await theme_repository_1.themeRepository.findById(input.themeId);
                if (!theme) {
                    throw new errors_1.BadRequestError('Theme not found', constants_1.ERROR_CODES.NOT_FOUND);
                }
                themeName = theme.name;
                // TODO: Check if user's tier allows this theme
            }
            else {
                themeName = null;
            }
        }
        const updated = await site_repository_1.siteRepository.updateTheme(siteId, input);
        logger_1.logger.info({ siteId, themeId: input.themeId }, 'Site theme updated');
        return {
            themeId: updated.themeId,
            themeName,
            customCssEnabled: updated.customCssEnabled,
            customCss: updated.customCss,
        };
    },
    /**
     * Update SEO settings
     */
    async updateSeo(siteId, input) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        const updated = await site_repository_1.siteRepository.updateSeo(siteId, input);
        logger_1.logger.info({ siteId }, 'Site SEO updated');
        return {
            metaTitle: updated.metaTitle,
            metaDescription: updated.metaDescription,
            ogImageUrl: updated.ogImageUrl,
        };
    },
    /**
     * Update analytics settings
     */
    async updateAnalytics(siteId, input) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        const updated = await site_repository_1.siteRepository.updateAnalytics(siteId, input);
        logger_1.logger.info({ siteId }, 'Site analytics updated');
        return {
            googleAnalyticsId: updated.googleAnalyticsId,
            analyticsEnabled: updated.analyticsEnabled,
        };
    },
    /**
     * Update comments settings
     */
    async updateComments(siteId, input) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        const updated = await site_repository_1.siteRepository.updateComments(siteId, input);
        logger_1.logger.info({ siteId }, 'Site comments settings updated');
        return {
            commentsEnabled: updated.commentsEnabled,
            commentsModerationMode: updated.commentsModerationMode,
        };
    },
};
//# sourceMappingURL=site-settings.service.js.map