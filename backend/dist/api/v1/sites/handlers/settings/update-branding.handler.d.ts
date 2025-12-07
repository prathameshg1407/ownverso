/**
 * Update Site Branding Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam, UpdateSiteBrandingRequest } from '../../sites.schema';
export declare function updateBrandingHandler(request: FastifyRequest<{
    Params: SiteIdParam;
    Body: UpdateSiteBrandingRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=update-branding.handler.d.ts.map