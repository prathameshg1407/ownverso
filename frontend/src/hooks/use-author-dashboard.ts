/**
 * Author Dashboard Hook
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { authorApi } from '@/lib/api/endpoints';
import { QUERY_KEYS } from '@/lib/constants/keys';

export function useAuthorDashboard() {
  const dashboardQuery = useQuery({
    queryKey: QUERY_KEYS.author.dashboard(),
    queryFn: authorApi.getDashboard,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  const dashboard = dashboardQuery.data;

  return {
    dashboard,
    account: dashboard?.account,
    stats: dashboard?.stats,
    recentActivity: dashboard?.recentActivity ?? [],
    subscription: dashboard?.platformSubscription,
    isLoading: dashboardQuery.isLoading,
    isError: dashboardQuery.isError,
    error: dashboardQuery.error,
    refetch: dashboardQuery.refetch,
  };
}