/**
 * Session Management Hook
 */

'use client';

import { useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { authApi } from '@/lib/api/endpoints';
import { useAuthStore } from '@/lib/stores/auth.store';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { CACHE_TIMES } from '@/lib/constants/config';

export function useSession() {
  const queryClient = useQueryClient();
  const {
    user,
    isAuthenticated,
    setUserFromSafe,
    logout,
    markSessionChecked,
    sessionChecked,
  } = useAuthStore();
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    if (isAuthenticated && user) {
      markSessionChecked();
      return;
    }

    authApi
      .getCurrentUser()
      .then((safeUser) => {
        if (safeUser) {
          setUserFromSafe(safeUser);
          queryClient.setQueryData(QUERY_KEYS.auth.user(), safeUser);
        }
      })
      .catch(() => logout())
      .finally(() => {
        markSessionChecked();
        initRef.current = false;
      });
  }, [isAuthenticated, logout, queryClient, setUserFromSafe, user, markSessionChecked, sessionChecked]);

  const sessionsQuery = useQuery({
    queryKey: QUERY_KEYS.auth.sessions(),
    queryFn: authApi.getSessions,
    enabled: !!user && isAuthenticated,
    staleTime: CACHE_TIMES.sessions,
    retry: false,
  });

  return {
    user,
    isAuthenticated,
    sessionChecked,
    sessions: sessionsQuery.data ?? [],
    isLoadingSessions: sessionsQuery.isLoading,
    refetchSessions: sessionsQuery.refetch,
    revokeSession: authApi.revokeSession,
    revokeOtherSessions: authApi.revokeOtherSessions,
  };
}