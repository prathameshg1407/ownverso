/**
 * Remove Domain Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam } from '../../sites.schema';
export declare function removeDomainHandler(request: FastifyRequest<{
    Params: SiteIdParam;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=remove-domain.handler.d.ts.map