/**
 * MFA Hook
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { mfaApi } from '@/lib/api/endpoints';
import { useAuthStore } from '@/lib/stores/auth.store';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { CACHE_TIMES } from '@/lib/constants/config';
import { formatError } from '@/lib/api/error-handler';
import type { MfaDisableRequest } from '@/types/api';

export function useMfa() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const invalidateMfaStatus = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.mfaStatus() });
  };

  const statusQuery = useQuery({
    queryKey: QUERY_KEYS.auth.mfaStatus(),
    queryFn: mfaApi.getMfaStatus,
    enabled: isAuthenticated,
    staleTime: CACHE_TIMES.mfaStatus,
  });

  const setupMutation = useMutation({
    mutationFn: mfaApi.setupMfa,
    onError: (error) => {
      toast.error('Failed to setup MFA', { description: formatError(error).message });
    },
  });

  const verifySetupMutation = useMutation({
    mutationFn: (code: string) => mfaApi.verifyMfaSetup(code),
    onSuccess: () => {
      invalidateMfaStatus();
      toast.success('Two-factor authentication enabled');
    },
    onError: (error) => {
      toast.error('Invalid code', { description: formatError(error).message });
    },
  });

  const disableMutation = useMutation({
    mutationFn: (data: MfaDisableRequest) => mfaApi.disableMfa(data),
    onSuccess: () => {
      invalidateMfaStatus();
      toast.success('Two-factor authentication disabled');
    },
    onError: (error) => {
      toast.error('Failed to disable MFA', { description: formatError(error).message });
    },
  });

  const regenerateCodesMutation = useMutation({
    mutationFn: (password: string) => mfaApi.regenerateBackupCodes(password),
    onSuccess: () => {
      invalidateMfaStatus();
      toast.success('Backup codes regenerated');
    },
    onError: (error) => {
      toast.error('Failed to regenerate codes', { description: formatError(error).message });
    },
  });

  return {
    status: statusQuery.data,
    isEnabled: statusQuery.data?.enabled ?? false,
    backupCodesRemaining: statusQuery.data?.backupCodesRemaining ?? 0,
    isLoadingStatus: statusQuery.isLoading,
    refetchStatus: statusQuery.refetch,

    setupMfa: setupMutation.mutate,
    setupMfaAsync: setupMutation.mutateAsync,
    isSettingUp: setupMutation.isPending,
    setupData: setupMutation.data,

    verifySetup: verifySetupMutation.mutate,
    verifySetupAsync: verifySetupMutation.mutateAsync,
    isVerifying: verifySetupMutation.isPending,

    disableMfa: disableMutation.mutate,
    disableMfaAsync: disableMutation.mutateAsync,
    isDisabling: disableMutation.isPending,

    regenerateCodes: regenerateCodesMutation.mutate,
    regenerateCodesAsync: regenerateCodesMutation.mutateAsync,
    isRegenerating: regenerateCodesMutation.isPending,
    newBackupCodes: regenerateCodesMutation.data?.backupCodes,
  };
}