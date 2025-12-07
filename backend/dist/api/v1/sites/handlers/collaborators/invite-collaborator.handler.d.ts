/**
 * Invite Collaborator Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam, InviteCollaboratorRequest } from '../../sites.schema';
export declare function inviteCollaboratorHandler(request: FastifyRequest<{
    Params: SiteIdParam;
    Body: InviteCollaboratorRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=invite-collaborator.handler.d.ts.map