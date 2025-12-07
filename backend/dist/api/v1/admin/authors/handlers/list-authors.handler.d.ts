/**
 * Admin List Authors Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AdminAuthorQuery } from '../../../../../api/v1/author/author.schema';
export declare function listAuthorsHandler(request: FastifyRequest<{
    Querystring: AdminAuthorQuery;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=list-authors.handler.d.ts.map