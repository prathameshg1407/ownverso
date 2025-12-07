/**
 * Site Settings Hook
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { sitesApi } from '@/lib/api/endpoints';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { formatError } from '@/lib/api/error-handler';
import type {
  UpdateSiteGeneralRequest,
  UpdateSiteBrandingRequest,
  UpdateSiteThemeRequest,
  UpdateSiteSeoRequest,
  UpdateSiteAnalyticsRequest,
  UpdateSiteCommentsRequest,
} from '@/types/api';

// Helper to create mutation options (NOT a hook - just returns config object)
function createMutationOptions<T>(
  siteId: string,
  updateFn: (siteId: string, data: T) => Promise<unknown>,
  successMessage: string,
  queryClient: ReturnType<typeof useQueryClient>
) {
  return {
    mutationFn: (data: T) => updateFn(siteId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sites.settings(siteId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sites.detail(siteId) });
      toast.success(successMessage);
    },
    onError: (error: Error) => {
      toast.error('Update failed', { description: formatError(error).message });
    },
  };
}

export function useSiteSettings(siteId: string) {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: QUERY_KEYS.sites.settings(siteId),
    queryFn: () => sitesApi.getSettings(siteId),
    enabled: !!siteId,
    staleTime: 5 * 60 * 1000,
  });

  // ✅ All useMutation calls are now at the TOP LEVEL of the hook
  const generalMutation = useMutation(
    createMutationOptions<UpdateSiteGeneralRequest>(
      siteId,
      sitesApi.updateGeneral,
      'General settings updated',
      queryClient
    )
  );

  const brandingMutation = useMutation(
    createMutationOptions<UpdateSiteBrandingRequest>(
      siteId,
      sitesApi.updateBranding,
      'Branding updated',
      queryClient
    )
  );

  const themeMutation = useMutation(
    createMutationOptions<UpdateSiteThemeRequest>(
      siteId,
      sitesApi.updateTheme,
      'Theme settings updated',
      queryClient
    )
  );

  const seoMutation = useMutation(
    createMutationOptions<UpdateSiteSeoRequest>(
      siteId,
      sitesApi.updateSeo,
      'SEO settings updated',
      queryClient
    )
  );

  const analyticsMutation = useMutation(
    createMutationOptions<UpdateSiteAnalyticsRequest>(
      siteId,
      sitesApi.updateAnalytics,
      'Analytics settings updated',
      queryClient
    )
  );

  const commentsMutation = useMutation(
    createMutationOptions<UpdateSiteCommentsRequest>(
      siteId,
      sitesApi.updateComments,
      'Comments settings updated',
      queryClient
    )
  );

  return {
    settings: settingsQuery.data,
    isLoading: settingsQuery.isLoading,
    isError: settingsQuery.isError,

    updateGeneral: generalMutation.mutate,
    updateGeneralAsync: generalMutation.mutateAsync,
    isUpdatingGeneral: generalMutation.isPending,

    updateBranding: brandingMutation.mutate,
    updateBrandingAsync: brandingMutation.mutateAsync,
    isUpdatingBranding: brandingMutation.isPending,

    updateTheme: themeMutation.mutate,
    updateThemeAsync: themeMutation.mutateAsync,
    isUpdatingTheme: themeMutation.isPending,

    updateSeo: seoMutation.mutate,
    updateSeoAsync: seoMutation.mutateAsync,
    isUpdatingSeo: seoMutation.isPending,

    updateAnalytics: analyticsMutation.mutate,
    updateAnalyticsAsync: analyticsMutation.mutateAsync,
    isUpdatingAnalytics: analyticsMutation.isPending,

    updateComments: commentsMutation.mutate,
    updateCommentsAsync: commentsMutation.mutateAsync,
    isUpdatingComments: commentsMutation.isPending,

    refetch: settingsQuery.refetch,
  };
}