"use strict";
/**
 * User Mappers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUserMapper = exports.publicUserMapper = exports.fullUserMapper = exports.sessionMapper = exports.authorAccountMapper = exports.readerProfileMapper = exports.securityMapper = exports.preferencesMapper = exports.profileMapper = exports.userMapper = void 0;
function toISOStringOrNull(date) {
    return date?.toISOString() ?? null;
}
exports.userMapper = {
    toDTO(user) {
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
    toJwtPayload(user, sessionId) {
        return {
            publicId: user.publicId,
            email: user.email,
            role: user.role,
            sessionId,
        };
    },
};
exports.profileMapper = {
    toDTO(profile) {
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
exports.preferencesMapper = {
    toDTO(prefs) {
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
exports.securityMapper = {
    toDTO(security) {
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
    parseStatusHistory(json) {
        if (!Array.isArray(json))
            return [];
        return json;
    },
};
exports.readerProfileMapper = {
    toDTO(profile) {
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
exports.authorAccountMapper = {
    toDTO(account) {
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
exports.sessionMapper = {
    toLoginHistoryDTO(session, currentSessionId) {
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
exports.fullUserMapper = {
    toDTO(user) {
        return {
            ...exports.userMapper.toDTO(user),
            profile: user.profile ? exports.profileMapper.toDTO(user.profile) : null,
            preferences: user.preferences ? exports.preferencesMapper.toDTO(user.preferences) : null,
            readerProfile: user.readerProfile ? exports.readerProfileMapper.toDTO(user.readerProfile) : null,
            authorAccount: user.authorAccount ? exports.authorAccountMapper.toDTO(user.authorAccount) : null,
        };
    },
};
exports.publicUserMapper = {
    toDTO(user) {
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
            stats: showStats && user._count
                ? {
                    seriesCount: user._count.series,
                    followerCount: user._count.followers,
                }
                : undefined,
        };
    },
};
exports.adminUserMapper = {
    toSummaryDTO(user) {
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
    toDetailDTO(user) {
        return {
            ...exports.fullUserMapper.toDTO(user),
            updatedAt: user.updatedAt.toISOString(),
            deletedAt: toISOStringOrNull(user.deletedAt),
            security: user.security
                ? {
                    ...exports.securityMapper.toDTO(user.security),
                    statusHistory: exports.securityMapper.parseStatusHistory(user.security.statusHistory),
                }
                : null,
            sessionCount: user._count?.sessions ?? 0,
        };
    },
};
//# sourceMappingURL=user.mapper.js.map