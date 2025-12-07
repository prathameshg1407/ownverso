/**
 * Auth Response Utilities
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { TokenPair, UserDTO } from '../../../../domain/auth/types/auth.types';
export interface AuthResponseData {
    user: UserDTO;
    tokens: TokenPair;
    mfaRequired?: boolean;
}
export interface MfaPendingData {
    user: UserDTO;
    mfaPendingToken: string;
}
export declare function sendSuccess<T>(reply: FastifyReply, request: FastifyRequest, data: T, options?: {
    statusCode?: number;
}): void;
export declare function sendMessage(reply: FastifyReply, request: FastifyRequest, message: string, statusCode?: number): void;
export declare function sendNoContent(reply: FastifyReply): void;
export declare function sendAuthResponse(reply: FastifyReply, request: FastifyRequest, data: AuthResponseData): void;
export declare function sendMfaPendingResponse(reply: FastifyReply, request: FastifyRequest, data: MfaPendingData): void;
export declare function sendTokensResponse(reply: FastifyReply, request: FastifyRequest, tokens: TokenPair): void;
//# sourceMappingURL=response.utils.d.ts.map