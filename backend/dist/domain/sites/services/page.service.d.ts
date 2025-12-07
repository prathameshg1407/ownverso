/**
 * Page Service
 */
import type { CreatePageInput, UpdatePageInput, ReorderPagesInput, PageDTO, PageSummaryDTO } from '../types/site.types';
export declare const pageService: {
    /**
     * Create a new page
     */
    createPage(input: CreatePageInput): Promise<PageDTO>;
    /**
     * Get page by ID
     */
    getPage(pageId: string): Promise<PageDTO>;
    /**
     * Get page by site and slug (public)
     */
    getPageBySlug(siteId: string, slug: string): Promise<PageDTO>;
    /**
     * List pages for site
     */
    listPages(siteId: string): Promise<PageSummaryDTO[]>;
    /**
     * List published pages for site (public)
     */
    listPublishedPages(siteId: string): Promise<PageSummaryDTO[]>;
    /**
     * Update page
     */
    updatePage(pageId: string, input: UpdatePageInput): Promise<PageDTO>;
    /**
     * Delete page
     */
    deletePage(pageId: string): Promise<void>;
    /**
     * Reorder pages
     */
    reorderPages(siteId: string, input: ReorderPagesInput): Promise<PageSummaryDTO[]>;
    /**
     * Check if page belongs to site
     */
    belongsToSite(pageId: string, siteId: string): Promise<boolean>;
};
export type PageService = typeof pageService;
//# sourceMappingURL=page.service.d.ts.map