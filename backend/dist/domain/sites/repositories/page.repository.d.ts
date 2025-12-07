/**
 * Page Repository
 */
import type { CreatePageInput, UpdatePageInput } from '../types/site.types';
export declare const pageRepository: {
    /**
     * Create a new page
     */
    create(input: CreatePageInput): Promise<{
        content: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        siteId: string;
        metaTitle: string | null;
        metaDescription: string | null;
        contentHtml: string | null;
        isPublished: boolean;
        publishedAt: Date | null;
        showInNav: boolean;
        navOrder: number;
        navLabel: string | null;
    }>;
    /**
     * Find by ID
     */
    findById(id: string): Promise<{
        content: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        siteId: string;
        metaTitle: string | null;
        metaDescription: string | null;
        contentHtml: string | null;
        isPublished: boolean;
        publishedAt: Date | null;
        showInNav: boolean;
        navOrder: number;
        navLabel: string | null;
    } | null>;
    /**
     * Find by site and slug
     */
    findBySiteAndSlug(siteId: string, slug: string): Promise<{
        content: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        siteId: string;
        metaTitle: string | null;
        metaDescription: string | null;
        contentHtml: string | null;
        isPublished: boolean;
        publishedAt: Date | null;
        showInNav: boolean;
        navOrder: number;
        navLabel: string | null;
    } | null>;
    /**
     * Check if slug exists for site
     */
    slugExists(siteId: string, slug: string, excludePageId?: string): Promise<boolean>;
    /**
     * Update page
     */
    update(id: string, input: UpdatePageInput): Promise<{
        content: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        siteId: string;
        metaTitle: string | null;
        metaDescription: string | null;
        contentHtml: string | null;
        isPublished: boolean;
        publishedAt: Date | null;
        showInNav: boolean;
        navOrder: number;
        navLabel: string | null;
    }>;
    /**
     * Update content HTML (after markdown rendering)
     */
    updateContentHtml(id: string, contentHtml: string): Promise<{
        content: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        siteId: string;
        metaTitle: string | null;
        metaDescription: string | null;
        contentHtml: string | null;
        isPublished: boolean;
        publishedAt: Date | null;
        showInNav: boolean;
        navOrder: number;
        navLabel: string | null;
    }>;
    /**
     * Delete page
     */
    delete(id: string): Promise<{
        content: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        siteId: string;
        metaTitle: string | null;
        metaDescription: string | null;
        contentHtml: string | null;
        isPublished: boolean;
        publishedAt: Date | null;
        showInNav: boolean;
        navOrder: number;
        navLabel: string | null;
    }>;
    /**
     * Find all pages for a site
     */
    findBySite(siteId: string): Promise<{
        content: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        siteId: string;
        metaTitle: string | null;
        metaDescription: string | null;
        contentHtml: string | null;
        isPublished: boolean;
        publishedAt: Date | null;
        showInNav: boolean;
        navOrder: number;
        navLabel: string | null;
    }[]>;
    /**
     * Find published pages for site (public)
     */
    findPublishedBySite(siteId: string): Promise<{
        content: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        siteId: string;
        metaTitle: string | null;
        metaDescription: string | null;
        contentHtml: string | null;
        isPublished: boolean;
        publishedAt: Date | null;
        showInNav: boolean;
        navOrder: number;
        navLabel: string | null;
    }[]>;
    /**
     * Find navigation pages for site
     */
    findNavPages(siteId: string): Promise<{
        title: string;
        id: string;
        slug: string;
        navOrder: number;
        navLabel: string | null;
    }[]>;
    /**
     * Reorder pages
     */
    reorder(orders: Array<{
        pageId: string;
        navOrder: number;
    }>): Promise<void>;
    /**
     * Count pages by site
     */
    countBySite(siteId: string): Promise<number>;
};
export type PageRepository = typeof pageRepository;
//# sourceMappingURL=page.repository.d.ts.map