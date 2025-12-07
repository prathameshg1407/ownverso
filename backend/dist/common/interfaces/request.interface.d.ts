/**
 * Request Interfaces
 */
import type { FastifyRequest } from 'fastify';
import type { UserRole } from '@prisma/client';
/**
 * Authenticated user data
 */
export interface AuthUser {
    id: bigint;
    publicId: string;
    email: string;
    username: string;
    displayName: string;
    role: UserRole;
    emailVerified: boolean;
}
/**
 * JWT Token Payload
 */
export interface TokenPayload {
    sub: string;
    email: string;
    role: UserRole;
    type: 'access' | 'refresh';
    sessionId: string;
    iat: number;
    exp: number;
    iss: string;
    aud: string;
}
/**
 * Access Token Payload (type narrowed)
 */
export interface AccessTokenPayload extends Omit<TokenPayload, 'type'> {
    type: 'access';
}
/**
 * Refresh Token Payload (type narrowed)
 */
export interface RefreshTokenPayload extends Omit<TokenPayload, 'type'> {
    type: 'refresh';
}
/**
 * Base request with common fields
 */
interface BaseRequestFields {
    requestId: string;
    startTime: bigint;
}
/**
 * Authenticated request - use when auth is required
 * User and jwtPayload are guaranteed to be present
 */
export type AuthenticatedRequest = Omit<FastifyRequest, 'user'> & BaseRequestFields & {
    user: AuthUser;
    jwtPayload: AccessTokenPayload;
};
/**
 * Request with optional authentication
 * User and jwtPayload may or may not be present
 */
export type OptionalAuthRequest = Omit<FastifyRequest, 'user'> & BaseRequestFields & {
    user?: AuthUser;
    jwtPayload?: AccessTokenPayload;
};
/**
 * Request context for logging
 */
export interface RequestContext {
    requestId: string;
    method: string;
    url: string;
    ip: string;
    userAgent?: string;
    userId?: string;
}
/**
 * Extract request context from FastifyRequest
 */
export declare function extractRequestContext(request: FastifyRequest): RequestContext;
/**
 * Sort options
 */
export interface SortOptions {
    field: string;
    order: 'asc' | 'desc';
}
/**
 * Filter options
 */
export interface FilterOptions {
    [key: string]: string | number | boolean | string[] | undefined;
}
/**
 * Date range filter
 */
export interface DateRangeFilter {
    from?: Date;
    to?: Date;
}
export {};
//# sourceMappingURL=request.interface.d.ts.map