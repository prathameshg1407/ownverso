/**
 * Reorder Pages Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam, ReorderPagesRequest } from '../../sites.schema';
export declare function reorderPagesHandler(request: FastifyRequest<{
    Params: SiteIdParam;
    Body: ReorderPagesRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=reorder-pages.handler.d.ts.map