/**
 * Update Site Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam, UpdateSiteRequest } from '../sites.schema';
export declare function updateSiteHandler(request: FastifyRequest<{
    Params: SiteIdParam;
    Body: UpdateSiteRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=update-site.handler.d.ts.map