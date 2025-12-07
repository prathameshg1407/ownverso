/**
 * User Mappers
 */

import type {
  User,
  UserProfile,
  UserPreferences,
  UserSecurity,
  ReaderProfile,
  AuthorAccount,
  Session,
} from '@prisma/client';
import type {
  UserDTO,
  UserProfileDTO,
  UserPreferencesDTO,
  UserSecurityDTO,
  ReaderProfileDTO,
  AuthorAccountDTO,
  FullUserDTO,
  PublicUserDTO,
  AdminUserSummaryDTO,
  AdminUserDetailDTO,
  LoginHistoryDTO,
  JwtUserPayload,
  StatusHistoryEntry,
  UserWithRelations,
} from '../types/user.types';

function toISOStringOrNull(date: Date | null | undefined): string | null {
  return date?.toISOString() ?? null;
}

export const userMapper = {
  toDTO(user: User): UserDTO {
    return {
      publicId: user.publicId,
      email: user.email,
      emailVerified: user.emailVerified,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt.toISOString(),
    };
  },

  toJwtPayload(user: User, sessionId?: string): JwtUserPayload {
    return {
      publicId: user.publicId,
      email: user.email,
      role: user.role,
      sessionId,
    };
  },
};

export const profileMapper = {
  toDTO(profile: UserProfile): UserProfileDTO {
    return {
      avatarUrl: profile.avatarUrl,
      bio: profile.bio,
      locale: profile.locale,
      timezone: profile.timezone,
      dataRegion: profile.dataRegion,
      websiteUrl: profile.websiteUrl,
      twitterHandle: profile.twitterHandle,
      instagramHandle: profile.instagramHandle,
      tiktokHandle: profile.tiktokHandle,
      discordHandle: profile.discordHandle,
    };
  },
};

export const preferencesMapper = {
  toDTO(prefs: UserPreferences): UserPreferencesDTO {
    return {
      emailNotifications: prefs.emailNotifications,
      pushNotifications: prefs.pushNotifications,
      emailDigestFrequency: prefs.emailDigestFrequency,
      contentLanguages: prefs.contentLanguages,
      contentRatings: prefs.contentRatings,
      hiddenGenres: prefs.hiddenGenres,
      hiddenTags: prefs.hiddenTags,
      showOnlineStatus: prefs.showOnlineStatus,
      showReadingActivity: prefs.showReadingActivity,
      allowDirectMessages: prefs.allowDirectMessages,
      marketingEmails: prefs.marketingEmails,
      newsletterOptIn: prefs.newsletterOptIn,
    };
  },
};

export const securityMapper = {
  toDTO(security: UserSecurity): UserSecurityDTO {
    return {
      mfaEnabled: security.mfaEnabled,
      lastLoginAt: toISOStringOrNull(security.lastLoginAt),
      lastLoginIp: security.lastLoginIp,
      lastLoginUserAgent: security.lastLoginUserAgent,
      failedLoginCount: security.failedLoginCount,
      lockedUntil: toISOStringOrNull(security.lockedUntil),
      passwordChangedAt: toISOStringOrNull(security.passwordChangedAt),
      emailVerifiedAt: toISOStringOrNull(security.emailVerifiedAt),
    };
  },

  parseStatusHistory(json: unknown): StatusHistoryEntry[] {
    if (!Array.isArray(json)) return [];
    return json as StatusHistoryEntry[];
  },
};

export const readerProfileMapper = {
  toDTO(profile: ReaderProfile): ReaderProfileDTO {
    return {
      preferredGenres: profile.preferredGenres,
      totalSeriesRead: profile.totalSeriesRead,
      totalChaptersRead: profile.totalChaptersRead,
      totalReadTimeHours: profile.totalReadTimeHours,
      totalWordsRead: Number(profile.totalWordsRead),
      activeSubscriptions: profile.activeSubscriptions,
      lifetimeSpent: Number(profile.lifetimeSpent),
      lifetimeCurrency: profile.lifetimeCurrency,
    };
  },
};

export const authorAccountMapper = {
  toDTO(account: AuthorAccount): AuthorAccountDTO {
    return {
      penName: account.penName,
      tagline: account.tagline,
      isVerified: account.isVerified,
      platformTier: account.platformTier,
      seriesCount: account.seriesCount,
      activeSubscriberCount: account.activeSubscriberCount,
    };
  },
};

export const sessionMapper = {
  toLoginHistoryDTO(session: Session, currentSessionId?: string): LoginHistoryDTO {
    const sessionIdStr = session.id.toString();
    return {
      id: sessionIdStr,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      deviceType: session.deviceType,
      deviceOs: session.deviceOs,
      browser: session.browser,
      country: session.country,
      city: session.city,
      lastActiveAt: session.lastActiveAt.toISOString(),
      createdAt: session.createdAt.toISOString(),
      isCurrent: currentSessionId === sessionIdStr,
    };
  },
};

export const fullUserMapper = {
  toDTO(user: UserWithRelations): FullUserDTO {
    return {
      ...userMapper.toDTO(user),
      profile: user.profile ? profileMapper.toDTO(user.profile) : null,
      preferences: user.preferences ? preferencesMapper.toDTO(user.preferences) : null,
      readerProfile: user.readerProfile ? readerProfileMapper.toDTO(user.readerProfile) : null,
      authorAccount: user.authorAccount ? authorAccountMapper.toDTO(user.authorAccount) : null,
    };
  },
};

export const publicUserMapper = {
  toDTO(
    user: User & {
      profile?: UserProfile | null;
      preferences?: UserPreferences | null;
      authorAccount?: AuthorAccount | null;
      _count?: { series: number; followers: number };
    },
  ): PublicUserDTO {
    const showStats = user.preferences?.showReadingActivity !== false;

    return {
      publicId: user.publicId,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
      avatarUrl: user.profile?.avatarUrl ?? null,
      bio: user.profile?.bio ?? null,
      websiteUrl: user.profile?.websiteUrl ?? null,
      twitterHandle: user.profile?.twitterHandle ?? null,
      instagramHandle: user.profile?.instagramHandle ?? null,
      tiktokHandle: user.profile?.tiktokHandle ?? null,
      discordHandle: user.profile?.discordHandle ?? null,
      isVerifiedAuthor: user.authorAccount?.isVerified ?? false,
      createdAt: user.createdAt.toISOString(),
      stats:
        showStats && user._count
          ? {
              seriesCount: user._count.series,
              followerCount: user._count.followers,
            }
          : undefined,
    };
  },
};

export const adminUserMapper = {
  toSummaryDTO(
    user: User & {
      security?: { mfaEnabled: boolean; lastLoginAt: Date | null } | null;
      authorAccount?: { userId: bigint } | null;
    },
  ): AdminUserSummaryDTO {
    return {
      publicId: user.publicId,
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
      status: user.status,
      emailVerified: user.emailVerified,
      mfaEnabled: user.security?.mfaEnabled ?? false,
      isAuthor: user.authorAccount !== null,
      createdAt: user.createdAt.toISOString(),
      lastLoginAt: toISOStringOrNull(user.security?.lastLoginAt),
    };
  },

  toDetailDTO(
    user: UserWithRelations & {
      security?: UserSecurity | null;
      _count?: { sessions: number };
    },
  ): AdminUserDetailDTO {
    return {
      ...fullUserMapper.toDTO(user),
      updatedAt: user.updatedAt.toISOString(),
      deletedAt: toISOStringOrNull(user.deletedAt),
      security: user.security
        ? {
            ...securityMapper.toDTO(user.security),
            statusHistory: securityMapper.parseStatusHistory(user.security.statusHistory),
          }
        : null,
      sessionCount: user._count?.sessions ?? 0,
    };
  },
};