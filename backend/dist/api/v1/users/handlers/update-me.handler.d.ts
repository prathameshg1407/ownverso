/**
 * Update Current User Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { UpdateUserRequest } from '../schemas';
export declare function updateMeHandler(request: FastifyRequest<{
    Body: UpdateUserRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=update-me.handler.d.ts.map