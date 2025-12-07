/**
 * Provision SSL Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SiteIdParam } from '../../sites.schema';
export declare function provisionSslHandler(request: FastifyRequest<{
    Params: SiteIdParam;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=provision-ssl.handler.d.ts.map