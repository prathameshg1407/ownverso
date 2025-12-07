/**
 * Site Detail Hook
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { sitesApi } from '@/lib/api/endpoints';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { AUTHOR_ROUTES } from '@/lib/constants/routes';
import { formatError } from '@/lib/api/error-handler';
import type { UpdateSiteRequest } from '@/types/api';

const STALE_TIME = 2 * 60 * 1000;

export function useSiteDetail(siteId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const siteQuery = useQuery({
    queryKey: QUERY_KEYS.sites.detail(siteId),
    queryFn: () => sitesApi.getSite(siteId),
    enabled: !!siteId,
    staleTime: STALE_TIME,
  });

  const overviewQuery = useQuery({
    queryKey: QUERY_KEYS.sites.overview(siteId),
    queryFn: () => sitesApi.getSiteOverview(siteId),
    enabled: !!siteId,
    staleTime: STALE_TIME,
  });

  const statsQuery = useQuery({
    queryKey: QUERY_KEYS.sites.stats(siteId),
    queryFn: () => sitesApi.getSiteStats(siteId),
    enabled: !!siteId,
    staleTime: STALE_TIME,
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateSiteRequest) => sitesApi.updateSite(siteId, data),
    onSuccess: (site) => {
      queryClient.setQueryData(QUERY_KEYS.sites.detail(siteId), site);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sites.list() });
      toast.success('Site updated', { description: 'Your changes have been saved.' });
    },
    onError: (error: Error) => {
      toast.error('Update failed', { description: formatError(error).message });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => sitesApi.deleteSite(siteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sites.list() });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.sites.detail(siteId) });
      toast.success('Site deleted');
      router.push(AUTHOR_ROUTES.sites);
    },
    onError: (error: Error) => {
      toast.error('Delete failed', { description: formatError(error).message });
    },
  });

  return {
    site: siteQuery.data,
    isLoading: siteQuery.isLoading,
    isError: siteQuery.isError,

    overview: overviewQuery.data,
    isLoadingOverview: overviewQuery.isLoading,

    stats: statsQuery.data,
    isLoadingStats: statsQuery.isLoading,

    updateSite: updateMutation.mutate,
    updateSiteAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    deleteSite: deleteMutation.mutate,
    deleteSiteAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,

    refetch: siteQuery.refetch,
  };
}