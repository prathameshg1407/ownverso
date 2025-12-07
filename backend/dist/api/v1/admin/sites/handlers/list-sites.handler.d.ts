/**
 * Admin List Sites Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AdminSiteQuery } from '../../../../../api/v1/sites/sites.schema';
export declare function adminListSitesHandler(request: FastifyRequest<{
    Querystring: AdminSiteQuery;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=list-sites.handler.d.ts.map