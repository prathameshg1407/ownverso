/**
 * User Security Hook
 */

'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usersApi } from '@/lib/api/endpoints';
import { useAuthStore } from '@/lib/stores/auth.store';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { CACHE_TIMES } from '@/lib/constants/config';
import { formatError } from '@/lib/api/error-handler';

export function useUserSecurity() {
  const { isAuthenticated, logout } = useAuthStore();

  const securityQuery = useQuery({
    queryKey: QUERY_KEYS.users.security(),
    queryFn: usersApi.getSecurity,
    enabled: isAuthenticated,
    staleTime: CACHE_TIMES.security,
  });

  const loginHistoryQuery = useQuery({
    queryKey: QUERY_KEYS.users.loginHistory(),
    queryFn: usersApi.getLoginHistory,
    enabled: isAuthenticated,
    staleTime: CACHE_TIMES.loginHistory,
  });

  const forceLogoutMutation = useMutation({
    mutationFn: usersApi.forceLogoutAll,
    onSuccess: (message: string) => {
      toast.success('Logged out from all devices', { description: message });
      logout();
    },
    onError: (error: unknown) => {
      toast.error('Failed to logout from devices', { description: formatError(error).message });
    },
  });

  return {
    security: securityQuery.data,
    isLoadingSecurity: securityQuery.isLoading,
    securityError: securityQuery.error,
    refetchSecurity: securityQuery.refetch,

    loginHistory: loginHistoryQuery.data,
    isLoadingHistory: loginHistoryQuery.isLoading,
    historyError: loginHistoryQuery.error,
    refetchHistory: loginHistoryQuery.refetch,

    forceLogoutAll: forceLogoutMutation.mutate,
    forceLogoutAllAsync: forceLogoutMutation.mutateAsync,
    isLoggingOutAll: forceLogoutMutation.isPending,
  };
}