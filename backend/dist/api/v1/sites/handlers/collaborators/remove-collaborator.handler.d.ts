/**
 * Remove Collaborator Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { CollaboratorIdParam } from '../../sites.schema';
export declare function removeCollaboratorHandler(request: FastifyRequest<{
    Params: CollaboratorIdParam;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=remove-collaborator.handler.d.ts.map