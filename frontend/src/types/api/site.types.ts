/**
 * Site API Types
 */

import type { SuccessResponse } from './common.types';
import type { PlatformTier } from './author.types';

// ─────────────────────────────────────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────────────────────────────────────

export type SiteStatus = 'DRAFT' | 'ACTIVE' | 'MAINTENANCE' | 'SUSPENDED' | 'DELETED';
export type ContentRating = 'EVERYONE' | 'TEEN' | 'MATURE' | 'ADULT_ONLY';
export type CommentModerationMode = 'NONE' | 'PRE_APPROVE' | 'POST_APPROVE' | 'TRUSTED_ONLY';
export type CollaboratorRole = 'VIEWER' | 'EDITOR' | 'TRANSLATOR' | 'ANALYST' | 'MANAGER' | 'OWNER';

// ─────────────────────────────────────────────────────────────────────────────
// Site
// ─────────────────────────────────────────────────────────────────────────────

export interface Site {
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

export interface SiteSummary {
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

export interface SiteStats {
  totalViews: number;
  totalSubscribers: number;
  totalRevenue: number;
  revenueCurrency: string;
  seriesCount: number;
  chapterCount: number;
  pageCount: number;
  collaboratorCount: number;
}

export interface SiteActivity {
  type: string;
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface SiteOverview {
  site: Site;
  stats: SiteStats;
  recentActivity: SiteActivity[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Site Settings
// ─────────────────────────────────────────────────────────────────────────────

export interface SiteGeneralSettings {
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  status: SiteStatus;
  isPublic: boolean;
  maintenanceMode: boolean;
  maintenanceMessage: string | null;
}

export interface SiteBrandingSettings {
  logoUrl: string | null;
  faviconUrl: string | null;
  coverImageUrl: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  accentColor: string | null;
}

export interface SiteThemeSettings {
  themeId: string | null;
  themeName: string | null;
  customCssEnabled: boolean;
  customCss: string | null;
}

export interface SiteSeoSettings {
  metaTitle: string | null;
  metaDescription: string | null;
  ogImageUrl: string | null;
}

export interface SiteAnalyticsSettings {
  googleAnalyticsId: string | null;
  analyticsEnabled: boolean;
}

export interface SiteCommentsSettings {
  commentsEnabled: boolean;
  commentsModerationMode: CommentModerationMode;
}

export interface SiteSettings {
  general: SiteGeneralSettings;
  branding: SiteBrandingSettings;
  theme: SiteThemeSettings;
  seo: SiteSeoSettings;
  analytics: SiteAnalyticsSettings;
  comments: SiteCommentsSettings;
}

// ─────────────────────────────────────────────────────────────────────────────
// Domain
// ─────────────────────────────────────────────────────────────────────────────

export interface DnsRecord {
  type: 'CNAME' | 'TXT' | 'A';
  name: string;
  value: string;
  ttl: number;
  verified: boolean;
}

export interface SiteDomain {
  customDomain: string | null;
  customDomainVerified: boolean;
  customDomainVerifiedAt: string | null;
  sslEnabled: boolean;
  sslExpiresAt: string | null;
  dnsRecords: DnsRecord[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Pages
// ─────────────────────────────────────────────────────────────────────────────

export interface Page {
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

export interface PageSummary {
  id: string;
  slug: string;
  title: string;
  isPublished: boolean;
  showInNav: boolean;
  navOrder: number;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Collaborators
// ─────────────────────────────────────────────────────────────────────────────

export interface Collaborator {
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

export interface CollaboratorInvite {
  id: string;
  email: string;
  role: CollaboratorRole;
  inviteToken: string;
  invitedAt: string;
  expiresAt: string | null;
}

export interface CollaboratorSite {
  siteId: string;
  siteName: string;
  siteSlug: string;
  role: CollaboratorRole;
  seriesCount: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Themes
// ─────────────────────────────────────────────────────────────────────────────

export interface Theme {
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

export interface ThemeSummary {
  id: string;
  name: string;
  slug: string;
  thumbnailUrl: string | null;
  isPremium: boolean;
  requiredTier: PlatformTier | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Request Types
// ─────────────────────────────────────────────────────────────────────────────

export interface CreateSiteRequest {
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
}

export interface UpdateSiteRequest {
  name?: string;
  slug?: string;
  tagline?: string;
  description?: string;
  status?: SiteStatus;
}

export interface UpdateSiteGeneralRequest {
  name?: string;
  slug?: string;
  tagline?: string | null;
  description?: string | null;
  status?: SiteStatus;
  isPublic?: boolean;
  maintenanceMode?: boolean;
  maintenanceMessage?: string | null;
}

export interface UpdateSiteBrandingRequest {
  logoUrl?: string | null;
  faviconUrl?: string | null;
  coverImageUrl?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  accentColor?: string | null;
}

export interface UpdateSiteThemeRequest {
  themeId?: string | null;
  customCssEnabled?: boolean;
  customCss?: string | null;
}

export interface UpdateSiteSeoRequest {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImageUrl?: string | null;
}

export interface UpdateSiteAnalyticsRequest {
  googleAnalyticsId?: string | null;
  analyticsEnabled?: boolean;
}

export interface UpdateSiteCommentsRequest {
  commentsEnabled?: boolean;
  commentsModerationMode?: CommentModerationMode;
}

export interface AddDomainRequest {
  customDomain: string;
}

export interface CreatePageRequest {
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

export interface UpdatePageRequest {
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

export interface ReorderPagesRequest {
  orders: Array<{ pageId: string; navOrder: number }>;
}

export interface InviteCollaboratorRequest {
  email: string;
  role: CollaboratorRole;
  permissions?: Record<string, boolean>;
}

export interface UpdateCollaboratorRequest {
  role?: CollaboratorRole;
  permissions?: Record<string, boolean>;
  isActive?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Response Types
// ─────────────────────────────────────────────────────────────────────────────

export type SiteResponse = SuccessResponse<{ site: Site }>;
export type SitesListResponse = SuccessResponse<{ sites: SiteSummary[] }>;
export type SiteStatsResponse = SuccessResponse<{ stats: SiteStats }>;
export type SiteOverviewResponse = SuccessResponse<{ site: Site; stats: SiteStats; recentActivity: SiteActivity[] }>;
export type SiteSettingsResponse = SuccessResponse<{ settings: SiteSettings }>;
export type SiteGeneralSettingsResponse = SuccessResponse<{ general: SiteGeneralSettings }>;
export type SiteBrandingSettingsResponse = SuccessResponse<{ branding: SiteBrandingSettings }>;
export type SiteThemeSettingsResponse = SuccessResponse<{ theme: SiteThemeSettings }>;
export type SiteSeoSettingsResponse = SuccessResponse<{ seo: SiteSeoSettings }>;
export type SiteAnalyticsSettingsResponse = SuccessResponse<{ analytics: SiteAnalyticsSettings }>;
export type SiteCommentsSettingsResponse = SuccessResponse<{ comments: SiteCommentsSettings }>;
export type SiteDomainResponse = SuccessResponse<{ domain: SiteDomain }>;
export type PagesListResponse = SuccessResponse<{ pages: PageSummary[] }>;
export type PageResponse = SuccessResponse<{ page: Page }>;
export type CollaboratorsListResponse = SuccessResponse<{ collaborators: Collaborator[] }>;
export type CollaboratorResponse = SuccessResponse<{ collaborator: Collaborator }>;
export type CollaboratorInviteResponse = SuccessResponse<{ invite: CollaboratorInvite }>;
export type CollaboratorSitesResponse = SuccessResponse<{ sites: CollaboratorSite[] }>;
export type ThemesListResponse = SuccessResponse<{ themes: ThemeSummary[] }>;
export type ThemeResponse = SuccessResponse<{ theme: Theme }>;