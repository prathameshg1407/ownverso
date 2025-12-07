/**
 * User Management API Endpoints
 */

import { apiClient } from '../client';
import { API_ROUTES } from '@/lib/constants/routes';
import type {
  FullUser,
  GetMeResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UserProfile,
  UpdateProfileRequest,
  UpdateProfileResponse,
  AvatarUploadResponse,
  UserPreferences,
  GetPreferencesResponse,
  UpdatePreferencesRequest,
  UpdatePreferencesResponse,
  UserSecurityInfo,
  GetSecurityResponse,
  LoginHistoryEntry,
  LoginHistoryResponse,
  PublicUserProfile,
  GetPublicUserResponse,
  AdminUserQuery,
  AdminUserSummary,
  AdminUserListResponse,
  AdminUserDetail,
  GetAdminUserResponse,
  AdminUpdateUserRequest,
  AdminUpdateStatusRequest,
  AdminUpdateRoleRequest,
  ImpersonationData,
  ImpersonateResponse,
  SuccessResponse,
  MessageData,
  PaginationMeta,
} from '@/types/api';

const { users, admin } = API_ROUTES;

// ─────────────────────────────────────────────────────────────────────────────
// Current User
// ─────────────────────────────────────────────────────────────────────────────

export async function getMe(): Promise<FullUser> {
  const { data } = await apiClient.get<GetMeResponse>(users.me);
  return data.data.user;
}

export async function updateMe(payload: UpdateUserRequest): Promise<FullUser> {
  const { data } = await apiClient.put<UpdateUserResponse>(users.me, payload);
  return data.data.user;
}

export async function deleteMe(): Promise<void> {
  await apiClient.delete(users.me);
}

// ─────────────────────────────────────────────────────────────────────────────
// Profile
// ─────────────────────────────────────────────────────────────────────────────

export async function updateProfile(payload: UpdateProfileRequest): Promise<UserProfile> {
  const { data } = await apiClient.patch<UpdateProfileResponse>(users.profile, payload);
  return data.data.profile;
}

export async function uploadAvatar(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await apiClient.post<AvatarUploadResponse>(users.avatar, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data.avatarUrl;
}

export async function deleteAvatar(): Promise<void> {
  await apiClient.delete(users.avatar);
}

// ─────────────────────────────────────────────────────────────────────────────
// Preferences
// ─────────────────────────────────────────────────────────────────────────────

export async function getPreferences(): Promise<UserPreferences> {
  const { data } = await apiClient.get<GetPreferencesResponse>(users.preferences);
  return data.data.preferences;
}

export async function updatePreferences(
  payload: UpdatePreferencesRequest
): Promise<UserPreferences> {
  const { data } = await apiClient.patch<UpdatePreferencesResponse>(users.preferences, payload);
  return data.data.preferences;
}

// ─────────────────────────────────────────────────────────────────────────────
// Security
// ─────────────────────────────────────────────────────────────────────────────

export async function getSecurity(): Promise<UserSecurityInfo> {
  const { data } = await apiClient.get<GetSecurityResponse>(users.security);
  return data.data.security;
}

export async function getLoginHistory(): Promise<LoginHistoryEntry[]> {
  const { data } = await apiClient.get<LoginHistoryResponse>(users.loginHistory);
  return data.data.sessions;
}

export async function forceLogoutAll(): Promise<string> {
  const { data } = await apiClient.post<SuccessResponse<MessageData>>(users.forceLogout);
  return data.data.message;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public Profiles
// ─────────────────────────────────────────────────────────────────────────────

export async function getPublicUserByUsername(username: string): Promise<PublicUserProfile> {
  const { data } = await apiClient.get<GetPublicUserResponse>(users.public(username));
  return data.data.user;
}

export async function getPublicUserById(publicId: string): Promise<PublicUserProfile> {
  const { data } = await apiClient.get<GetPublicUserResponse>(users.publicById(publicId));
  return data.data.user;
}

// ─────────────────────────────────────────────────────────────────────────────
// Admin
// ─────────────────────────────────────────────────────────────────────────────

export async function adminListUsers(
  query: AdminUserQuery = {}
): Promise<{ users: AdminUserSummary[]; meta: PaginationMeta }> {
  const { data } = await apiClient.get<AdminUserListResponse>(admin.users, { params: query });
  return { users: data.data, meta: data.meta };
}

export async function adminGetUser(userId: string): Promise<AdminUserDetail> {
  const { data } = await apiClient.get<GetAdminUserResponse>(admin.user(userId));
  return data.data.user;
}

export async function adminUpdateUser(
  userId: string,
  payload: AdminUpdateUserRequest
): Promise<AdminUserDetail> {
  const { data } = await apiClient.put<GetAdminUserResponse>(admin.user(userId), payload);
  return data.data.user;
}

export async function adminUpdateUserStatus(
  userId: string,
  payload: AdminUpdateStatusRequest
): Promise<AdminUserDetail> {
  const { data } = await apiClient.put<GetAdminUserResponse>(admin.userStatus(userId), payload);
  return data.data.user;
}

export async function adminUpdateUserRole(
  userId: string,
  payload: AdminUpdateRoleRequest
): Promise<AdminUserDetail> {
  const { data } = await apiClient.put<GetAdminUserResponse>(admin.userRole(userId), payload);
  return data.data.user;
}

export async function adminImpersonateUser(userId: string): Promise<ImpersonationData> {
  const { data } = await apiClient.post<ImpersonateResponse>(admin.impersonate(userId));
  return data.data;
}

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────

export const usersApi = {
  getMe,
  updateMe,
  deleteMe,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
  getPreferences,
  updatePreferences,
  getSecurity,
  getLoginHistory,
  forceLogoutAll,
  getPublicUserByUsername,
  getPublicUserById,
  adminListUsers,
  adminGetUser,
  adminUpdateUser,
  adminUpdateUserStatus,
  adminUpdateUserRole,
  adminImpersonateUser,
} as const;