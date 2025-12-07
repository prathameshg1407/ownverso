/**
 * Auth Rate Limit Guards
 */
import type { FastifyRequest, preHandlerHookHandler } from 'fastify';
export interface RateLimitConfig {
    readonly max: number;
    readonly windowMs: number;
    readonly keyPrefix: string;
    readonly byUser?: boolean;
    readonly skip?: (request: FastifyRequest) => boolean;
}
export declare function createRateLimitGuard(config: RateLimitConfig): preHandlerHookHandler;
export declare const authRateLimitGuards: {
    readonly login: preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
    readonly register: preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
    readonly refresh: preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
    readonly mfa: preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
    readonly passwordReset: preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
    readonly emailVerification: preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
    readonly oauthCallback: preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
};
//# sourceMappingURL=rate-limit.guard.d.ts.map