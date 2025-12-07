/**
 * Component Schema Definitions
 */
export declare const UserProfileSchema: import("@sinclair/typebox").TObject<{
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
}>;
export declare const UserPreferencesSchema: import("@sinclair/typebox").TObject<{
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
}>;
export declare const UserSecurityInfoSchema: import("@sinclair/typebox").TObject<{
    mfaEnabled: import("@sinclair/typebox").TBoolean;
    lastLoginAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    lastLoginIp: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    lastLoginUserAgent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    failedLoginCount: import("@sinclair/typebox").TInteger;
    lockedUntil: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    passwordChangedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    emailVerifiedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
}>;
export declare const ReaderProfileSchema: import("@sinclair/typebox").TObject<{
    preferredGenres: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    totalSeriesRead: import("@sinclair/typebox").TInteger;
    totalChaptersRead: import("@sinclair/typebox").TInteger;
    totalReadTimeHours: import("@sinclair/typebox").TNumber;
    totalWordsRead: import("@sinclair/typebox").TInteger;
    activeSubscriptions: import("@sinclair/typebox").TInteger;
    lifetimeSpent: import("@sinclair/typebox").TInteger;
    lifetimeCurrency: import("@sinclair/typebox").TString;
}>;
export declare const AuthorAccountSummarySchema: import("@sinclair/typebox").TObject<{
    penName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    tagline: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    isVerified: import("@sinclair/typebox").TBoolean;
    platformTier: import("@sinclair/typebox").TString;
    seriesCount: import("@sinclair/typebox").TInteger;
    activeSubscriberCount: import("@sinclair/typebox").TInteger;
}>;
export declare const LoginHistoryEntrySchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    ipAddress: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    userAgent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    deviceType: import("@sinclair/typebox").TString;
    deviceOs: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    browser: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    country: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    city: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    lastActiveAt: import("@sinclair/typebox").TString;
    createdAt: import("@sinclair/typebox").TString;
    isCurrent: import("@sinclair/typebox").TBoolean;
}>;
export declare const StatusHistoryEntrySchema: import("@sinclair/typebox").TObject<{
    status: import("@sinclair/typebox").TString;
    timestamp: import("@sinclair/typebox").TString;
    reason: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
//# sourceMappingURL=components.schema.d.ts.map