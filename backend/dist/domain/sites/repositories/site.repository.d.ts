/**
 * Site Repository
 */
import { Prisma } from '@prisma/client';
import type { CreateSiteInput, UpdateSiteInput, FindSitesOptions, SiteWithTheme, SiteWithAuthor, SiteWithCounts } from '../types/site.types';
export declare const siteRepository: {
    /**
     * Create a new site
     */
    create(input: CreateSiteInput): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    }>;
    /**
     * Find by ID
     */
    findById(id: string): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    } | null>;
    /**
     * Find by ID with theme
     */
    findByIdWithTheme(id: string): Promise<SiteWithTheme | null>;
    /**
     * Find by ID with author
     */
    findByIdWithAuthor(id: string): Promise<SiteWithAuthor | null>;
    /**
     * Find by ID with counts
     */
    findByIdWithCounts(id: string): Promise<SiteWithCounts | null>;
    /**
     * Find by ID with all relations for admin
     */
    findByIdFull(id: string): Promise<(SiteWithAuthor & SiteWithCounts) | null>;
    /**
     * Find by slug
     */
    findBySlug(slug: string): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    } | null>;
    /**
     * Find by author ID and slug
     */
    findByAuthorAndSlug(authorId: bigint, slug: string): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    } | null>;
    /**
     * Find by custom domain
     */
    findByCustomDomain(domain: string): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    } | null>;
    /**
     * Check if slug exists for author
     */
    slugExists(authorId: bigint, slug: string, excludeSiteId?: string): Promise<boolean>;
    /**
     * Check if custom domain is taken
     */
    domainExists(domain: string, excludeSiteId?: string): Promise<boolean>;
    /**
     * Update site
     */
    update(id: string, input: UpdateSiteInput): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    }>;
    /**
     * Update site branding
     */
    updateBranding(id: string, input: {
        logoUrl?: string | null;
        faviconUrl?: string | null;
        coverImageUrl?: string | null;
        primaryColor?: string | null;
        secondaryColor?: string | null;
        accentColor?: string | null;
    }): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    }>;
    /**
     * Update site theme
     */
    updateTheme(id: string, input: {
        themeId?: string | null;
        customCssEnabled?: boolean;
        customCss?: string | null;
    }): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    }>;
    /**
     * Update site SEO
     */
    updateSeo(id: string, input: {
        metaTitle?: string | null;
        metaDescription?: string | null;
        ogImageUrl?: string | null;
    }): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    }>;
    /**
     * Update site analytics
     */
    updateAnalytics(id: string, input: {
        googleAnalyticsId?: string | null;
        analyticsEnabled?: boolean;
    }): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    }>;
    /**
     * Update site comments settings
     */
    updateComments(id: string, input: {
        commentsEnabled?: boolean;
        commentsModerationMode?: "NONE" | "PRE_APPROVE" | "POST_APPROVE" | "TRUSTED_ONLY";
    }): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    }>;
    /**
     * Update custom domain
     */
    updateCustomDomain(id: string, domain: string | null, verified?: boolean): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    }>;
    /**
     * Verify custom domain
     */
    verifyCustomDomain(id: string): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    }>;
    /**
     * Update SSL status
     */
    updateSslStatus(id: string, enabled: boolean, expiresAt?: Date): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    }>;
    /**
     * Update site status
     */
    updateStatus(id: string, status: "DRAFT" | "ACTIVE" | "MAINTENANCE" | "SUSPENDED" | "DELETED", reason?: string): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    }>;
    /**
     * Soft delete site
     */
    softDelete(id: string): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    }>;
    /**
     * Find sites by author
     */
    findByAuthorId(authorId: bigint): Promise<({
        _count: {
            series: number;
            pages: number;
            collaborators: number;
        };
    } & {
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    })[]>;
    /**
     * Find many sites with pagination
     */
    findMany(options?: FindSitesOptions): Promise<{
        sites: ({
            _count: {
                series: number;
                pages: number;
                collaborators: number;
            };
            author: {
                email: string;
                publicId: string;
                username: string;
                displayName: string;
            };
        } & {
            status: import("@prisma/client").$Enums.SiteStatus;
            name: string;
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            tagline: string | null;
            slug: string;
            customDomain: string | null;
            authorId: bigint;
            logoUrl: string | null;
            faviconUrl: string | null;
            coverImageUrl: string | null;
            themeId: string | null;
            primaryColor: string | null;
            secondaryColor: string | null;
            accentColor: string | null;
            customCss: string | null;
            customCssEnabled: boolean;
            customDomainVerified: boolean;
            customDomainVerifiedAt: Date | null;
            customDomainDnsRecords: Prisma.JsonValue | null;
            sslEnabled: boolean;
            sslExpiresAt: Date | null;
            isPublic: boolean;
            maintenanceMode: boolean;
            maintenanceMessage: string | null;
            suspensionReason: string | null;
            suspendedAt: Date | null;
            metaTitle: string | null;
            metaDescription: string | null;
            ogImageUrl: string | null;
            googleAnalyticsId: string | null;
            analyticsEnabled: boolean;
            defaultContentRating: import("@prisma/client").$Enums.ContentRating;
            commentsEnabled: boolean;
            commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
            lastPublishedAt: Date | null;
        })[];
        total: number;
    }>;
    /**
     * Count sites by author
     */
    countByAuthorId(authorId: bigint): Promise<number>;
    /**
     * Update last published timestamp
     */
    updateLastPublished(id: string): Promise<{
        status: import("@prisma/client").$Enums.SiteStatus;
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tagline: string | null;
        slug: string;
        customDomain: string | null;
        authorId: bigint;
        logoUrl: string | null;
        faviconUrl: string | null;
        coverImageUrl: string | null;
        themeId: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        accentColor: string | null;
        customCss: string | null;
        customCssEnabled: boolean;
        customDomainVerified: boolean;
        customDomainVerifiedAt: Date | null;
        customDomainDnsRecords: Prisma.JsonValue | null;
        sslEnabled: boolean;
        sslExpiresAt: Date | null;
        isPublic: boolean;
        maintenanceMode: boolean;
        maintenanceMessage: string | null;
        suspensionReason: string | null;
        suspendedAt: Date | null;
        metaTitle: string | null;
        metaDescription: string | null;
        ogImageUrl: string | null;
        googleAnalyticsId: string | null;
        analyticsEnabled: boolean;
        defaultContentRating: import("@prisma/client").$Enums.ContentRating;
        commentsEnabled: boolean;
        commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
        lastPublishedAt: Date | null;
    }>;
};
export type SiteRepository = typeof siteRepository;
//# sourceMappingURL=site.repository.d.ts.map