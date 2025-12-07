/**
 * Auth Domain Types
 * Single source of truth for all auth-related types
 */
import type { AuthProvider, DeviceType, UserRole, Session, AuthAccount } from '@prisma/client';
export type { AuthProvider, DeviceType };
export declare const PROVIDER_DISPLAY_NAMES: Readonly<Record<AuthProvider, string>>;
export interface DeviceInfo {
    readonly userAgent: string | null;
    readonly ipAddress: string | null;
    readonly deviceType: DeviceType;
    readonly deviceOs: string | null;
    readonly browser: string | null;
    readonly country: string | null;
    readonly city: string | null;
}
export interface TokenPair {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly accessTokenExpiresAt: Date;
    readonly refreshTokenExpiresAt: Date;
}
export interface UserDTO {
    readonly publicId: string;
    readonly email: string;
    readonly emailVerified: boolean;
    readonly username: string;
    readonly displayName: string;
    readonly role: UserRole;
    readonly status: string;
    readonly createdAt: string;
}
export interface SessionDTO {
    readonly id: string;
    readonly deviceType: DeviceType;
    readonly deviceOs: string | null;
    readonly browser: string | null;
    readonly country: string | null;
    readonly city: string | null;
    readonly ipAddress: string | null;
    readonly authProvider: AuthProvider | null;
    readonly lastActiveAt: string;
    readonly createdAt: string;
    readonly isCurrent: boolean;
}
export interface CreateSessionInput {
    readonly userId: bigint;
    readonly tokenHash?: string;
    readonly refreshTokenHash?: string;
    readonly userAgent: string | null;
    readonly ipAddress: string | null;
    readonly deviceType: DeviceType;
    readonly deviceOs: string | null;
    readonly browser: string | null;
    readonly country: string | null;
    readonly city: string | null;
    readonly authProvider: AuthProvider | null;
    readonly expiresAt: Date;
}
export interface AuthAccountDTO {
    readonly id: string;
    readonly provider: AuthProvider;
    readonly providerEmail: string | null;
    readonly providerName: string | null;
    readonly providerAvatar: string | null;
    readonly isConnected: boolean;
    readonly connectedAt: string;
    readonly lastSyncedAt: string | null;
}
export interface CreateAuthAccountInput {
    readonly userId: bigint;
    readonly provider: AuthProvider;
    readonly providerAccountId: string;
    readonly providerEmail: string | null;
    readonly providerName: string | null;
    readonly providerAvatar: string | null;
    readonly accessTokenRef?: string;
    readonly refreshTokenRef?: string;
    readonly tokenExpiresAt?: Date;
    readonly tokenScopes?: string[];
}
export interface OAuthProfile {
    readonly provider: AuthProvider;
    readonly providerAccountId: string;
    readonly email: string | null;
    readonly name: string | null;
    readonly avatar: string | null;
    readonly accessToken: string;
    readonly refreshToken?: string;
    readonly expiresAt?: Date;
    readonly scopes?: string[];
}
export interface RegisterInput {
    readonly email: string;
    readonly password: string;
    readonly username: string;
    readonly displayName: string;
}
export interface LoginInput {
    readonly emailOrUsername: string;
    readonly password: string;
    readonly rememberMe?: boolean;
}
export interface LoginResult {
    readonly user: UserDTO;
    readonly tokens: TokenPair;
    readonly sessionId: string;
    readonly mfaRequired: boolean;
    readonly mfaPendingToken?: string;
}
export interface MfaSetupResult {
    readonly secret: string;
    readonly otpAuthUrl: string;
    readonly qrCodeDataUrl: string;
    readonly backupCodes: string[];
}
export interface MfaStatusDTO {
    readonly enabled: boolean;
    readonly backupCodesRemaining: number;
}
export interface UserWithSecurity {
    id: bigint;
    publicId: string;
    email: string;
    username: string;
    displayName: string;
    role: UserRole;
    status: string;
    emailVerified: boolean;
    passwordHash: string | null;
    createdAt: Date;
    security?: {
        mfaEnabled: boolean;
        mfaSecret: string | null;
        mfaBackupCodes: string[];
        lockedUntil: Date | null;
        forceLogoutAt: Date | null;
    } | null;
}
export interface MfaPendingData {
    userId: string;
    deviceInfo: DeviceInfo;
}
export declare function getProviderDisplayName(provider: AuthProvider): string;
export declare function isSessionValid(session: Session): boolean;
export declare function isAuthAccountActive(account: AuthAccount): boolean;
export declare function shouldExtendSession(session: Session, thresholdMs?: number): boolean;
//# sourceMappingURL=auth.types.d.ts.map