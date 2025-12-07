/**
 * Public Site Hook
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { publicSiteApi } from '@/lib/api/endpoints';

const STALE_TIME = 5 * 60 * 1000;

export function usePublicSite(siteSlug: string) {
  const query = useQuery({
    queryKey: ['public-site', siteSlug],
    queryFn: () => publicSiteApi.getSiteBySlug(siteSlug),
    staleTime: STALE_TIME,
    enabled: !!siteSlug,
  });

  return {
    site: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function usePublicPage(siteSlug: string, pageSlug: string) {
  const query = useQuery({
    queryKey: ['public-site', siteSlug, 'page', pageSlug],
    queryFn: () => publicSiteApi.getPageBySlug(siteSlug, pageSlug),
    staleTime: STALE_TIME,
    enabled: !!siteSlug && !!pageSlug,
  });

  return {
    site: query.data?.site,
    page: query.data?.page,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}