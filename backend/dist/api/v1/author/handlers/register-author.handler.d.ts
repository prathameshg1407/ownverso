/**
 * Register Author Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { RegisterAuthorRequest } from '../author.schema';
export declare function registerAuthorHandler(request: FastifyRequest<{
    Body: RegisterAuthorRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=register-author.handler.d.ts.map