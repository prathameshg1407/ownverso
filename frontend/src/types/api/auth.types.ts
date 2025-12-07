/**
 * Authentication API Types
 */

import type { SuccessResponse } from './common.types';

// ─────────────────────────────────────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────────────────────────────────────

export type UserRole = 'READER' | 'AUTHOR' | 'COLLABORATOR' | 'MODERATOR' | 'ADMIN' | 'SUPER_ADMIN';
export type UserStatus = 'PENDING_VERIFICATION' | 'ACTIVE' | 'SUSPENDED' | 'BANNED' | 'DELETED' | 'DEACTIVATED';
export type DeviceType = 'DESKTOP' | 'MOBILE' | 'TABLET' | 'UNKNOWN';
export type AuthProvider = 'EMAIL' | 'GOOGLE' | 'APPLE' | 'TWITTER' | 'DISCORD' | 'FACEBOOK';

// ─────────────────────────────────────────────────────────────────────────────
// User Types
// ─────────────────────────────────────────────────────────────────────────────

export interface UserProfile {
  avatarUrl: string | null;
  bio: string | null;
  locale: string;
  timezone: string;
}

export interface SafeUser {
  publicId: string;
  email: string;
  emailVerified: boolean;
  username: string;
  displayName: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  profile?: UserProfile | null;
}

export interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
  username: string;
  displayName: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  avatarUrl: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Token Types
// ─────────────────────────────────────────────────────────────────────────────

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
}

export interface TokenPayload {
  type: 'access' | 'refresh';
  sub: string;
  email: string;
  role: UserRole;
  sessionId: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Request Types
// ─────────────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  emailOrUsername: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  username: string;
  displayName: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface RequestEmailChangeRequest {
  newEmail: string;
}

export interface ConfirmEmailChangeRequest {
  token: string;
}

export interface RefreshTokenRequest {
  refreshToken?: string;
}

export interface MfaVerifyLoginRequest {
  mfaPendingToken: string;
  code: string;
}

export interface MfaVerifySetupRequest {
  code: string;
}

export interface MfaDisableRequest {
  password: string;
  code?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Response Data Types
// ─────────────────────────────────────────────────────────────────────────────

export interface LoginResponseData {
  user: SafeUser;
  tokens?: TokenPair;
  mfaRequired: boolean;
  mfaPendingToken?: string;
}

export interface RegisterResponseData {
  userId: string;
  requiresEmailVerification: boolean;
}

export interface EmailChangeData {
  oldEmail: string;
  newEmail: string;
}

export interface PasswordStrengthData {
  score: number;
  level: string;
  feedback: string[];
  isAcceptable: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Session Types
// ─────────────────────────────────────────────────────────────────────────────

export interface UserSession {
  id: string;
  deviceType: DeviceType;
  deviceOs: string | null;
  browser: string | null;
  country: string | null;
  city: string | null;
  ipAddress: string | null;
  authProvider: AuthProvider | null;
  lastActiveAt: string;
  createdAt: string;
  isCurrent: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// MFA Types
// ─────────────────────────────────────────────────────────────────────────────

export interface MfaSetupData {
  secret: string;
  otpAuthUrl: string;
  qrCodeDataUrl: string;
  backupCodes: string[];
}

export interface MfaStatusData {
  enabled: boolean;
  backupCodesRemaining: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// OAuth Types
// ─────────────────────────────────────────────────────────────────────────────

export interface OAuthAccount {
  id: string;
  provider: AuthProvider;
  providerEmail: string | null;
  providerName: string | null;
  providerAvatar: string | null;
  isConnected: boolean;
  connectedAt: string;
  lastSyncedAt: string | null;
}

export interface OAuthProviderInfo {
  provider: AuthProvider;
  enabled: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Response Types
// ─────────────────────────────────────────────────────────────────────────────

export type LoginResponse = SuccessResponse<LoginResponseData>;
export type RegisterResponse = SuccessResponse<RegisterResponseData>;
export type CurrentUserResponse = SuccessResponse<{ user: SafeUser }>;
export type RefreshTokenResponse = SuccessResponse<{ tokens: TokenPair }>;
export type EmailChangeResponse = SuccessResponse<EmailChangeData>;
export type PasswordStrengthResponse = SuccessResponse<PasswordStrengthData>;
export type SessionsResponse = SuccessResponse<{ sessions: UserSession[] }>;
export type MfaSetupResponse = SuccessResponse<MfaSetupData>;
export type MfaStatusResponse = SuccessResponse<MfaStatusData>;
export type MfaBackupCodesResponse = SuccessResponse<{ backupCodes: string[] }>;
export type OAuthProvidersResponse = SuccessResponse<{ providers: OAuthProviderInfo[] }>;
export type LinkedAccountsResponse = SuccessResponse<{ accounts: OAuthAccount[] }>;
export type OAuthInitResponse = SuccessResponse<{ authUrl: string; state: string }>;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function toAuthUser(user: SafeUser): AuthUser {
  return {
    id: user.publicId,
    email: user.email,
    emailVerified: user.emailVerified,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    avatarUrl: user.profile?.avatarUrl ?? null,
  };
}

export function isActiveUser(user: SafeUser): boolean {
  return user.status === 'ACTIVE';
}

export function needsVerification(user: SafeUser): boolean {
  return user.status === 'PENDING_VERIFICATION' && !user.emailVerified;
}