/**
 * Sites API Endpoints
 */

import { apiClient } from '../client';
import type {
  CreateSiteRequest,
  UpdateSiteRequest,
  UpdateSiteGeneralRequest,
  UpdateSiteBrandingRequest,
  UpdateSiteThemeRequest,
  UpdateSiteSeoRequest,
  UpdateSiteAnalyticsRequest,
  UpdateSiteCommentsRequest,
  AddDomainRequest,
  CreatePageRequest,
  UpdatePageRequest,
  ReorderPagesRequest,
  InviteCollaboratorRequest,
  UpdateCollaboratorRequest,
  Site,
  SiteSummary,
  SiteStats,
  SiteActivity,
  SiteSettings,
  SiteGeneralSettings,
  SiteBrandingSettings,
  SiteThemeSettings,
  SiteSeoSettings,
  SiteAnalyticsSettings,
  SiteCommentsSettings,
  SiteDomain,
  Page,
  PageSummary,
  Collaborator,
  CollaboratorInvite,
  CollaboratorSite,
  SuccessResponse,
} from '@/types/api';

const BASE_PATH = '/sites';

// ─────────────────────────────────────────────────────────────────────────────
// Site CRUD
// ─────────────────────────────────────────────────────────────────────────────

async function listSites(): Promise<SiteSummary[]> {
  const response = await apiClient.get<SuccessResponse<{ sites: SiteSummary[] }>>(BASE_PATH);
  return response.data.data.sites;
}

async function createSite(data: CreateSiteRequest): Promise<Site> {
  const response = await apiClient.post<SuccessResponse<{ site: Site }>>(BASE_PATH, data);
  return response.data.data.site;
}

async function getSite(siteId: string): Promise<Site> {
  const response = await apiClient.get<SuccessResponse<{ site: Site }>>(
    `${BASE_PATH}/${siteId}`
  );
  return response.data.data.site;
}

async function updateSite(siteId: string, data: UpdateSiteRequest): Promise<Site> {
  const response = await apiClient.put<SuccessResponse<{ site: Site }>>(
    `${BASE_PATH}/${siteId}`,
    data
  );
  return response.data.data.site;
}

async function deleteSite(siteId: string): Promise<void> {
  await apiClient.delete(`${BASE_PATH}/${siteId}`);
}

async function getSiteStats(siteId: string): Promise<SiteStats> {
  const response = await apiClient.get<SuccessResponse<{ stats: SiteStats }>>(
    `${BASE_PATH}/${siteId}/stats`
  );
  return response.data.data.stats;
}

async function getSiteOverview(
  siteId: string
): Promise<{ site: Site; stats: SiteStats; recentActivity: SiteActivity[] }> {
  const response = await apiClient.get<
    SuccessResponse<{ site: Site; stats: SiteStats; recentActivity: SiteActivity[] }>
  >(`${BASE_PATH}/${siteId}/overview`);
  return response.data.data;
}

// ─────────────────────────────────────────────────────────────────────────────
// Settings
// ─────────────────────────────────────────────────────────────────────────────

async function getSettings(siteId: string): Promise<SiteSettings> {
  const response = await apiClient.get<SuccessResponse<{ settings: SiteSettings }>>(
    `${BASE_PATH}/${siteId}/settings`
  );
  return response.data.data.settings;
}

async function updateGeneral(
  siteId: string,
  data: UpdateSiteGeneralRequest
): Promise<SiteGeneralSettings> {
  const response = await apiClient.put<SuccessResponse<{ general: SiteGeneralSettings }>>(
    `${BASE_PATH}/${siteId}/settings/general`,
    data
  );
  return response.data.data.general;
}

async function updateBranding(
  siteId: string,
  data: UpdateSiteBrandingRequest
): Promise<SiteBrandingSettings> {
  const response = await apiClient.put<SuccessResponse<{ branding: SiteBrandingSettings }>>(
    `${BASE_PATH}/${siteId}/settings/branding`,
    data
  );
  return response.data.data.branding;
}

async function updateTheme(
  siteId: string,
  data: UpdateSiteThemeRequest
): Promise<SiteThemeSettings> {
  const response = await apiClient.put<SuccessResponse<{ theme: SiteThemeSettings }>>(
    `${BASE_PATH}/${siteId}/settings/theme`,
    data
  );
  return response.data.data.theme;
}

async function updateSeo(siteId: string, data: UpdateSiteSeoRequest): Promise<SiteSeoSettings> {
  const response = await apiClient.put<SuccessResponse<{ seo: SiteSeoSettings }>>(
    `${BASE_PATH}/${siteId}/settings/seo`,
    data
  );
  return response.data.data.seo;
}

async function updateAnalytics(
  siteId: string,
  data: UpdateSiteAnalyticsRequest
): Promise<SiteAnalyticsSettings> {
  const response = await apiClient.put<SuccessResponse<{ analytics: SiteAnalyticsSettings }>>(
    `${BASE_PATH}/${siteId}/settings/analytics`,
    data
  );
  return response.data.data.analytics;
}

async function updateComments(
  siteId: string,
  data: UpdateSiteCommentsRequest
): Promise<SiteCommentsSettings> {
  const response = await apiClient.put<SuccessResponse<{ comments: SiteCommentsSettings }>>(
    `${BASE_PATH}/${siteId}/settings/comments`,
    data
  );
  return response.data.data.comments;
}

// ─────────────────────────────────────────────────────────────────────────────
// Domain
// ─────────────────────────────────────────────────────────────────────────────

async function getDomain(siteId: string): Promise<SiteDomain> {
  const response = await apiClient.get<SuccessResponse<{ domain: SiteDomain }>>(
    `${BASE_PATH}/${siteId}/domain`
  );
  return response.data.data.domain;
}

async function addDomain(siteId: string, data: AddDomainRequest): Promise<SiteDomain> {
  const response = await apiClient.post<SuccessResponse<{ domain: SiteDomain }>>(
    `${BASE_PATH}/${siteId}/domain`,
    data
  );
  return response.data.data.domain;
}

async function verifyDomain(siteId: string): Promise<SiteDomain> {
  const response = await apiClient.post<SuccessResponse<{ domain: SiteDomain }>>(
    `${BASE_PATH}/${siteId}/domain/verify`,
    {}
  );
  return response.data.data.domain;
}

async function removeDomain(siteId: string): Promise<void> {
  await apiClient.delete(`${BASE_PATH}/${siteId}/domain`);
}

async function provisionSsl(siteId: string): Promise<SiteDomain> {
  const response = await apiClient.post<SuccessResponse<{ domain: SiteDomain }>>(
    `${BASE_PATH}/${siteId}/domain/ssl/provision`,
    {}
  );
  return response.data.data.domain;
}

// ─────────────────────────────────────────────────────────────────────────────
// Pages
// ─────────────────────────────────────────────────────────────────────────────

async function listPages(siteId: string): Promise<PageSummary[]> {
  const response = await apiClient.get<SuccessResponse<{ pages: PageSummary[] }>>(
    `${BASE_PATH}/${siteId}/pages`
  );
  return response.data.data.pages;
}

async function createPage(siteId: string, data: CreatePageRequest): Promise<Page> {
  const response = await apiClient.post<SuccessResponse<{ page: Page }>>(
    `${BASE_PATH}/${siteId}/pages`,
    data
  );
  return response.data.data.page;
}

async function getPage(siteId: string, pageId: string): Promise<Page> {
  const response = await apiClient.get<SuccessResponse<{ page: Page }>>(
    `${BASE_PATH}/${siteId}/pages/${pageId}`
  );
  return response.data.data.page;
}

async function updatePage(siteId: string, pageId: string, data: UpdatePageRequest): Promise<Page> {
  const response = await apiClient.put<SuccessResponse<{ page: Page }>>(
    `${BASE_PATH}/${siteId}/pages/${pageId}`,
    data
  );
  return response.data.data.page;
}

async function deletePage(siteId: string, pageId: string): Promise<void> {
  await apiClient.delete(`${BASE_PATH}/${siteId}/pages/${pageId}`);
}

async function reorderPages(siteId: string, data: ReorderPagesRequest): Promise<PageSummary[]> {
  const response = await apiClient.put<SuccessResponse<{ pages: PageSummary[] }>>(
    `${BASE_PATH}/${siteId}/pages/reorder`,
    data
  );
  return response.data.data.pages;
}

// ─────────────────────────────────────────────────────────────────────────────
// Collaborators
// ─────────────────────────────────────────────────────────────────────────────

async function listCollaborators(siteId: string): Promise<Collaborator[]> {
  const response = await apiClient.get<SuccessResponse<{ collaborators: Collaborator[] }>>(
    `${BASE_PATH}/${siteId}/collaborators`
  );
  return response.data.data.collaborators;
}

async function inviteCollaborator(
  siteId: string,
  data: InviteCollaboratorRequest
): Promise<CollaboratorInvite> {
  const response = await apiClient.post<SuccessResponse<{ invite: CollaboratorInvite }>>(
    `${BASE_PATH}/${siteId}/collaborators/invite`,
    data
  );
  return response.data.data.invite;
}

async function getCollaborator(siteId: string, collaboratorId: string): Promise<Collaborator> {
  const response = await apiClient.get<SuccessResponse<{ collaborator: Collaborator }>>(
    `${BASE_PATH}/${siteId}/collaborators/${collaboratorId}`
  );
  return response.data.data.collaborator;
}

async function updateCollaborator(
  siteId: string,
  collaboratorId: string,
  data: UpdateCollaboratorRequest
): Promise<Collaborator> {
  const response = await apiClient.put<SuccessResponse<{ collaborator: Collaborator }>>(
    `${BASE_PATH}/${siteId}/collaborators/${collaboratorId}`,
    data
  );
  return response.data.data.collaborator;
}

async function removeCollaborator(siteId: string, collaboratorId: string): Promise<void> {
  await apiClient.delete(`${BASE_PATH}/${siteId}/collaborators/${collaboratorId}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────

export const sitesApi = {
  listSites,
  createSite,
  getSite,
  updateSite,
  deleteSite,
  getSiteStats,
  getSiteOverview,
  getSettings,
  updateGeneral,
  updateBranding,
  updateTheme,
  updateSeo,
  updateAnalytics,
  updateComments,
  getDomain,
  addDomain,
  verifyDomain,
  removeDomain,
  provisionSsl,
  listPages,
  createPage,
  getPage,
  updatePage,
  deletePage,
  reorderPages,
  listCollaborators,
  inviteCollaborator,
  getCollaborator,
  updateCollaborator,
  removeCollaborator,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Collaborator API (standalone routes)
// ─────────────────────────────────────────────────────────────────────────────

export const collaboratorApi = {
  async acceptInvite(token: string): Promise<Collaborator> {
    const response = await apiClient.post<SuccessResponse<{ collaborator: Collaborator }>>(
      `/collaborator/accept/${token}`,
      {}
    );
    return response.data.data.collaborator;
  },

  async listSites(): Promise<CollaboratorSite[]> {
    const response = await apiClient.get<SuccessResponse<{ sites: CollaboratorSite[] }>>(
      '/collaborator/sites'
    );
    return response.data.data.sites;
  },
} as const;