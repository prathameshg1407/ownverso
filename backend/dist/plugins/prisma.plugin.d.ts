/**
 * Prisma Plugin
 *
 * Provides Prisma client as a Fastify decorator.
 */
import type { FastifyInstance } from 'fastify';
declare function prismaPluginImpl(fastify: FastifyInstance): Promise<void>;
export declare const prismaPlugin: typeof prismaPluginImpl;
export {};
//# sourceMappingURL=prisma.plugin.d.ts.map