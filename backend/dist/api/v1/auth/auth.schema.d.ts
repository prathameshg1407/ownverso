/**
 * Auth Schemas
 */
import { type Static } from '@sinclair/typebox';
export declare const EmailSchema: import("@sinclair/typebox").TString;
export declare const PasswordSchema: import("@sinclair/typebox").TString;
export declare const UsernameSchema: import("@sinclair/typebox").TString;
export declare const DisplayNameSchema: import("@sinclair/typebox").TString;
export declare const TokenSchema: import("@sinclair/typebox").TString;
export declare const MfaCodeSchema: import("@sinclair/typebox").TString;
export declare const BackupCodeSchema: import("@sinclair/typebox").TString;
export declare const MessageResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        message: import("@sinclair/typebox").TString;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const TokenPairSchema: import("@sinclair/typebox").TObject<{
    accessToken: import("@sinclair/typebox").TString;
    refreshToken: import("@sinclair/typebox").TString;
    accessTokenExpiresAt: import("@sinclair/typebox").TString;
    refreshTokenExpiresAt: import("@sinclair/typebox").TString;
}>;
export declare const UserProfileSchema: import("@sinclair/typebox").TObject<{
    avatarUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    bio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    locale: import("@sinclair/typebox").TString;
    timezone: import("@sinclair/typebox").TString;
}>;
export declare const SafeUserSchema: import("@sinclair/typebox").TObject<{
    publicId: import("@sinclair/typebox").TString;
    email: import("@sinclair/typebox").TString;
    emailVerified: import("@sinclair/typebox").TBoolean;
    username: import("@sinclair/typebox").TString;
    displayName: import("@sinclair/typebox").TString;
    role: import("@sinclair/typebox").TString;
    status: import("@sinclair/typebox").TString;
    createdAt: import("@sinclair/typebox").TString;
    profile: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        avatarUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        bio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        locale: import("@sinclair/typebox").TString;
        timezone: import("@sinclair/typebox").TString;
    }>>;
}>;
export declare const RegisterRequestSchema: import("@sinclair/typebox").TObject<{
    email: import("@sinclair/typebox").TString;
    password: import("@sinclair/typebox").TString;
    username: import("@sinclair/typebox").TString;
    displayName: import("@sinclair/typebox").TString;
}>;
export type RegisterRequest = Static<typeof RegisterRequestSchema>;
export declare const RegisterResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        userId: import("@sinclair/typebox").TString;
        requiresEmailVerification: import("@sinclair/typebox").TBoolean;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const LoginRequestSchema: import("@sinclair/typebox").TObject<{
    emailOrUsername: import("@sinclair/typebox").TString;
    password: import("@sinclair/typebox").TString;
    rememberMe: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export type LoginRequest = Static<typeof LoginRequestSchema>;
export declare const LoginResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        user: import("@sinclair/typebox").TObject<{
            publicId: import("@sinclair/typebox").TString;
            email: import("@sinclair/typebox").TString;
            emailVerified: import("@sinclair/typebox").TBoolean;
            username: import("@sinclair/typebox").TString;
            displayName: import("@sinclair/typebox").TString;
            role: import("@sinclair/typebox").TString;
            status: import("@sinclair/typebox").TString;
            createdAt: import("@sinclair/typebox").TString;
            profile: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                avatarUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
                bio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
                locale: import("@sinclair/typebox").TString;
                timezone: import("@sinclair/typebox").TString;
            }>>;
        }>;
        tokens: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            accessToken: import("@sinclair/typebox").TString;
            refreshToken: import("@sinclair/typebox").TString;
            accessTokenExpiresAt: import("@sinclair/typebox").TString;
            refreshTokenExpiresAt: import("@sinclair/typebox").TString;
        }>>;
        mfaRequired: import("@sinclair/typebox").TBoolean;
        mfaPendingToken: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const RefreshRequestSchema: import("@sinclair/typebox").TObject<{
    refreshToken: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const RefreshResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        tokens: import("@sinclair/typebox").TObject<{
            accessToken: import("@sinclair/typebox").TString;
            refreshToken: import("@sinclair/typebox").TString;
            accessTokenExpiresAt: import("@sinclair/typebox").TString;
            refreshTokenExpiresAt: import("@sinclair/typebox").TString;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const GetMeResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        user: import("@sinclair/typebox").TObject<{
            publicId: import("@sinclair/typebox").TString;
            email: import("@sinclair/typebox").TString;
            emailVerified: import("@sinclair/typebox").TBoolean;
            username: import("@sinclair/typebox").TString;
            displayName: import("@sinclair/typebox").TString;
            role: import("@sinclair/typebox").TString;
            status: import("@sinclair/typebox").TString;
            createdAt: import("@sinclair/typebox").TString;
            profile: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                avatarUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
                bio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
                locale: import("@sinclair/typebox").TString;
                timezone: import("@sinclair/typebox").TString;
            }>>;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const ForgotPasswordRequestSchema: import("@sinclair/typebox").TObject<{
    email: import("@sinclair/typebox").TString;
}>;
export type ForgotPasswordRequest = Static<typeof ForgotPasswordRequestSchema>;
export declare const ResetPasswordRequestSchema: import("@sinclair/typebox").TObject<{
    token: import("@sinclair/typebox").TString;
    newPassword: import("@sinclair/typebox").TString;
}>;
export type ResetPasswordRequest = Static<typeof ResetPasswordRequestSchema>;
export declare const ChangePasswordRequestSchema: import("@sinclair/typebox").TObject<{
    currentPassword: import("@sinclair/typebox").TString;
    newPassword: import("@sinclair/typebox").TString;
}>;
export type ChangePasswordRequest = Static<typeof ChangePasswordRequestSchema>;
export declare const PasswordStrengthResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        score: import("@sinclair/typebox").TInteger;
        level: import("@sinclair/typebox").TString;
        feedback: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        isAcceptable: import("@sinclair/typebox").TBoolean;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const VerifyEmailRequestSchema: import("@sinclair/typebox").TObject<{
    token: import("@sinclair/typebox").TString;
}>;
export type VerifyEmailRequest = Static<typeof VerifyEmailRequestSchema>;
export declare const RequestEmailChangeRequestSchema: import("@sinclair/typebox").TObject<{
    newEmail: import("@sinclair/typebox").TString;
}>;
export type RequestEmailChangeRequest = Static<typeof RequestEmailChangeRequestSchema>;
export declare const ConfirmEmailChangeRequestSchema: import("@sinclair/typebox").TObject<{
    token: import("@sinclair/typebox").TString;
}>;
export type ConfirmEmailChangeRequest = Static<typeof ConfirmEmailChangeRequestSchema>;
export declare const EmailChangeResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        oldEmail: import("@sinclair/typebox").TString;
        newEmail: import("@sinclair/typebox").TString;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const MfaSetupResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        secret: import("@sinclair/typebox").TString;
        otpAuthUrl: import("@sinclair/typebox").TString;
        qrCodeDataUrl: import("@sinclair/typebox").TString;
        backupCodes: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const MfaVerifySetupRequestSchema: import("@sinclair/typebox").TObject<{
    code: import("@sinclair/typebox").TString;
}>;
export type MfaVerifySetupRequest = Static<typeof MfaVerifySetupRequestSchema>;
export declare const MfaBackupCodesResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        backupCodes: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const MfaDisableRequestSchema: import("@sinclair/typebox").TObject<{
    password: import("@sinclair/typebox").TString;
    code: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type MfaDisableRequest = Static<typeof MfaDisableRequestSchema>;
export declare const MfaVerifyLoginRequestSchema: import("@sinclair/typebox").TObject<{
    mfaPendingToken: import("@sinclair/typebox").TString;
    code: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>;
}>;
export type MfaVerifyLoginRequest = Static<typeof MfaVerifyLoginRequestSchema>;
export declare const MfaStatusResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        enabled: import("@sinclair/typebox").TBoolean;
        backupCodesRemaining: import("@sinclair/typebox").TInteger;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const SessionSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    deviceType: import("@sinclair/typebox").TString;
    deviceOs: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    browser: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    country: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    city: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    ipAddress: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    authProvider: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    lastActiveAt: import("@sinclair/typebox").TString;
    createdAt: import("@sinclair/typebox").TString;
    isCurrent: import("@sinclair/typebox").TBoolean;
}>;
export declare const SessionsResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        sessions: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            deviceType: import("@sinclair/typebox").TString;
            deviceOs: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            browser: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            country: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            city: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            ipAddress: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            authProvider: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            lastActiveAt: import("@sinclair/typebox").TString;
            createdAt: import("@sinclair/typebox").TString;
            isCurrent: import("@sinclair/typebox").TBoolean;
        }>>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const OAuthProviderSchema: import("@sinclair/typebox").TObject<{
    provider: import("@sinclair/typebox").TString;
    enabled: import("@sinclair/typebox").TBoolean;
}>;
export declare const OAuthProvidersResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        providers: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            provider: import("@sinclair/typebox").TString;
            enabled: import("@sinclair/typebox").TBoolean;
        }>>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const OAuthAccountSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    provider: import("@sinclair/typebox").TString;
    providerEmail: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    providerName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    providerAvatar: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    isConnected: import("@sinclair/typebox").TBoolean;
    connectedAt: import("@sinclair/typebox").TString;
    lastSyncedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
}>;
export declare const LinkedAccountsResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        accounts: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            provider: import("@sinclair/typebox").TString;
            providerEmail: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            providerName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            providerAvatar: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            isConnected: import("@sinclair/typebox").TBoolean;
            connectedAt: import("@sinclair/typebox").TString;
            lastSyncedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        }>>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const OAuthInitResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        authUrl: import("@sinclair/typebox").TString;
        state: import("@sinclair/typebox").TString;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
//# sourceMappingURL=auth.schema.d.ts.map