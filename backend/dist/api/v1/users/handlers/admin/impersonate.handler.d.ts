/**
 * Admin Impersonate User Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
interface Params {
    userId: string;
}
export declare function impersonateHandler(request: FastifyRequest<{
    Params: Params;
}>, reply: FastifyReply): Promise<void>;
export {};
//# sourceMappingURL=impersonate.handler.d.ts.map