/**
 * Permissions Hook
 */

'use client';

import { useMemo } from 'react';
import { useAuthStore } from '@/lib/stores/auth.store';
import type { UserRole } from '@/types/api';

const ROLE_HIERARCHY: readonly UserRole[] = [
  'READER',
  'AUTHOR',
  'COLLABORATOR',
  'MODERATOR',
  'ADMIN',
  'SUPER_ADMIN',
] as const;

const ROLE_LEVELS = new Map<UserRole, number>(
  ROLE_HIERARCHY.map((role, index) => [role, index])
);

function getRoleLevel(role: UserRole): number {
  return ROLE_LEVELS.get(role) ?? 0;
}

export function usePermissions() {
  const { user, isAuthenticated } = useAuthStore();

  return useMemo(() => {
    const hasRole = (role: UserRole): boolean => {
      return isAuthenticated && user?.role === role;
    };

    const hasMinimumRole = (minimumRole: UserRole): boolean => {
      if (!isAuthenticated || !user) return false;
      return getRoleLevel(user.role) >= getRoleLevel(minimumRole);
    };

    const hasAnyRole = (roles: UserRole[]): boolean => {
      if (!isAuthenticated || !user) return false;
      return roles.includes(user.role);
    };

    return {
      user,
      isAuthenticated,
      hasRole,
      hasMinimumRole,
      hasAnyRole,
      isReader: hasMinimumRole('READER'),
      isAuthor: hasMinimumRole('AUTHOR'),
      isCollaborator: hasMinimumRole('COLLABORATOR'),
      isModerator: hasMinimumRole('MODERATOR'),
      isAdmin: hasAnyRole(['ADMIN', 'SUPER_ADMIN']),
      isSuperAdmin: hasRole('SUPER_ADMIN'),
    };
  }, [user, isAuthenticated]);
}