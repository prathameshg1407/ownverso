"use strict";
// ==== FILE: src/api/v1/auth/index.ts ====
/**
 * Auth Routes
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const auth_hooks_1 = require("./hooks/auth.hooks");
const guards_1 = require("./guards");
const handlers = __importStar(require("./handlers"));
const schemas = __importStar(require("./auth.schema"));
const authRoutes = async (fastify) => {
    const app = fastify.withTypeProvider();
    await app.register(auth_hooks_1.authHooksPlugin);
    // ─────────────────────────────────────────────────────────────────────
    // Core Authentication
    // ─────────────────────────────────────────────────────────────────────
    app.post('/register', {
        schema: { tags: ['Auth'], body: schemas.RegisterRequestSchema, response: { 201: schemas.RegisterResponseSchema } },
        preHandler: guards_1.authRateLimitGuards.register,
        handler: handlers.registerHandler,
    });
    app.post('/login', {
        schema: { tags: ['Auth'], body: schemas.LoginRequestSchema, response: { 200: schemas.LoginResponseSchema } },
        preHandler: guards_1.authRateLimitGuards.login,
        handler: handlers.loginHandler,
    });
    app.post('/logout', {
        schema: { tags: ['Auth'], response: { 204: type_provider_typebox_1.Type.Null() }, security: [{ bearerAuth: [] }] },
        preHandler: guards_1.requireAuth,
        handler: handlers.logoutHandler,
    });
    app.post('/logout-all', {
        schema: { tags: ['Auth'], response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
        preHandler: guards_1.requireAuth,
        handler: handlers.logoutAllHandler,
    });
    app.post('/refresh', {
        schema: { tags: ['Auth'], body: schemas.RefreshRequestSchema, response: { 200: schemas.RefreshResponseSchema } },
        preHandler: guards_1.authRateLimitGuards.refresh,
        handler: handlers.refreshHandler,
    });
    app.get('/me', {
        schema: { tags: ['Auth'], response: { 200: schemas.GetMeResponseSchema }, security: [{ bearerAuth: [] }] },
        preHandler: guards_1.requireAuth,
        handler: handlers.getMeHandler,
    });
    // ─────────────────────────────────────────────────────────────────────
    // Password Management
    // ─────────────────────────────────────────────────────────────────────
    app.post('/password/forgot', {
        schema: { tags: ['Auth', 'Password'], body: schemas.ForgotPasswordRequestSchema, response: { 200: schemas.MessageResponseSchema } },
        preHandler: guards_1.authRateLimitGuards.passwordReset,
        handler: handlers.forgotPasswordHandler,
    });
    app.post('/password/reset', {
        schema: { tags: ['Auth', 'Password'], body: schemas.ResetPasswordRequestSchema, response: { 200: schemas.MessageResponseSchema } },
        handler: handlers.resetPasswordHandler,
    });
    app.put('/password/change', {
        schema: { tags: ['Auth', 'Password'], body: schemas.ChangePasswordRequestSchema, response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
        preHandler: [guards_1.requireAuth, guards_1.requireEmailVerified],
        handler: handlers.changePasswordHandler,
    });
    app.get('/password/strength', {
        schema: { tags: ['Auth', 'Password'], querystring: type_provider_typebox_1.Type.Object({ password: type_provider_typebox_1.Type.String() }), response: { 200: schemas.PasswordStrengthResponseSchema } },
        handler: handlers.checkPasswordStrengthHandler,
    });
    // ─────────────────────────────────────────────────────────────────────
    // Email Verification
    // ─────────────────────────────────────────────────────────────────────
    app.post('/email/verify', {
        schema: { tags: ['Auth', 'Email'], body: schemas.VerifyEmailRequestSchema, response: { 200: schemas.MessageResponseSchema } },
        preHandler: guards_1.authRateLimitGuards.emailVerification,
        handler: handlers.verifyEmailHandler,
    });
    app.post('/email/resend-verification', {
        schema: { tags: ['Auth', 'Email'], response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
        preHandler: [guards_1.requireAuth, guards_1.authRateLimitGuards.emailVerification],
        handler: handlers.resendVerificationHandler,
    });
    app.post('/email/change', {
        schema: { tags: ['Auth', 'Email'], body: schemas.RequestEmailChangeRequestSchema, response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
        preHandler: [guards_1.requireAuth, guards_1.requireEmailVerified],
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
        preHandler: [guards_1.requireAuth, guards_1.requireEmailVerified],
        handler: handlers.mfaSetupInitHandler,
    });
    app.post('/mfa/setup/verify', {
        schema: { tags: ['Auth', 'MFA'], body: schemas.MfaVerifySetupRequestSchema, response: { 200: schemas.MfaBackupCodesResponseSchema }, security: [{ bearerAuth: [] }] },
        preHandler: [guards_1.requireAuth, guards_1.requireEmailVerified],
        handler: handlers.mfaSetupVerifyHandler,
    });
    app.post('/mfa/disable', {
        schema: { tags: ['Auth', 'MFA'], body: schemas.MfaDisableRequestSchema, response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
        preHandler: guards_1.requireAuth,
        handler: handlers.mfaDisableHandler,
    });
    app.post('/mfa/verify', {
        schema: { tags: ['Auth', 'MFA'], body: schemas.MfaVerifyLoginRequestSchema, response: { 200: schemas.LoginResponseSchema } },
        preHandler: guards_1.authRateLimitGuards.mfa,
        handler: handlers.mfaVerifyLoginHandler,
    });
    app.get('/mfa/status', {
        schema: { tags: ['Auth', 'MFA'], response: { 200: schemas.MfaStatusResponseSchema }, security: [{ bearerAuth: [] }] },
        preHandler: guards_1.requireAuth,
        handler: handlers.mfaStatusHandler,
    });
    app.post('/mfa/backup-codes/regenerate', {
        schema: { tags: ['Auth', 'MFA'], body: type_provider_typebox_1.Type.Object({ password: schemas.PasswordSchema }), response: { 200: schemas.MfaBackupCodesResponseSchema }, security: [{ bearerAuth: [] }] },
        preHandler: guards_1.requireAuth,
        handler: handlers.mfaRegenerateCodesHandler,
    });
    // ─────────────────────────────────────────────────────────────────────
    // Sessions
    // ─────────────────────────────────────────────────────────────────────
    app.get('/sessions', {
        schema: { tags: ['Auth', 'Sessions'], response: { 200: schemas.SessionsResponseSchema }, security: [{ bearerAuth: [] }] },
        preHandler: guards_1.requireAuth,
        handler: handlers.getSessionsHandler,
    });
    app.delete('/sessions/:sessionId', {
        schema: { tags: ['Auth', 'Sessions'], params: type_provider_typebox_1.Type.Object({ sessionId: type_provider_typebox_1.Type.String() }), response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
        preHandler: guards_1.requireAuth,
        handler: handlers.revokeSessionHandler,
    });
    app.delete('/sessions', {
        schema: { tags: ['Auth', 'Sessions'], response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
        preHandler: guards_1.requireAuth,
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
        schema: { tags: ['Auth', 'OAuth'], params: type_provider_typebox_1.Type.Object({ provider: type_provider_typebox_1.Type.String() }), response: { 200: schemas.OAuthInitResponseSchema } },
        handler: handlers.oauthInitHandler,
    });
    app.get('/oauth/:provider/callback', {
        schema: { tags: ['Auth', 'OAuth'], params: type_provider_typebox_1.Type.Object({ provider: type_provider_typebox_1.Type.String() }), querystring: type_provider_typebox_1.Type.Object({ code: type_provider_typebox_1.Type.String(), state: type_provider_typebox_1.Type.String(), error: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.String()) }) },
        preHandler: guards_1.authRateLimitGuards.oauthCallback,
        handler: handlers.oauthCallbackHandler,
    });
    app.post('/oauth/:provider/link', {
        schema: { tags: ['Auth', 'OAuth'], params: type_provider_typebox_1.Type.Object({ provider: type_provider_typebox_1.Type.String() }), body: type_provider_typebox_1.Type.Object({ code: type_provider_typebox_1.Type.String() }), security: [{ bearerAuth: [] }] },
        preHandler: guards_1.requireAuth,
        handler: handlers.oauthLinkHandler,
    });
    app.delete('/oauth/:provider/unlink', {
        schema: { tags: ['Auth', 'OAuth'], params: type_provider_typebox_1.Type.Object({ provider: type_provider_typebox_1.Type.String() }), response: { 200: schemas.MessageResponseSchema }, security: [{ bearerAuth: [] }] },
        preHandler: guards_1.requireAuth,
        handler: handlers.oauthUnlinkHandler,
    });
    app.get('/oauth/accounts', {
        schema: { tags: ['Auth', 'OAuth'], response: { 200: schemas.LinkedAccountsResponseSchema }, security: [{ bearerAuth: [] }] },
        preHandler: guards_1.requireAuth,
        handler: handlers.oauthLinkedAccountsHandler,
    });
};
exports.authRoutes = authRoutes;
//# sourceMappingURL=index.js.map