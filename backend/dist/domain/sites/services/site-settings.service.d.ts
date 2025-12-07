/**
 * Site Settings Service
 */
import type { SiteSettingsDTO, SiteGeneralSettingsDTO, SiteBrandingSettingsDTO, SiteThemeSettingsDTO, SiteSeoSettingsDTO, SiteAnalyticsSettingsDTO, SiteCommentsSettingsDTO, UpdateSiteGeneralInput, UpdateSiteBrandingInput, UpdateSiteThemeInput, UpdateSiteSeoInput, UpdateSiteAnalyticsInput, UpdateSiteCommentsInput } from '../types/site.types';
export declare const siteSettingsService: {
    /**
     * Get all site settings
     */
    getSettings(siteId: string): Promise<SiteSettingsDTO>;
    /**
     * Update general settings
     */
    updateGeneral(siteId: string, input: UpdateSiteGeneralInput): Promise<SiteGeneralSettingsDTO>;
    /**
     * Update branding settings
     */
    updateBranding(siteId: string, input: UpdateSiteBrandingInput): Promise<SiteBrandingSettingsDTO>;
    /**
     * Update theme settings
     */
    updateTheme(siteId: string, input: UpdateSiteThemeInput): Promise<SiteThemeSettingsDTO>;
    /**
     * Update SEO settings
     */
    updateSeo(siteId: string, input: UpdateSiteSeoInput): Promise<SiteSeoSettingsDTO>;
    /**
     * Update analytics settings
     */
    updateAnalytics(siteId: string, input: UpdateSiteAnalyticsInput): Promise<SiteAnalyticsSettingsDTO>;
    /**
     * Update comments settings
     */
    updateComments(siteId: string, input: UpdateSiteCommentsInput): Promise<SiteCommentsSettingsDTO>;
};
export type SiteSettingsService = typeof siteSettingsService;
//# sourceMappingURL=site-settings.service.d.ts.map