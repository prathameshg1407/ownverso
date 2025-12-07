/**
 * Update Site Comments Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam, UpdateSiteCommentsRequest } from '../../sites.schema';
export declare function updateCommentsHandler(request: FastifyRequest<{
    Params: SiteIdParam;
    Body: UpdateSiteCommentsRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=update-comments.handler.d.ts.map