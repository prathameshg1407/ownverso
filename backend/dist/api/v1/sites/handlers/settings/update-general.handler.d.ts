/**
 * Update Site General Settings Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam, UpdateSiteGeneralRequest } from '../../sites.schema';
export declare function updateGeneralHandler(request: FastifyRequest<{
    Params: SiteIdParam;
    Body: UpdateSiteGeneralRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=update-general.handler.d.ts.map