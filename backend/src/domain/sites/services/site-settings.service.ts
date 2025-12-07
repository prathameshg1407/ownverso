// ==== FILE: src/domain/sites/services/site-settings.service.ts ====
/**
 * Site Settings Service
 */

import { logger } from '@/core/logger';
import { NotFoundError, BadRequestError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { siteRepository } from '../repositories/site.repository';
import { themeRepository } from '../repositories/theme.repository';
import { siteMapper } from '../mappers/site.mapper';
import { isValidHexColor } from '../entities/site.entity';
import type {
  SiteSettingsDTO,
  SiteGeneralSettingsDTO,
  SiteBrandingSettingsDTO,
  SiteThemeSettingsDTO,
  SiteSeoSettingsDTO,
  SiteAnalyticsSettingsDTO,
  SiteCommentsSettingsDTO,
  UpdateSiteGeneralInput,
  UpdateSiteBrandingInput,
  UpdateSiteThemeInput,
  UpdateSiteSeoInput,
  UpdateSiteAnalyticsInput,
  UpdateSiteCommentsInput,
} from '../types/site.types';

export const siteSettingsService = {
  /**
   * Get all site settings
   */
  async getSettings(siteId: string): Promise<SiteSettingsDTO> {
    const site = await siteRepository.findByIdWithTheme(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }
    return siteMapper.toSettingsDTO(site);
  },

  /**
   * Update general settings
   */
  async updateGeneral(
    siteId: string,
    input: UpdateSiteGeneralInput
  ): Promise<SiteGeneralSettingsDTO> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    // Validate slug if changing
    if (input.slug && input.slug !== site.slug) {
      const slugExists = await siteRepository.slugExists(
        site.authorId,
        input.slug,
        siteId
      );
      if (slugExists) {
        throw new BadRequestError(
          'A site with this slug already exists',
          ERROR_CODES.SITE_SLUG_TAKEN
        );
      }
    }

    const updated = await siteRepository.update(siteId, {
      name: input.name,
      slug: input.slug,
      tagline: input.tagline,
      description: input.description,
      status: input.status,
    });

    // Update maintenance mode separately if provided
    if (input.maintenanceMode !== undefined || input.maintenanceMessage !== undefined) {
      await siteRepository.update(siteId, {
        // maintenanceMode and maintenanceMessage would need to be added to UpdateSiteInput
      });
    }

    logger.info({ siteId }, 'Site general settings updated');

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
  async updateBranding(
    siteId: string,
    input: UpdateSiteBrandingInput
  ): Promise<SiteBrandingSettingsDTO> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    // Validate colors if provided
    const colors = [input.primaryColor, input.secondaryColor, input.accentColor];
    for (const color of colors) {
      if (color && !isValidHexColor(color)) {
        throw new BadRequestError(
          'Invalid color format. Use hex format like #FF5733',
          ERROR_CODES.VALIDATION_ERROR
        );
      }
    }

    const updated = await siteRepository.updateBranding(siteId, input);

    logger.info({ siteId }, 'Site branding updated');

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
  async updateTheme(
    siteId: string,
    input: UpdateSiteThemeInput
  ): Promise<SiteThemeSettingsDTO> {
    const site = await siteRepository.findByIdWithTheme(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    // Validate theme exists if changing
    let themeName: string | null = site.theme?.name ?? null;
    if (input.themeId !== undefined && input.themeId !== site.themeId) {
      if (input.themeId) {
        const theme = await themeRepository.findById(input.themeId);
        if (!theme) {
          throw new BadRequestError('Theme not found', ERROR_CODES.NOT_FOUND);
        }
        themeName = theme.name;

        // TODO: Check if user's tier allows this theme
      } else {
        themeName = null;
      }
    }

    const updated = await siteRepository.updateTheme(siteId, input);

    logger.info({ siteId, themeId: input.themeId }, 'Site theme updated');

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
  async updateSeo(
    siteId: string,
    input: UpdateSiteSeoInput
  ): Promise<SiteSeoSettingsDTO> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    const updated = await siteRepository.updateSeo(siteId, input);

    logger.info({ siteId }, 'Site SEO updated');

    return {
      metaTitle: updated.metaTitle,
      metaDescription: updated.metaDescription,
      ogImageUrl: updated.ogImageUrl,
    };
  },

  /**
   * Update analytics settings
   */
  async updateAnalytics(
    siteId: string,
    input: UpdateSiteAnalyticsInput
  ): Promise<SiteAnalyticsSettingsDTO> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    const updated = await siteRepository.updateAnalytics(siteId, input);

    logger.info({ siteId }, 'Site analytics updated');

    return {
      googleAnalyticsId: updated.googleAnalyticsId,
      analyticsEnabled: updated.analyticsEnabled,
    };
  },

  /**
   * Update comments settings
   */
  async updateComments(
    siteId: string,
    input: UpdateSiteCommentsInput
  ): Promise<SiteCommentsSettingsDTO> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    const updated = await siteRepository.updateComments(siteId, input);

    logger.info({ siteId }, 'Site comments settings updated');

    return {
      commentsEnabled: updated.commentsEnabled,
      commentsModerationMode: updated.commentsModerationMode,
    };
  },
};

export type SiteSettingsService = typeof siteSettingsService;