/**
 * List Collaborators Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam } from '../../sites.schema';
export declare function listCollaboratorsHandler(request: FastifyRequest<{
    Params: SiteIdParam;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=list-collaborators.handler.d.ts.map