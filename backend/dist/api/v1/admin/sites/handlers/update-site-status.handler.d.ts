/**
 * Admin Update Site Status Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AdminUpdateSiteStatusRequest } from '../../../../../api/v1/sites/sites.schema';
export declare function updateSiteStatusHandler(request: FastifyRequest<{
    Params: {
        siteId: string;
    };
    Body: AdminUpdateSiteStatusRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=update-site-status.handler.d.ts.map