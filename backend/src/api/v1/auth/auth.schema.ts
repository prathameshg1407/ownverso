// ==== FILE: src/api/v1/auth/auth.schema.ts ====
/**
 * Auth Schemas
 */

import { Type, type Static } from '@sinclair/typebox';
import { REGEX } from '@/common/constants/app.constants';
import { createSuccessResponseSchema } from '@/schemas/common/response.schema';
import { CuidSchema } from '@/schemas/common/id.schema';

// ─────────────────────────────────────────────────────────────────────────
// Field Schemas
// ─────────────────────────────────────────────────────────────────────────

export const EmailSchema = Type.String({ format: 'email', minLength: 3, maxLength: 255, pattern: REGEX.EMAIL.source });
export const PasswordSchema = Type.String({ minLength: 8, maxLength: 128 });
export const UsernameSchema = Type.String({ minLength: 3, maxLength: 30, pattern: REGEX.USERNAME.source });
export const DisplayNameSchema = Type.String({ minLength: 1, maxLength: 100 });
export const TokenSchema = Type.String({ minLength: 1 });
export const MfaCodeSchema = Type.String({ pattern: '^[0-9]{6}$' });
export const BackupCodeSchema = Type.String({ pattern: '^[A-Z0-9]{4}-[A-Z0-9]{4}$' });

const NullableString = Type.Union([Type.String(), Type.Null()]);

// ─────────────────────────────────────────────────────────────────────────
// Common Schemas
// ─────────────────────────────────────────────────────────────────────────

export const MessageResponseSchema = createSuccessResponseSchema(Type.Object({ message: Type.String() }));

export const TokenPairSchema = Type.Object({
  accessToken: Type.String(),
  refreshToken: Type.String(),
  accessTokenExpiresAt: Type.String({ format: 'date-time' }),
  refreshTokenExpiresAt: Type.String({ format: 'date-time' }),
});

export const UserProfileSchema = Type.Object({
  avatarUrl: Type.Optional(Type.String()),
  bio: Type.Optional(Type.String()),
  locale: Type.String(),
  timezone: Type.String(),
});

export const SafeUserSchema = Type.Object({
  publicId: CuidSchema,
  email: EmailSchema,
  emailVerified: Type.Boolean(),
  username: UsernameSchema,
  displayName: DisplayNameSchema,
  role: Type.String(),
  status: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
  profile: Type.Optional(UserProfileSchema),
});

// ─────────────────────────────────────────────────────────────────────────
// Request/Response Schemas
// ─────────────────────────────────────────────────────────────────────────

// Registration
export const RegisterRequestSchema = Type.Object({
  email: EmailSchema,
  password: PasswordSchema,
  username: UsernameSchema,
  displayName: DisplayNameSchema,
});
export type RegisterRequest = Static<typeof RegisterRequestSchema>;

export const RegisterResponseSchema = createSuccessResponseSchema(
  Type.Object({ userId: Type.String(), requiresEmailVerification: Type.Boolean() })
);

// Login
export const LoginRequestSchema = Type.Object({
  emailOrUsername: Type.String({ minLength: 1 }),
  password: PasswordSchema,
  rememberMe: Type.Optional(Type.Boolean({ default: false })),
});
export type LoginRequest = Static<typeof LoginRequestSchema>;

export const LoginResponseSchema = createSuccessResponseSchema(
  Type.Object({
    user: SafeUserSchema,
    tokens: Type.Optional(TokenPairSchema),
    mfaRequired: Type.Boolean(),
    mfaPendingToken: Type.Optional(Type.String()),
  })
);

// Refresh
export const RefreshRequestSchema = Type.Object({ refreshToken: Type.Optional(TokenSchema) });
export const RefreshResponseSchema = createSuccessResponseSchema(Type.Object({ tokens: TokenPairSchema }));

// Current User
export const GetMeResponseSchema = createSuccessResponseSchema(Type.Object({ user: SafeUserSchema }));

// Password
export const ForgotPasswordRequestSchema = Type.Object({ email: EmailSchema });
export type ForgotPasswordRequest = Static<typeof ForgotPasswordRequestSchema>;

export const ResetPasswordRequestSchema = Type.Object({ token: TokenSchema, newPassword: PasswordSchema });
export type ResetPasswordRequest = Static<typeof ResetPasswordRequestSchema>;

export const ChangePasswordRequestSchema = Type.Object({ currentPassword: PasswordSchema, newPassword: PasswordSchema });
export type ChangePasswordRequest = Static<typeof ChangePasswordRequestSchema>;

export const PasswordStrengthResponseSchema = createSuccessResponseSchema(
  Type.Object({
    score: Type.Integer({ minimum: 0, maximum: 4 }),
    level: Type.String(),
    feedback: Type.Array(Type.String()),
    isAcceptable: Type.Boolean(),
  })
);

// Email
export const VerifyEmailRequestSchema = Type.Object({ token: TokenSchema });
export type VerifyEmailRequest = Static<typeof VerifyEmailRequestSchema>;

export const RequestEmailChangeRequestSchema = Type.Object({ newEmail: EmailSchema });
export type RequestEmailChangeRequest = Static<typeof RequestEmailChangeRequestSchema>;

export const ConfirmEmailChangeRequestSchema = Type.Object({ token: TokenSchema });
export type ConfirmEmailChangeRequest = Static<typeof ConfirmEmailChangeRequestSchema>;

export const EmailChangeResponseSchema = createSuccessResponseSchema(
  Type.Object({ oldEmail: EmailSchema, newEmail: EmailSchema })
);

// MFA
export const MfaSetupResponseSchema = createSuccessResponseSchema(
  Type.Object({
    secret: Type.String(),
    otpAuthUrl: Type.String(),
    qrCodeDataUrl: Type.String(),
    backupCodes: Type.Array(Type.String()),
  })
);

export const MfaVerifySetupRequestSchema = Type.Object({ code: MfaCodeSchema });
export type MfaVerifySetupRequest = Static<typeof MfaVerifySetupRequestSchema>;

export const MfaBackupCodesResponseSchema = createSuccessResponseSchema(
  Type.Object({ backupCodes: Type.Array(Type.String()) })
);

export const MfaDisableRequestSchema = Type.Object({ password: PasswordSchema, code: Type.Optional(MfaCodeSchema) });
export type MfaDisableRequest = Static<typeof MfaDisableRequestSchema>;

export const MfaVerifyLoginRequestSchema = Type.Object({
  mfaPendingToken: Type.String(),
  code: Type.Union([MfaCodeSchema, BackupCodeSchema]),
});
export type MfaVerifyLoginRequest = Static<typeof MfaVerifyLoginRequestSchema>;

export const MfaStatusResponseSchema = createSuccessResponseSchema(
  Type.Object({ enabled: Type.Boolean(), backupCodesRemaining: Type.Integer({ minimum: 0 }) })
);

// Sessions
export const SessionSchema = Type.Object({
  id: Type.String(),
  deviceType: Type.String(),
  deviceOs: NullableString,
  browser: NullableString,
  country: NullableString,
  city: NullableString,
  ipAddress: NullableString,
  authProvider: NullableString,
  lastActiveAt: Type.String({ format: 'date-time' }),
  createdAt: Type.String({ format: 'date-time' }),
  isCurrent: Type.Boolean(),
});

export const SessionsResponseSchema = createSuccessResponseSchema(
  Type.Object({ sessions: Type.Array(SessionSchema) })
);

// OAuth
export const OAuthProviderSchema = Type.Object({ provider: Type.String(), enabled: Type.Boolean() });
export const OAuthProvidersResponseSchema = createSuccessResponseSchema(
  Type.Object({ providers: Type.Array(OAuthProviderSchema) })
);

export const OAuthAccountSchema = Type.Object({
  id: Type.String(),
  provider: Type.String(),
  providerEmail: NullableString,
  providerName: NullableString,
  providerAvatar: NullableString,
  isConnected: Type.Boolean(),
  connectedAt: Type.String({ format: 'date-time' }),
  lastSyncedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
});

export const LinkedAccountsResponseSchema = createSuccessResponseSchema(
  Type.Object({ accounts: Type.Array(OAuthAccountSchema) })
);

export const OAuthInitResponseSchema = createSuccessResponseSchema(
  Type.Object({ authUrl: Type.String(), state: Type.String() })
);