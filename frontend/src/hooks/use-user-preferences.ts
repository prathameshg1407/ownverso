/**
 * User Preferences Hook
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usersApi } from '@/lib/api/endpoints';
import { useAuthStore } from '@/lib/stores/auth.store';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { CACHE_TIMES } from '@/lib/constants/config';
import { formatError } from '@/lib/api/error-handler';
import type { UpdatePreferencesRequest, UserPreferences } from '@/types/api';

export function useUserPreferences() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const preferencesQuery = useQuery({
    queryKey: QUERY_KEYS.users.preferences(),
    queryFn: usersApi.getPreferences,
    enabled: isAuthenticated,
    staleTime: CACHE_TIMES.preferences,
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdatePreferencesRequest) => usersApi.updatePreferences(data),
    onSuccess: (updatedPrefs: UserPreferences) => {
      queryClient.setQueryData(QUERY_KEYS.users.preferences(), updatedPrefs);
      toast.success('Preferences saved');
    },
    onError: (error: unknown) => {
      toast.error('Failed to save preferences', { description: formatError(error).message });
    },
  });

  return {
    preferences: preferencesQuery.data,
    isLoading: preferencesQuery.isLoading,
    error: preferencesQuery.error,
    refetch: preferencesQuery.refetch,

    updatePreferences: updateMutation.mutate,
    updatePreferencesAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}