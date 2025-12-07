/**
 * Admin Get User Detail Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
interface Params {
    userId: string;
}
export declare function getUserHandler(request: FastifyRequest<{
    Params: Params;
}>, reply: FastifyReply): Promise<void>;
export {};
//# sourceMappingURL=get-user.handler.d.ts.map