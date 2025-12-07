/**
 * Public Site API Types
 */

import type { SuccessResponse } from './common.types';
import type { ContentRating } from './site.types';

// ─────────────────────────────────────────────────────────────────────────────
// Public Types
// ─────────────────────────────────────────────────────────────────────────────

export interface PublicNavPage {
  id: string;
  slug: string;
  title: string;
  navLabel: string | null;
  navOrder: number;
}

export interface PublicSite {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  coverImageUrl: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  accentColor: string | null;
  customDomain: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImageUrl: string | null;
  defaultContentRating: ContentRating;
  commentsEnabled: boolean;
  navPages: PublicNavPage[];
}

export interface PublicPage {
  id: string;
  siteId: string;
  slug: string;
  title: string;
  contentHtml: string | null;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Response Types
// ─────────────────────────────────────────────────────────────────────────────

export type PublicSiteResponse = SuccessResponse<{ site: PublicSite }>;
export type PublicPageResponse = SuccessResponse<{ site: PublicSite; page: PublicPage }>;