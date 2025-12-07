/**
 * Get Page Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { PageIdParam } from '../../sites.schema';
export declare function getPageHandler(request: FastifyRequest<{
    Params: PageIdParam;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=get-page.handler.d.ts.map