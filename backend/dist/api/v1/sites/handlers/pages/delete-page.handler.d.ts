/**
 * Delete Page Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { PageIdParam } from '../../sites.schema';
export declare function deletePageHandler(request: FastifyRequest<{
    Params: PageIdParam;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=delete-page.handler.d.ts.map