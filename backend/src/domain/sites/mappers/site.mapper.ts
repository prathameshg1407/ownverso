// ==== FILE: src/domain/sites/mappers/site.mapper.ts ====
/**
 * Site Mappers
 */

import type { Site, Page, Theme } from '@prisma/client';
import type {
  SiteDTO,
  SiteSummaryDTO,
  SiteSettingsDTO,
  SiteDomainDTO,
  PageDTO,
  PageSummaryDTO,
  CollaboratorDTO,
  ThemeDTO,
  ThemeSummaryDTO,
  AdminSiteSummaryDTO,
  AdminSiteDetailDTO,
  SiteWithTheme,
  SiteWithAuthor,
  SiteWithCounts,
  CollaboratorWithUser,
  DnsRecordDTO,
} from '../types/site.types';

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────

const toISOString = (date: Date | null): string | null =>
  date?.toISOString() ?? null;

// ─────────────────────────────────────────────────────────────────────────
// Site Mapper
// ─────────────────────────────────────────────────────────────────────────

export const siteMapper = {
  toDTO(site: Site): SiteDTO {
    return {
      id: site.id,
      slug: site.slug,
      name: site.name,
      tagline: site.tagline,
      description: site.description,
      status: site.status,
      isPublic: site.isPublic,
      logoUrl: site.logoUrl,
      faviconUrl: site.faviconUrl,
      coverImageUrl: site.coverImageUrl,
      primaryColor: site.primaryColor,
      secondaryColor: site.secondaryColor,
      accentColor: site.accentColor,
      themeId: site.themeId,
      customDomain: site.customDomain,
      customDomainVerified: site.customDomainVerified,
      sslEnabled: site.sslEnabled,
      defaultContentRating: site.defaultContentRating,
      commentsEnabled: site.commentsEnabled,
      lastPublishedAt: toISOString(site.lastPublishedAt),
      createdAt: site.createdAt.toISOString(),
      updatedAt: site.updatedAt.toISOString(),
    };
  },

  toSummaryDTO(
    site: Site & { _count?: { series: number } }
  ): SiteSummaryDTO {
    return {
      id: site.id,
      slug: site.slug,
      name: site.name,
      tagline: site.tagline,
      status: site.status,
      logoUrl: site.logoUrl,
      customDomain: site.customDomain,
      seriesCount: site._count?.series ?? 0,
      subscriberCount: 0, // TODO: Calculate from subscriptions
      lastPublishedAt: toISOString(site.lastPublishedAt),
      createdAt: site.createdAt.toISOString(),
    };
  },

  toSettingsDTO(site: SiteWithTheme): SiteSettingsDTO {
    return {
      general: {
        name: site.name,
        slug: site.slug,
        tagline: site.tagline,
        description: site.description,
        status: site.status,
        isPublic: site.isPublic,
        maintenanceMode: site.maintenanceMode,
        maintenanceMessage: site.maintenanceMessage,
      },
      branding: {
        logoUrl: site.logoUrl,
        faviconUrl: site.faviconUrl,
        coverImageUrl: site.coverImageUrl,
        primaryColor: site.primaryColor,
        secondaryColor: site.secondaryColor,
        accentColor: site.accentColor,
      },
      theme: {
        themeId: site.themeId,
        themeName: site.theme?.name ?? null,
        customCssEnabled: site.customCssEnabled,
        customCss: site.customCss,
      },
      seo: {
        metaTitle: site.metaTitle,
        metaDescription: site.metaDescription,
        ogImageUrl: site.ogImageUrl,
      },
      analytics: {
        googleAnalyticsId: site.googleAnalyticsId,
        analyticsEnabled: site.analyticsEnabled,
      },
      comments: {
        commentsEnabled: site.commentsEnabled,
        commentsModerationMode: site.commentsModerationMode,
      },
    };
  },

  toDomainDTO(site: Site): SiteDomainDTO {
    const dnsRecords: DnsRecordDTO[] = [];

    if (site.customDomain) {
      // Generate required DNS records
      dnsRecords.push({
        type: 'CNAME',
        name: site.customDomain,
        value: 'sites.ownverso.com',
        ttl: 3600,
        verified: site.customDomainVerified,
      });

      // Verification TXT record
      dnsRecords.push({
        type: 'TXT',
        name: `_ownverso.${site.customDomain}`,
        value: `site-verify=${site.id}`,
        ttl: 3600,
        verified: site.customDomainVerified,
      });
    }

    return {
      customDomain: site.customDomain,
      customDomainVerified: site.customDomainVerified,
      customDomainVerifiedAt: toISOString(site.customDomainVerifiedAt),
      sslEnabled: site.sslEnabled,
      sslExpiresAt: toISOString(site.sslExpiresAt),
      dnsRecords,
    };
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Page Mapper
// ─────────────────────────────────────────────────────────────────────────

export const pageMapper = {
  toDTO(page: Page): PageDTO {
    return {
      id: page.id,
      slug: page.slug,
      title: page.title,
      content: page.content,
      contentHtml: page.contentHtml,
      isPublished: page.isPublished,
      publishedAt: toISOString(page.publishedAt),
      showInNav: page.showInNav,
      navOrder: page.navOrder,
      navLabel: page.navLabel,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      createdAt: page.createdAt.toISOString(),
      updatedAt: page.updatedAt.toISOString(),
    };
  },

  toSummaryDTO(page: Page): PageSummaryDTO {
    return {
      id: page.id,
      slug: page.slug,
      title: page.title,
      isPublished: page.isPublished,
      showInNav: page.showInNav,
      navOrder: page.navOrder,
      updatedAt: page.updatedAt.toISOString(),
    };
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Collaborator Mapper
// ─────────────────────────────────────────────────────────────────────────

export const collaboratorMapper = {
  toDTO(collab: CollaboratorWithUser): CollaboratorDTO {
    return {
      id: collab.id.toString(),
      userId: collab.user.publicId,
      username: collab.user.username,
      displayName: collab.user.displayName,
      avatarUrl: collab.user.profile?.avatarUrl ?? null,
      role: collab.role,
      permissions: collab.permissions as Record<string, boolean>,
      isActive: collab.isActive,
      invitedAt: collab.invitedAt.toISOString(),
      acceptedAt: toISOString(collab.acceptedAt),
    };
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Theme Mapper
// ─────────────────────────────────────────────────────────────────────────

export const themeMapper = {
  toDTO(theme: Theme): ThemeDTO {
    return {
      id: theme.id,
      name: theme.name,
      slug: theme.slug,
      description: theme.description,
      thumbnailUrl: theme.thumbnailUrl,
      previewUrl: theme.previewUrl,
      isPublic: theme.isPublic,
      isPremium: theme.isPremium,
      requiredTier: theme.requiredTier,
      usageCount: theme.usageCount,
    };
  },

  toSummaryDTO(theme: Theme): ThemeSummaryDTO {
    return {
      id: theme.id,
      name: theme.name,
      slug: theme.slug,
      thumbnailUrl: theme.thumbnailUrl,
      isPremium: theme.isPremium,
      requiredTier: theme.requiredTier,
    };
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Admin Mappers
// ─────────────────────────────────────────────────────────────────────────

export const adminSiteMapper = {
  toSummaryDTO(
    site: SiteWithAuthor & { _count?: { series: number } }
  ): AdminSiteSummaryDTO {
    return {
      id: site.id,
      slug: site.slug,
      name: site.name,
      status: site.status,
      authorId: site.authorId.toString(),
      authorUsername: site.author.username,
      authorEmail: site.author.email,
      customDomain: site.customDomain,
      seriesCount: site._count?.series ?? 0,
      createdAt: site.createdAt.toISOString(),
    };
  },

  toDetailDTO(site: SiteWithAuthor & SiteWithCounts): AdminSiteDetailDTO {
    return {
      ...siteMapper.toDTO(site),
      authorId: site.authorId.toString(),
      authorPublicId: site.author.publicId,
      authorUsername: site.author.username,
      authorEmail: site.author.email,
      suspensionReason: site.suspensionReason,
      suspendedAt: toISOString(site.suspendedAt),
      collaboratorCount: site._count.collaborators,
      seriesCount: site._count.series,
      pageCount: site._count.pages,
    };
  },
};