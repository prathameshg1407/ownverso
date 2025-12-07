/**
 * Sites Management Schemas
 */
import { Static } from '@sinclair/typebox';
export declare const SiteStatusSchema: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
export declare const ContentRatingSchema: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"EVERYONE">, import("@sinclair/typebox").TLiteral<"TEEN">, import("@sinclair/typebox").TLiteral<"MATURE">, import("@sinclair/typebox").TLiteral<"ADULT_ONLY">]>;
export declare const CommentModerationModeSchema: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"NONE">, import("@sinclair/typebox").TLiteral<"PRE_APPROVE">, import("@sinclair/typebox").TLiteral<"POST_APPROVE">, import("@sinclair/typebox").TLiteral<"TRUSTED_ONLY">]>;
export declare const CollaboratorRoleSchema: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"VIEWER">, import("@sinclair/typebox").TLiteral<"EDITOR">, import("@sinclair/typebox").TLiteral<"TRANSLATOR">, import("@sinclair/typebox").TLiteral<"ANALYST">, import("@sinclair/typebox").TLiteral<"MANAGER">, import("@sinclair/typebox").TLiteral<"OWNER">]>;
export declare const PlatformTierSchema: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>;
export declare const NullableStringSchema: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
export declare const DateTimeSchema: import("@sinclair/typebox").TString;
export declare const NullableDateTimeSchema: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
export declare const SlugSchema: import("@sinclair/typebox").TString;
export declare const HexColorSchema: import("@sinclair/typebox").TString;
export declare const SiteSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    slug: import("@sinclair/typebox").TString;
    name: import("@sinclair/typebox").TString;
    tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
    isPublic: import("@sinclair/typebox").TBoolean;
    logoUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    faviconUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    coverImageUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    primaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    secondaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    accentColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    themeId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    customDomain: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    customDomainVerified: import("@sinclair/typebox").TBoolean;
    sslEnabled: import("@sinclair/typebox").TBoolean;
    defaultContentRating: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"EVERYONE">, import("@sinclair/typebox").TLiteral<"TEEN">, import("@sinclair/typebox").TLiteral<"MATURE">, import("@sinclair/typebox").TLiteral<"ADULT_ONLY">]>;
    commentsEnabled: import("@sinclair/typebox").TBoolean;
    lastPublishedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    createdAt: import("@sinclair/typebox").TString;
    updatedAt: import("@sinclair/typebox").TString;
}>;
export declare const SiteSummarySchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    slug: import("@sinclair/typebox").TString;
    name: import("@sinclair/typebox").TString;
    tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
    logoUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    customDomain: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    seriesCount: import("@sinclair/typebox").TInteger;
    subscriberCount: import("@sinclair/typebox").TInteger;
    lastPublishedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    createdAt: import("@sinclair/typebox").TString;
}>;
export declare const SiteStatsSchema: import("@sinclair/typebox").TObject<{
    totalViews: import("@sinclair/typebox").TInteger;
    totalSubscribers: import("@sinclair/typebox").TInteger;
    totalRevenue: import("@sinclair/typebox").TNumber;
    revenueCurrency: import("@sinclair/typebox").TString;
    seriesCount: import("@sinclair/typebox").TInteger;
    chapterCount: import("@sinclair/typebox").TInteger;
    pageCount: import("@sinclair/typebox").TInteger;
    collaboratorCount: import("@sinclair/typebox").TInteger;
}>;
export declare const SiteGeneralSettingsSchema: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TString;
    slug: import("@sinclair/typebox").TString;
    tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
    isPublic: import("@sinclair/typebox").TBoolean;
    maintenanceMode: import("@sinclair/typebox").TBoolean;
    maintenanceMessage: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
}>;
export declare const SiteBrandingSettingsSchema: import("@sinclair/typebox").TObject<{
    logoUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    faviconUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    coverImageUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    primaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    secondaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    accentColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
}>;
export declare const SiteThemeSettingsSchema: import("@sinclair/typebox").TObject<{
    themeId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    themeName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    customCssEnabled: import("@sinclair/typebox").TBoolean;
    customCss: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
}>;
export declare const SiteSeoSettingsSchema: import("@sinclair/typebox").TObject<{
    metaTitle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    metaDescription: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    ogImageUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
}>;
export declare const SiteAnalyticsSettingsSchema: import("@sinclair/typebox").TObject<{
    googleAnalyticsId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    analyticsEnabled: import("@sinclair/typebox").TBoolean;
}>;
export declare const SiteCommentsSettingsSchema: import("@sinclair/typebox").TObject<{
    commentsEnabled: import("@sinclair/typebox").TBoolean;
    commentsModerationMode: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"NONE">, import("@sinclair/typebox").TLiteral<"PRE_APPROVE">, import("@sinclair/typebox").TLiteral<"POST_APPROVE">, import("@sinclair/typebox").TLiteral<"TRUSTED_ONLY">]>;
}>;
export declare const SiteSettingsSchema: import("@sinclair/typebox").TObject<{
    general: import("@sinclair/typebox").TObject<{
        name: import("@sinclair/typebox").TString;
        slug: import("@sinclair/typebox").TString;
        tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
        isPublic: import("@sinclair/typebox").TBoolean;
        maintenanceMode: import("@sinclair/typebox").TBoolean;
        maintenanceMessage: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    }>;
    branding: import("@sinclair/typebox").TObject<{
        logoUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        faviconUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        coverImageUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        primaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        secondaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        accentColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    }>;
    theme: import("@sinclair/typebox").TObject<{
        themeId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        themeName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        customCssEnabled: import("@sinclair/typebox").TBoolean;
        customCss: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    }>;
    seo: import("@sinclair/typebox").TObject<{
        metaTitle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        metaDescription: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        ogImageUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    }>;
    analytics: import("@sinclair/typebox").TObject<{
        googleAnalyticsId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        analyticsEnabled: import("@sinclair/typebox").TBoolean;
    }>;
    comments: import("@sinclair/typebox").TObject<{
        commentsEnabled: import("@sinclair/typebox").TBoolean;
        commentsModerationMode: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"NONE">, import("@sinclair/typebox").TLiteral<"PRE_APPROVE">, import("@sinclair/typebox").TLiteral<"POST_APPROVE">, import("@sinclair/typebox").TLiteral<"TRUSTED_ONLY">]>;
    }>;
}>;
export declare const DnsRecordSchema: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"CNAME">, import("@sinclair/typebox").TLiteral<"TXT">, import("@sinclair/typebox").TLiteral<"A">]>;
    name: import("@sinclair/typebox").TString;
    value: import("@sinclair/typebox").TString;
    ttl: import("@sinclair/typebox").TInteger;
    verified: import("@sinclair/typebox").TBoolean;
}>;
export declare const SiteDomainSchema: import("@sinclair/typebox").TObject<{
    customDomain: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    customDomainVerified: import("@sinclair/typebox").TBoolean;
    customDomainVerifiedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    sslEnabled: import("@sinclair/typebox").TBoolean;
    sslExpiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    dnsRecords: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"CNAME">, import("@sinclair/typebox").TLiteral<"TXT">, import("@sinclair/typebox").TLiteral<"A">]>;
        name: import("@sinclair/typebox").TString;
        value: import("@sinclair/typebox").TString;
        ttl: import("@sinclair/typebox").TInteger;
        verified: import("@sinclair/typebox").TBoolean;
    }>>;
}>;
export declare const PageSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    slug: import("@sinclair/typebox").TString;
    title: import("@sinclair/typebox").TString;
    content: import("@sinclair/typebox").TString;
    contentHtml: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    isPublished: import("@sinclair/typebox").TBoolean;
    publishedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    showInNav: import("@sinclair/typebox").TBoolean;
    navOrder: import("@sinclair/typebox").TInteger;
    navLabel: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    metaTitle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    metaDescription: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    createdAt: import("@sinclair/typebox").TString;
    updatedAt: import("@sinclair/typebox").TString;
}>;
export declare const PageSummarySchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    slug: import("@sinclair/typebox").TString;
    title: import("@sinclair/typebox").TString;
    isPublished: import("@sinclair/typebox").TBoolean;
    showInNav: import("@sinclair/typebox").TBoolean;
    navOrder: import("@sinclair/typebox").TInteger;
    updatedAt: import("@sinclair/typebox").TString;
}>;
export declare const CollaboratorSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    userId: import("@sinclair/typebox").TString;
    username: import("@sinclair/typebox").TString;
    displayName: import("@sinclair/typebox").TString;
    avatarUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"VIEWER">, import("@sinclair/typebox").TLiteral<"EDITOR">, import("@sinclair/typebox").TLiteral<"TRANSLATOR">, import("@sinclair/typebox").TLiteral<"ANALYST">, import("@sinclair/typebox").TLiteral<"MANAGER">, import("@sinclair/typebox").TLiteral<"OWNER">]>;
    permissions: import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean>;
    isActive: import("@sinclair/typebox").TBoolean;
    invitedAt: import("@sinclair/typebox").TString;
    acceptedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
}>;
export declare const CollaboratorInviteSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    email: import("@sinclair/typebox").TString;
    role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"VIEWER">, import("@sinclair/typebox").TLiteral<"EDITOR">, import("@sinclair/typebox").TLiteral<"TRANSLATOR">, import("@sinclair/typebox").TLiteral<"ANALYST">, import("@sinclair/typebox").TLiteral<"MANAGER">, import("@sinclair/typebox").TLiteral<"OWNER">]>;
    inviteToken: import("@sinclair/typebox").TString;
    invitedAt: import("@sinclair/typebox").TString;
    expiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
}>;
export declare const ThemeSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    name: import("@sinclair/typebox").TString;
    slug: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    thumbnailUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    previewUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    isPublic: import("@sinclair/typebox").TBoolean;
    isPremium: import("@sinclair/typebox").TBoolean;
    requiredTier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>, import("@sinclair/typebox").TNull]>;
    usageCount: import("@sinclair/typebox").TInteger;
}>;
export declare const ThemeSummarySchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    name: import("@sinclair/typebox").TString;
    slug: import("@sinclair/typebox").TString;
    thumbnailUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    isPremium: import("@sinclair/typebox").TBoolean;
    requiredTier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>, import("@sinclair/typebox").TNull]>;
}>;
export declare const CreateSiteRequestSchema: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TString;
    slug: import("@sinclair/typebox").TString;
    tagline: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type CreateSiteRequest = Static<typeof CreateSiteRequestSchema>;
export declare const UpdateSiteRequestSchema: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    slug: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    tagline: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>>;
}>;
export type UpdateSiteRequest = Static<typeof UpdateSiteRequestSchema>;
export declare const UpdateSiteGeneralRequestSchema: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    slug: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    tagline: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>>;
    isPublic: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    maintenanceMode: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    maintenanceMessage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type UpdateSiteGeneralRequest = Static<typeof UpdateSiteGeneralRequestSchema>;
export declare const UpdateSiteBrandingRequestSchema: import("@sinclair/typebox").TObject<{
    logoUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    faviconUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    coverImageUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    primaryColor: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    secondaryColor: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    accentColor: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
}>;
export type UpdateSiteBrandingRequest = Static<typeof UpdateSiteBrandingRequestSchema>;
export declare const UpdateSiteThemeRequestSchema: import("@sinclair/typebox").TObject<{
    themeId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    customCssEnabled: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    customCss: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
}>;
export type UpdateSiteThemeRequest = Static<typeof UpdateSiteThemeRequestSchema>;
export declare const UpdateSiteSeoRequestSchema: import("@sinclair/typebox").TObject<{
    metaTitle: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    metaDescription: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    ogImageUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
}>;
export type UpdateSiteSeoRequest = Static<typeof UpdateSiteSeoRequestSchema>;
export declare const UpdateSiteAnalyticsRequestSchema: import("@sinclair/typebox").TObject<{
    googleAnalyticsId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    analyticsEnabled: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export type UpdateSiteAnalyticsRequest = Static<typeof UpdateSiteAnalyticsRequestSchema>;
export declare const UpdateSiteCommentsRequestSchema: import("@sinclair/typebox").TObject<{
    commentsEnabled: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    commentsModerationMode: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"NONE">, import("@sinclair/typebox").TLiteral<"PRE_APPROVE">, import("@sinclair/typebox").TLiteral<"POST_APPROVE">, import("@sinclair/typebox").TLiteral<"TRUSTED_ONLY">]>>;
}>;
export type UpdateSiteCommentsRequest = Static<typeof UpdateSiteCommentsRequestSchema>;
export declare const AddDomainRequestSchema: import("@sinclair/typebox").TObject<{
    customDomain: import("@sinclair/typebox").TString;
}>;
export type AddDomainRequest = Static<typeof AddDomainRequestSchema>;
export declare const CreatePageRequestSchema: import("@sinclair/typebox").TObject<{
    slug: import("@sinclair/typebox").TString;
    title: import("@sinclair/typebox").TString;
    content: import("@sinclair/typebox").TString;
    isPublished: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    showInNav: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    navLabel: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    navOrder: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    metaTitle: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    metaDescription: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type CreatePageRequest = Static<typeof CreatePageRequestSchema>;
export declare const UpdatePageRequestSchema: import("@sinclair/typebox").TObject<{
    slug: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    content: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    isPublished: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    showInNav: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    navLabel: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    navOrder: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    metaTitle: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    metaDescription: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type UpdatePageRequest = Static<typeof UpdatePageRequestSchema>;
export declare const ReorderPagesRequestSchema: import("@sinclair/typebox").TObject<{
    orders: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        pageId: import("@sinclair/typebox").TString;
        navOrder: import("@sinclair/typebox").TInteger;
    }>>;
}>;
export type ReorderPagesRequest = Static<typeof ReorderPagesRequestSchema>;
export declare const InviteCollaboratorRequestSchema: import("@sinclair/typebox").TObject<{
    email: import("@sinclair/typebox").TString;
    role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"VIEWER">, import("@sinclair/typebox").TLiteral<"EDITOR">, import("@sinclair/typebox").TLiteral<"TRANSLATOR">, import("@sinclair/typebox").TLiteral<"ANALYST">, import("@sinclair/typebox").TLiteral<"MANAGER">, import("@sinclair/typebox").TLiteral<"OWNER">]>;
    permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean>>;
}>;
export type InviteCollaboratorRequest = Static<typeof InviteCollaboratorRequestSchema>;
export declare const UpdateCollaboratorRequestSchema: import("@sinclair/typebox").TObject<{
    role: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"VIEWER">, import("@sinclair/typebox").TLiteral<"EDITOR">, import("@sinclair/typebox").TLiteral<"TRANSLATOR">, import("@sinclair/typebox").TLiteral<"ANALYST">, import("@sinclair/typebox").TLiteral<"MANAGER">, import("@sinclair/typebox").TLiteral<"OWNER">]>>;
    permissions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean>>;
    isActive: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export type UpdateCollaboratorRequest = Static<typeof UpdateCollaboratorRequestSchema>;
export declare const ApplyThemeRequestSchema: import("@sinclair/typebox").TObject<{
    themeId: import("@sinclair/typebox").TString;
}>;
export type ApplyThemeRequest = Static<typeof ApplyThemeRequestSchema>;
export declare const SiteIdParamSchema: import("@sinclair/typebox").TObject<{
    siteId: import("@sinclair/typebox").TString;
}>;
export type SiteIdParam = Static<typeof SiteIdParamSchema>;
export declare const PageIdParamSchema: import("@sinclair/typebox").TObject<{
    siteId: import("@sinclair/typebox").TString;
    pageId: import("@sinclair/typebox").TString;
}>;
export type PageIdParam = Static<typeof PageIdParamSchema>;
export declare const CollaboratorIdParamSchema: import("@sinclair/typebox").TObject<{
    siteId: import("@sinclair/typebox").TString;
    collaboratorId: import("@sinclair/typebox").TString;
}>;
export type CollaboratorIdParam = Static<typeof CollaboratorIdParamSchema>;
export declare const InviteTokenParamSchema: import("@sinclair/typebox").TObject<{
    token: import("@sinclair/typebox").TString;
}>;
export type InviteTokenParam = Static<typeof InviteTokenParamSchema>;
export declare const ThemeIdParamSchema: import("@sinclair/typebox").TObject<{
    themeId: import("@sinclair/typebox").TString;
}>;
export type ThemeIdParam = Static<typeof ThemeIdParamSchema>;
export declare const MessageResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        message: import("@sinclair/typebox").TString;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type MessageResponse = Static<typeof MessageResponseSchema>;
export declare const CreateSiteResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        site: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            slug: import("@sinclair/typebox").TString;
            name: import("@sinclair/typebox").TString;
            tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
            isPublic: import("@sinclair/typebox").TBoolean;
            logoUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            faviconUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            coverImageUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            primaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            secondaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            accentColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            themeId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            customDomain: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            customDomainVerified: import("@sinclair/typebox").TBoolean;
            sslEnabled: import("@sinclair/typebox").TBoolean;
            defaultContentRating: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"EVERYONE">, import("@sinclair/typebox").TLiteral<"TEEN">, import("@sinclair/typebox").TLiteral<"MATURE">, import("@sinclair/typebox").TLiteral<"ADULT_ONLY">]>;
            commentsEnabled: import("@sinclair/typebox").TBoolean;
            lastPublishedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            createdAt: import("@sinclair/typebox").TString;
            updatedAt: import("@sinclair/typebox").TString;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type CreateSiteResponse = Static<typeof CreateSiteResponseSchema>;
export declare const GetSiteResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        site: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            slug: import("@sinclair/typebox").TString;
            name: import("@sinclair/typebox").TString;
            tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
            isPublic: import("@sinclair/typebox").TBoolean;
            logoUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            faviconUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            coverImageUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            primaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            secondaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            accentColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            themeId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            customDomain: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            customDomainVerified: import("@sinclair/typebox").TBoolean;
            sslEnabled: import("@sinclair/typebox").TBoolean;
            defaultContentRating: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"EVERYONE">, import("@sinclair/typebox").TLiteral<"TEEN">, import("@sinclair/typebox").TLiteral<"MATURE">, import("@sinclair/typebox").TLiteral<"ADULT_ONLY">]>;
            commentsEnabled: import("@sinclair/typebox").TBoolean;
            lastPublishedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            createdAt: import("@sinclair/typebox").TString;
            updatedAt: import("@sinclair/typebox").TString;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type GetSiteResponse = Static<typeof GetSiteResponseSchema>;
export declare const ListSitesResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        sites: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            slug: import("@sinclair/typebox").TString;
            name: import("@sinclair/typebox").TString;
            tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
            logoUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            customDomain: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            seriesCount: import("@sinclair/typebox").TInteger;
            subscriberCount: import("@sinclair/typebox").TInteger;
            lastPublishedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            createdAt: import("@sinclair/typebox").TString;
        }>>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ListSitesResponse = Static<typeof ListSitesResponseSchema>;
export declare const GetSiteStatsResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        stats: import("@sinclair/typebox").TObject<{
            totalViews: import("@sinclair/typebox").TInteger;
            totalSubscribers: import("@sinclair/typebox").TInteger;
            totalRevenue: import("@sinclair/typebox").TNumber;
            revenueCurrency: import("@sinclair/typebox").TString;
            seriesCount: import("@sinclair/typebox").TInteger;
            chapterCount: import("@sinclair/typebox").TInteger;
            pageCount: import("@sinclair/typebox").TInteger;
            collaboratorCount: import("@sinclair/typebox").TInteger;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type GetSiteStatsResponse = Static<typeof GetSiteStatsResponseSchema>;
export declare const GetSiteOverviewResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        site: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            slug: import("@sinclair/typebox").TString;
            name: import("@sinclair/typebox").TString;
            tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
            isPublic: import("@sinclair/typebox").TBoolean;
            logoUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            faviconUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            coverImageUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            primaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            secondaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            accentColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            themeId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            customDomain: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            customDomainVerified: import("@sinclair/typebox").TBoolean;
            sslEnabled: import("@sinclair/typebox").TBoolean;
            defaultContentRating: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"EVERYONE">, import("@sinclair/typebox").TLiteral<"TEEN">, import("@sinclair/typebox").TLiteral<"MATURE">, import("@sinclair/typebox").TLiteral<"ADULT_ONLY">]>;
            commentsEnabled: import("@sinclair/typebox").TBoolean;
            lastPublishedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            createdAt: import("@sinclair/typebox").TString;
            updatedAt: import("@sinclair/typebox").TString;
        }>;
        stats: import("@sinclair/typebox").TObject<{
            totalViews: import("@sinclair/typebox").TInteger;
            totalSubscribers: import("@sinclair/typebox").TInteger;
            totalRevenue: import("@sinclair/typebox").TNumber;
            revenueCurrency: import("@sinclair/typebox").TString;
            seriesCount: import("@sinclair/typebox").TInteger;
            chapterCount: import("@sinclair/typebox").TInteger;
            pageCount: import("@sinclair/typebox").TInteger;
            collaboratorCount: import("@sinclair/typebox").TInteger;
        }>;
        recentActivity: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            type: import("@sinclair/typebox").TString;
            title: import("@sinclair/typebox").TString;
            description: import("@sinclair/typebox").TString;
            timestamp: import("@sinclair/typebox").TString;
        }>>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type GetSiteOverviewResponse = Static<typeof GetSiteOverviewResponseSchema>;
export declare const GetSiteSettingsResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        settings: import("@sinclair/typebox").TObject<{
            general: import("@sinclair/typebox").TObject<{
                name: import("@sinclair/typebox").TString;
                slug: import("@sinclair/typebox").TString;
                tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
                isPublic: import("@sinclair/typebox").TBoolean;
                maintenanceMode: import("@sinclair/typebox").TBoolean;
                maintenanceMessage: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            }>;
            branding: import("@sinclair/typebox").TObject<{
                logoUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                faviconUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                coverImageUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                primaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                secondaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                accentColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            }>;
            theme: import("@sinclair/typebox").TObject<{
                themeId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                themeName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                customCssEnabled: import("@sinclair/typebox").TBoolean;
                customCss: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            }>;
            seo: import("@sinclair/typebox").TObject<{
                metaTitle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                metaDescription: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                ogImageUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            }>;
            analytics: import("@sinclair/typebox").TObject<{
                googleAnalyticsId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
                analyticsEnabled: import("@sinclair/typebox").TBoolean;
            }>;
            comments: import("@sinclair/typebox").TObject<{
                commentsEnabled: import("@sinclair/typebox").TBoolean;
                commentsModerationMode: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"NONE">, import("@sinclair/typebox").TLiteral<"PRE_APPROVE">, import("@sinclair/typebox").TLiteral<"POST_APPROVE">, import("@sinclair/typebox").TLiteral<"TRUSTED_ONLY">]>;
            }>;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type GetSiteSettingsResponse = Static<typeof GetSiteSettingsResponseSchema>;
export declare const UpdateSiteGeneralResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        general: import("@sinclair/typebox").TObject<{
            name: import("@sinclair/typebox").TString;
            slug: import("@sinclair/typebox").TString;
            tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
            isPublic: import("@sinclair/typebox").TBoolean;
            maintenanceMode: import("@sinclair/typebox").TBoolean;
            maintenanceMessage: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type UpdateSiteGeneralResponse = Static<typeof UpdateSiteGeneralResponseSchema>;
export declare const UpdateSiteBrandingResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        branding: import("@sinclair/typebox").TObject<{
            logoUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            faviconUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            coverImageUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            primaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            secondaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            accentColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type UpdateSiteBrandingResponse = Static<typeof UpdateSiteBrandingResponseSchema>;
export declare const UpdateSiteThemeResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        theme: import("@sinclair/typebox").TObject<{
            themeId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            themeName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            customCssEnabled: import("@sinclair/typebox").TBoolean;
            customCss: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type UpdateSiteThemeResponse = Static<typeof UpdateSiteThemeResponseSchema>;
export declare const UpdateSiteSeoResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        seo: import("@sinclair/typebox").TObject<{
            metaTitle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            metaDescription: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            ogImageUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type UpdateSiteSeoResponse = Static<typeof UpdateSiteSeoResponseSchema>;
export declare const UpdateSiteAnalyticsResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        analytics: import("@sinclair/typebox").TObject<{
            googleAnalyticsId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            analyticsEnabled: import("@sinclair/typebox").TBoolean;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type UpdateSiteAnalyticsResponse = Static<typeof UpdateSiteAnalyticsResponseSchema>;
export declare const UpdateSiteCommentsResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        comments: import("@sinclair/typebox").TObject<{
            commentsEnabled: import("@sinclair/typebox").TBoolean;
            commentsModerationMode: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"NONE">, import("@sinclair/typebox").TLiteral<"PRE_APPROVE">, import("@sinclair/typebox").TLiteral<"POST_APPROVE">, import("@sinclair/typebox").TLiteral<"TRUSTED_ONLY">]>;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type UpdateSiteCommentsResponse = Static<typeof UpdateSiteCommentsResponseSchema>;
export declare const GetSiteDomainResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        domain: import("@sinclair/typebox").TObject<{
            customDomain: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            customDomainVerified: import("@sinclair/typebox").TBoolean;
            customDomainVerifiedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            sslEnabled: import("@sinclair/typebox").TBoolean;
            sslExpiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            dnsRecords: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"CNAME">, import("@sinclair/typebox").TLiteral<"TXT">, import("@sinclair/typebox").TLiteral<"A">]>;
                name: import("@sinclair/typebox").TString;
                value: import("@sinclair/typebox").TString;
                ttl: import("@sinclair/typebox").TInteger;
                verified: import("@sinclair/typebox").TBoolean;
            }>>;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type GetSiteDomainResponse = Static<typeof GetSiteDomainResponseSchema>;
export declare const ListPagesResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        pages: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            slug: import("@sinclair/typebox").TString;
            title: import("@sinclair/typebox").TString;
            isPublished: import("@sinclair/typebox").TBoolean;
            showInNav: import("@sinclair/typebox").TBoolean;
            navOrder: import("@sinclair/typebox").TInteger;
            updatedAt: import("@sinclair/typebox").TString;
        }>>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ListPagesResponse = Static<typeof ListPagesResponseSchema>;
export declare const GetPageResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        page: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            slug: import("@sinclair/typebox").TString;
            title: import("@sinclair/typebox").TString;
            content: import("@sinclair/typebox").TString;
            contentHtml: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            isPublished: import("@sinclair/typebox").TBoolean;
            publishedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            showInNav: import("@sinclair/typebox").TBoolean;
            navOrder: import("@sinclair/typebox").TInteger;
            navLabel: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            metaTitle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            metaDescription: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            createdAt: import("@sinclair/typebox").TString;
            updatedAt: import("@sinclair/typebox").TString;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type GetPageResponse = Static<typeof GetPageResponseSchema>;
export declare const ListCollaboratorsResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        collaborators: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            userId: import("@sinclair/typebox").TString;
            username: import("@sinclair/typebox").TString;
            displayName: import("@sinclair/typebox").TString;
            avatarUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"VIEWER">, import("@sinclair/typebox").TLiteral<"EDITOR">, import("@sinclair/typebox").TLiteral<"TRANSLATOR">, import("@sinclair/typebox").TLiteral<"ANALYST">, import("@sinclair/typebox").TLiteral<"MANAGER">, import("@sinclair/typebox").TLiteral<"OWNER">]>;
            permissions: import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean>;
            isActive: import("@sinclair/typebox").TBoolean;
            invitedAt: import("@sinclair/typebox").TString;
            acceptedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        }>>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ListCollaboratorsResponse = Static<typeof ListCollaboratorsResponseSchema>;
export declare const GetCollaboratorResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        collaborator: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            userId: import("@sinclair/typebox").TString;
            username: import("@sinclair/typebox").TString;
            displayName: import("@sinclair/typebox").TString;
            avatarUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"VIEWER">, import("@sinclair/typebox").TLiteral<"EDITOR">, import("@sinclair/typebox").TLiteral<"TRANSLATOR">, import("@sinclair/typebox").TLiteral<"ANALYST">, import("@sinclair/typebox").TLiteral<"MANAGER">, import("@sinclair/typebox").TLiteral<"OWNER">]>;
            permissions: import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean>;
            isActive: import("@sinclair/typebox").TBoolean;
            invitedAt: import("@sinclair/typebox").TString;
            acceptedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type GetCollaboratorResponse = Static<typeof GetCollaboratorResponseSchema>;
export declare const InviteCollaboratorResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        invite: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            email: import("@sinclair/typebox").TString;
            role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"VIEWER">, import("@sinclair/typebox").TLiteral<"EDITOR">, import("@sinclair/typebox").TLiteral<"TRANSLATOR">, import("@sinclair/typebox").TLiteral<"ANALYST">, import("@sinclair/typebox").TLiteral<"MANAGER">, import("@sinclair/typebox").TLiteral<"OWNER">]>;
            inviteToken: import("@sinclair/typebox").TString;
            invitedAt: import("@sinclair/typebox").TString;
            expiresAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type InviteCollaboratorResponse = Static<typeof InviteCollaboratorResponseSchema>;
export declare const AcceptInviteResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        collaborator: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            userId: import("@sinclair/typebox").TString;
            username: import("@sinclair/typebox").TString;
            displayName: import("@sinclair/typebox").TString;
            avatarUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"VIEWER">, import("@sinclair/typebox").TLiteral<"EDITOR">, import("@sinclair/typebox").TLiteral<"TRANSLATOR">, import("@sinclair/typebox").TLiteral<"ANALYST">, import("@sinclair/typebox").TLiteral<"MANAGER">, import("@sinclair/typebox").TLiteral<"OWNER">]>;
            permissions: import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean>;
            isActive: import("@sinclair/typebox").TBoolean;
            invitedAt: import("@sinclair/typebox").TString;
            acceptedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type AcceptInviteResponse = Static<typeof AcceptInviteResponseSchema>;
export declare const ListCollaboratorSitesResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        sites: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            siteId: import("@sinclair/typebox").TString;
            siteName: import("@sinclair/typebox").TString;
            siteSlug: import("@sinclair/typebox").TString;
            role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"VIEWER">, import("@sinclair/typebox").TLiteral<"EDITOR">, import("@sinclair/typebox").TLiteral<"TRANSLATOR">, import("@sinclair/typebox").TLiteral<"ANALYST">, import("@sinclair/typebox").TLiteral<"MANAGER">, import("@sinclair/typebox").TLiteral<"OWNER">]>;
            seriesCount: import("@sinclair/typebox").TInteger;
        }>>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ListCollaboratorSitesResponse = Static<typeof ListCollaboratorSitesResponseSchema>;
export declare const ListThemesResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        themes: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            name: import("@sinclair/typebox").TString;
            slug: import("@sinclair/typebox").TString;
            thumbnailUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            isPremium: import("@sinclair/typebox").TBoolean;
            requiredTier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>, import("@sinclair/typebox").TNull]>;
        }>>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ListThemesResponse = Static<typeof ListThemesResponseSchema>;
export declare const GetThemeResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        theme: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            name: import("@sinclair/typebox").TString;
            slug: import("@sinclair/typebox").TString;
            description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            thumbnailUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            previewUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            isPublic: import("@sinclair/typebox").TBoolean;
            isPremium: import("@sinclair/typebox").TBoolean;
            requiredTier: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"FREE">, import("@sinclair/typebox").TLiteral<"STARTER">, import("@sinclair/typebox").TLiteral<"GROWTH">, import("@sinclair/typebox").TLiteral<"PROFESSIONAL">, import("@sinclair/typebox").TLiteral<"ENTERPRISE">]>, import("@sinclair/typebox").TNull]>;
            usageCount: import("@sinclair/typebox").TInteger;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type GetThemeResponse = Static<typeof GetThemeResponseSchema>;
export declare const AdminSiteSummarySchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    slug: import("@sinclair/typebox").TString;
    name: import("@sinclair/typebox").TString;
    status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
    authorId: import("@sinclair/typebox").TString;
    authorUsername: import("@sinclair/typebox").TString;
    authorEmail: import("@sinclair/typebox").TString;
    customDomain: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    seriesCount: import("@sinclair/typebox").TInteger;
    createdAt: import("@sinclair/typebox").TString;
}>;
export declare const AdminSiteDetailSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    slug: import("@sinclair/typebox").TString;
    name: import("@sinclair/typebox").TString;
    tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
    isPublic: import("@sinclair/typebox").TBoolean;
    logoUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    faviconUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    coverImageUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    primaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    secondaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    accentColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    themeId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    customDomain: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    customDomainVerified: import("@sinclair/typebox").TBoolean;
    sslEnabled: import("@sinclair/typebox").TBoolean;
    defaultContentRating: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"EVERYONE">, import("@sinclair/typebox").TLiteral<"TEEN">, import("@sinclair/typebox").TLiteral<"MATURE">, import("@sinclair/typebox").TLiteral<"ADULT_ONLY">]>;
    commentsEnabled: import("@sinclair/typebox").TBoolean;
    lastPublishedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    createdAt: import("@sinclair/typebox").TString;
    updatedAt: import("@sinclair/typebox").TString;
}>, import("@sinclair/typebox").TObject<{
    authorId: import("@sinclair/typebox").TString;
    authorPublicId: import("@sinclair/typebox").TString;
    authorUsername: import("@sinclair/typebox").TString;
    authorEmail: import("@sinclair/typebox").TString;
    suspensionReason: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    suspendedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    collaboratorCount: import("@sinclair/typebox").TInteger;
    seriesCount: import("@sinclair/typebox").TInteger;
    pageCount: import("@sinclair/typebox").TInteger;
}>]>;
export declare const AdminSiteQuerySchema: import("@sinclair/typebox").TObject<{
    page: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    search: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>>;
    authorId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sortBy: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sortOrder: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"asc">, import("@sinclair/typebox").TLiteral<"desc">]>>;
}>;
export type AdminSiteQuery = Static<typeof AdminSiteQuerySchema>;
export declare const AdminUpdateSiteStatusRequestSchema: import("@sinclair/typebox").TObject<{
    status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
    reason: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type AdminUpdateSiteStatusRequest = Static<typeof AdminUpdateSiteStatusRequestSchema>;
export declare const AdminListSitesResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        slug: import("@sinclair/typebox").TString;
        name: import("@sinclair/typebox").TString;
        status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
        authorId: import("@sinclair/typebox").TString;
        authorUsername: import("@sinclair/typebox").TString;
        authorEmail: import("@sinclair/typebox").TString;
        customDomain: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        seriesCount: import("@sinclair/typebox").TInteger;
        createdAt: import("@sinclair/typebox").TString;
    }>>;
    meta: import("@sinclair/typebox").TObject<{
        page: import("@sinclair/typebox").TInteger;
        limit: import("@sinclair/typebox").TInteger;
        total: import("@sinclair/typebox").TInteger;
        totalPages: import("@sinclair/typebox").TInteger;
        hasNext: import("@sinclair/typebox").TBoolean;
        hasPrev: import("@sinclair/typebox").TBoolean;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type AdminListSitesResponse = Static<typeof AdminListSitesResponseSchema>;
export declare const AdminGetSiteResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        site: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            slug: import("@sinclair/typebox").TString;
            name: import("@sinclair/typebox").TString;
            tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"DRAFT">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"MAINTENANCE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"DELETED">]>;
            isPublic: import("@sinclair/typebox").TBoolean;
            logoUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            faviconUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            coverImageUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            primaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            secondaryColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            accentColor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            themeId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            customDomain: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            customDomainVerified: import("@sinclair/typebox").TBoolean;
            sslEnabled: import("@sinclair/typebox").TBoolean;
            defaultContentRating: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"EVERYONE">, import("@sinclair/typebox").TLiteral<"TEEN">, import("@sinclair/typebox").TLiteral<"MATURE">, import("@sinclair/typebox").TLiteral<"ADULT_ONLY">]>;
            commentsEnabled: import("@sinclair/typebox").TBoolean;
            lastPublishedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            createdAt: import("@sinclair/typebox").TString;
            updatedAt: import("@sinclair/typebox").TString;
        }>, import("@sinclair/typebox").TObject<{
            authorId: import("@sinclair/typebox").TString;
            authorPublicId: import("@sinclair/typebox").TString;
            authorUsername: import("@sinclair/typebox").TString;
            authorEmail: import("@sinclair/typebox").TString;
            suspensionReason: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            suspendedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            collaboratorCount: import("@sinclair/typebox").TInteger;
            seriesCount: import("@sinclair/typebox").TInteger;
            pageCount: import("@sinclair/typebox").TInteger;
        }>]>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type AdminGetSiteResponse = Static<typeof AdminGetSiteResponseSchema>;
//# sourceMappingURL=sites.schema.d.ts.map