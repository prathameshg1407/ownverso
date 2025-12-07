/**
 * Update Site Analytics Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam, UpdateSiteAnalyticsRequest } from '../../sites.schema';
export declare function updateAnalyticsHandler(request: FastifyRequest<{
    Params: SiteIdParam;
    Body: UpdateSiteAnalyticsRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=update-analytics.handler.d.ts.map