/**
 * CORS Plugin
 *
 * Configures Cross-Origin Resource Sharing.
 */
import type { FastifyInstance } from 'fastify';
declare function corsPluginImpl(fastify: FastifyInstance): Promise<void>;
export declare const corsPlugin: typeof corsPluginImpl;
export {};
//# sourceMappingURL=cors.plugin.d.ts.map