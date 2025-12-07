// ==== FILE: src/api/v1/auth/guards/roles.guard.ts ====
/**
 * Role-based Access Control Guards
 */

import type { FastifyRequest, preHandlerHookHandler } from 'fastify';
import type { UserRole } from '@prisma/client';
import { ForbiddenError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';

const ROLE_HIERARCHY: readonly UserRole[] = [
  'READER',
  'AUTHOR',
  'COLLABORATOR',
  'MODERATOR',
  'ADMIN',
  'SUPER_ADMIN',
];

const ROLE_LEVELS = new Map(ROLE_HIERARCHY.map((role, index) => [role, index]));

function assertAuthenticated(request: FastifyRequest): asserts request is FastifyRequest & {
  user: NonNullable<FastifyRequest['user']>;
} {
  if (!request.user) {
    throw new ForbiddenError('Authentication required', ERROR_CODES.AUTH_REQUIRED);
  }
}

export function requireRoles(...allowedRoles: UserRole[]): preHandlerHookHandler {
  const roleSet = new Set(allowedRoles);

  return async (request) => {
    assertAuthenticated(request);
    if (!roleSet.has(request.user.role)) {
      throw new ForbiddenError('Insufficient permissions', ERROR_CODES.FORBIDDEN, {
        requiredRoles: allowedRoles,
        userRole: request.user.role,
      });
    }
  };
}

export function requireMinimumRole(minimumRole: UserRole): preHandlerHookHandler {
  const minimumLevel = ROLE_LEVELS.get(minimumRole) ?? -1;

  return async (request) => {
    assertAuthenticated(request);
    const userLevel = ROLE_LEVELS.get(request.user.role) ?? -1;
    if (userLevel < minimumLevel) {
      throw new ForbiddenError('Insufficient permissions', ERROR_CODES.FORBIDDEN, {
        minimumRole,
        userRole: request.user.role,
      });
    }
  };
}

export const requireAdmin = requireRoles('ADMIN', 'SUPER_ADMIN');
export const requireSuperAdmin = requireRoles('SUPER_ADMIN');
export const requireModerator = requireMinimumRole('MODERATOR');
export const requireAuthor = requireMinimumRole('AUTHOR');