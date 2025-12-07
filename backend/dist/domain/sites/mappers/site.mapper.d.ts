/**
 * Site Mappers
 */
import type { Site, Page, Theme } from '@prisma/client';
import type { SiteDTO, SiteSummaryDTO, SiteSettingsDTO, SiteDomainDTO, PageDTO, PageSummaryDTO, CollaboratorDTO, ThemeDTO, ThemeSummaryDTO, AdminSiteSummaryDTO, AdminSiteDetailDTO, SiteWithTheme, SiteWithAuthor, SiteWithCounts, CollaboratorWithUser } from '../types/site.types';
export declare const siteMapper: {
    toDTO(site: Site): SiteDTO;
    toSummaryDTO(site: Site & {
        _count?: {
            series: number;
        };
    }): SiteSummaryDTO;
    toSettingsDTO(site: SiteWithTheme): SiteSettingsDTO;
    toDomainDTO(site: Site): SiteDomainDTO;
};
export declare const pageMapper: {
    toDTO(page: Page): PageDTO;
    toSummaryDTO(page: Page): PageSummaryDTO;
};
export declare const collaboratorMapper: {
    toDTO(collab: CollaboratorWithUser): CollaboratorDTO;
};
export declare const themeMapper: {
    toDTO(theme: Theme): ThemeDTO;
    toSummaryDTO(theme: Theme): ThemeSummaryDTO;
};
export declare const adminSiteMapper: {
    toSummaryDTO(site: SiteWithAuthor & {
        _count?: {
            series: number;
        };
    }): AdminSiteSummaryDTO;
    toDetailDTO(site: SiteWithAuthor & SiteWithCounts): AdminSiteDetailDTO;
};
//# sourceMappingURL=site.mapper.d.ts.map