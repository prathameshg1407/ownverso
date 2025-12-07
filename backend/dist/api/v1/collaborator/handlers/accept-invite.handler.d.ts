/**
 * Accept Collaborator Invite Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { InviteTokenParam } from '../collaborator.schema';
export declare function acceptInviteHandler(request: FastifyRequest<{
    Params: InviteTokenParam;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=accept-invite.handler.d.ts.map