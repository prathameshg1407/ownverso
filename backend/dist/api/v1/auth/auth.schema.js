"use strict";
// ==== FILE: src/api/v1/auth/auth.schema.ts ====
/**
 * Auth Schemas
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthInitResponseSchema = exports.LinkedAccountsResponseSchema = exports.OAuthAccountSchema = exports.OAuthProvidersResponseSchema = exports.OAuthProviderSchema = exports.SessionsResponseSchema = exports.SessionSchema = exports.MfaStatusResponseSchema = exports.MfaVerifyLoginRequestSchema = exports.MfaDisableRequestSchema = exports.MfaBackupCodesResponseSchema = exports.MfaVerifySetupRequestSchema = exports.MfaSetupResponseSchema = exports.EmailChangeResponseSchema = exports.ConfirmEmailChangeRequestSchema = exports.RequestEmailChangeRequestSchema = exports.VerifyEmailRequestSchema = exports.PasswordStrengthResponseSchema = exports.ChangePasswordRequestSchema = exports.ResetPasswordRequestSchema = exports.ForgotPasswordRequestSchema = exports.GetMeResponseSchema = exports.RefreshResponseSchema = exports.RefreshRequestSchema = exports.LoginResponseSchema = exports.LoginRequestSchema = exports.RegisterResponseSchema = exports.RegisterRequestSchema = exports.SafeUserSchema = exports.UserProfileSchema = exports.TokenPairSchema = exports.MessageResponseSchema = exports.BackupCodeSchema = exports.MfaCodeSchema = exports.TokenSchema = exports.DisplayNameSchema = exports.UsernameSchema = exports.PasswordSchema = exports.EmailSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const app_constants_1 = require("../../../common/constants/app.constants");
const response_schema_1 = require("../../../schemas/common/response.schema");
const id_schema_1 = require("../../../schemas/common/id.schema");
// ─────────────────────────────────────────────────────────────────────────
// Field Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.EmailSchema = typebox_1.Type.String({ format: 'email', minLength: 3, maxLength: 255, pattern: app_constants_1.REGEX.EMAIL.source });
exports.PasswordSchema = typebox_1.Type.String({ minLength: 8, maxLength: 128 });
exports.UsernameSchema = typebox_1.Type.String({ minLength: 3, maxLength: 30, pattern: app_constants_1.REGEX.USERNAME.source });
exports.DisplayNameSchema = typebox_1.Type.String({ minLength: 1, maxLength: 100 });
exports.TokenSchema = typebox_1.Type.String({ minLength: 1 });
exports.MfaCodeSchema = typebox_1.Type.String({ pattern: '^[0-9]{6}$' });
exports.BackupCodeSchema = typebox_1.Type.String({ pattern: '^[A-Z0-9]{4}-[A-Z0-9]{4}$' });
const NullableString = typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]);
// ─────────────────────────────────────────────────────────────────────────
// Common Schemas
// ─────────────────────────────────────────────────────────────────────────
exports.MessageResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ message: typebox_1.Type.String() }));
exports.TokenPairSchema = typebox_1.Type.Object({
    accessToken: typebox_1.Type.String(),
    refreshToken: typebox_1.Type.String(),
    accessTokenExpiresAt: typebox_1.Type.String({ format: 'date-time' }),
    refreshTokenExpiresAt: typebox_1.Type.String({ format: 'date-time' }),
});
exports.UserProfileSchema = typebox_1.Type.Object({
    avatarUrl: typebox_1.Type.Optional(typebox_1.Type.String()),
    bio: typebox_1.Type.Optional(typebox_1.Type.String()),
    locale: typebox_1.Type.String(),
    timezone: typebox_1.Type.String(),
});
exports.SafeUserSchema = typebox_1.Type.Object({
    publicId: id_schema_1.CuidSchema,
    email: exports.EmailSchema,
    emailVerified: typebox_1.Type.Boolean(),
    username: exports.UsernameSchema,
    displayName: exports.DisplayNameSchema,
    role: typebox_1.Type.String(),
    status: typebox_1.Type.String(),
    createdAt: typebox_1.Type.String({ format: 'date-time' }),
    profile: typebox_1.Type.Optional(exports.UserProfileSchema),
});
// ─────────────────────────────────────────────────────────────────────────
// Request/Response Schemas
// ─────────────────────────────────────────────────────────────────────────
// Registration
exports.RegisterRequestSchema = typebox_1.Type.Object({
    email: exports.EmailSchema,
    password: exports.PasswordSchema,
    username: exports.UsernameSchema,
    displayName: exports.DisplayNameSchema,
});
exports.RegisterResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ userId: typebox_1.Type.String(), requiresEmailVerification: typebox_1.Type.Boolean() }));
// Login
exports.LoginRequestSchema = typebox_1.Type.Object({
    emailOrUsername: typebox_1.Type.String({ minLength: 1 }),
    password: exports.PasswordSchema,
    rememberMe: typebox_1.Type.Optional(typebox_1.Type.Boolean({ default: false })),
});
exports.LoginResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({
    user: exports.SafeUserSchema,
    tokens: typebox_1.Type.Optional(exports.TokenPairSchema),
    mfaRequired: typebox_1.Type.Boolean(),
    mfaPendingToken: typebox_1.Type.Optional(typebox_1.Type.String()),
}));
// Refresh
exports.RefreshRequestSchema = typebox_1.Type.Object({ refreshToken: typebox_1.Type.Optional(exports.TokenSchema) });
exports.RefreshResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ tokens: exports.TokenPairSchema }));
// Current User
exports.GetMeResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ user: exports.SafeUserSchema }));
// Password
exports.ForgotPasswordRequestSchema = typebox_1.Type.Object({ email: exports.EmailSchema });
exports.ResetPasswordRequestSchema = typebox_1.Type.Object({ token: exports.TokenSchema, newPassword: exports.PasswordSchema });
exports.ChangePasswordRequestSchema = typebox_1.Type.Object({ currentPassword: exports.PasswordSchema, newPassword: exports.PasswordSchema });
exports.PasswordStrengthResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({
    score: typebox_1.Type.Integer({ minimum: 0, maximum: 4 }),
    level: typebox_1.Type.String(),
    feedback: typebox_1.Type.Array(typebox_1.Type.String()),
    isAcceptable: typebox_1.Type.Boolean(),
}));
// Email
exports.VerifyEmailRequestSchema = typebox_1.Type.Object({ token: exports.TokenSchema });
exports.RequestEmailChangeRequestSchema = typebox_1.Type.Object({ newEmail: exports.EmailSchema });
exports.ConfirmEmailChangeRequestSchema = typebox_1.Type.Object({ token: exports.TokenSchema });
exports.EmailChangeResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ oldEmail: exports.EmailSchema, newEmail: exports.EmailSchema }));
// MFA
exports.MfaSetupResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({
    secret: typebox_1.Type.String(),
    otpAuthUrl: typebox_1.Type.String(),
    qrCodeDataUrl: typebox_1.Type.String(),
    backupCodes: typebox_1.Type.Array(typebox_1.Type.String()),
}));
exports.MfaVerifySetupRequestSchema = typebox_1.Type.Object({ code: exports.MfaCodeSchema });
exports.MfaBackupCodesResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ backupCodes: typebox_1.Type.Array(typebox_1.Type.String()) }));
exports.MfaDisableRequestSchema = typebox_1.Type.Object({ password: exports.PasswordSchema, code: typebox_1.Type.Optional(exports.MfaCodeSchema) });
exports.MfaVerifyLoginRequestSchema = typebox_1.Type.Object({
    mfaPendingToken: typebox_1.Type.String(),
    code: typebox_1.Type.Union([exports.MfaCodeSchema, exports.BackupCodeSchema]),
});
exports.MfaStatusResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ enabled: typebox_1.Type.Boolean(), backupCodesRemaining: typebox_1.Type.Integer({ minimum: 0 }) }));
// Sessions
exports.SessionSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    deviceType: typebox_1.Type.String(),
    deviceOs: NullableString,
    browser: NullableString,
    country: NullableString,
    city: NullableString,
    ipAddress: NullableString,
    authProvider: NullableString,
    lastActiveAt: typebox_1.Type.String({ format: 'date-time' }),
    createdAt: typebox_1.Type.String({ format: 'date-time' }),
    isCurrent: typebox_1.Type.Boolean(),
});
exports.SessionsResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ sessions: typebox_1.Type.Array(exports.SessionSchema) }));
// OAuth
exports.OAuthProviderSchema = typebox_1.Type.Object({ provider: typebox_1.Type.String(), enabled: typebox_1.Type.Boolean() });
exports.OAuthProvidersResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ providers: typebox_1.Type.Array(exports.OAuthProviderSchema) }));
exports.OAuthAccountSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    provider: typebox_1.Type.String(),
    providerEmail: NullableString,
    providerName: NullableString,
    providerAvatar: NullableString,
    isConnected: typebox_1.Type.Boolean(),
    connectedAt: typebox_1.Type.String({ format: 'date-time' }),
    lastSyncedAt: typebox_1.Type.Union([typebox_1.Type.String({ format: 'date-time' }), typebox_1.Type.Null()]),
});
exports.LinkedAccountsResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ accounts: typebox_1.Type.Array(exports.OAuthAccountSchema) }));
exports.OAuthInitResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ authUrl: typebox_1.Type.String(), state: typebox_1.Type.String() }));
//# sourceMappingURL=auth.schema.js.map