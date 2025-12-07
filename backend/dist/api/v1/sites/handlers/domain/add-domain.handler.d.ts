/**
 * Add Domain Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam, AddDomainRequest } from '../../sites.schema';
export declare function addDomainHandler(request: FastifyRequest<{
    Params: SiteIdParam;
    Body: AddDomainRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=add-domain.handler.d.ts.map