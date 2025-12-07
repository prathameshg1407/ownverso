/**
 * List Pages Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam } from '../../sites.schema';
export declare function listPagesHandler(request: FastifyRequest<{
    Params: SiteIdParam;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=list-pages.handler.d.ts.map