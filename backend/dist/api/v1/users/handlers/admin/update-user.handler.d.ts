/**
 * Admin Update User Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AdminUpdateUserRequest } from '../../schemas';
interface Params {
    userId: string;
}
export declare function updateUserHandler(request: FastifyRequest<{
    Params: Params;
    Body: AdminUpdateUserRequest;
}>, reply: FastifyReply): Promise<void>;
export {};
//# sourceMappingURL=update-user.handler.d.ts.map