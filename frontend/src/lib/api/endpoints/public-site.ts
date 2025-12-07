/**
 * Public Site API Endpoints
 */

import { apiClient } from '../client';
import type { PublicSite, PublicPage, SuccessResponse } from '@/types/api';

async function getSiteBySlug(siteSlug: string): Promise<PublicSite> {
  const response = await apiClient.get<SuccessResponse<{ site: PublicSite }>>(
    `/public/sites/${encodeURIComponent(siteSlug)}`
  );
  return response.data.data.site;
}

async function getPageBySlug(
  siteSlug: string,
  pageSlug: string
): Promise<{ site: PublicSite; page: PublicPage }> {
  const response = await apiClient.get<SuccessResponse<{ site: PublicSite; page: PublicPage }>>(
    `/public/sites/${encodeURIComponent(siteSlug)}/pages/${encodeURIComponent(pageSlug)}`
  );
  return response.data.data;
}

export const publicSiteApi = {
  getSiteBySlug,
  getPageBySlug,
} as const;