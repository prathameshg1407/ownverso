// ==== FILE: src/hooks/use-site-collaborators.ts ====
/**
 * Site Collaborators Hook
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { sitesApi, collaboratorApi } from '@/lib/api/endpoints';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { formatError } from '@/lib/api/error-handler';
import type { InviteCollaboratorRequest, UpdateCollaboratorRequest } from '@/types/api';

const STALE_TIME = 2 * 60 * 1000;

export function useSiteCollaborators(siteId: string) {
  const queryClient = useQueryClient();

  const collaboratorsQuery = useQuery({
    queryKey: QUERY_KEYS.sites.collaborators(siteId),
    queryFn: () => sitesApi.listCollaborators(siteId),
    enabled: !!siteId,
    staleTime: STALE_TIME,
  });

  const inviteMutation = useMutation({
    mutationFn: (data: InviteCollaboratorRequest) => sitesApi.inviteCollaborator(siteId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sites.collaborators(siteId) });
      toast.success('Invitation sent!', { description: 'They will receive an email to join.' });
    },
    onError: (error: Error) => {
      toast.error('Invitation failed', { description: formatError(error).message });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCollaboratorRequest }) =>
      sitesApi.updateCollaborator(siteId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sites.collaborators(siteId) });
      toast.success('Collaborator updated');
    },
    onError: (error: Error) => {
      toast.error('Update failed', { description: formatError(error).message });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => sitesApi.removeCollaborator(siteId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sites.collaborators(siteId) });
      toast.success('Collaborator removed');
    },
    onError: (error: Error) => {
      toast.error('Remove failed', { description: formatError(error).message });
    },
  });

  return {
    collaborators: collaboratorsQuery.data ?? [],
    isLoading: collaboratorsQuery.isLoading,
    isError: collaboratorsQuery.isError,
    error: collaboratorsQuery.error,

    inviteCollaborator: inviteMutation.mutate,
    inviteCollaboratorAsync: inviteMutation.mutateAsync,
    isInviting: inviteMutation.isPending,
    inviteError: inviteMutation.error,

    updateCollaborator: updateMutation.mutate,
    updateCollaboratorAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,

    removeCollaborator: removeMutation.mutate,
    removeCollaboratorAsync: removeMutation.mutateAsync,
    isRemoving: removeMutation.isPending,
    removeError: removeMutation.error,

    refetch: collaboratorsQuery.refetch,
  };
}

export function useCollaboratorInvite() {
  const queryClient = useQueryClient();

  const acceptMutation = useMutation({
    mutationFn: (token: string) => collaboratorApi.acceptInvite(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collaborator', 'sites'] });
      toast.success('Invitation accepted!', { description: 'You now have access to the site.' });
    },
    onError: (error: Error) => {
      toast.error('Failed to accept invitation', { description: formatError(error).message });
    },
  });

  return {
    acceptInvite: acceptMutation.mutate,
    acceptInviteAsync: acceptMutation.mutateAsync,
    isAccepting: acceptMutation.isPending,
    error: acceptMutation.error,
    isError: acceptMutation.isError,
    isSuccess: acceptMutation.isSuccess,
    reset: acceptMutation.reset,
  };
}

export function useCollaboratorSites() {
  const sitesQuery = useQuery({
    queryKey: ['collaborator', 'sites'],
    queryFn: collaboratorApi.listSites,
    staleTime: STALE_TIME,
  });

  return {
    sites: sitesQuery.data ?? [],
    isLoading: sitesQuery.isLoading,
    isError: sitesQuery.isError,
    error: sitesQuery.error,
    refetch: sitesQuery.refetch,
  };
}