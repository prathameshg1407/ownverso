/**
 * Get Collaborator Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { CollaboratorIdParam } from '../../sites.schema';
export declare function getCollaboratorHandler(request: FastifyRequest<{
    Params: CollaboratorIdParam;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=get-collaborator.handler.d.ts.map