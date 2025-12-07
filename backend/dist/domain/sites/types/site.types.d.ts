/**
 * Sites Domain Types
 */
import type { Site, SiteStatus, ContentRating, CommentModerationMode, Collaborator, CollaboratorRole, Theme, PlatformTier } from '@prisma/client';
export interface CreateSiteInput {
    authorId: bigint;
    name: string;
    slug: string;
    tagline?: string;
    description?: string;
}
export interface UpdateSiteInput {
    name?: string;
    slug?: string;
    tagline?: string;
    description?: string;
    status?: SiteStatus;
}
export interface UpdateSiteGeneralInput {
    name?: string;
    slug?: string;
    tagline?: string;
    description?: string;
    status?: SiteStatus;
    isPublic?: boolean;
    maintenanceMode?: boolean;
    maintenanceMessage?: string;
}
export interface UpdateSiteBrandingInput {
    logoUrl?: string | null;
    faviconUrl?: string | null;
    coverImageUrl?: string | null;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    accentColor?: string | null;
}
export interface UpdateSiteThemeInput {
    themeId?: string | null;
    customCssEnabled?: boolean;
    customCss?: string | null;
}
export interface UpdateSiteSeoInput {
    metaTitle?: string | null;
    metaDescription?: string | null;
    ogImageUrl?: string | null;
}
export interface UpdateSiteAnalyticsInput {
    googleAnalyticsId?: string | null;
    analyticsEnabled?: boolean;
}
export interface UpdateSiteCommentsInput {
    commentsEnabled?: boolean;
    commentsModerationMode?: CommentModerationMode;
}
export interface AddDomainInput {
    customDomain: string;
}
export interface CreatePageInput {
    siteId: string;
    slug: string;
    title: string;
    content: string;
    isPublished?: boolean;
    showInNav?: boolean;
    navLabel?: string;
    navOrder?: number;
    metaTitle?: string;
    metaDescription?: string;
}
export interface UpdatePageInput {
    slug?: string;
    title?: string;
    content?: string;
    isPublished?: boolean;
    showInNav?: boolean;
    navLabel?: string;
    navOrder?: number;
    metaTitle?: string;
    metaDescription?: string;
}
export interface ReorderPagesInput {
    orders: Array<{
        pageId: string;
        navOrder: number;
    }>;
}
export interface InviteCollaboratorInput {
    siteId: string;
    email: string;
    role: CollaboratorRole;
    permissions?: Record<string, boolean>;
}
export interface UpdateCollaboratorInput {
    role?: CollaboratorRole;
    permissions?: Record<string, boolean>;
    isActive?: boolean;
}
export interface FindSitesOptions {
    authorId?: bigint;
    status?: SiteStatus;
    isPublic?: boolean;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface SiteDTO {
    id: string;
    slug: string;
    name: string;
    tagline: string | null;
    description: string | null;
    status: SiteStatus;
    isPublic: boolean;
    logoUrl: string | null;
    faviconUrl: string | null;
    coverImageUrl: string | null;
    primaryColor: string | null;
    secondaryColor: string | null;
    accentColor: string | null;
    themeId: string | null;
    customDomain: string | null;
    customDomainVerified: boolean;
    sslEnabled: boolean;
    defaultContentRating: ContentRating;
    commentsEnabled: boolean;
    lastPublishedAt: string | null;
    createdAt: string;
    updatedAt: string;
}
export interface SiteSummaryDTO {
    id: string;
    slug: string;
    name: string;
    tagline: string | null;
    status: SiteStatus;
    logoUrl: string | null;
    customDomain: string | null;
    seriesCount: number;
    subscriberCount: number;
    lastPublishedAt: string | null;
    createdAt: string;
}
export interface SiteSettingsDTO {
    general: SiteGeneralSettingsDTO;
    branding: SiteBrandingSettingsDTO;
    theme: SiteThemeSettingsDTO;
    seo: SiteSeoSettingsDTO;
    analytics: SiteAnalyticsSettingsDTO;
    comments: SiteCommentsSettingsDTO;
}
export interface SiteGeneralSettingsDTO {
    name: string;
    slug: string;
    tagline: string | null;
    description: string | null;
    status: SiteStatus;
    isPublic: boolean;
    maintenanceMode: boolean;
    maintenanceMessage: string | null;
}
export interface SiteBrandingSettingsDTO {
    logoUrl: string | null;
    faviconUrl: string | null;
    coverImageUrl: string | null;
    primaryColor: string | null;
    secondaryColor: string | null;
    accentColor: string | null;
}
export interface SiteThemeSettingsDTO {
    themeId: string | null;
    themeName: string | null;
    customCssEnabled: boolean;
    customCss: string | null;
}
export interface SiteSeoSettingsDTO {
    metaTitle: string | null;
    metaDescription: string | null;
    ogImageUrl: string | null;
}
export interface SiteAnalyticsSettingsDTO {
    googleAnalyticsId: string | null;
    analyticsEnabled: boolean;
}
export interface SiteCommentsSettingsDTO {
    commentsEnabled: boolean;
    commentsModerationMode: CommentModerationMode;
}
export interface SiteDomainDTO {
    customDomain: string | null;
    customDomainVerified: boolean;
    customDomainVerifiedAt: string | null;
    sslEnabled: boolean;
    sslExpiresAt: string | null;
    dnsRecords: DnsRecordDTO[];
}
export interface DnsRecordDTO {
    type: 'CNAME' | 'TXT' | 'A';
    name: string;
    value: string;
    ttl: number;
    verified: boolean;
}
export interface SiteStatsDTO {
    totalViews: number;
    totalSubscribers: number;
    totalRevenue: number;
    revenueCurrency: string;
    seriesCount: number;
    chapterCount: number;
    pageCount: number;
    collaboratorCount: number;
}
export interface SiteOverviewDTO {
    site: SiteDTO;
    stats: SiteStatsDTO;
    recentActivity: SiteActivityDTO[];
}
export interface SiteActivityDTO {
    type: string;
    title: string;
    description: string;
    timestamp: string;
    metadata?: Record<string, unknown>;
}
export interface PageDTO {
    id: string;
    slug: string;
    title: string;
    content: string;
    contentHtml: string | null;
    isPublished: boolean;
    publishedAt: string | null;
    showInNav: boolean;
    navOrder: number;
    navLabel: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    createdAt: string;
    updatedAt: string;
}
export interface PageSummaryDTO {
    id: string;
    slug: string;
    title: string;
    isPublished: boolean;
    showInNav: boolean;
    navOrder: number;
    updatedAt: string;
}
export interface CollaboratorDTO {
    id: string;
    userId: string;
    username: string;
    displayName: string;
    avatarUrl: string | null;
    role: CollaboratorRole;
    permissions: Record<string, boolean>;
    isActive: boolean;
    invitedAt: string;
    acceptedAt: string | null;
}
export interface CollaboratorInviteDTO {
    id: string;
    email: string;
    role: CollaboratorRole;
    inviteToken: string;
    invitedAt: string;
    expiresAt: string | null;
}
export interface ThemeDTO {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    thumbnailUrl: string | null;
    previewUrl: string | null;
    isPublic: boolean;
    isPremium: boolean;
    requiredTier: PlatformTier | null;
    usageCount: number;
}
export interface ThemeSummaryDTO {
    id: string;
    name: string;
    slug: string;
    thumbnailUrl: string | null;
    isPremium: boolean;
    requiredTier: PlatformTier | null;
}
export interface AdminSiteSummaryDTO {
    id: string;
    slug: string;
    name: string;
    status: SiteStatus;
    authorId: string;
    authorUsername: string;
    authorEmail: string;
    customDomain: string | null;
    seriesCount: number;
    createdAt: string;
}
export interface AdminSiteDetailDTO extends SiteDTO {
    authorId: string;
    authorPublicId: string;
    authorUsername: string;
    authorEmail: string;
    suspensionReason: string | null;
    suspendedAt: string | null;
    collaboratorCount: number;
    seriesCount: number;
    pageCount: number;
}
export type SiteWithTheme = Site & {
    theme: Theme | null;
};
export type SiteWithAuthor = Site & {
    author: {
        publicId: string;
        username: string;
        email: string;
        displayName: string;
    };
};
export type SiteWithCounts = Site & {
    _count: {
        series: number;
        pages: number;
        collaborators: number;
    };
};
export type CollaboratorWithUser = Collaborator & {
    user: {
        publicId: string;
        username: string;
        displayName: string;
        profile: {
            avatarUrl: string | null;
        } | null;
    };
};
//# sourceMappingURL=site.types.d.ts.map