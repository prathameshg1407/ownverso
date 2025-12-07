/**
 * Get Site Settings Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam } from '../../sites.schema';
export declare function getSettingsHandler(request: FastifyRequest<{
    Params: SiteIdParam;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=get-settings.handler.d.ts.map