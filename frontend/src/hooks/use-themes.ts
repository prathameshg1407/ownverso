/**
 * Themes Hook
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { themesApi } from '@/lib/api/endpoints';
import { QUERY_KEYS } from '@/lib/constants/keys';

const STALE_TIME = 30 * 60 * 1000;

export function useThemes() {
  const themesQuery = useQuery({
    queryKey: QUERY_KEYS.themes.list(),
    queryFn: themesApi.listThemes,
    staleTime: STALE_TIME,
  });

  return {
    themes: themesQuery.data ?? [],
    isLoading: themesQuery.isLoading,
    isError: themesQuery.isError,
    refetch: themesQuery.refetch,
  };
}

export function useTheme(themeId: string) {
  const themeQuery = useQuery({
    queryKey: QUERY_KEYS.themes.detail(themeId),
    queryFn: () => themesApi.getTheme(themeId),
    enabled: !!themeId,
    staleTime: STALE_TIME,
  });

  return {
    theme: themeQuery.data,
    isLoading: themeQuery.isLoading,
    isError: themeQuery.isError,
    refetch: themeQuery.refetch,
  };
}