/**
 * User Profile Hook
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usersApi } from '@/lib/api/endpoints';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { formatError } from '@/lib/api/error-handler';
import type { UpdateProfileRequest } from '@/types/api';

export function useUserProfile() {
  const queryClient = useQueryClient();

  const invalidateUser = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.me() });
  };

  const updateMutation = useMutation({
    mutationFn: (data: UpdateProfileRequest) => usersApi.updateProfile(data),
    onSuccess: () => {
      invalidateUser();
      toast.success('Profile updated');
    },
    onError: (error: unknown) => {
      toast.error('Failed to update profile', { description: formatError(error).message });
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => usersApi.uploadAvatar(file),
    onSuccess: () => {
      invalidateUser();
      toast.success('Avatar uploaded');
    },
    onError: (error: unknown) => {
      toast.error('Failed to upload avatar', { description: formatError(error).message });
    },
  });

  const deleteAvatarMutation = useMutation({
    mutationFn: usersApi.deleteAvatar,
    onSuccess: () => {
      invalidateUser();
      toast.success('Avatar removed');
    },
    onError: (error: unknown) => {
      toast.error('Failed to remove avatar', { description: formatError(error).message });
    },
  });

  return {
    updateProfile: updateMutation.mutate,
    updateProfileAsync: updateMutation.mutateAsync,
    isUpdatingProfile: updateMutation.isPending,

    uploadAvatar: uploadAvatarMutation.mutate,
    uploadAvatarAsync: uploadAvatarMutation.mutateAsync,
    isUploadingAvatar: uploadAvatarMutation.isPending,

    deleteAvatar: deleteAvatarMutation.mutate,
    deleteAvatarAsync: deleteAvatarMutation.mutateAsync,
    isDeletingAvatar: deleteAvatarMutation.isPending,
  };
}