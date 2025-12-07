/**
 * Get Public User by Public ID Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
interface Params {
    publicId: string;
}
export declare function getByPublicIdHandler(request: FastifyRequest<{
    Params: Params;
}>, reply: FastifyReply): Promise<void>;
export {};
//# sourceMappingURL=get-by-public-id.handler.d.ts.map