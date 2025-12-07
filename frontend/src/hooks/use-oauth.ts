/**
 * OAuth Hook
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { oauthApi } from '@/lib/api/endpoints';
import { useAuthStore } from '@/lib/stores/auth.store';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { CACHE_TIMES } from '@/lib/constants/config';
import { formatError } from '@/lib/api/error-handler';
import type { AuthProvider } from '@/types/api';

export function useOAuth() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const providersQuery = useQuery({
    queryKey: QUERY_KEYS.auth.oauthProviders(),
    queryFn: oauthApi.getProviders,
    staleTime: CACHE_TIMES.oauthProviders,
  });

  const linkedAccountsQuery = useQuery({
    queryKey: QUERY_KEYS.auth.linkedAccounts(),
    queryFn: oauthApi.getLinkedAccounts,
    enabled: isAuthenticated,
    staleTime: CACHE_TIMES.linkedAccounts,
  });

  const initMutation = useMutation({
    mutationFn: (provider: AuthProvider) => oauthApi.initOAuth(provider),
    onSuccess: (data) => {
      window.location.href = data.authUrl;
    },
    onError: (error) => {
      toast.error('Failed to start OAuth flow', { description: formatError(error).message });
    },
  });

  const linkMutation = useMutation({
    mutationFn: ({ provider, code }: { provider: AuthProvider; code: string }) =>
      oauthApi.linkAccount(provider, code),
    onSuccess: (account) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.linkedAccounts() });
      toast.success(`${account.provider} account linked`);
    },
    onError: (error) => {
      toast.error('Failed to link account', { description: formatError(error).message });
    },
  });

  const unlinkMutation = useMutation({
    mutationFn: (provider: AuthProvider) => oauthApi.unlinkAccount(provider),
    onSuccess: (_, provider) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.linkedAccounts() });
      toast.success(`${provider} account unlinked`);
    },
    onError: (error) => {
      toast.error('Failed to unlink account', { description: formatError(error).message });
    },
  });

  const isProviderLinked = (provider: AuthProvider): boolean => {
    return linkedAccountsQuery.data?.some((a) => a.provider === provider && a.isConnected) ?? false;
  };

  return {
    providers: providersQuery.data,
    enabledProviders: providersQuery.data?.filter((p) => p.enabled) ?? [],
    isLoadingProviders: providersQuery.isLoading,

    linkedAccounts: linkedAccountsQuery.data,
    isLoadingAccounts: linkedAccountsQuery.isLoading,
    refetchAccounts: linkedAccountsQuery.refetch,
    isProviderLinked,

    initOAuth: initMutation.mutate,
    initOAuthAsync: initMutation.mutateAsync,
    isInitializing: initMutation.isPending,

    linkAccount: linkMutation.mutate,
    linkAccountAsync: linkMutation.mutateAsync,
    isLinking: linkMutation.isPending,

    unlinkAccount: unlinkMutation.mutate,
    unlinkAccountAsync: unlinkMutation.mutateAsync,
    isUnlinking: unlinkMutation.isPending,
  };
}