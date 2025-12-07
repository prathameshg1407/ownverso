"use strict";
// ==== FILE: src/api/v1/auth/handlers/oauth.handlers.ts ====
/**
 * OAuth Handlers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthProvidersHandler = oauthProvidersHandler;
exports.oauthInitHandler = oauthInitHandler;
exports.oauthCallbackHandler = oauthCallbackHandler;
exports.oauthLinkHandler = oauthLinkHandler;
exports.oauthUnlinkHandler = oauthUnlinkHandler;
exports.oauthLinkedAccountsHandler = oauthLinkedAccountsHandler;
const client_1 = require("@prisma/client");
const config_1 = require("../../../../config");
const services_1 = require("../../../../domain/auth/services");
const http_errors_1 = require("../../../../common/errors/http.errors");
const error_codes_constants_1 = require("../../../../common/constants/error-codes.constants");
const utils_1 = require("../utils");
const VALID_PROVIDERS = new Set(Object.values(client_1.AuthProvider));
async function oauthProvidersHandler(request, reply) {
    (0, utils_1.sendSuccess)(reply, request, { providers: services_1.oauthService.getAvailableProviders() });
}
async function oauthInitHandler(request, reply) {
    const provider = request.params.provider.toUpperCase();
    if (!VALID_PROVIDERS.has(provider)) {
        throw new http_errors_1.BadRequestError('Invalid OAuth provider', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
    }
    const state = (0, utils_1.generateOAuthState)();
    const authUrl = services_1.oauthService.getAuthorizationUrl(provider, state);
    reply.setCookie('oauth_state', state, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 600,
        path: '/api/v1/auth/oauth',
    });
    (0, utils_1.sendSuccess)(reply, request, { authUrl, state });
}
async function oauthCallbackHandler(request, reply) {
    const { provider } = request.params;
    const { code, state, error } = request.query;
    const { oauthError, oauthSuccess } = config_1.config.auth.frontendUrls;
    if (error) {
        return reply.redirect(`${oauthError}?error=${encodeURIComponent(error)}`);
    }
    const storedState = request.cookies['oauth_state'];
    if (!storedState || storedState !== state || !(0, utils_1.verifyOAuthState)(state)) {
        return reply.redirect(`${oauthError}?error=invalid_state`);
    }
    reply.clearCookie('oauth_state', { path: '/api/v1/auth/oauth' });
    try {
        const result = await services_1.oauthService.handleCallback(provider.toUpperCase(), code, (0, utils_1.getDeviceInfo)(request));
        const redirectUrl = new URL(oauthSuccess);
        redirectUrl.searchParams.set('provider', provider);
        if (request.headers['x-client-type'] === 'mobile') {
            redirectUrl.searchParams.set('accessToken', result.tokens.accessToken);
            redirectUrl.searchParams.set('refreshToken', result.tokens.refreshToken);
        }
        return reply.redirect(redirectUrl.toString());
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'OAuth authentication failed';
        return reply.redirect(`${oauthError}?error=${encodeURIComponent(message)}`);
    }
}
async function oauthLinkHandler(request, reply) {
    const account = await services_1.oauthService.linkAccount((0, utils_1.getUserId)(request), request.params.provider.toUpperCase(), request.body.code);
    (0, utils_1.sendSuccess)(reply, request, { account });
}
async function oauthUnlinkHandler(request, reply) {
    const provider = request.params.provider;
    await services_1.oauthService.unlinkAccount((0, utils_1.getUserId)(request), provider.toUpperCase());
    (0, utils_1.sendMessage)(reply, request, `${provider} account unlinked successfully.`);
}
async function oauthLinkedAccountsHandler(request, reply) {
    const accounts = await services_1.oauthService.getLinkedAccounts((0, utils_1.getUserId)(request));
    (0, utils_1.sendSuccess)(reply, request, { accounts });
}
//# sourceMappingURL=oauth.handlers.js.map