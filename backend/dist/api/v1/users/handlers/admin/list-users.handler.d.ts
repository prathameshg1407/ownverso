/**
 * Admin List Users Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AdminUserQuery } from '../../../../../domain/users';
export declare function listUsersHandler(request: FastifyRequest<{
    Querystring: AdminUserQuery;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=list-users.handler.d.ts.map