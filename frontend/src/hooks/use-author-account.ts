/**
 * Author Account Hook
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { authorApi } from '@/lib/api/endpoints';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { formatError } from '@/lib/api/error-handler';
import type { RegisterAuthorRequest, UpdateAuthorAccountRequest } from '@/types/api';

const STALE_TIME = 5 * 60 * 1000;

export function useAuthorAccount() {
  const queryClient = useQueryClient();

  const accountQuery = useQuery({
    queryKey: QUERY_KEYS.author.account(),
    queryFn: authorApi.getAccount,
    staleTime: STALE_TIME,
  });

  const registerMutation = useMutation({
    mutationFn: (data?: RegisterAuthorRequest) => authorApi.registerAuthor(data),
    onSuccess: (account) => {
      queryClient.setQueryData(QUERY_KEYS.author.account(), account);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.user() });
      toast.success('Welcome to Ownverso!', {
        description: 'Your author account has been created.',
      });
    },
    onError: (error: Error) => {
      toast.error('Registration failed', { description: formatError(error).message });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateAuthorAccountRequest) => authorApi.updateAccount(data),
    onSuccess: (account) => {
      queryClient.setQueryData(QUERY_KEYS.author.account(), account);
      toast.success('Account updated', {
        description: 'Your author profile has been saved.',
      });
    },
    onError: (error: Error) => {
      toast.error('Update failed', { description: formatError(error).message });
    },
  });

  return {
    account: accountQuery.data,
    isLoading: accountQuery.isLoading,
    isError: accountQuery.isError,
    error: accountQuery.error,

    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,

    updateAccount: updateMutation.mutate,
    updateAccountAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    refetch: accountQuery.refetch,
  };
}