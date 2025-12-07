/**
 * Session Handlers
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
export declare function getSessionsHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function revokeSessionHandler(request: FastifyRequest<{
    Params: {
        sessionId: string;
    };
}>, reply: FastifyReply): Promise<void>;
export declare function revokeOtherSessionsHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=session.handlers.d.ts.map