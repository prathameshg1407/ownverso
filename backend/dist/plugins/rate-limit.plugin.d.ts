/**
 * Rate Limit Plugin
 *
 * Configures rate limiting with Redis store.
 */
import { FastifyPluginAsync } from 'fastify';
export declare const rateLimitPlugin: FastifyPluginAsync;
/**
 * Route rate limit configuration type
 */
export interface RouteRateLimitConfig {
    config: {
        rateLimit: {
            max: number;
            timeWindow: number;
        };
    };
}
/**
 * Create route-specific rate limit config
 */
export declare function createRouteRateLimit(max: number, timeWindowMs: number): RouteRateLimitConfig;
/**
 * Auth rate limit configurations
 */
export declare const authRateLimits: {
    readonly login: RouteRateLimitConfig;
    readonly register: RouteRateLimitConfig;
    readonly passwordReset: RouteRateLimitConfig;
    readonly emailVerification: RouteRateLimitConfig;
    readonly mfa: RouteRateLimitConfig;
    readonly refresh: RouteRateLimitConfig;
};
//# sourceMappingURL=rate-limit.plugin.d.ts.map