/**
 * Update Site SEO Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam, UpdateSiteSeoRequest } from '../../sites.schema';
export declare function updateSeoHandler(request: FastifyRequest<{
    Params: SiteIdParam;
    Body: UpdateSiteSeoRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=update-seo.handler.d.ts.map