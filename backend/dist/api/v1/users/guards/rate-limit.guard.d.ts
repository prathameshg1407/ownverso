/**
 * User Management Rate Limit Guards
 */
import { type RateLimitConfig } from '../../../../api/v1/auth/guards';
export declare const userRateLimitGuards: {
    /** Avatar uploads: 5 per hour */
    readonly avatarUpload: import("fastify").preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
    /** Profile updates: 20 per hour */
    readonly profileUpdate: import("fastify").preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
    /** Account deletion: 1 per day */
    readonly accountDeletion: import("fastify").preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
    /** Force logout: 3 per hour */
    readonly forceLogout: import("fastify").preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
    /** Admin impersonation: 10 per hour */
    readonly impersonate: import("fastify").preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
    /** Username availability check: 30 per minute */
    readonly usernameCheck: import("fastify").preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
};
export type { RateLimitConfig };
//# sourceMappingURL=rate-limit.guard.d.ts.map