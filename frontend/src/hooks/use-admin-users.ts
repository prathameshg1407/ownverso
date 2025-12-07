/**
 * Admin User Management Hooks
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usersApi } from '@/lib/api/endpoints';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { CACHE_TIMES } from '@/lib/constants/config';
import { formatError } from '@/lib/api/error-handler';
import type {
  AdminUserQuery,
  AdminUpdateUserRequest,
  AdminUpdateStatusRequest,
  AdminUpdateRoleRequest,
  AdminUserDetail,
} from '@/types/api';

const ADMIN_USER_STALE_TIME = 60 * 1000;

export function useAdminUsers(query: AdminUserQuery = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.users(query),
    queryFn: () => usersApi.adminListUsers(query),
    staleTime: CACHE_TIMES.adminUsers,
  });
}

export function useAdminUser(userId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.user(userId),
    queryFn: () => usersApi.adminGetUser(userId),
    enabled: Boolean(userId),
    staleTime: ADMIN_USER_STALE_TIME,
  });
}

export function useAdminUserActions(userId: string) {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.admin.user(userId) });
    queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
  };

  const updateCacheAndInvalidate = (updatedUser: AdminUserDetail) => {
    queryClient.setQueryData(QUERY_KEYS.admin.user(userId), updatedUser);
    invalidateQueries();
  };

  const updateMutation = useMutation({
    mutationFn: (data: AdminUpdateUserRequest) => usersApi.adminUpdateUser(userId, data),
    onSuccess: (updatedUser: AdminUserDetail) => {
      updateCacheAndInvalidate(updatedUser);
      toast.success('User updated');
    },
    onError: (error: unknown) => {
      toast.error('Failed to update user', { description: formatError(error).message });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: (data: AdminUpdateStatusRequest) => usersApi.adminUpdateUserStatus(userId, data),
    onSuccess: (updatedUser: AdminUserDetail) => {
      updateCacheAndInvalidate(updatedUser);
      toast.success(`User status changed to ${updatedUser.status}`);
    },
    onError: (error: unknown) => {
      toast.error('Failed to update status', { description: formatError(error).message });
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: (data: AdminUpdateRoleRequest) => usersApi.adminUpdateUserRole(userId, data),
    onSuccess: (updatedUser: AdminUserDetail) => {
      updateCacheAndInvalidate(updatedUser);
      toast.success(`User role changed to ${updatedUser.role}`);
    },
    onError: (error: unknown) => {
      toast.error('Failed to update role', { description: formatError(error).message });
    },
  });

  const impersonateMutation = useMutation({
    mutationFn: () => usersApi.adminImpersonateUser(userId),
    onSuccess: (data) => {
      toast.success('Impersonation started', {
        description: `Now viewing as ${data.targetUser.displayName}`,
      });
    },
    onError: (error: unknown) => {
      toast.error('Failed to impersonate user', { description: formatError(error).message });
    },
  });

  return {
    updateUser: updateMutation.mutate,
    updateUserAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    updateStatus: updateStatusMutation.mutate,
    updateStatusAsync: updateStatusMutation.mutateAsync,
    isUpdatingStatus: updateStatusMutation.isPending,

    updateRole: updateRoleMutation.mutate,
    updateRoleAsync: updateRoleMutation.mutateAsync,
    isUpdatingRole: updateRoleMutation.isPending,

    impersonate: impersonateMutation.mutate,
    impersonateAsync: impersonateMutation.mutateAsync,
    isImpersonating: impersonateMutation.isPending,
  };
}