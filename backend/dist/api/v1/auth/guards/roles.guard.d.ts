/**
 * Role-based Access Control Guards
 */
import type { preHandlerHookHandler } from 'fastify';
import type { UserRole } from '@prisma/client';
export declare function requireRoles(...allowedRoles: UserRole[]): preHandlerHookHandler;
export declare function requireMinimumRole(minimumRole: UserRole): preHandlerHookHandler;
export declare const requireAdmin: preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
export declare const requireSuperAdmin: preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
export declare const requireModerator: preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
export declare const requireAuthor: preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
//# sourceMappingURL=roles.guard.d.ts.map