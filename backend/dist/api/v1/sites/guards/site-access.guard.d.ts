/**
 * Site Access Guards
 */
import type { preHandlerHookHandler } from 'fastify';
import type { CollaboratorRole } from '@prisma/client';
/**
 * Require user to be site owner
 */
export declare const requireSiteOwner: preHandlerHookHandler;
/**
 * Require user to have access to site (owner or collaborator)
 */
export declare const requireSiteAccess: preHandlerHookHandler;
/**
 * Factory for requiring minimum collaborator role
 */
export declare function requireSiteRole(minimumRole: CollaboratorRole): preHandlerHookHandler;
export declare const requireSiteManager: preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
export declare const requireSiteEditor: preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
export declare const requireSiteViewer: preHandlerHookHandler<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
//# sourceMappingURL=site-access.guard.d.ts.map