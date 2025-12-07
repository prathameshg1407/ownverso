/**
 * User Schema Definitions
 */
export declare const FullUserSchema: import("@sinclair/typebox").TObject<{
    publicId: import("@sinclair/typebox").TString;
    email: import("@sinclair/typebox").TString;
    emailVerified: import("@sinclair/typebox").TBoolean;
    username: import("@sinclair/typebox").TString;
    displayName: import("@sinclair/typebox").TString;
    role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"READER">, import("@sinclair/typebox").TLiteral<"AUTHOR">, import("@sinclair/typebox").TLiteral<"COLLABORATOR">, import("@sinclair/typebox").TLiteral<"MODERATOR">, import("@sinclair/typebox").TLiteral<"ADMIN">, import("@sinclair/typebox").TLiteral<"SUPER_ADMIN">]>;
    status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"PENDING_VERIFICATION">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"BANNED">, import("@sinclair/typebox").TLiteral<"DELETED">, import("@sinclair/typebox").TLiteral<"DEACTIVATED">]>;
    createdAt: import("@sinclair/typebox").TString;
    profile: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        avatarUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        bio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        locale: import("@sinclair/typebox").TString;
        timezone: import("@sinclair/typebox").TString;
        dataRegion: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"INDIA">, import("@sinclair/typebox").TLiteral<"SOUTHEAST_ASIA">, import("@sinclair/typebox").TLiteral<"EUROPE">, import("@sinclair/typebox").TLiteral<"NORTH_AMERICA">, import("@sinclair/typebox").TLiteral<"SOUTH_AMERICA">, import("@sinclair/typebox").TLiteral<"AUSTRALIA">, import("@sinclair/typebox").TLiteral<"JAPAN">]>;
        websiteUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        twitterHandle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        instagramHandle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        tiktokHandle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        discordHandle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    }>, import("@sinclair/typebox").TNull]>;
    preferences: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        emailNotifications: import("@sinclair/typebox").TBoolean;
        pushNotifications: import("@sinclair/typebox").TBoolean;
        emailDigestFrequency: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"INSTANT">, import("@sinclair/typebox").TLiteral<"HOURLY">, import("@sinclair/typebox").TLiteral<"DAILY">, import("@sinclair/typebox").TLiteral<"WEEKLY">, import("@sinclair/typebox").TLiteral<"NEVER">]>;
        contentLanguages: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        contentRatings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"EVERYONE">, import("@sinclair/typebox").TLiteral<"TEEN">, import("@sinclair/typebox").TLiteral<"MATURE">, import("@sinclair/typebox").TLiteral<"ADULT_ONLY">]>>;
        hiddenGenres: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        hiddenTags: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        showOnlineStatus: import("@sinclair/typebox").TBoolean;
        showReadingActivity: import("@sinclair/typebox").TBoolean;
        allowDirectMessages: import("@sinclair/typebox").TBoolean;
        marketingEmails: import("@sinclair/typebox").TBoolean;
        newsletterOptIn: import("@sinclair/typebox").TBoolean;
    }>, import("@sinclair/typebox").TNull]>;
    readerProfile: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        preferredGenres: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        totalSeriesRead: import("@sinclair/typebox").TInteger;
        totalChaptersRead: import("@sinclair/typebox").TInteger;
        totalReadTimeHours: import("@sinclair/typebox").TNumber;
        totalWordsRead: import("@sinclair/typebox").TInteger;
        activeSubscriptions: import("@sinclair/typebox").TInteger;
        lifetimeSpent: import("@sinclair/typebox").TInteger;
        lifetimeCurrency: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TNull]>;
    authorAccount: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        penName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        isVerified: import("@sinclair/typebox").TBoolean;
        platformTier: import("@sinclair/typebox").TString;
        seriesCount: import("@sinclair/typebox").TInteger;
        activeSubscriberCount: import("@sinclair/typebox").TInteger;
    }>, import("@sinclair/typebox").TNull]>;
}>;
export declare const PublicUserProfileSchema: import("@sinclair/typebox").TObject<{
    publicId: import("@sinclair/typebox").TString;
    username: import("@sinclair/typebox").TString;
    displayName: import("@sinclair/typebox").TString;
    role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"READER">, import("@sinclair/typebox").TLiteral<"AUTHOR">, import("@sinclair/typebox").TLiteral<"COLLABORATOR">, import("@sinclair/typebox").TLiteral<"MODERATOR">, import("@sinclair/typebox").TLiteral<"ADMIN">, import("@sinclair/typebox").TLiteral<"SUPER_ADMIN">]>;
    avatarUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    bio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    websiteUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    twitterHandle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    instagramHandle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    tiktokHandle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    discordHandle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    isVerifiedAuthor: import("@sinclair/typebox").TBoolean;
    createdAt: import("@sinclair/typebox").TString;
    stats: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        seriesCount: import("@sinclair/typebox").TInteger;
        followerCount: import("@sinclair/typebox").TInteger;
    }>>;
}>;
export declare const AdminUserSummarySchema: import("@sinclair/typebox").TObject<{
    publicId: import("@sinclair/typebox").TString;
    email: import("@sinclair/typebox").TString;
    username: import("@sinclair/typebox").TString;
    displayName: import("@sinclair/typebox").TString;
    role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"READER">, import("@sinclair/typebox").TLiteral<"AUTHOR">, import("@sinclair/typebox").TLiteral<"COLLABORATOR">, import("@sinclair/typebox").TLiteral<"MODERATOR">, import("@sinclair/typebox").TLiteral<"ADMIN">, import("@sinclair/typebox").TLiteral<"SUPER_ADMIN">]>;
    status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"PENDING_VERIFICATION">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"BANNED">, import("@sinclair/typebox").TLiteral<"DELETED">, import("@sinclair/typebox").TLiteral<"DEACTIVATED">]>;
    emailVerified: import("@sinclair/typebox").TBoolean;
    mfaEnabled: import("@sinclair/typebox").TBoolean;
    isAuthor: import("@sinclair/typebox").TBoolean;
    createdAt: import("@sinclair/typebox").TString;
    lastLoginAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
}>;
export declare const AdminUserDetailSchema: import("@sinclair/typebox").TObject<{
    publicId: import("@sinclair/typebox").TString;
    email: import("@sinclair/typebox").TString;
    username: import("@sinclair/typebox").TString;
    displayName: import("@sinclair/typebox").TString;
    role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"READER">, import("@sinclair/typebox").TLiteral<"AUTHOR">, import("@sinclair/typebox").TLiteral<"COLLABORATOR">, import("@sinclair/typebox").TLiteral<"MODERATOR">, import("@sinclair/typebox").TLiteral<"ADMIN">, import("@sinclair/typebox").TLiteral<"SUPER_ADMIN">]>;
    status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"PENDING_VERIFICATION">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"BANNED">, import("@sinclair/typebox").TLiteral<"DELETED">, import("@sinclair/typebox").TLiteral<"DEACTIVATED">]>;
    emailVerified: import("@sinclair/typebox").TBoolean;
    createdAt: import("@sinclair/typebox").TString;
    updatedAt: import("@sinclair/typebox").TString;
    deletedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    profile: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        avatarUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        bio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        locale: import("@sinclair/typebox").TString;
        timezone: import("@sinclair/typebox").TString;
        dataRegion: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"INDIA">, import("@sinclair/typebox").TLiteral<"SOUTHEAST_ASIA">, import("@sinclair/typebox").TLiteral<"EUROPE">, import("@sinclair/typebox").TLiteral<"NORTH_AMERICA">, import("@sinclair/typebox").TLiteral<"SOUTH_AMERICA">, import("@sinclair/typebox").TLiteral<"AUSTRALIA">, import("@sinclair/typebox").TLiteral<"JAPAN">]>;
        websiteUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        twitterHandle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        instagramHandle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        tiktokHandle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        discordHandle: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    }>, import("@sinclair/typebox").TNull]>;
    preferences: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        emailNotifications: import("@sinclair/typebox").TBoolean;
        pushNotifications: import("@sinclair/typebox").TBoolean;
        emailDigestFrequency: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"INSTANT">, import("@sinclair/typebox").TLiteral<"HOURLY">, import("@sinclair/typebox").TLiteral<"DAILY">, import("@sinclair/typebox").TLiteral<"WEEKLY">, import("@sinclair/typebox").TLiteral<"NEVER">]>;
        contentLanguages: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        contentRatings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"EVERYONE">, import("@sinclair/typebox").TLiteral<"TEEN">, import("@sinclair/typebox").TLiteral<"MATURE">, import("@sinclair/typebox").TLiteral<"ADULT_ONLY">]>>;
        hiddenGenres: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        hiddenTags: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        showOnlineStatus: import("@sinclair/typebox").TBoolean;
        showReadingActivity: import("@sinclair/typebox").TBoolean;
        allowDirectMessages: import("@sinclair/typebox").TBoolean;
        marketingEmails: import("@sinclair/typebox").TBoolean;
        newsletterOptIn: import("@sinclair/typebox").TBoolean;
    }>, import("@sinclair/typebox").TNull]>;
    security: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        mfaEnabled: import("@sinclair/typebox").TBoolean;
        lastLoginAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        lastLoginIp: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        lastLoginUserAgent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        failedLoginCount: import("@sinclair/typebox").TInteger;
        lockedUntil: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        passwordChangedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        emailVerifiedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    }>, import("@sinclair/typebox").TObject<{
        statusHistory: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            status: import("@sinclair/typebox").TString;
            timestamp: import("@sinclair/typebox").TString;
            reason: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>;
    }>]>, import("@sinclair/typebox").TNull]>;
    readerProfile: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        preferredGenres: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        totalSeriesRead: import("@sinclair/typebox").TInteger;
        totalChaptersRead: import("@sinclair/typebox").TInteger;
        totalReadTimeHours: import("@sinclair/typebox").TNumber;
        totalWordsRead: import("@sinclair/typebox").TInteger;
        activeSubscriptions: import("@sinclair/typebox").TInteger;
        lifetimeSpent: import("@sinclair/typebox").TInteger;
        lifetimeCurrency: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TNull]>;
    authorAccount: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        penName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        isVerified: import("@sinclair/typebox").TBoolean;
        platformTier: import("@sinclair/typebox").TString;
        seriesCount: import("@sinclair/typebox").TInteger;
        activeSubscriberCount: import("@sinclair/typebox").TInteger;
    }>, import("@sinclair/typebox").TNull]>;
    sessionCount: import("@sinclair/typebox").TInteger;
}>;
//# sourceMappingURL=user.schema.d.ts.map