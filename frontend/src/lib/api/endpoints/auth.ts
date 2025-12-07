/**
 * Authentication API Endpoints
 */

import { apiClient } from '../client';
import { API_ROUTES } from '@/lib/constants/routes';
import type {
  LoginRequest,
  LoginResponse,
  LoginResponseData,
  RegisterRequest,
  RegisterResponse,
  RegisterResponseData,
  CurrentUserResponse,
  SafeUser,
  RefreshTokenRequest,
  RefreshTokenResponse,
  TokenPair,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  VerifyEmailRequest,
  RequestEmailChangeRequest,
  ConfirmEmailChangeRequest,
  EmailChangeData,
  MfaVerifyLoginRequest,
  SessionsResponse,
  UserSession,
  PasswordStrengthData,
  SuccessResponse,
  MessageData,
} from '@/types/api';

const { auth } = API_ROUTES;

// ─────────────────────────────────────────────────────────────────────────────
// Core Auth
// ─────────────────────────────────────────────────────────────────────────────

export async function login(data: LoginRequest): Promise<LoginResponseData> {
  const response = await apiClient.post<LoginResponse>(auth.login, data);
  return response.data.data;
}

export async function register(data: RegisterRequest): Promise<RegisterResponseData> {
  const response = await apiClient.post<RegisterResponse>(auth.register, data);
  return response.data.data;
}

export async function getCurrentUser(): Promise<SafeUser> {
  const response = await apiClient.get<CurrentUserResponse>(auth.me);
  return response.data.data.user;
}

export async function refreshToken(data?: RefreshTokenRequest): Promise<TokenPair | null> {
  const response = await apiClient.post<RefreshTokenResponse>(auth.refresh, data ?? {});
  return response.data?.data?.tokens ?? null;
}

export async function logout(): Promise<void> {
  await apiClient.post(auth.logout);
}

export async function logoutAll(): Promise<number> {
  const response = await apiClient.post<SuccessResponse<{ sessionsRevoked: number }>>(
    auth.logoutAll
  );
  return response.data.data.sessionsRevoked;
}

// ─────────────────────────────────────────────────────────────────────────────
// Password
// ─────────────────────────────────────────────────────────────────────────────

export async function forgotPassword(data: ForgotPasswordRequest): Promise<string> {
  const response = await apiClient.post<SuccessResponse<MessageData>>(
    auth.password.forgot,
    data
  );
  return response.data.data.message;
}

export async function resetPassword(data: ResetPasswordRequest): Promise<string> {
  const response = await apiClient.post<SuccessResponse<MessageData>>(
    auth.password.reset,
    data
  );
  return response.data.data.message;
}

export async function changePassword(data: ChangePasswordRequest): Promise<string> {
  const response = await apiClient.put<SuccessResponse<MessageData>>(
    auth.password.change,
    data
  );
  return response.data.data.message;
}

export async function checkPasswordStrength(password: string): Promise<PasswordStrengthData> {
  const response = await apiClient.get<SuccessResponse<PasswordStrengthData>>(
    auth.password.strength,
    { params: { password } }
  );
  return response.data.data;
}

// ─────────────────────────────────────────────────────────────────────────────
// Email
// ─────────────────────────────────────────────────────────────────────────────

export async function verifyEmail(data: VerifyEmailRequest): Promise<string> {
  const response = await apiClient.post<SuccessResponse<MessageData>>(auth.email.verify, data);
  return response.data.data.message;
}

export async function resendVerificationEmail(): Promise<string> {
  const response = await apiClient.post<SuccessResponse<MessageData>>(auth.email.resend);
  return response.data.data.message;
}

export async function requestEmailChange(data: RequestEmailChangeRequest): Promise<string> {
  const response = await apiClient.post<SuccessResponse<MessageData>>(auth.email.change, data);
  return response.data.data.message;
}

export async function confirmEmailChange(data: ConfirmEmailChangeRequest): Promise<EmailChangeData> {
  const response = await apiClient.post<SuccessResponse<EmailChangeData>>(
    auth.email.confirmChange,
    data
  );
  return response.data.data;
}

// ─────────────────────────────────────────────────────────────────────────────
// MFA
// ─────────────────────────────────────────────────────────────────────────────

export async function verifyMfaLogin(data: MfaVerifyLoginRequest): Promise<LoginResponseData> {
  const response = await apiClient.post<LoginResponse>(auth.mfa.verify, data);
  return response.data.data;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sessions
// ─────────────────────────────────────────────────────────────────────────────

export async function getSessions(): Promise<UserSession[]> {
  const response = await apiClient.get<SessionsResponse>(auth.sessions);
  return response.data.data.sessions;
}

export async function revokeSession(sessionId: string): Promise<void> {
  await apiClient.delete(`${auth.sessions}/${sessionId}`);
}

export async function revokeOtherSessions(): Promise<number> {
  const response = await apiClient.delete<SuccessResponse<{ sessionsRevoked: number }>>(
    auth.sessions
  );
  return response.data.data.sessionsRevoked;
}

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────

export const authApi = {
  login,
  register,
  getCurrentUser,
  refreshToken,
  logout,
  logoutAll,
  forgotPassword,
  resetPassword,
  changePassword,
  checkPasswordStrength,
  verifyEmail,
  resendVerificationEmail,
  requestEmailChange,
  confirmEmailChange,
  verifyMfaLogin,
  getSessions,
  revokeSession,
  revokeOtherSessions,
} as const;