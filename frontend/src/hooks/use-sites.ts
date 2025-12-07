/**
 * Sites Hook
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { sitesApi } from '@/lib/api/endpoints';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { AUTHOR_ROUTES } from '@/lib/constants/routes';
import { formatError } from '@/lib/api/error-handler';
import type { CreateSiteRequest } from '@/types/api';

export function useSites() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const sitesQuery = useQuery({
    queryKey: QUERY_KEYS.sites.list(),
    queryFn: sitesApi.listSites,
    staleTime: 2 * 60 * 1000,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateSiteRequest) => sitesApi.createSite(data),
    onSuccess: (site) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sites.list() });
      queryClient.setQueryData(QUERY_KEYS.sites.detail(site.id), site);
      toast.success('Site created!', { description: `${site.name} is ready to go.` });
      router.push(AUTHOR_ROUTES.site(site.id));
    },
    onError: (error: Error) => {
      toast.error('Failed to create site', { description: formatError(error).message });
    },
  });

  return {
    sites: sitesQuery.data ?? [],
    isLoading: sitesQuery.isLoading,
    isError: sitesQuery.isError,
    error: sitesQuery.error,

    createSite: createMutation.mutate,
    createSiteAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    refetch: sitesQuery.refetch,
  };
}