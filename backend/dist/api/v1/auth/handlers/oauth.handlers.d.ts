/**
 * OAuth Handlers
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
export declare function oauthProvidersHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function oauthInitHandler(request: FastifyRequest<{
    Params: {
        provider: string;
    };
}>, reply: FastifyReply): Promise<void>;
export declare function oauthCallbackHandler(request: FastifyRequest<{
    Params: {
        provider: string;
    };
    Querystring: {
        code: string;
        state: string;
        error?: string;
    };
}>, reply: FastifyReply): Promise<void>;
export declare function oauthLinkHandler(request: FastifyRequest<{
    Params: {
        provider: string;
    };
    Body: {
        code: string;
    };
}>, reply: FastifyReply): Promise<void>;
export declare function oauthUnlinkHandler(request: FastifyRequest<{
    Params: {
        provider: string;
    };
}>, reply: FastifyReply): Promise<void>;
export declare function oauthLinkedAccountsHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=oauth.handlers.d.ts.map