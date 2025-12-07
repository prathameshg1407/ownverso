/**
 * Update Site Theme Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam, UpdateSiteThemeRequest } from '../../sites.schema';
export declare function updateThemeHandler(request: FastifyRequest<{
    Params: SiteIdParam;
    Body: UpdateSiteThemeRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=update-theme.handler.d.ts.map