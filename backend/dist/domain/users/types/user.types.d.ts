/**
 * User Domain Types
 */
import type { User, UserProfile, UserPreferences, UserSecurity, ReaderProfile, AuthorAccount, UserRole, UserStatus, DataRegion, EmailDigestFrequency, ContentRating, DeviceType } from '@prisma/client';
export type { UserRole, UserStatus, DataRegion, EmailDigestFrequency, ContentRating };
export type UserWithRelations = User & {
    profile?: UserProfile | null;
    preferences?: UserPreferences | null;
    security?: UserSecurity | null;
    readerProfile?: ReaderProfile | null;
    authorAccount?: AuthorAccount | null;
};
export type UserWithSecurity = User & {
    security: UserSecurity | null;
};
export type UserWithProfile = User & {
    profile: UserProfile | null;
};
export interface CreateUserInput {
    email: string;
    username: string;
    displayName: string;
    passwordHash?: string;
    role?: UserRole;
    status?: UserStatus;
    emailVerified?: boolean;
}
export interface UpdateUserInput {
    email?: string;
    username?: string;
    displayName?: string;
    passwordHash?: string;
    role?: UserRole;
    status?: UserStatus;
    emailVerified?: boolean;
}
export interface UpdateProfileInput {
    bio?: string | null;
    locale?: string;
    timezone?: string;
    dataRegion?: DataRegion;
    websiteUrl?: string | null;
    twitterHandle?: string | null;
    instagramHandle?: string | null;
    tiktokHandle?: string | null;
    discordHandle?: string | null;
    avatarUrl?: string | null;
}
export interface UpdatePreferencesInput {
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    emailDigestFrequency?: EmailDigestFrequency;
    contentLanguages?: string[];
    contentRatings?: ContentRating[];
    hiddenGenres?: string[];
    hiddenTags?: string[];
    showOnlineStatus?: boolean;
    showReadingActivity?: boolean;
    allowDirectMessages?: boolean;
    marketingEmails?: boolean;
    newsletterOptIn?: boolean;
}
export interface UpdateLoginInfoInput {
    lastLoginAt: Date;
    lastLoginIp: string | null;
    lastLoginUserAgent: string | null;
    lastLoginDeviceId?: string | null;
}
export interface UpdateSecuritySettingsInput {
    requirePasswordForSensitiveActions?: boolean;
    loginNotifications?: boolean;
    trustedDevicesEnabled?: boolean;
}
export interface FindUsersOptions {
    page?: number;
    limit?: number;
    role?: UserRole;
    status?: UserStatus;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface StatusHistoryEntry {
    status: string;
    timestamp: string;
    reason?: string;
}
export interface UserDTO {
    publicId: string;
    email: string;
    emailVerified: boolean;
    username: string;
    displayName: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
}
export interface UserProfileDTO {
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
export interface UserPreferencesDTO {
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
export interface UserSecurityDTO {
    mfaEnabled: boolean;
    lastLoginAt: string | null;
    lastLoginIp: string | null;
    lastLoginUserAgent: string | null;
    failedLoginCount: number;
    lockedUntil: string | null;
    passwordChangedAt: string | null;
    emailVerifiedAt: string | null;
}
export interface ReaderProfileDTO {
    preferredGenres: string[];
    totalSeriesRead: number;
    totalChaptersRead: number;
    totalReadTimeHours: number;
    totalWordsRead: number;
    activeSubscriptions: number;
    lifetimeSpent: number;
    lifetimeCurrency: string;
}
export interface AuthorAccountDTO {
    penName: string | null;
    tagline: string | null;
    isVerified: boolean;
    platformTier: string;
    seriesCount: number;
    activeSubscriberCount: number;
}
export interface FullUserDTO extends UserDTO {
    profile: UserProfileDTO | null;
    preferences: UserPreferencesDTO | null;
    readerProfile: ReaderProfileDTO | null;
    authorAccount: AuthorAccountDTO | null;
}
export interface PublicUserDTO {
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
export interface LoginHistoryDTO {
    id: string;
    ipAddress: string | null;
    userAgent: string | null;
    deviceType: DeviceType;
    deviceOs: string | null;
    browser: string | null;
    country: string | null;
    city: string | null;
    lastActiveAt: string;
    createdAt: string;
    isCurrent: boolean;
}
export interface AdminUserSummaryDTO {
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
export interface AdminUserDetailDTO extends FullUserDTO {
    updatedAt: string;
    deletedAt: string | null;
    security: (UserSecurityDTO & {
        statusHistory: StatusHistoryEntry[];
    }) | null;
    sessionCount: number;
}
export interface ImpersonationDTO {
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
export interface AdminUserQuery extends FindUsersOptions {
    q?: string;
    emailVerified?: boolean;
    mfaEnabled?: boolean;
    isAuthor?: boolean;
    createdFrom?: Date;
    createdTo?: Date;
}
export interface ImpersonationContext {
    ipAddress: string | null;
    userAgent: string | null;
}
export interface JwtUserPayload {
    publicId: string;
    email: string;
    role: UserRole;
    sessionId?: string;
}
//# sourceMappingURL=user.types.d.ts.map