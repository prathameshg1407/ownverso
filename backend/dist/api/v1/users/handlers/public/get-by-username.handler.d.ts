/**
 * Get Public User by Username Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
interface Params {
    username: string;
}
export declare function getByUsernameHandler(request: FastifyRequest<{
    Params: Params;
}>, reply: FastifyReply): Promise<void>;
export {};
//# sourceMappingURL=get-by-username.handler.d.ts.map