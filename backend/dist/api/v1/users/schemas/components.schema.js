"use strict";
/**
 * Component Schema Definitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusHistoryEntrySchema = exports.LoginHistoryEntrySchema = exports.AuthorAccountSummarySchema = exports.ReaderProfileSchema = exports.UserSecurityInfoSchema = exports.UserPreferencesSchema = exports.UserProfileSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const base_schema_1 = require("./base.schema");
const enums_schema_1 = require("./enums.schema");
exports.UserProfileSchema = typebox_1.Type.Object({
    avatarUrl: base_schema_1.NullableStringSchema,
    bio: base_schema_1.NullableStringSchema,
    locale: typebox_1.Type.String(),
    timezone: typebox_1.Type.String(),
    dataRegion: enums_schema_1.DataRegionSchema,
    websiteUrl: base_schema_1.NullableStringSchema,
    twitterHandle: base_schema_1.NullableStringSchema,
    instagramHandle: base_schema_1.NullableStringSchema,
    tiktokHandle: base_schema_1.NullableStringSchema,
    discordHandle: base_schema_1.NullableStringSchema,
});
exports.UserPreferencesSchema = typebox_1.Type.Object({
    emailNotifications: typebox_1.Type.Boolean(),
    pushNotifications: typebox_1.Type.Boolean(),
    emailDigestFrequency: enums_schema_1.EmailDigestFrequencySchema,
    contentLanguages: typebox_1.Type.Array(typebox_1.Type.String()),
    contentRatings: typebox_1.Type.Array(enums_schema_1.ContentRatingSchema),
    hiddenGenres: typebox_1.Type.Array(typebox_1.Type.String()),
    hiddenTags: typebox_1.Type.Array(typebox_1.Type.String()),
    showOnlineStatus: typebox_1.Type.Boolean(),
    showReadingActivity: typebox_1.Type.Boolean(),
    allowDirectMessages: typebox_1.Type.Boolean(),
    marketingEmails: typebox_1.Type.Boolean(),
    newsletterOptIn: typebox_1.Type.Boolean(),
});
exports.UserSecurityInfoSchema = typebox_1.Type.Object({
    mfaEnabled: typebox_1.Type.Boolean(),
    lastLoginAt: base_schema_1.NullableDateTimeSchema,
    lastLoginIp: base_schema_1.NullableStringSchema,
    lastLoginUserAgent: base_schema_1.NullableStringSchema,
    failedLoginCount: typebox_1.Type.Integer(),
    lockedUntil: base_schema_1.NullableDateTimeSchema,
    passwordChangedAt: base_schema_1.NullableDateTimeSchema,
    emailVerifiedAt: base_schema_1.NullableDateTimeSchema,
});
exports.ReaderProfileSchema = typebox_1.Type.Object({
    preferredGenres: typebox_1.Type.Array(typebox_1.Type.String()),
    totalSeriesRead: typebox_1.Type.Integer(),
    totalChaptersRead: typebox_1.Type.Integer(),
    totalReadTimeHours: typebox_1.Type.Number(),
    totalWordsRead: typebox_1.Type.Integer(),
    activeSubscriptions: typebox_1.Type.Integer(),
    lifetimeSpent: typebox_1.Type.Integer(),
    lifetimeCurrency: typebox_1.Type.String(),
});
exports.AuthorAccountSummarySchema = typebox_1.Type.Object({
    penName: base_schema_1.NullableStringSchema,
    tagline: base_schema_1.NullableStringSchema,
    isVerified: typebox_1.Type.Boolean(),
    platformTier: typebox_1.Type.String(),
    seriesCount: typebox_1.Type.Integer(),
    activeSubscriberCount: typebox_1.Type.Integer(),
});
exports.LoginHistoryEntrySchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    ipAddress: base_schema_1.NullableStringSchema,
    userAgent: base_schema_1.NullableStringSchema,
    deviceType: typebox_1.Type.String(),
    deviceOs: base_schema_1.NullableStringSchema,
    browser: base_schema_1.NullableStringSchema,
    country: base_schema_1.NullableStringSchema,
    city: base_schema_1.NullableStringSchema,
    lastActiveAt: base_schema_1.DateTimeSchema,
    createdAt: base_schema_1.DateTimeSchema,
    isCurrent: typebox_1.Type.Boolean(),
});
exports.StatusHistoryEntrySchema = typebox_1.Type.Object({
    status: typebox_1.Type.String(),
    timestamp: typebox_1.Type.String(),
    reason: typebox_1.Type.Optional(typebox_1.Type.String()),
});
//# sourceMappingURL=components.schema.js.map