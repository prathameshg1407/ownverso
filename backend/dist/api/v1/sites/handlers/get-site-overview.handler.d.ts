/**
 * Get Site Overview Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam } from '../sites.schema';
export declare function getSiteOverviewHandler(request: FastifyRequest<{
    Params: SiteIdParam;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=get-site-overview.handler.d.ts.map