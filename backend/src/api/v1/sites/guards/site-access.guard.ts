// ==== FILE: src/api/v1/sites/guards/site-access.guard.ts ====
/**
 * Site Access Guards
 */

import type { FastifyRequest, preHandlerHookHandler } from 'fastify';
import { ForbiddenError, NotFoundError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';
import { siteService, collaboratorService } from '@/domain/sites/services';
import type { CollaboratorRole } from '@prisma/client';

/**
 * Get site ID from request params
 */
function getSiteIdFromRequest(request: FastifyRequest): string {
  const params = request.params as { siteId?: string };
  if (!params.siteId) {
    throw new NotFoundError('Site ID is required', ERROR_CODES.BAD_REQUEST);
  }
  return params.siteId;
}

/**
 * Require user to be site owner
 */
export const requireSiteOwner: preHandlerHookHandler = async (
  request: FastifyRequest
): Promise<void> => {
  if (!request.user) {
    throw new ForbiddenError('Authentication required', ERROR_CODES.AUTH_REQUIRED);
  }

  const siteId = getSiteIdFromRequest(request);
  const isOwner = await siteService.isOwner(siteId, request.user.id);

  if (!isOwner) {
    throw new ForbiddenError(
      'Only the site owner can perform this action',
      ERROR_CODES.FORBIDDEN
    );
  }
};

/**
 * Require user to have access to site (owner or collaborator)
 */
export const requireSiteAccess: preHandlerHookHandler = async (
  request: FastifyRequest
): Promise<void> => {
  if (!request.user) {
    throw new ForbiddenError('Authentication required', ERROR_CODES.AUTH_REQUIRED);
  }

  const siteId = getSiteIdFromRequest(request);
  const canAccess = await siteService.canAccess(siteId, request.user.id);

  if (!canAccess) {
    throw new ForbiddenError(
      'You do not have access to this site',
      ERROR_CODES.FORBIDDEN
    );
  }
};

/**
 * Factory for requiring minimum collaborator role
 */
export function requireSiteRole(minimumRole: CollaboratorRole): preHandlerHookHandler {
  return async (request: FastifyRequest): Promise<void> => {
    if (!request.user) {
      throw new ForbiddenError('Authentication required', ERROR_CODES.AUTH_REQUIRED);
    }

    const siteId = getSiteIdFromRequest(request);

    // Check if owner first (owners have all permissions)
    const isOwner = await siteService.isOwner(siteId, request.user.id);
    if (isOwner) return;

    // Check collaborator role
    const hasRole = await collaboratorService.hasMinimumSiteRole(
      siteId,
      request.user.id,
      minimumRole
    );

    if (!hasRole) {
      throw new ForbiddenError(
        `This action requires ${minimumRole} role or higher`,
        ERROR_CODES.FORBIDDEN
      );
    }
  };
}

// Pre-configured guards for common roles
export const requireSiteManager = requireSiteRole('MANAGER');
export const requireSiteEditor = requireSiteRole('EDITOR');
export const requireSiteViewer = requireSiteRole('VIEWER');