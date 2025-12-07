/**
 * Author Stats Hook
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { authorApi } from '@/lib/api/endpoints';
import { QUERY_KEYS } from '@/lib/constants/keys';

export function useAuthorStats() {
  const statsQuery = useQuery({
    queryKey: QUERY_KEYS.author.stats(),
    queryFn: authorApi.getStats,
    staleTime: 2 * 60 * 1000,
  });

  return {
    stats: statsQuery.data,
    isLoading: statsQuery.isLoading,
    isError: statsQuery.isError,
    error: statsQuery.error,
    refetch: statsQuery.refetch,
  };
}