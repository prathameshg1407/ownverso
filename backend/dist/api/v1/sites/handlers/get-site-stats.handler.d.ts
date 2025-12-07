/**
 * Get Site Stats Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam } from '../sites.schema';
export declare function getSiteStatsHandler(request: FastifyRequest<{
    Params: SiteIdParam;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=get-site-stats.handler.d.ts.map