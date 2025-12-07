/**
 * Site Pages Hook
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { sitesApi } from '@/lib/api/endpoints';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { AUTHOR_ROUTES } from '@/lib/constants/routes';
import { formatError } from '@/lib/api/error-handler';
import type { CreatePageRequest, UpdatePageRequest, ReorderPagesRequest } from '@/types/api';

const STALE_TIME = 2 * 60 * 1000;

export function useSitePages(siteId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const pagesQuery = useQuery({
    queryKey: QUERY_KEYS.sites.pages(siteId),
    queryFn: () => sitesApi.listPages(siteId),
    enabled: !!siteId,
    staleTime: STALE_TIME,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreatePageRequest) => sitesApi.createPage(siteId, data),
    onSuccess: (page) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sites.pages(siteId) });
      toast.success('Page created!');
      router.push(AUTHOR_ROUTES.siteSettings(siteId));
    },
    onError: (error: Error) => {
      toast.error('Failed to create page', { description: formatError(error).message });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: (data: ReorderPagesRequest) => sitesApi.reorderPages(siteId, data),
    onSuccess: (pages) => {
      queryClient.setQueryData(QUERY_KEYS.sites.pages(siteId), pages);
      toast.success('Pages reordered');
    },
    onError: (error: Error) => {
      toast.error('Reorder failed', { description: formatError(error).message });
    },
  });

  return {
    pages: pagesQuery.data ?? [],
    isLoading: pagesQuery.isLoading,
    isError: pagesQuery.isError,

    createPage: createMutation.mutate,
    createPageAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    reorderPages: reorderMutation.mutate,
    reorderPagesAsync: reorderMutation.mutateAsync,
    isReordering: reorderMutation.isPending,

    refetch: pagesQuery.refetch,
  };
}

export function useSitePage(siteId: string, pageId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const pageQuery = useQuery({
    queryKey: QUERY_KEYS.sites.page(siteId, pageId),
    queryFn: () => sitesApi.getPage(siteId, pageId),
    enabled: !!siteId && !!pageId,
    staleTime: STALE_TIME,
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdatePageRequest) => sitesApi.updatePage(siteId, pageId, data),
    onSuccess: (page) => {
      queryClient.setQueryData(QUERY_KEYS.sites.page(siteId, pageId), page);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sites.pages(siteId) });
      toast.success('Page updated');
    },
    onError: (error: Error) => {
      toast.error('Update failed', { description: formatError(error).message });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => sitesApi.deletePage(siteId, pageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sites.pages(siteId) });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.sites.page(siteId, pageId) });
      toast.success('Page deleted');
      router.push(AUTHOR_ROUTES.siteSettings(siteId));
    },
    onError: (error: Error) => {
      toast.error('Delete failed', { description: formatError(error).message });
    },
  });

  return {
    page: pageQuery.data,
    isLoading: pageQuery.isLoading,
    isError: pageQuery.isError,

    updatePage: updateMutation.mutate,
    updatePageAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    deletePage: deleteMutation.mutate,
    deletePageAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,

    refetch: pageQuery.refetch,
  };
}