// ==== FILE: src/api/v1/sites/sites.schema.ts ====
/**
 * Sites Management Schemas
 */

import { Type, Static } from '@sinclair/typebox';
import { createSuccessResponseSchema } from '@/schemas/common/response.schema';

// ─────────────────────────────────────────────────────────────────────────
// Enum Schemas
// ─────────────────────────────────────────────────────────────────────────

export const SiteStatusSchema = Type.Union([
  Type.Literal('DRAFT'),
  Type.Literal('ACTIVE'),
  Type.Literal('MAINTENANCE'),
  Type.Literal('SUSPENDED'),
  Type.Literal('DELETED'),
]);

export const ContentRatingSchema = Type.Union([
  Type.Literal('EVERYONE'),
  Type.Literal('TEEN'),
  Type.Literal('MATURE'),
  Type.Literal('ADULT_ONLY'),
]);

export const CommentModerationModeSchema = Type.Union([
  Type.Literal('NONE'),
  Type.Literal('PRE_APPROVE'),
  Type.Literal('POST_APPROVE'),
  Type.Literal('TRUSTED_ONLY'),
]);

export const CollaboratorRoleSchema = Type.Union([
  Type.Literal('VIEWER'),
  Type.Literal('EDITOR'),
  Type.Literal('TRANSLATOR'),
  Type.Literal('ANALYST'),
  Type.Literal('MANAGER'),
  Type.Literal('OWNER'),
]);

export const PlatformTierSchema = Type.Union([
  Type.Literal('FREE'),
  Type.Literal('STARTER'),
  Type.Literal('GROWTH'),
  Type.Literal('PROFESSIONAL'),
  Type.Literal('ENTERPRISE'),
]);

// ─────────────────────────────────────────────────────────────────────────
// Base Schemas
// ─────────────────────────────────────────────────────────────────────────

export const NullableStringSchema = Type.Union([Type.String(), Type.Null()]);
export const DateTimeSchema = Type.String({ format: 'date-time' });
export const NullableDateTimeSchema = Type.Union([DateTimeSchema, Type.Null()]);
export const SlugSchema = Type.String({
  minLength: 1,
  maxLength: 100,
  pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
});
export const HexColorSchema = Type.String({ pattern: '^#[0-9A-Fa-f]{6}$' });

// ─────────────────────────────────────────────────────────────────────────
// Site Schemas
// ─────────────────────────────────────────────────────────────────────────

export const SiteSchema = Type.Object({
  id: Type.String(),
  slug: Type.String(),
  name: Type.String(),
  tagline: NullableStringSchema,
  description: NullableStringSchema,
  status: SiteStatusSchema,
  isPublic: Type.Boolean(),
  logoUrl: NullableStringSchema,
  faviconUrl: NullableStringSchema,
  coverImageUrl: NullableStringSchema,
  primaryColor: NullableStringSchema,
  secondaryColor: NullableStringSchema,
  accentColor: NullableStringSchema,
  themeId: NullableStringSchema,
  customDomain: NullableStringSchema,
  customDomainVerified: Type.Boolean(),
  sslEnabled: Type.Boolean(),
  defaultContentRating: ContentRatingSchema,
  commentsEnabled: Type.Boolean(),
  lastPublishedAt: NullableDateTimeSchema,
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema,
});

export const SiteSummarySchema = Type.Object({
  id: Type.String(),
  slug: Type.String(),
  name: Type.String(),
  tagline: NullableStringSchema,
  status: SiteStatusSchema,
  logoUrl: NullableStringSchema,
  customDomain: NullableStringSchema,
  seriesCount: Type.Integer(),
  subscriberCount: Type.Integer(),
  lastPublishedAt: NullableDateTimeSchema,
  createdAt: DateTimeSchema,
});

export const SiteStatsSchema = Type.Object({
  totalViews: Type.Integer(),
  totalSubscribers: Type.Integer(),
  totalRevenue: Type.Number(),
  revenueCurrency: Type.String(),
  seriesCount: Type.Integer(),
  chapterCount: Type.Integer(),
  pageCount: Type.Integer(),
  collaboratorCount: Type.Integer(),
});

// ─────────────────────────────────────────────────────────────────────────
// Settings Schemas
// ─────────────────────────────────────────────────────────────────────────

export const SiteGeneralSettingsSchema = Type.Object({
  name: Type.String(),
  slug: Type.String(),
  tagline: NullableStringSchema,
  description: NullableStringSchema,
  status: SiteStatusSchema,
  isPublic: Type.Boolean(),
  maintenanceMode: Type.Boolean(),
  maintenanceMessage: NullableStringSchema,
});

export const SiteBrandingSettingsSchema = Type.Object({
  logoUrl: NullableStringSchema,
  faviconUrl: NullableStringSchema,
  coverImageUrl: NullableStringSchema,
  primaryColor: NullableStringSchema,
  secondaryColor: NullableStringSchema,
  accentColor: NullableStringSchema,
});

export const SiteThemeSettingsSchema = Type.Object({
  themeId: NullableStringSchema,
  themeName: NullableStringSchema,
  customCssEnabled: Type.Boolean(),
  customCss: NullableStringSchema,
});

export const SiteSeoSettingsSchema = Type.Object({
  metaTitle: NullableStringSchema,
  metaDescription: NullableStringSchema,
  ogImageUrl: NullableStringSchema,
});

export const SiteAnalyticsSettingsSchema = Type.Object({
  googleAnalyticsId: NullableStringSchema,
  analyticsEnabled: Type.Boolean(),
});

export const SiteCommentsSettingsSchema = Type.Object({
  commentsEnabled: Type.Boolean(),
  commentsModerationMode: CommentModerationModeSchema,
});

export const SiteSettingsSchema = Type.Object({
  general: SiteGeneralSettingsSchema,
  branding: SiteBrandingSettingsSchema,
  theme: SiteThemeSettingsSchema,
  seo: SiteSeoSettingsSchema,
  analytics: SiteAnalyticsSettingsSchema,
  comments: SiteCommentsSettingsSchema,
});

// ─────────────────────────────────────────────────────────────────────────
// Domain Schemas
// ─────────────────────────────────────────────────────────────────────────

export const DnsRecordSchema = Type.Object({
  type: Type.Union([Type.Literal('CNAME'), Type.Literal('TXT'), Type.Literal('A')]),
  name: Type.String(),
  value: Type.String(),
  ttl: Type.Integer(),
  verified: Type.Boolean(),
});

export const SiteDomainSchema = Type.Object({
  customDomain: NullableStringSchema,
  customDomainVerified: Type.Boolean(),
  customDomainVerifiedAt: NullableDateTimeSchema,
  sslEnabled: Type.Boolean(),
  sslExpiresAt: NullableDateTimeSchema,
  dnsRecords: Type.Array(DnsRecordSchema),
});

// ─────────────────────────────────────────────────────────────────────────
// Page Schemas
// ─────────────────────────────────────────────────────────────────────────

export const PageSchema = Type.Object({
  id: Type.String(),
  slug: Type.String(),
  title: Type.String(),
  content: Type.String(),
  contentHtml: NullableStringSchema,
  isPublished: Type.Boolean(),
  publishedAt: NullableDateTimeSchema,
  showInNav: Type.Boolean(),
  navOrder: Type.Integer(),
  navLabel: NullableStringSchema,
  metaTitle: NullableStringSchema,
  metaDescription: NullableStringSchema,
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema,
});

export const PageSummarySchema = Type.Object({
  id: Type.String(),
  slug: Type.String(),
  title: Type.String(),
  isPublished: Type.Boolean(),
  showInNav: Type.Boolean(),
  navOrder: Type.Integer(),
  updatedAt: DateTimeSchema,
});

// ─────────────────────────────────────────────────────────────────────────
// Collaborator Schemas
// ─────────────────────────────────────────────────────────────────────────

export const CollaboratorSchema = Type.Object({
  id: Type.String(),
  userId: Type.String(),
  username: Type.String(),
  displayName: Type.String(),
  avatarUrl: NullableStringSchema,
  role: CollaboratorRoleSchema,
  permissions: Type.Record(Type.String(), Type.Boolean()),
  isActive: Type.Boolean(),
  invitedAt: DateTimeSchema,
  acceptedAt: NullableDateTimeSchema,
});

export const CollaboratorInviteSchema = Type.Object({
  id: Type.String(),
  email: Type.String(),
  role: CollaboratorRoleSchema,
  inviteToken: Type.String(),
  invitedAt: DateTimeSchema,
  expiresAt: NullableDateTimeSchema,
});

// ─────────────────────────────────────────────────────────────────────────
// Theme Schemas
// ─────────────────────────────────────────────────────────────────────────

export const ThemeSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  slug: Type.String(),
  description: NullableStringSchema,
  thumbnailUrl: NullableStringSchema,
  previewUrl: NullableStringSchema,
  isPublic: Type.Boolean(),
  isPremium: Type.Boolean(),
  requiredTier: Type.Union([PlatformTierSchema, Type.Null()]),
  usageCount: Type.Integer(),
});

export const ThemeSummarySchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  slug: Type.String(),
  thumbnailUrl: NullableStringSchema,
  isPremium: Type.Boolean(),
  requiredTier: Type.Union([PlatformTierSchema, Type.Null()]),
});

// ─────────────────────────────────────────────────────────────────────────
// Request Schemas
// ─────────────────────────────────────────────────────────────────────────

export const CreateSiteRequestSchema = Type.Object({
  name: Type.String({ minLength: 1, maxLength: 100 }),
  slug: SlugSchema,
  tagline: Type.Optional(Type.String({ maxLength: 200 })),
  description: Type.Optional(Type.String({ maxLength: 5000 })),
});
export type CreateSiteRequest = Static<typeof CreateSiteRequestSchema>;

export const UpdateSiteRequestSchema = Type.Object({
  name: Type.Optional(Type.String({ minLength: 1, maxLength: 100 })),
  slug: Type.Optional(SlugSchema),
  tagline: Type.Optional(Type.String({ maxLength: 200 })),
  description: Type.Optional(Type.String({ maxLength: 5000 })),
  status: Type.Optional(SiteStatusSchema),
});
export type UpdateSiteRequest = Static<typeof UpdateSiteRequestSchema>;

export const UpdateSiteGeneralRequestSchema = Type.Object({
  name: Type.Optional(Type.String({ minLength: 1, maxLength: 100 })),
  slug: Type.Optional(SlugSchema),
  tagline: Type.Optional(Type.String({ maxLength: 200 })),
  description: Type.Optional(Type.String({ maxLength: 5000 })),
  status: Type.Optional(SiteStatusSchema),
  isPublic: Type.Optional(Type.Boolean()),
  maintenanceMode: Type.Optional(Type.Boolean()),
  maintenanceMessage: Type.Optional(Type.String({ maxLength: 1000 })),
});
export type UpdateSiteGeneralRequest = Static<typeof UpdateSiteGeneralRequestSchema>;

export const UpdateSiteBrandingRequestSchema = Type.Object({
  logoUrl: Type.Optional(Type.Union([Type.String({ format: 'uri' }), Type.Null()])),
  faviconUrl: Type.Optional(Type.Union([Type.String({ format: 'uri' }), Type.Null()])),
  coverImageUrl: Type.Optional(Type.Union([Type.String({ format: 'uri' }), Type.Null()])),
  primaryColor: Type.Optional(Type.Union([HexColorSchema, Type.Null()])),
  secondaryColor: Type.Optional(Type.Union([HexColorSchema, Type.Null()])),
  accentColor: Type.Optional(Type.Union([HexColorSchema, Type.Null()])),
});
export type UpdateSiteBrandingRequest = Static<typeof UpdateSiteBrandingRequestSchema>;

export const UpdateSiteThemeRequestSchema = Type.Object({
  themeId: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  customCssEnabled: Type.Optional(Type.Boolean()),
  customCss: Type.Optional(Type.Union([Type.String({ maxLength: 50000 }), Type.Null()])),
});
export type UpdateSiteThemeRequest = Static<typeof UpdateSiteThemeRequestSchema>;

export const UpdateSiteSeoRequestSchema = Type.Object({
  metaTitle: Type.Optional(Type.Union([Type.String({ maxLength: 60 }), Type.Null()])),
  metaDescription: Type.Optional(Type.Union([Type.String({ maxLength: 160 }), Type.Null()])),
  ogImageUrl: Type.Optional(Type.Union([Type.String({ format: 'uri' }), Type.Null()])),
});
export type UpdateSiteSeoRequest = Static<typeof UpdateSiteSeoRequestSchema>;

export const UpdateSiteAnalyticsRequestSchema = Type.Object({
  googleAnalyticsId: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  analyticsEnabled: Type.Optional(Type.Boolean()),
});
export type UpdateSiteAnalyticsRequest = Static<typeof UpdateSiteAnalyticsRequestSchema>;

export const UpdateSiteCommentsRequestSchema = Type.Object({
  commentsEnabled: Type.Optional(Type.Boolean()),
  commentsModerationMode: Type.Optional(CommentModerationModeSchema),
});
export type UpdateSiteCommentsRequest = Static<typeof UpdateSiteCommentsRequestSchema>;

export const AddDomainRequestSchema = Type.Object({
  customDomain: Type.String({
    minLength: 4,
    maxLength: 253,
    pattern: '^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z]{2,}$',
  }),
});
export type AddDomainRequest = Static<typeof AddDomainRequestSchema>;

export const CreatePageRequestSchema = Type.Object({
  slug: SlugSchema,
  title: Type.String({ minLength: 1, maxLength: 100 }),
  content: Type.String({ minLength: 1, maxLength: 100000 }),
  isPublished: Type.Optional(Type.Boolean({ default: false })),
  showInNav: Type.Optional(Type.Boolean({ default: false })),
  navLabel: Type.Optional(Type.String({ maxLength: 30 })),
  navOrder: Type.Optional(Type.Integer({ minimum: 0 })),
  metaTitle: Type.Optional(Type.String({ maxLength: 60 })),
  metaDescription: Type.Optional(Type.String({ maxLength: 160 })),
});
export type CreatePageRequest = Static<typeof CreatePageRequestSchema>;

export const UpdatePageRequestSchema = Type.Object({
  slug: Type.Optional(SlugSchema),
  title: Type.Optional(Type.String({ minLength: 1, maxLength: 100 })),
  content: Type.Optional(Type.String({ minLength: 1, maxLength: 100000 })),
  isPublished: Type.Optional(Type.Boolean()),
  showInNav: Type.Optional(Type.Boolean()),
  navLabel: Type.Optional(Type.String({ maxLength: 30 })),
  navOrder: Type.Optional(Type.Integer({ minimum: 0 })),
  metaTitle: Type.Optional(Type.String({ maxLength: 60 })),
  metaDescription: Type.Optional(Type.String({ maxLength: 160 })),
});
export type UpdatePageRequest = Static<typeof UpdatePageRequestSchema>;

export const ReorderPagesRequestSchema = Type.Object({
  orders: Type.Array(
    Type.Object({
      pageId: Type.String(),
      navOrder: Type.Integer({ minimum: 0 }),
    }),
    { minItems: 1 }
  ),
});
export type ReorderPagesRequest = Static<typeof ReorderPagesRequestSchema>;

export const InviteCollaboratorRequestSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  role: CollaboratorRoleSchema,
  permissions: Type.Optional(Type.Record(Type.String(), Type.Boolean())),
});
export type InviteCollaboratorRequest = Static<typeof InviteCollaboratorRequestSchema>;

export const UpdateCollaboratorRequestSchema = Type.Object({
  role: Type.Optional(CollaboratorRoleSchema),
  permissions: Type.Optional(Type.Record(Type.String(), Type.Boolean())),
  isActive: Type.Optional(Type.Boolean()),
});
export type UpdateCollaboratorRequest = Static<typeof UpdateCollaboratorRequestSchema>;

export const ApplyThemeRequestSchema = Type.Object({
  themeId: Type.String(),
});
export type ApplyThemeRequest = Static<typeof ApplyThemeRequestSchema>;

// ─────────────────────────────────────────────────────────────────────────
// Param Schemas
// ─────────────────────────────────────────────────────────────────────────

export const SiteIdParamSchema = Type.Object({
  siteId: Type.String(),
});
export type SiteIdParam = Static<typeof SiteIdParamSchema>;

export const PageIdParamSchema = Type.Object({
  siteId: Type.String(),
  pageId: Type.String(),
});
export type PageIdParam = Static<typeof PageIdParamSchema>;

export const CollaboratorIdParamSchema = Type.Object({
  siteId: Type.String(),
  collaboratorId: Type.String(),
});
export type CollaboratorIdParam = Static<typeof CollaboratorIdParamSchema>;

export const InviteTokenParamSchema = Type.Object({
  token: Type.String(),
});
export type InviteTokenParam = Static<typeof InviteTokenParamSchema>;

export const ThemeIdParamSchema = Type.Object({
  themeId: Type.String(),
});
export type ThemeIdParam = Static<typeof ThemeIdParamSchema>;

// ─────────────────────────────────────────────────────────────────────────
// Response Schemas
// ─────────────────────────────────────────────────────────────────────────

export const MessageResponseSchema = createSuccessResponseSchema(
  Type.Object({ message: Type.String() })
);
export type MessageResponse = Static<typeof MessageResponseSchema>;

// Site Responses
export const CreateSiteResponseSchema = createSuccessResponseSchema(
  Type.Object({ site: SiteSchema })
);
export type CreateSiteResponse = Static<typeof CreateSiteResponseSchema>;

export const GetSiteResponseSchema = createSuccessResponseSchema(
  Type.Object({ site: SiteSchema })
);
export type GetSiteResponse = Static<typeof GetSiteResponseSchema>;

export const ListSitesResponseSchema = createSuccessResponseSchema(
  Type.Object({ sites: Type.Array(SiteSummarySchema) })
);
export type ListSitesResponse = Static<typeof ListSitesResponseSchema>;

export const GetSiteStatsResponseSchema = createSuccessResponseSchema(
  Type.Object({ stats: SiteStatsSchema })
);
export type GetSiteStatsResponse = Static<typeof GetSiteStatsResponseSchema>;

export const GetSiteOverviewResponseSchema = createSuccessResponseSchema(
  Type.Object({
    site: SiteSchema,
    stats: SiteStatsSchema,
    recentActivity: Type.Array(Type.Object({
      type: Type.String(),
      title: Type.String(),
      description: Type.String(),
      timestamp: DateTimeSchema,
    })),
  })
);
export type GetSiteOverviewResponse = Static<typeof GetSiteOverviewResponseSchema>;

// Settings Responses
export const GetSiteSettingsResponseSchema = createSuccessResponseSchema(
  Type.Object({ settings: SiteSettingsSchema })
);
export type GetSiteSettingsResponse = Static<typeof GetSiteSettingsResponseSchema>;

export const UpdateSiteGeneralResponseSchema = createSuccessResponseSchema(
  Type.Object({ general: SiteGeneralSettingsSchema })
);
export type UpdateSiteGeneralResponse = Static<typeof UpdateSiteGeneralResponseSchema>;

export const UpdateSiteBrandingResponseSchema = createSuccessResponseSchema(
  Type.Object({ branding: SiteBrandingSettingsSchema })
);
export type UpdateSiteBrandingResponse = Static<typeof UpdateSiteBrandingResponseSchema>;

export const UpdateSiteThemeResponseSchema = createSuccessResponseSchema(
  Type.Object({ theme: SiteThemeSettingsSchema })
);
export type UpdateSiteThemeResponse = Static<typeof UpdateSiteThemeResponseSchema>;

export const UpdateSiteSeoResponseSchema = createSuccessResponseSchema(
  Type.Object({ seo: SiteSeoSettingsSchema })
);
export type UpdateSiteSeoResponse = Static<typeof UpdateSiteSeoResponseSchema>;

export const UpdateSiteAnalyticsResponseSchema = createSuccessResponseSchema(
  Type.Object({ analytics: SiteAnalyticsSettingsSchema })
);
export type UpdateSiteAnalyticsResponse = Static<typeof UpdateSiteAnalyticsResponseSchema>;

export const UpdateSiteCommentsResponseSchema = createSuccessResponseSchema(
  Type.Object({ comments: SiteCommentsSettingsSchema })
);
export type UpdateSiteCommentsResponse = Static<typeof UpdateSiteCommentsResponseSchema>;

// Domain Responses
export const GetSiteDomainResponseSchema = createSuccessResponseSchema(
  Type.Object({ domain: SiteDomainSchema })
);
export type GetSiteDomainResponse = Static<typeof GetSiteDomainResponseSchema>;

// Page Responses
export const ListPagesResponseSchema = createSuccessResponseSchema(
  Type.Object({ pages: Type.Array(PageSummarySchema) })
);
export type ListPagesResponse = Static<typeof ListPagesResponseSchema>;

export const GetPageResponseSchema = createSuccessResponseSchema(
  Type.Object({ page: PageSchema })
);
export type GetPageResponse = Static<typeof GetPageResponseSchema>;

// Collaborator Responses
export const ListCollaboratorsResponseSchema = createSuccessResponseSchema(
  Type.Object({ collaborators: Type.Array(CollaboratorSchema) })
);
export type ListCollaboratorsResponse = Static<typeof ListCollaboratorsResponseSchema>;

export const GetCollaboratorResponseSchema = createSuccessResponseSchema(
  Type.Object({ collaborator: CollaboratorSchema })
);
export type GetCollaboratorResponse = Static<typeof GetCollaboratorResponseSchema>;

export const InviteCollaboratorResponseSchema = createSuccessResponseSchema(
  Type.Object({ invite: CollaboratorInviteSchema })
);
export type InviteCollaboratorResponse = Static<typeof InviteCollaboratorResponseSchema>;

export const AcceptInviteResponseSchema = createSuccessResponseSchema(
  Type.Object({ collaborator: CollaboratorSchema })
);
export type AcceptInviteResponse = Static<typeof AcceptInviteResponseSchema>;

export const ListCollaboratorSitesResponseSchema = createSuccessResponseSchema(
  Type.Object({
    sites: Type.Array(Type.Object({
      siteId: Type.String(),
      siteName: Type.String(),
      siteSlug: Type.String(),
      role: CollaboratorRoleSchema,
      seriesCount: Type.Integer(),
    })),
  })
);
export type ListCollaboratorSitesResponse = Static<typeof ListCollaboratorSitesResponseSchema>;

// Theme Responses
export const ListThemesResponseSchema = createSuccessResponseSchema(
  Type.Object({ themes: Type.Array(ThemeSummarySchema) })
);
export type ListThemesResponse = Static<typeof ListThemesResponseSchema>;

export const GetThemeResponseSchema = createSuccessResponseSchema(
  Type.Object({ theme: ThemeSchema })
);
export type GetThemeResponse = Static<typeof GetThemeResponseSchema>;

// ─────────────────────────────────────────────────────────────────────────
// Admin Schemas
// ─────────────────────────────────────────────────────────────────────────

export const AdminSiteSummarySchema = Type.Object({
  id: Type.String(),
  slug: Type.String(),
  name: Type.String(),
  status: SiteStatusSchema,
  authorId: Type.String(),
  authorUsername: Type.String(),
  authorEmail: Type.String(),
  customDomain: NullableStringSchema,
  seriesCount: Type.Integer(),
  createdAt: DateTimeSchema,
});

export const AdminSiteDetailSchema = Type.Intersect([
  SiteSchema,
  Type.Object({
    authorId: Type.String(),
    authorPublicId: Type.String(),
    authorUsername: Type.String(),
    authorEmail: Type.String(),
    suspensionReason: NullableStringSchema,
    suspendedAt: NullableDateTimeSchema,
    collaboratorCount: Type.Integer(),
    seriesCount: Type.Integer(),
    pageCount: Type.Integer(),
  }),
]);

export const AdminSiteQuerySchema = Type.Object({
  page: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 20 })),
  search: Type.Optional(Type.String()),
  status: Type.Optional(SiteStatusSchema),
  authorId: Type.Optional(Type.String()),
  sortBy: Type.Optional(Type.String()),
  sortOrder: Type.Optional(Type.Union([Type.Literal('asc'), Type.Literal('desc')])),
});
export type AdminSiteQuery = Static<typeof AdminSiteQuerySchema>;

export const AdminUpdateSiteStatusRequestSchema = Type.Object({
  status: SiteStatusSchema,
  reason: Type.Optional(Type.String({ maxLength: 500 })),
});
export type AdminUpdateSiteStatusRequest = Static<typeof AdminUpdateSiteStatusRequestSchema>;

export const AdminListSitesResponseSchema = Type.Object({
  success: Type.Literal(true),
  data: Type.Array(AdminSiteSummarySchema),
  meta: Type.Object({
    page: Type.Integer(),
    limit: Type.Integer(),
    total: Type.Integer(),
    totalPages: Type.Integer(),
    hasNext: Type.Boolean(),
    hasPrev: Type.Boolean(),
  }),
  timestamp: DateTimeSchema,
  requestId: Type.Optional(Type.String()),
});
export type AdminListSitesResponse = Static<typeof AdminListSitesResponseSchema>;

export const AdminGetSiteResponseSchema = createSuccessResponseSchema(
  Type.Object({ site: AdminSiteDetailSchema })
);
export type AdminGetSiteResponse = Static<typeof AdminGetSiteResponseSchema>;