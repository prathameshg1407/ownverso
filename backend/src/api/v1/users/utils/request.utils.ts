/**
 * User Request Utilities
 */

import type { FastifyRequest } from 'fastify';
import { UnauthorizedError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';

export { getAuthenticatedUser, extractAccessToken, getClientType } from '@/api/v1/auth/utils';

/**
 * Get authenticated user ID from request
 * @throws UnauthorizedError if not authenticated
 */
export function getUserId(request: FastifyRequest): bigint {
  if (!request.user) {
    throw new UnauthorizedError('Authentication required', ERROR_CODES.AUTH_REQUIRED);
  }
  return request.user.id;
}

/**
 * Get user public ID from request
 * @throws UnauthorizedError if not authenticated
 */
export function getUserPublicId(request: FastifyRequest): string {
  if (!request.user) {
    throw new UnauthorizedError('Authentication required', ERROR_CODES.AUTH_REQUIRED);
  }
  return request.user.publicId;
}

/**
 * Get optional user ID (returns undefined if not authenticated)
 */
export function getOptionalUserId(request: FastifyRequest): bigint | undefined {
  return request.user?.id;
}

/**
 * Get session ID from JWT payload
 */
export function getSessionId(request: FastifyRequest): string | undefined {
  return request.jwtPayload?.sessionId;
}