/**
 * Password Handlers
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { ForgotPasswordRequest, ResetPasswordRequest, ChangePasswordRequest } from '../auth.schema';
export declare function forgotPasswordHandler(request: FastifyRequest<{
    Body: ForgotPasswordRequest;
}>, reply: FastifyReply): Promise<void>;
export declare function resetPasswordHandler(request: FastifyRequest<{
    Body: ResetPasswordRequest;
}>, reply: FastifyReply): Promise<void>;
export declare function changePasswordHandler(request: FastifyRequest<{
    Body: ChangePasswordRequest;
}>, reply: FastifyReply): Promise<void>;
export declare function checkPasswordStrengthHandler(request: FastifyRequest<{
    Querystring: {
        password: string;
    };
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=password.handlers.d.ts.map