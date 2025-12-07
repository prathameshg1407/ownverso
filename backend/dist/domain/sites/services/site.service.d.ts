/**
 * Site Service
 */
import type { CreateSiteInput, UpdateSiteInput, SiteDTO, SiteSummaryDTO, SiteStatsDTO, SiteOverviewDTO } from '../types/site.types';
export declare const siteService: {
    /**
     * Create a new site
     */
    createSite(input: CreateSiteInput): Promise<SiteDTO>;
    /**
     * Get site by ID
     */
    getSite(siteId: string): Promise<SiteDTO>;
    /**
     * Get site by slug (public)
     */
    getSiteBySlug(slug: string): Promise<SiteDTO>;
    /**
     * List sites for author
     */
    listAuthorSites(authorId: bigint): Promise<SiteSummaryDTO[]>;
    /**
     * Update site
     */
    updateSite(siteId: string, input: UpdateSiteInput): Promise<SiteDTO>;
    /**
     * Delete site (soft delete)
     */
    deleteSite(siteId: string): Promise<void>;
    /**
     * Get site statistics
     */
    getSiteStats(siteId: string): Promise<SiteStatsDTO>;
    /**
     * Get site overview (combined data for dashboard)
     */
    getSiteOverview(siteId: string): Promise<SiteOverviewDTO>;
    /**
     * Check if user owns the site
     */
    isOwner(siteId: string, userId: bigint): Promise<boolean>;
    /**
     * Check if user can access site (owner or collaborator)
     */
    canAccess(siteId: string, userId: bigint): Promise<boolean>;
};
export type SiteService = typeof siteService;
//# sourceMappingURL=site.service.d.ts.map