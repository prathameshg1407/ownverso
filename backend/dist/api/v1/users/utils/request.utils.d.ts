/**
 * User Request Utilities
 */
import type { FastifyRequest } from 'fastify';
export { getAuthenticatedUser, extractAccessToken, getClientType } from '../../../../api/v1/auth/utils';
/**
 * Get authenticated user ID from request
 * @throws UnauthorizedError if not authenticated
 */
export declare function getUserId(request: FastifyRequest): bigint;
/**
 * Get user public ID from request
 * @throws UnauthorizedError if not authenticated
 */
export declare function getUserPublicId(request: FastifyRequest): string;
/**
 * Get optional user ID (returns undefined if not authenticated)
 */
export declare function getOptionalUserId(request: FastifyRequest): bigint | undefined;
/**
 * Get session ID from JWT payload
 */
export declare function getSessionId(request: FastifyRequest): string | undefined;
//# sourceMappingURL=request.utils.d.ts.map