/**
 * Create Page Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam, CreatePageRequest } from '../../sites.schema';
export declare function createPageHandler(request: FastifyRequest<{
    Params: SiteIdParam;
    Body: CreatePageRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=create-page.handler.d.ts.map