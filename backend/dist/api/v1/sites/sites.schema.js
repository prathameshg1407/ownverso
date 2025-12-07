"use strict";
// ==== FILE: src/api/v1/sites/sites.schema.ts ====
/**
 * Sites Management Schemas
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSiteResponseSchema = exports.MessageResponseSchema = exports.ThemeIdParamSchema = exports.InviteTokenParamSchema = exports.CollaboratorIdParamSchema = exports.PageIdParamSchema = exports.SiteIdParamSchema = exports.ApplyThemeRequestSchema = exports.UpdateCollaboratorRequestSchema = exports.InviteCollaboratorRequestSchema = exports.ReorderPagesRequestSchema = exports.UpdatePageRequestSchema = exports.CreatePageRequestSchema = exports.AddDomainRequestSchema = exports.UpdateSiteCommentsRequestSchema = exports.UpdateSiteAnalyticsRequestSchema = exports.UpdateSiteSeoRequestSchema = exports.UpdateSiteThemeRequestSchema = exports.UpdateSiteBrandingRequestSchema = exports.UpdateSiteGeneralRequestSchema = exports.UpdateSiteRequestSchema = exports.CreateSiteRequestSchema = exports.ThemeSummarySchema = exports.ThemeSchema = exports.CollaboratorInviteSchema = exports.CollaboratorSchema = exports.PageSummarySchema = exports.PageSchema = exports.SiteDomainSchema = exports.DnsRecordSchema = exports.SiteSettingsSchema = exports.SiteCommentsSettingsSchema = exports.SiteAnalyticsSettingsSchema = exports.SiteSeoSettingsSchema = exports.SiteThemeSettingsSchema = exports.SiteBrandingSettingsSchema = exports.SiteGeneralSettingsSchema = exports.SiteStatsSchema = exports.SiteSummarySchema = exports.SiteSchema = exports.HexColorSchema = exports.SlugSchema = exports.NullableDateTimeSchema = exports.DateTimeSchema = exports.NullableStringSchema = exports.PlatformTierSchema = exports.CollaboratorRoleSchema = exports.CommentModerationModeSchema = exports.ContentRatingSchema = exports.SiteStatusSchema = void 0;
exports.AdminGetSiteResponseSchema = exports.AdminListSitesResponseSchema = exports.AdminUpdateSiteStatusRequestSchema = exports.AdminSiteQuerySchema = exports.AdminSiteDetailSchema = exports.AdminSiteSummarySchema = exports.GetThemeResponseSchema = exports.ListThemesResponseSchema = exports.ListCollaboratorSitesResponseSchema = exports.AcceptInviteResponseSchema = exports.InviteCollaboratorResponseSchema = exports.GetCollaboratorResponseSchema = exports.ListCollaboratorsResponseSchema = exports.GetPageResponseSchema = exports.ListPagesResponseSchema = exports.GetSiteDomainResponseSchema = exports.UpdateSiteCommentsResponseSchema = exports.UpdateSiteAnalyticsResponseSchema = exports.UpdateSiteSeoResponseSchema = exports.UpdateSiteThemeResponseSchema = exports.UpdateSiteBrandingResponseSchema = exports.UpdateSiteGeneralResponseSchema = exports.GetSiteSettingsResponseSchema = exports.GetSiteOverviewResponseSchema = exports.GetSiteStatsResponseSchema = exports.ListSitesResponseSchema = exports.GetSiteResponseSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const response_schema_1 = require("../../../schemas/common/response.schema");
// ─────────────────────────────────────────────────────────────────────────
// Enum Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.SiteStatusSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('DRAFT'),
    typebox_1.Type.Literal('ACTIVE'),
    typebox_1.Type.Literal('MAINTENANCE'),
    typebox_1.Type.Literal('SUSPENDED'),
    typebox_1.Type.Literal('DELETED'),
]);
exports.ContentRatingSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('EVERYONE'),
    typebox_1.Type.Literal('TEEN'),
    typebox_1.Type.Literal('MATURE'),
    typebox_1.Type.Literal('ADULT_ONLY'),
]);
exports.CommentModerationModeSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('NONE'),
    typebox_1.Type.Literal('PRE_APPROVE'),
    typebox_1.Type.Literal('POST_APPROVE'),
    typebox_1.Type.Literal('TRUSTED_ONLY'),
]);
exports.CollaboratorRoleSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('VIEWER'),
    typebox_1.Type.Literal('EDITOR'),
    typebox_1.Type.Literal('TRANSLATOR'),
    typebox_1.Type.Literal('ANALYST'),
    typebox_1.Type.Literal('MANAGER'),
    typebox_1.Type.Literal('OWNER'),
]);
exports.PlatformTierSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('FREE'),
    typebox_1.Type.Literal('STARTER'),
    typebox_1.Type.Literal('GROWTH'),
    typebox_1.Type.Literal('PROFESSIONAL'),
    typebox_1.Type.Literal('ENTERPRISE'),
]);
// ─────────────────────────────────────────────────────────────────────────
// Base Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.NullableStringSchema = typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]);
exports.DateTimeSchema = typebox_1.Type.String({ format: 'date-time' });
exports.NullableDateTimeSchema = typebox_1.Type.Union([exports.DateTimeSchema, typebox_1.Type.Null()]);
exports.SlugSchema = typebox_1.Type.String({
    minLength: 1,
    maxLength: 100,
    pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
});
exports.HexColorSchema = typebox_1.Type.String({ pattern: '^#[0-9A-Fa-f]{6}$' });
// ─────────────────────────────────────────────────────────────────────────
// Site Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.SiteSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    slug: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
    tagline: exports.NullableStringSchema,
    description: exports.NullableStringSchema,
    status: exports.SiteStatusSchema,
    isPublic: typebox_1.Type.Boolean(),
    logoUrl: exports.NullableStringSchema,
    faviconUrl: exports.NullableStringSchema,
    coverImageUrl: exports.NullableStringSchema,
    primaryColor: exports.NullableStringSchema,
    secondaryColor: exports.NullableStringSchema,
    accentColor: exports.NullableStringSchema,
    themeId: exports.NullableStringSchema,
    customDomain: exports.NullableStringSchema,
    customDomainVerified: typebox_1.Type.Boolean(),
    sslEnabled: typebox_1.Type.Boolean(),
    defaultContentRating: exports.ContentRatingSchema,
    commentsEnabled: typebox_1.Type.Boolean(),
    lastPublishedAt: exports.NullableDateTimeSchema,
    createdAt: exports.DateTimeSchema,
    updatedAt: exports.DateTimeSchema,
});
exports.SiteSummarySchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    slug: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
    tagline: exports.NullableStringSchema,
    status: exports.SiteStatusSchema,
    logoUrl: exports.NullableStringSchema,
    customDomain: exports.NullableStringSchema,
    seriesCount: typebox_1.Type.Integer(),
    subscriberCount: typebox_1.Type.Integer(),
    lastPublishedAt: exports.NullableDateTimeSchema,
    createdAt: exports.DateTimeSchema,
});
exports.SiteStatsSchema = typebox_1.Type.Object({
    totalViews: typebox_1.Type.Integer(),
    totalSubscribers: typebox_1.Type.Integer(),
    totalRevenue: typebox_1.Type.Number(),
    revenueCurrency: typebox_1.Type.String(),
    seriesCount: typebox_1.Type.Integer(),
    chapterCount: typebox_1.Type.Integer(),
    pageCount: typebox_1.Type.Integer(),
    collaboratorCount: typebox_1.Type.Integer(),
});
// ─────────────────────────────────────────────────────────────────────────
// Settings Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.SiteGeneralSettingsSchema = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    slug: typebox_1.Type.String(),
    tagline: exports.NullableStringSchema,
    description: exports.NullableStringSchema,
    status: exports.SiteStatusSchema,
    isPublic: typebox_1.Type.Boolean(),
    maintenanceMode: typebox_1.Type.Boolean(),
    maintenanceMessage: exports.NullableStringSchema,
});
exports.SiteBrandingSettingsSchema = typebox_1.Type.Object({
    logoUrl: exports.NullableStringSchema,
    faviconUrl: exports.NullableStringSchema,
    coverImageUrl: exports.NullableStringSchema,
    primaryColor: exports.NullableStringSchema,
    secondaryColor: exports.NullableStringSchema,
    accentColor: exports.NullableStringSchema,
});
exports.SiteThemeSettingsSchema = typebox_1.Type.Object({
    themeId: exports.NullableStringSchema,
    themeName: exports.NullableStringSchema,
    customCssEnabled: typebox_1.Type.Boolean(),
    customCss: exports.NullableStringSchema,
});
exports.SiteSeoSettingsSchema = typebox_1.Type.Object({
    metaTitle: exports.NullableStringSchema,
    metaDescription: exports.NullableStringSchema,
    ogImageUrl: exports.NullableStringSchema,
});
exports.SiteAnalyticsSettingsSchema = typebox_1.Type.Object({
    googleAnalyticsId: exports.NullableStringSchema,
    analyticsEnabled: typebox_1.Type.Boolean(),
});
exports.SiteCommentsSettingsSchema = typebox_1.Type.Object({
    commentsEnabled: typebox_1.Type.Boolean(),
    commentsModerationMode: exports.CommentModerationModeSchema,
});
exports.SiteSettingsSchema = typebox_1.Type.Object({
    general: exports.SiteGeneralSettingsSchema,
    branding: exports.SiteBrandingSettingsSchema,
    theme: exports.SiteThemeSettingsSchema,
    seo: exports.SiteSeoSettingsSchema,
    analytics: exports.SiteAnalyticsSettingsSchema,
    comments: exports.SiteCommentsSettingsSchema,
});
// ─────────────────────────────────────────────────────────────────────────
// Domain Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.DnsRecordSchema = typebox_1.Type.Object({
    type: typebox_1.Type.Union([typebox_1.Type.Literal('CNAME'), typebox_1.Type.Literal('TXT'), typebox_1.Type.Literal('A')]),
    name: typebox_1.Type.String(),
    value: typebox_1.Type.String(),
    ttl: typebox_1.Type.Integer(),
    verified: typebox_1.Type.Boolean(),
});
exports.SiteDomainSchema = typebox_1.Type.Object({
    customDomain: exports.NullableStringSchema,
    customDomainVerified: typebox_1.Type.Boolean(),
    customDomainVerifiedAt: exports.NullableDateTimeSchema,
    sslEnabled: typebox_1.Type.Boolean(),
    sslExpiresAt: exports.NullableDateTimeSchema,
    dnsRecords: typebox_1.Type.Array(exports.DnsRecordSchema),
});
// ─────────────────────────────────────────────────────────────────────────
// Page Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.PageSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    slug: typebox_1.Type.String(),
    title: typebox_1.Type.String(),
    content: typebox_1.Type.String(),
    contentHtml: exports.NullableStringSchema,
    isPublished: typebox_1.Type.Boolean(),
    publishedAt: exports.NullableDateTimeSchema,
    showInNav: typebox_1.Type.Boolean(),
    navOrder: typebox_1.Type.Integer(),
    navLabel: exports.NullableStringSchema,
    metaTitle: exports.NullableStringSchema,
    metaDescription: exports.NullableStringSchema,
    createdAt: exports.DateTimeSchema,
    updatedAt: exports.DateTimeSchema,
});
exports.PageSummarySchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    slug: typebox_1.Type.String(),
    title: typebox_1.Type.String(),
    isPublished: typebox_1.Type.Boolean(),
    showInNav: typebox_1.Type.Boolean(),
    navOrder: typebox_1.Type.Integer(),
    updatedAt: exports.DateTimeSchema,
});
// ─────────────────────────────────────────────────────────────────────────
// Collaborator Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.CollaboratorSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    userId: typebox_1.Type.String(),
    username: typebox_1.Type.String(),
    displayName: typebox_1.Type.String(),
    avatarUrl: exports.NullableStringSchema,
    role: exports.CollaboratorRoleSchema,
    permissions: typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Boolean()),
    isActive: typebox_1.Type.Boolean(),
    invitedAt: exports.DateTimeSchema,
    acceptedAt: exports.NullableDateTimeSchema,
});
exports.CollaboratorInviteSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    email: typebox_1.Type.String(),
    role: exports.CollaboratorRoleSchema,
    inviteToken: typebox_1.Type.String(),
    invitedAt: exports.DateTimeSchema,
    expiresAt: exports.NullableDateTimeSchema,
});
// ─────────────────────────────────────────────────────────────────────────
// Theme Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.ThemeSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
    slug: typebox_1.Type.String(),
    description: exports.NullableStringSchema,
    thumbnailUrl: exports.NullableStringSchema,
    previewUrl: exports.NullableStringSchema,
    isPublic: typebox_1.Type.Boolean(),
    isPremium: typebox_1.Type.Boolean(),
    requiredTier: typebox_1.Type.Union([exports.PlatformTierSchema, typebox_1.Type.Null()]),
    usageCount: typebox_1.Type.Integer(),
});
exports.ThemeSummarySchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
    slug: typebox_1.Type.String(),
    thumbnailUrl: exports.NullableStringSchema,
    isPremium: typebox_1.Type.Boolean(),
    requiredTier: typebox_1.Type.Union([exports.PlatformTierSchema, typebox_1.Type.Null()]),
});
// ─────────────────────────────────────────────────────────────────────────
// Request Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.CreateSiteRequestSchema = typebox_1.Type.Object({
    name: typebox_1.Type.String({ minLength: 1, maxLength: 100 }),
    slug: exports.SlugSchema,
    tagline: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 200 })),
    description: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 5000 })),
});
exports.UpdateSiteRequestSchema = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String({ minLength: 1, maxLength: 100 })),
    slug: typebox_1.Type.Optional(exports.SlugSchema),
    tagline: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 200 })),
    description: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 5000 })),
    status: typebox_1.Type.Optional(exports.SiteStatusSchema),
});
exports.UpdateSiteGeneralRequestSchema = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String({ minLength: 1, maxLength: 100 })),
    slug: typebox_1.Type.Optional(exports.SlugSchema),
    tagline: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 200 })),
    description: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 5000 })),
    status: typebox_1.Type.Optional(exports.SiteStatusSchema),
    isPublic: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    maintenanceMode: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    maintenanceMessage: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 1000 })),
});
exports.UpdateSiteBrandingRequestSchema = typebox_1.Type.Object({
    logoUrl: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String({ format: 'uri' }), typebox_1.Type.Null()])),
    faviconUrl: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String({ format: 'uri' }), typebox_1.Type.Null()])),
    coverImageUrl: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String({ format: 'uri' }), typebox_1.Type.Null()])),
    primaryColor: typebox_1.Type.Optional(typebox_1.Type.Union([exports.HexColorSchema, typebox_1.Type.Null()])),
    secondaryColor: typebox_1.Type.Optional(typebox_1.Type.Union([exports.HexColorSchema, typebox_1.Type.Null()])),
    accentColor: typebox_1.Type.Optional(typebox_1.Type.Union([exports.HexColorSchema, typebox_1.Type.Null()])),
});
exports.UpdateSiteThemeRequestSchema = typebox_1.Type.Object({
    themeId: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()])),
    customCssEnabled: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    customCss: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String({ maxLength: 50000 }), typebox_1.Type.Null()])),
});
exports.UpdateSiteSeoRequestSchema = typebox_1.Type.Object({
    metaTitle: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String({ maxLength: 60 }), typebox_1.Type.Null()])),
    metaDescription: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String({ maxLength: 160 }), typebox_1.Type.Null()])),
    ogImageUrl: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String({ format: 'uri' }), typebox_1.Type.Null()])),
});
exports.UpdateSiteAnalyticsRequestSchema = typebox_1.Type.Object({
    googleAnalyticsId: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()])),
    analyticsEnabled: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
exports.UpdateSiteCommentsRequestSchema = typebox_1.Type.Object({
    commentsEnabled: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    commentsModerationMode: typebox_1.Type.Optional(exports.CommentModerationModeSchema),
});
exports.AddDomainRequestSchema = typebox_1.Type.Object({
    customDomain: typebox_1.Type.String({
        minLength: 4,
        maxLength: 253,
        pattern: '^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z]{2,}$',
    }),
});
exports.CreatePageRequestSchema = typebox_1.Type.Object({
    slug: exports.SlugSchema,
    title: typebox_1.Type.String({ minLength: 1, maxLength: 100 }),
    content: typebox_1.Type.String({ minLength: 1, maxLength: 100000 }),
    isPublished: typebox_1.Type.Optional(typebox_1.Type.Boolean({ default: false })),
    showInNav: typebox_1.Type.Optional(typebox_1.Type.Boolean({ default: false })),
    navLabel: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 30 })),
    navOrder: typebox_1.Type.Optional(typebox_1.Type.Integer({ minimum: 0 })),
    metaTitle: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 60 })),
    metaDescription: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 160 })),
});
exports.UpdatePageRequestSchema = typebox_1.Type.Object({
    slug: typebox_1.Type.Optional(exports.SlugSchema),
    title: typebox_1.Type.Optional(typebox_1.Type.String({ minLength: 1, maxLength: 100 })),
    content: typebox_1.Type.Optional(typebox_1.Type.String({ minLength: 1, maxLength: 100000 })),
    isPublished: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    showInNav: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    navLabel: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 30 })),
    navOrder: typebox_1.Type.Optional(typebox_1.Type.Integer({ minimum: 0 })),
    metaTitle: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 60 })),
    metaDescription: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 160 })),
});
exports.ReorderPagesRequestSchema = typebox_1.Type.Object({
    orders: typebox_1.Type.Array(typebox_1.Type.Object({
        pageId: typebox_1.Type.String(),
        navOrder: typebox_1.Type.Integer({ minimum: 0 }),
    }), { minItems: 1 }),
});
exports.InviteCollaboratorRequestSchema = typebox_1.Type.Object({
    email: typebox_1.Type.String({ format: 'email' }),
    role: exports.CollaboratorRoleSchema,
    permissions: typebox_1.Type.Optional(typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Boolean())),
});
exports.UpdateCollaboratorRequestSchema = typebox_1.Type.Object({
    role: typebox_1.Type.Optional(exports.CollaboratorRoleSchema),
    permissions: typebox_1.Type.Optional(typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Boolean())),
    isActive: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
exports.ApplyThemeRequestSchema = typebox_1.Type.Object({
    themeId: typebox_1.Type.String(),
});
// ─────────────────────────────────────────────────────────────────────────
// Param Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.SiteIdParamSchema = typebox_1.Type.Object({
    siteId: typebox_1.Type.String(),
});
exports.PageIdParamSchema = typebox_1.Type.Object({
    siteId: typebox_1.Type.String(),
    pageId: typebox_1.Type.String(),
});
exports.CollaboratorIdParamSchema = typebox_1.Type.Object({
    siteId: typebox_1.Type.String(),
    collaboratorId: typebox_1.Type.String(),
});
exports.InviteTokenParamSchema = typebox_1.Type.Object({
    token: typebox_1.Type.String(),
});
exports.ThemeIdParamSchema = typebox_1.Type.Object({
    themeId: typebox_1.Type.String(),
});
// ─────────────────────────────────────────────────────────────────────────
// Response Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.MessageResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ message: typebox_1.Type.String() }));
// Site Responses
exports.CreateSiteResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ site: exports.SiteSchema }));
exports.GetSiteResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ site: exports.SiteSchema }));
exports.ListSitesResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ sites: typebox_1.Type.Array(exports.SiteSummarySchema) }));
exports.GetSiteStatsResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ stats: exports.SiteStatsSchema }));
exports.GetSiteOverviewResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({
    site: exports.SiteSchema,
    stats: exports.SiteStatsSchema,
    recentActivity: typebox_1.Type.Array(typebox_1.Type.Object({
        type: typebox_1.Type.String(),
        title: typebox_1.Type.String(),
        description: typebox_1.Type.String(),
        timestamp: exports.DateTimeSchema,
    })),
}));
// Settings Responses
exports.GetSiteSettingsResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ settings: exports.SiteSettingsSchema }));
exports.UpdateSiteGeneralResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ general: exports.SiteGeneralSettingsSchema }));
exports.UpdateSiteBrandingResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ branding: exports.SiteBrandingSettingsSchema }));
exports.UpdateSiteThemeResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ theme: exports.SiteThemeSettingsSchema }));
exports.UpdateSiteSeoResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ seo: exports.SiteSeoSettingsSchema }));
exports.UpdateSiteAnalyticsResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ analytics: exports.SiteAnalyticsSettingsSchema }));
exports.UpdateSiteCommentsResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ comments: exports.SiteCommentsSettingsSchema }));
// Domain Responses
exports.GetSiteDomainResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ domain: exports.SiteDomainSchema }));
// Page Responses
exports.ListPagesResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ pages: typebox_1.Type.Array(exports.PageSummarySchema) }));
exports.GetPageResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ page: exports.PageSchema }));
// Collaborator Responses
exports.ListCollaboratorsResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ collaborators: typebox_1.Type.Array(exports.CollaboratorSchema) }));
exports.GetCollaboratorResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ collaborator: exports.CollaboratorSchema }));
exports.InviteCollaboratorResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ invite: exports.CollaboratorInviteSchema }));
exports.AcceptInviteResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ collaborator: exports.CollaboratorSchema }));
exports.ListCollaboratorSitesResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({
    sites: typebox_1.Type.Array(typebox_1.Type.Object({
        siteId: typebox_1.Type.String(),
        siteName: typebox_1.Type.String(),
        siteSlug: typebox_1.Type.String(),
        role: exports.CollaboratorRoleSchema,
        seriesCount: typebox_1.Type.Integer(),
    })),
}));
// Theme Responses
exports.ListThemesResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ themes: typebox_1.Type.Array(exports.ThemeSummarySchema) }));
exports.GetThemeResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ theme: exports.ThemeSchema }));
// ─────────────────────────────────────────────────────────────────────────
// Admin Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.AdminSiteSummarySchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    slug: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
    status: exports.SiteStatusSchema,
    authorId: typebox_1.Type.String(),
    authorUsername: typebox_1.Type.String(),
    authorEmail: typebox_1.Type.String(),
    customDomain: exports.NullableStringSchema,
    seriesCount: typebox_1.Type.Integer(),
    createdAt: exports.DateTimeSchema,
});
exports.AdminSiteDetailSchema = typebox_1.Type.Intersect([
    exports.SiteSchema,
    typebox_1.Type.Object({
        authorId: typebox_1.Type.String(),
        authorPublicId: typebox_1.Type.String(),
        authorUsername: typebox_1.Type.String(),
        authorEmail: typebox_1.Type.String(),
        suspensionReason: exports.NullableStringSchema,
        suspendedAt: exports.NullableDateTimeSchema,
        collaboratorCount: typebox_1.Type.Integer(),
        seriesCount: typebox_1.Type.Integer(),
        pageCount: typebox_1.Type.Integer(),
    }),
]);
exports.AdminSiteQuerySchema = typebox_1.Type.Object({
    page: typebox_1.Type.Optional(typebox_1.Type.Integer({ minimum: 1, default: 1 })),
    limit: typebox_1.Type.Optional(typebox_1.Type.Integer({ minimum: 1, maximum: 100, default: 20 })),
    search: typebox_1.Type.Optional(typebox_1.Type.String()),
    status: typebox_1.Type.Optional(exports.SiteStatusSchema),
    authorId: typebox_1.Type.Optional(typebox_1.Type.String()),
    sortBy: typebox_1.Type.Optional(typebox_1.Type.String()),
    sortOrder: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Literal('asc'), typebox_1.Type.Literal('desc')])),
});
exports.AdminUpdateSiteStatusRequestSchema = typebox_1.Type.Object({
    status: exports.SiteStatusSchema,
    reason: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 500 })),
});
exports.AdminListSitesResponseSchema = typebox_1.Type.Object({
    success: typebox_1.Type.Literal(true),
    data: typebox_1.Type.Array(exports.AdminSiteSummarySchema),
    meta: typebox_1.Type.Object({
        page: typebox_1.Type.Integer(),
        limit: typebox_1.Type.Integer(),
        total: typebox_1.Type.Integer(),
        totalPages: typebox_1.Type.Integer(),
        hasNext: typebox_1.Type.Boolean(),
        hasPrev: typebox_1.Type.Boolean(),
    }),
    timestamp: exports.DateTimeSchema,
    requestId: typebox_1.Type.Optional(typebox_1.Type.String()),
});
exports.AdminGetSiteResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ site: exports.AdminSiteDetailSchema }));
//# sourceMappingURL=sites.schema.js.map