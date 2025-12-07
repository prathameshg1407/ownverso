/**
 * User Management API Types
 */

import type { SuccessResponse, PaginatedResponse, PaginationQuery } from './common.types';
import type { UserRole, UserStatus } from './auth.types';

// ─────────────────────────────────────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────────────────────────────────────

export type DataRegion =
  | 'INDIA'
  | 'SOUTHEAST_ASIA'
  | 'EUROPE'
  | 'NORTH_AMERICA'
  | 'SOUTH_AMERICA'
  | 'AUSTRALIA'
  | 'JAPAN';

export type EmailDigestFrequency = 'INSTANT' | 'HOURLY' | 'DAILY' | 'WEEKLY' | 'NEVER';

export type ContentRating = 'EVERYONE' | 'TEEN' | 'MATURE' | 'ADULT_ONLY';

// ─────────────────────────────────────────────────────────────────────────────
// User Profile
// ─────────────────────────────────────────────────────────────────────────────

export interface UserProfile {
  avatarUrl: string | null;
  bio: string | null;
  locale: string;
  timezone: string;
  dataRegion: DataRegion;
  websiteUrl: string | null;
  twitterHandle: string | null;
  instagramHandle: string | null;
  tiktokHandle: string | null;
  discordHandle: string | null;
}

export interface UpdateProfileRequest {
  bio?: string | null;
  locale?: string;
  timezone?: string;
  dataRegion?: DataRegion;
  websiteUrl?: string | null;
  twitterHandle?: string | null;
  instagramHandle?: string | null;
  tiktokHandle?: string | null;
  discordHandle?: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// User Preferences
// ─────────────────────────────────────────────────────────────────────────────

export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  emailDigestFrequency: EmailDigestFrequency;
  contentLanguages: string[];
  contentRatings: ContentRating[];
  hiddenGenres: string[];
  hiddenTags: string[];
  showOnlineStatus: boolean;
  showReadingActivity: boolean;
  allowDirectMessages: boolean;
  marketingEmails: boolean;
  newsletterOptIn: boolean;
}

export type UpdatePreferencesRequest = Partial<UserPreferences>;

// ─────────────────────────────────────────────────────────────────────────────
// User Security
// ─────────────────────────────────────────────────────────────────────────────

export interface UserSecurityInfo {
  mfaEnabled: boolean;
  lastLoginAt: string | null;
  lastLoginIp: string | null;
  lastLoginUserAgent: string | null;
  failedLoginCount: number;
  lockedUntil: string | null;
  passwordChangedAt: string | null;
  emailVerifiedAt: string | null;
}

export interface LoginHistoryEntry {
  id: string;
  ipAddress: string | null;
  userAgent: string | null;
  deviceType: string;
  deviceOs: string | null;
  browser: string | null;
  country: string | null;
  city: string | null;
  lastActiveAt: string;
  createdAt: string;
  isCurrent: boolean;
}

export interface UpdateSecurityRequest {
  requirePasswordForSensitiveActions?: boolean;
  loginNotifications?: boolean;
  trustedDevicesEnabled?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Reader & Author Profiles
// ─────────────────────────────────────────────────────────────────────────────

export interface ReaderProfile {
  preferredGenres: string[];
  totalSeriesRead: number;
  totalChaptersRead: number;
  totalReadTimeHours: number;
  totalWordsRead: number;
  activeSubscriptions: number;
  lifetimeSpent: number;
  lifetimeCurrency: string;
}

export interface AuthorAccountSummary {
  penName: string | null;
  tagline: string | null;
  isVerified: boolean;
  platformTier: string;
  seriesCount: number;
  activeSubscriberCount: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Full User
// ─────────────────────────────────────────────────────────────────────────────

export interface FullUser {
  publicId: string;
  email: string;
  emailVerified: boolean;
  username: string;
  displayName: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  profile: UserProfile | null;
  preferences: UserPreferences | null;
  readerProfile: ReaderProfile | null;
  authorAccount: AuthorAccountSummary | null;
}

export interface UpdateUserRequest {
  displayName?: string;
  username?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public User
// ─────────────────────────────────────────────────────────────────────────────

export interface PublicUserProfile {
  publicId: string;
  username: string;
  displayName: string;
  role: UserRole;
  avatarUrl: string | null;
  bio: string | null;
  websiteUrl: string | null;
  twitterHandle: string | null;
  instagramHandle: string | null;
  tiktokHandle: string | null;
  discordHandle: string | null;
  isVerifiedAuthor: boolean;
  createdAt: string;
  stats?: {
    seriesCount: number;
    followerCount: number;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Admin Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AdminUserSummary {
  publicId: string;
  email: string;
  username: string;
  displayName: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  mfaEnabled: boolean;
  isAuthor: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface StatusHistoryEntry {
  status: string;
  timestamp: string;
  reason?: string;
}

export interface AdminUserSecurity extends UserSecurityInfo {
  statusHistory: StatusHistoryEntry[];
}

export interface AdminUserDetail extends FullUser {
  updatedAt: string;
  deletedAt: string | null;
  security: AdminUserSecurity | null;
  sessionCount: number;
}

export interface AdminUserQuery extends PaginationQuery {
  q?: string;
  role?: UserRole;
  status?: UserStatus;
  emailVerified?: boolean;
  mfaEnabled?: boolean;
  isAuthor?: boolean;
  createdFrom?: string;
  createdTo?: string;
}

export interface AdminUpdateUserRequest {
  displayName?: string;
  email?: string;
  emailVerified?: boolean;
}

export interface AdminUpdateStatusRequest {
  status: UserStatus;
  reason?: string;
}

export interface AdminUpdateRoleRequest {
  role: UserRole;
}

export interface ImpersonationData {
  token: string;
  impersonationId: string;
  expiresAt: string;
  targetUser: {
    publicId: string;
    username: string;
    displayName: string;
    role: UserRole;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Response Types
// ─────────────────────────────────────────────────────────────────────────────

export type GetMeResponse = SuccessResponse<{ user: FullUser }>;
export type UpdateUserResponse = SuccessResponse<{ user: FullUser }>;
export type UpdateProfileResponse = SuccessResponse<{ profile: UserProfile }>;
export type AvatarUploadResponse = SuccessResponse<{ avatarUrl: string }>;
export type GetPreferencesResponse = SuccessResponse<{ preferences: UserPreferences }>;
export type UpdatePreferencesResponse = SuccessResponse<{ preferences: UserPreferences }>;
export type GetSecurityResponse = SuccessResponse<{ security: UserSecurityInfo }>;
export type UpdateSecurityResponse = SuccessResponse<{ security: UserSecurityInfo }>;
export type LoginHistoryResponse = SuccessResponse<{ sessions: LoginHistoryEntry[] }>;
export type GetPublicUserResponse = SuccessResponse<{ user: PublicUserProfile }>;
export type AdminUserListResponse = PaginatedResponse<AdminUserSummary>;
export type GetAdminUserResponse = SuccessResponse<{ user: AdminUserDetail }>;
export type ImpersonateResponse = SuccessResponse<ImpersonationData>;