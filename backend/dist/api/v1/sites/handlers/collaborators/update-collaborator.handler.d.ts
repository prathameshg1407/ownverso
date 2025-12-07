/**
 * Update Collaborator Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { CollaboratorIdParam, UpdateCollaboratorRequest } from '../../sites.schema';
export declare function updateCollaboratorHandler(request: FastifyRequest<{
    Params: CollaboratorIdParam;
    Body: UpdateCollaboratorRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=update-collaborator.handler.d.ts.map