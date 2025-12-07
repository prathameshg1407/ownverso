/**
 * Auth Plugin
 *
 * Configures JWT authentication and provides auth decorators.
 *
 * Performance optimizations:
 * - Redis caching for session validation
 * - Combined user + session query (single DB call on cache miss)
 * - Request-scoped caching
 * - Async session activity updates (fire-and-forget)
 * - Parallel cache reads
 */
import type { FastifyPluginAsync } from 'fastify';
/**
 * Invalidate session cache (call on logout, revoke, etc.)
 */
export declare function invalidateSessionCache(sessionId: bigint | string): Promise<void>;
/**
 * Invalidate user auth cache
 */
export declare function invalidateUserAuthCache(publicId: string): Promise<void>;
/**
 * Invalidate all auth caches for a user (call on password change, role change, etc.)
 */
export declare function invalidateAllUserAuthCaches(publicId: string, sessionIds?: (bigint | string)[]): Promise<void>;
export declare const authPlugin: FastifyPluginAsync;
//# sourceMappingURL=auth.plugin.d.ts.map