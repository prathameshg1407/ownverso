/**
 * User Hook
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usersApi } from '@/lib/api/endpoints';
import { useAuthStore } from '@/lib/stores/auth.store';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { CACHE_TIMES } from '@/lib/constants/config';
import { formatError } from '@/lib/api/error-handler';
import type { UpdateUserRequest, FullUser } from '@/types/api';

export function useUser() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const userQuery = useQuery({
    queryKey: QUERY_KEYS.users.me(),
    queryFn: usersApi.getMe,
    enabled: isAuthenticated,
    staleTime: CACHE_TIMES.user,
    gcTime: CACHE_TIMES.user * 2,
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateUserRequest) => usersApi.updateMe(data),
    onSuccess: (updatedUser: FullUser) => {
      queryClient.setQueryData(QUERY_KEYS.users.me(), updatedUser);
      toast.success('Profile updated');
    },
    onError: (error: unknown) => {
      toast.error('Failed to update profile', { description: formatError(error).message });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: usersApi.deleteMe,
    onSuccess: () => {
      toast.success('Account deletion initiated', {
        description: 'Check your email to confirm.',
      });
    },
    onError: (error: unknown) => {
      toast.error('Failed to delete account', { description: formatError(error).message });
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    refetch: userQuery.refetch,

    updateUser: updateMutation.mutate,
    updateUserAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    deleteAccount: deleteMutation.mutate,
    deleteAccountAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}