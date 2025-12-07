/**
 * Admin Update User Role Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AdminUpdateRoleRequest } from '../../schemas';
interface Params {
    userId: string;
}
export declare function updateRoleHandler(request: FastifyRequest<{
    Params: Params;
    Body: AdminUpdateRoleRequest;
}>, reply: FastifyReply): Promise<void>;
export {};
//# sourceMappingURL=update-role.handler.d.ts.map