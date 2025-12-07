"use strict";
// ==== FILE: src/domain/sites/services/theme.service.ts ====
/**
 * Theme Service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeService = void 0;
const errors_1 = require("../../../common/errors");
const constants_1 = require("../../../common/constants");
const theme_repository_1 = require("../repositories/theme.repository");
const site_repository_1 = require("../repositories/site.repository");
const repositories_1 = require("../../../domain/authors/repositories");
const site_mapper_1 = require("../mappers/site.mapper");
const author_account_entity_1 = require("../../../domain/authors/entities/author-account.entity");
exports.themeService = {
    /**
     * List available themes for user's tier
     */
    async listThemes(authorId) {
        const authorAccount = await repositories_1.authorAccountRepository.findByUserId(authorId);
        const tier = authorAccount?.platformTier ?? 'FREE';
        const themes = await theme_repository_1.themeRepository.findAvailableForTier(tier);
        return themes.map((t) => site_mapper_1.themeMapper.toSummaryDTO(t));
    },
    /**
     * List all public themes (admin)
     */
    async listAllThemes() {
        const { themes } = await theme_repository_1.themeRepository.findMany({ isPublic: true });
        return themes.map((t) => site_mapper_1.themeMapper.toDTO(t));
    },
    /**
     * Get theme by ID
     */
    async getTheme(themeId) {
        const theme = await theme_repository_1.themeRepository.findById(themeId);
        if (!theme) {
            throw new errors_1.NotFoundError('Theme not found', constants_1.ERROR_CODES.NOT_FOUND);
        }
        return site_mapper_1.themeMapper.toDTO(theme);
    },
    /**
     * Apply theme to site
     */
    async applyTheme(siteId, themeId, authorId) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        const theme = await theme_repository_1.themeRepository.findById(themeId);
        if (!theme) {
            throw new errors_1.NotFoundError('Theme not found', constants_1.ERROR_CODES.NOT_FOUND);
        }
        // Check if user's tier allows this theme
        if (theme.isPremium && theme.requiredTier) {
            const authorAccount = await repositories_1.authorAccountRepository.findByUserId(authorId);
            const userTier = authorAccount?.platformTier ?? 'FREE';
            if ((0, author_account_entity_1.getTierLevel)(userTier) < (0, author_account_entity_1.getTierLevel)(theme.requiredTier)) {
                throw new errors_1.ForbiddenError(`This theme requires ${theme.requiredTier} tier or higher`, constants_1.ERROR_CODES.TIER_REQUIRED);
            }
        }
        // Update theme counters
        if (site.themeId && site.themeId !== themeId) {
            await theme_repository_1.themeRepository.decrementUsage(site.themeId);
        }
        await theme_repository_1.themeRepository.incrementUsage(themeId);
        await site_repository_1.siteRepository.updateTheme(siteId, { themeId });
    },
    /**
     * Remove theme from site (use default)
     */
    async removeTheme(siteId) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        if (site.themeId) {
            await theme_repository_1.themeRepository.decrementUsage(site.themeId);
        }
        await site_repository_1.siteRepository.updateTheme(siteId, { themeId: null });
    },
    /**
     * Check if theme is available for tier
     */
    async isThemeAvailableForTier(themeId, tier) {
        const theme = await theme_repository_1.themeRepository.findById(themeId);
        if (!theme)
            return false;
        if (!theme.isPremium || !theme.requiredTier)
            return true;
        return (0, author_account_entity_1.getTierLevel)(tier) >= (0, author_account_entity_1.getTierLevel)(theme.requiredTier);
    },
};
//# sourceMappingURL=theme.service.js.map