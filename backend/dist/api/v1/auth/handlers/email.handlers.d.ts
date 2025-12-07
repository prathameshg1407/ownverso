/**
 * Email Handlers
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { VerifyEmailRequest, RequestEmailChangeRequest, ConfirmEmailChangeRequest } from '../auth.schema';
export declare function verifyEmailHandler(request: FastifyRequest<{
    Body: VerifyEmailRequest;
}>, reply: FastifyReply): Promise<void>;
export declare function resendVerificationHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function requestEmailChangeHandler(request: FastifyRequest<{
    Body: RequestEmailChangeRequest;
}>, reply: FastifyReply): Promise<void>;
export declare function confirmEmailChangeHandler(request: FastifyRequest<{
    Body: ConfirmEmailChangeRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=email.handlers.d.ts.map