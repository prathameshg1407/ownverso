/**
 * Admin Verify Author Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AdminVerifyAuthorRequest } from '../../../../../api/v1/author/author.schema';
export declare function verifyAuthorHandler(request: FastifyRequest<{
    Params: {
        userId: string;
    };
    Body: AdminVerifyAuthorRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=verify-author.handler.d.ts.map