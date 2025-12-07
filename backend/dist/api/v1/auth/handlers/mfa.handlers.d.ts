/**
 * MFA Handlers
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { MfaVerifySetupRequest, MfaDisableRequest, MfaVerifyLoginRequest } from '../auth.schema';
export declare function mfaSetupInitHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function mfaSetupVerifyHandler(request: FastifyRequest<{
    Body: MfaVerifySetupRequest;
}>, reply: FastifyReply): Promise<void>;
export declare function mfaDisableHandler(request: FastifyRequest<{
    Body: MfaDisableRequest;
}>, reply: FastifyReply): Promise<void>;
export declare function mfaVerifyLoginHandler(request: FastifyRequest<{
    Body: MfaVerifyLoginRequest;
}>, reply: FastifyReply): Promise<void>;
export declare function mfaStatusHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function mfaRegenerateCodesHandler(request: FastifyRequest<{
    Body: {
        password: string;
    };
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=mfa.handlers.d.ts.map