/**
 * Admin Update User Status Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AdminUpdateStatusRequest } from '../../schemas';
interface Params {
    userId: string;
}
export declare function updateStatusHandler(request: FastifyRequest<{
    Params: Params;
    Body: AdminUpdateStatusRequest;
}>, reply: FastifyReply): Promise<void>;
export {};
//# sourceMappingURL=update-status.handler.d.ts.map