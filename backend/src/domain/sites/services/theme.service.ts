// ==== FILE: src/domain/sites/services/theme.service.ts ====
/**
 * Theme Service
 */

import { NotFoundError, ForbiddenError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { themeRepository } from '../repositories/theme.repository';
import { siteRepository } from '../repositories/site.repository';
import { authorAccountRepository } from '@/domain/authors/repositories';
import { themeMapper } from '../mappers/site.mapper';
import { getTierLevel } from '@/domain/authors/entities/author-account.entity';
import type { PlatformTier } from '@prisma/client';
import type { ThemeDTO, ThemeSummaryDTO } from '../types/site.types';

export const themeService = {
  /**
   * List available themes for user's tier
   */
  async listThemes(authorId: bigint): Promise<ThemeSummaryDTO[]> {
    const authorAccount = await authorAccountRepository.findByUserId(authorId);
    const tier = authorAccount?.platformTier ?? 'FREE';

    const themes = await themeRepository.findAvailableForTier(tier);
    return themes.map((t) => themeMapper.toSummaryDTO(t));
  },

  /**
   * List all public themes (admin)
   */
  async listAllThemes(): Promise<ThemeDTO[]> {
    const { themes } = await themeRepository.findMany({ isPublic: true });
    return themes.map((t) => themeMapper.toDTO(t));
  },

  /**
   * Get theme by ID
   */
  async getTheme(themeId: string): Promise<ThemeDTO> {
    const theme = await themeRepository.findById(themeId);
    if (!theme) {
      throw new NotFoundError('Theme not found', ERROR_CODES.NOT_FOUND);
    }
    return themeMapper.toDTO(theme);
  },

  /**
   * Apply theme to site
   */
  async applyTheme(
    siteId: string,
    themeId: string,
    authorId: bigint
  ): Promise<void> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    const theme = await themeRepository.findById(themeId);
    if (!theme) {
      throw new NotFoundError('Theme not found', ERROR_CODES.NOT_FOUND);
    }

    // Check if user's tier allows this theme
    if (theme.isPremium && theme.requiredTier) {
      const authorAccount = await authorAccountRepository.findByUserId(authorId);
      const userTier = authorAccount?.platformTier ?? 'FREE';

      if (getTierLevel(userTier) < getTierLevel(theme.requiredTier)) {
        throw new ForbiddenError(
          `This theme requires ${theme.requiredTier} tier or higher`,
          ERROR_CODES.TIER_REQUIRED
        );
      }
    }

    // Update theme counters
    if (site.themeId && site.themeId !== themeId) {
      await themeRepository.decrementUsage(site.themeId);
    }
    await themeRepository.incrementUsage(themeId);

    await siteRepository.updateTheme(siteId, { themeId });
  },

  /**
   * Remove theme from site (use default)
   */
  async removeTheme(siteId: string): Promise<void> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    if (site.themeId) {
      await themeRepository.decrementUsage(site.themeId);
    }

    await siteRepository.updateTheme(siteId, { themeId: null });
  },

  /**
   * Check if theme is available for tier
   */
  async isThemeAvailableForTier(
    themeId: string,
    tier: PlatformTier
  ): Promise<boolean> {
    const theme = await themeRepository.findById(themeId);
    if (!theme) return false;

    if (!theme.isPremium || !theme.requiredTier) return true;

    return getTierLevel(tier) >= getTierLevel(theme.requiredTier);
  },
};

export type ThemeService = typeof themeService;