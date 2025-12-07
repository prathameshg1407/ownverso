// ==== FILE: src/api/v1/auth/handlers/oauth.handlers.ts ====
/**
 * OAuth Handlers
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { AuthProvider } from '@prisma/client';
import { config } from '@/config';
import { oauthService } from '@/domain/auth/services';
import { BadRequestError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';
import {
  sendSuccess,
  sendMessage,
  getUserId,
  getDeviceInfo,
  generateOAuthState,
  verifyOAuthState,
} from '../utils';

const VALID_PROVIDERS = new Set(Object.values(AuthProvider));

export async function oauthProvidersHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  sendSuccess(reply, request, { providers: oauthService.getAvailableProviders() });
}

export async function oauthInitHandler(
  request: FastifyRequest<{ Params: { provider: string } }>,
  reply: FastifyReply
): Promise<void> {
  const provider = request.params.provider.toUpperCase();

  if (!VALID_PROVIDERS.has(provider as AuthProvider)) {
    throw new BadRequestError('Invalid OAuth provider', ERROR_CODES.BAD_REQUEST);
  }

  const state = generateOAuthState();
  const authUrl = oauthService.getAuthorizationUrl(provider as AuthProvider, state);

  reply.setCookie('oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 600,
    path: '/api/v1/auth/oauth',
  });

  sendSuccess(reply, request, { authUrl, state });
}

export async function oauthCallbackHandler(
  request: FastifyRequest<{
    Params: { provider: string };
    Querystring: { code: string; state: string; error?: string };
  }>,
  reply: FastifyReply
): Promise<void> {
  const { provider } = request.params;
  const { code, state, error } = request.query;
  const { oauthError, oauthSuccess } = config.auth.frontendUrls;

  if (error) {
    return reply.redirect(`${oauthError}?error=${encodeURIComponent(error)}`);
  }

  const storedState = request.cookies['oauth_state'];
  if (!storedState || storedState !== state || !verifyOAuthState(state)) {
    return reply.redirect(`${oauthError}?error=invalid_state`);
  }

  reply.clearCookie('oauth_state', { path: '/api/v1/auth/oauth' });

  try {
    const result = await oauthService.handleCallback(
      provider.toUpperCase() as AuthProvider,
      code,
      getDeviceInfo(request)
    );

    const redirectUrl = new URL(oauthSuccess);
    redirectUrl.searchParams.set('provider', provider);

    if (request.headers['x-client-type'] === 'mobile') {
      redirectUrl.searchParams.set('accessToken', result.tokens.accessToken);
      redirectUrl.searchParams.set('refreshToken', result.tokens.refreshToken);
    }

    return reply.redirect(redirectUrl.toString());
  } catch (err) {
    const message = err instanceof Error ? err.message : 'OAuth authentication failed';
    return reply.redirect(`${oauthError}?error=${encodeURIComponent(message)}`);
  }
}

export async function oauthLinkHandler(
  request: FastifyRequest<{ Params: { provider: string }; Body: { code: string } }>,
  reply: FastifyReply
): Promise<void> {
  const account = await oauthService.linkAccount(
    getUserId(request),
    request.params.provider.toUpperCase() as AuthProvider,
    request.body.code
  );
  sendSuccess(reply, request, { account });
}

export async function oauthUnlinkHandler(
  request: FastifyRequest<{ Params: { provider: string } }>,
  reply: FastifyReply
): Promise<void> {
  const provider = request.params.provider;
  await oauthService.unlinkAccount(getUserId(request), provider.toUpperCase() as AuthProvider);
  sendMessage(reply, request, `${provider} account unlinked successfully.`);
}

export async function oauthLinkedAccountsHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const accounts = await oauthService.getLinkedAccounts(getUserId(request));
  sendSuccess(reply, request, { accounts });
}