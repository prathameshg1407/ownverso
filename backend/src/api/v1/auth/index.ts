// ==== FILE: src/api/v1/auth/index.ts ====
/**
 * Auth Routes
 */

import type { FastifyPluginAsync } from 'fastify';
import { Type, type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import { authHooksPlugin } from './hooks/auth.hooks';
import { requireAuth, requireEmailVerified, authRateLimitGuards } from './guards';
import * as handlers from './handlers';
import * as schemas from './auth.schema';

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

  await app.register(authHooksPlugin);

  // ─────────────────────────────────────────────────────────────────────
  // Core Authentication
  // ─────────────────────────────────────────────────────────────────────

  app.post('/register', {
    schema: { tags: ['Auth'], body: schemas.RegisterRequestSchema, response: { 201: schemas.RegisterResponseSchema } },
    preHandler: authRateLimitGuards.register,
    handler: handlers.registerHandler,
  });

  app.post('/login', {
    schema: { tags: ['Auth'], body: schemas.LoginRequestSchema, response: { 200: schemas.LoginResponseSchema } },
    preHandler: authRateLimitGuards.login,
    handler: handlers.loginHandler,
  });

  app.post('/logout', {
    schema: { tags: ['Auth'], response: { 204: Type.Null() }, security: [{ bearerAuth: [] }] },
    preHandler: requireAuth,
    handler: handlers.logoutHandler,
  });

  app.post('/logout-all', {
    schema: { tags: ['Auth'], response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: requireAuth,
    handler: handlers.logoutAllHandler,
  });

  app.post('/refresh', {
    schema: { tags: ['Auth'], body: schemas.RefreshRequestSchema, response: { 200: schemas.RefreshResponseSchema } },
    preHandler: authRateLimitGuards.refresh,
    handler: handlers.refreshHandler,
  });

  app.get('/me', {
    schema: { tags: ['Auth'], response: { 200: schemas.GetMeResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: requireAuth,
    handler: handlers.getMeHandler,
  });

  // ─────────────────────────────────────────────────────────────────────
  // Password Management
  // ─────────────────────────────────────────────────────────────────────

  app.post('/password/forgot', {
    schema: { tags: ['Auth', 'Password'], body: schemas.ForgotPasswordRequestSchema, response: { 200: schemas.MessageResponseSchema } },
    preHandler: authRateLimitGuards.passwordReset,
    handler: handlers.forgotPasswordHandler,
  });

  app.post('/password/reset', {
    schema: { tags: ['Auth', 'Password'], body: schemas.ResetPasswordRequestSchema, response: { 200: schemas.MessageResponseSchema } },
    handler: handlers.resetPasswordHandler,
  });

  app.put('/password/change', {
    schema: { tags: ['Auth', 'Password'], body: schemas.ChangePasswordRequestSchema, response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: [requireAuth, requireEmailVerified],
    handler: handlers.changePasswordHandler,
  });

  app.get('/password/strength', {
    schema: { tags: ['Auth', 'Password'], querystring: Type.Object({ password: Type.String() }), response: { 200: schemas.PasswordStrengthResponseSchema } },
    handler: handlers.checkPasswordStrengthHandler,
  });

  // ─────────────────────────────────────────────────────────────────────
  // Email Verification
  // ─────────────────────────────────────────────────────────────────────

  app.post('/email/verify', {
    schema: { tags: ['Auth', 'Email'], body: schemas.VerifyEmailRequestSchema, response: { 200: schemas.MessageResponseSchema } },
    preHandler: authRateLimitGuards.emailVerification,
    handler: handlers.verifyEmailHandler,
  });

  app.post('/email/resend-verification', {
    schema: { tags: ['Auth', 'Email'], response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: [requireAuth, authRateLimitGuards.emailVerification],
    handler: handlers.resendVerificationHandler,
  });

  app.post('/email/change', {
    schema: { tags: ['Auth', 'Email'], body: schemas.RequestEmailChangeRequestSchema, response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: [requireAuth, requireEmailVerified],
    handler: handlers.requestEmailChangeHandler,
  });

  app.post('/email/confirm-change', {
    schema: { tags: ['Auth', 'Email'], body: schemas.ConfirmEmailChangeRequestSchema, response: { 200: schemas.EmailChangeResponseSchema } },
    handler: handlers.confirmEmailChangeHandler,
  });

  // ─────────────────────────────────────────────────────────────────────
  // MFA
  // ─────────────────────────────────────────────────────────────────────

  app.post('/mfa/setup', {
    schema: { tags: ['Auth', 'MFA'], response: { 200: schemas.MfaSetupResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: [requireAuth, requireEmailVerified],
    handler: handlers.mfaSetupInitHandler,
  });

  app.post('/mfa/setup/verify', {
    schema: { tags: ['Auth', 'MFA'], body: schemas.MfaVerifySetupRequestSchema, response: { 200: schemas.MfaBackupCodesResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: [requireAuth, requireEmailVerified],
    handler: handlers.mfaSetupVerifyHandler,
  });

  app.post('/mfa/disable', {
    schema: { tags: ['Auth', 'MFA'], body: schemas.MfaDisableRequestSchema, response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: requireAuth,
    handler: handlers.mfaDisableHandler,
  });

  app.post('/mfa/verify', {
    schema: { tags: ['Auth', 'MFA'], body: schemas.MfaVerifyLoginRequestSchema, response: { 200: schemas.LoginResponseSchema } },
    preHandler: authRateLimitGuards.mfa,
    handler: handlers.mfaVerifyLoginHandler,
  });

  app.get('/mfa/status', {
    schema: { tags: ['Auth', 'MFA'], response: { 200: schemas.MfaStatusResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: requireAuth,
    handler: handlers.mfaStatusHandler,
  });

  app.post('/mfa/backup-codes/regenerate', {
    schema: { tags: ['Auth', 'MFA'], body: Type.Object({ password: schemas.PasswordSchema }), response: { 200: schemas.MfaBackupCodesResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: requireAuth,
    handler: handlers.mfaRegenerateCodesHandler,
  });

  // ─────────────────────────────────────────────────────────────────────
  // Sessions
  // ─────────────────────────────────────────────────────────────────────

  app.get('/sessions', {
    schema: { tags: ['Auth', 'Sessions'], response: { 200: schemas.SessionsResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: requireAuth,
    handler: handlers.getSessionsHandler,
  });

  app.delete('/sessions/:sessionId', {
    schema: { tags: ['Auth', 'Sessions'], params: Type.Object({ sessionId: Type.String() }), response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: requireAuth,
    handler: handlers.revokeSessionHandler,
  });

  app.delete('/sessions', {
    schema: { tags: ['Auth', 'Sessions'], response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: requireAuth,
    handler: handlers.revokeOtherSessionsHandler,
  });

  // ─────────────────────────────────────────────────────────────────────
  // OAuth
  // ─────────────────────────────────────────────────────────────────────

  app.get('/oauth/providers', {
    schema: { tags: ['Auth', 'OAuth'], response: { 200: schemas.OAuthProvidersResponseSchema } },
    handler: handlers.oauthProvidersHandler,
  });

  app.get('/oauth/:provider', {
    schema: { tags: ['Auth', 'OAuth'], params: Type.Object({ provider: Type.String() }), response: { 200: schemas.OAuthInitResponseSchema } },
    handler: handlers.oauthInitHandler,
  });

  app.get('/oauth/:provider/callback', {
    schema: { tags: ['Auth', 'OAuth'], params: Type.Object({ provider: Type.String() }), querystring: Type.Object({ code: Type.String(), state: Type.String(), error: Type.Optional(Type.String()) }) },
    preHandler: authRateLimitGuards.oauthCallback,
    handler: handlers.oauthCallbackHandler,
  });

  app.post('/oauth/:provider/link', {
    schema: { tags: ['Auth', 'OAuth'], params: Type.Object({ provider: Type.String() }), body: Type.Object({ code: Type.String() }), security: [{ bearerAuth: [] }] },
    preHandler: requireAuth,
    handler: handlers.oauthLinkHandler,
  });

  app.delete('/oauth/:provider/unlink', {
    schema: { tags: ['Auth', 'OAuth'], params: Type.Object({ provider: Type.String() }), response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: requireAuth,
    handler: handlers.oauthUnlinkHandler,
  });

  app.get('/oauth/accounts', {
    schema: { tags: ['Auth', 'OAuth'], response: { 200: schemas.LinkedAccountsResponseSchema }, security: [{ bearerAuth: [] }] },
    preHandler: requireAuth,
    handler: handlers.oauthLinkedAccountsHandler,
  });
};