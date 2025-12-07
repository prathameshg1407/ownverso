/**
 * Fastify Application Factory
 */
import { FastifyInstance } from 'fastify';
import type { Server, IncomingMessage, ServerResponse } from 'http';
type AppInstance = FastifyInstance<Server, IncomingMessage, ServerResponse>;
export interface AppOptions {
    testing?: boolean;
}
/**
 * Build and configure the Fastify application
 */
export declare function buildApp(options?: AppOptions): Promise<AppInstance>;
export type App = Awaited<ReturnType<typeof buildApp>>;
export {};
//# sourceMappingURL=app.d.ts.map