/**
 * Core Auth Handlers
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { RegisterRequest, LoginRequest } from '../auth.schema';
export declare function registerHandler(request: FastifyRequest<{
    Body: RegisterRequest;
}>, reply: FastifyReply): Promise<void>;
export declare function loginHandler(request: FastifyRequest<{
    Body: LoginRequest;
}>, reply: FastifyReply): Promise<void>;
export declare function logoutHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function logoutAllHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function refreshHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function getMeHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=core.handlers.d.ts.map