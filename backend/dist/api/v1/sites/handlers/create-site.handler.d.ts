/**
 * Create Site Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { CreateSiteRequest } from '../sites.schema';
export declare function createSiteHandler(request: FastifyRequest<{
    Body: CreateSiteRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=create-site.handler.d.ts.map