/**
 * Update Page Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { PageIdParam, UpdatePageRequest } from '../../sites.schema';
export declare function updatePageHandler(request: FastifyRequest<{
    Params: PageIdParam;
    Body: UpdatePageRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=update-page.handler.d.ts.map