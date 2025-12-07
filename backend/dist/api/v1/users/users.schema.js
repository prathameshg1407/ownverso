"use strict";
/**
 * Base Schema Definitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusHistoryEntrySchema = exports.LoginHistoryEntrySchema = exports.AuthorAccountSummarySchema = exports.ReaderProfileSchema = exports.UserSecurityInfoSchema = exports.UserPreferencesSchema = exports.UserProfileSchema = exports.ContentRatingSchema = exports.EmailDigestFrequencySchema = exports.DataRegionSchema = exports.UserStatusSchema = exports.UserRoleSchema = exports.NullableStringSchema = exports.NullableDateTimeSchema = exports.DateTimeSchema = exports.EmailSchema = exports.DisplayNameSchema = exports.UsernameSchema = exports.CuidSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const app_constants_1 = require("../../../common/constants/app.constants");
// Primitives
exports.CuidSchema = typebox_1.Type.String({ pattern: '^c[a-z0-9]{24}$' });
exports.UsernameSchema = typebox_1.Type.String({
    minLength: 3,
    maxLength: 30,
    pattern: app_constants_1.REGEX.USERNAME.source,
});
exports.DisplayNameSchema = typebox_1.Type.String({ minLength: 1, maxLength: 100 });
exports.EmailSchema = typebox_1.Type.String({ format: 'email', minLength: 3, maxLength: 255 });
exports.DateTimeSchema = typebox_1.Type.String({ format: 'date-time' });
// Nullable types
exports.NullableDateTimeSchema = typebox_1.Type.Union([exports.DateTimeSchema, typebox_1.Type.Null()]);
exports.NullableStringSchema = typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]);
/**
 * Enum Schema Definitions
 */
exports.UserRoleSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('READER'),
    typebox_1.Type.Literal('AUTHOR'),
    typebox_1.Type.Literal('COLLABORATOR'),
    typebox_1.Type.Literal('MODERATOR'),
    typebox_1.Type.Literal('ADMIN'),
    typebox_1.Type.Literal('SUPER_ADMIN'),
]);
exports.UserStatusSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('PENDING_VERIFICATION'),
    typebox_1.Type.Literal('ACTIVE'),
    typebox_1.Type.Literal('SUSPENDED'),
    typebox_1.Type.Literal('BANNED'),
    typebox_1.Type.Literal('DELETED'),
    typebox_1.Type.Literal('DEACTIVATED'),
]);
exports.DataRegionSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('INDIA'),
    typebox_1.Type.Literal('SOUTHEAST_ASIA'),
    typebox_1.Type.Literal('EUROPE'),
    typebox_1.Type.Literal('NORTH_AMERICA'),
    typebox_1.Type.Literal('SOUTH_AMERICA'),
    typebox_1.Type.Literal('AUSTRALIA'),
    typebox_1.Type.Literal('JAPAN'),
]);
exports.EmailDigestFrequencySchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('INSTANT'),
    typebox_1.Type.Literal('HOURLY'),
    typebox_1.Type.Literal('DAILY'),
    typebox_1.Type.Literal('WEEKLY'),
    typebox_1.Type.Literal('NEVER'),
]);
exports.ContentRatingSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('EVERYONE'),
    typebox_1.Type.Literal('TEEN'),
    typebox_1.Type.Literal('MATURE'),
    typebox_1.Type.Literal('ADULT_ONLY'),
]);
exports.UserProfileSchema = typebox_1.Type.Object({
    avatarUrl: exports.NullableStringSchema,
    bio: exports.NullableStringSchema,
    locale: typebox_1.Type.String(),
    timezone: typebox_1.Type.String(),
    dataRegion: exports.DataRegionSchema,
    websiteUrl: exports.NullableStringSchema,
    twitterHandle: exports.NullableStringSchema,
    instagramHandle: exports.NullableStringSchema,
    tiktokHandle: exports.NullableStringSchema,
    discordHandle: exports.NullableStringSchema,
});
exports.UserPreferencesSchema = typebox_1.Type.Object({
    emailNotifications: typebox_1.Type.Boolean(),
    pushNotifications: typebox_1.Type.Boolean(),
    emailDigestFrequency: exports.EmailDigestFrequencySchema,
    contentLanguages: typebox_1.Type.Array(typebox_1.Type.String()),
    contentRatings: typebox_1.Type.Array(exports.ContentRatingSchema),
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
    lastLoginAt: exports.NullableDateTimeSchema,
    lastLoginIp: exports.NullableStringSchema,
    lastLoginUserAgent: exports.NullableStringSchema,
    failedLoginCount: typebox_1.Type.Integer(),
    lockedUntil: exports.NullableDateTimeSchema,
    passwordChangedAt: exports.NullableDateTimeSchema,
    emailVerifiedAt: exports.NullableDateTimeSchema,
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
    penName: exports.NullableStringSchema,
    tagline: exports.NullableStringSchema,
    isVerified: typebox_1.Type.Boolean(),
    platformTier: typebox_1.Type.String(),
    seriesCount: typebox_1.Type.Integer(),
    activeSubscriberCount: typebox_1.Type.Integer(),
});
exports.LoginHistoryEntrySchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    ipAddress: exports.NullableStringSchema,
    userAgent: exports.NullableStringSchema,
    deviceType: typebox_1.Type.String(),
    deviceOs: exports.NullableStringSchema,
    browser: exports.NullableStringSchema,
    country: exports.NullableStringSchema,
    city: exports.NullableStringSchema,
    lastActiveAt: exports.DateTimeSchema,
    createdAt: exports.DateTimeSchema,
    isCurrent: typebox_1.Type.Boolean(),
});
exports.StatusHistoryEntrySchema = typebox_1.Type.Object({
    status: typebox_1.Type.String(),
    timestamp: typebox_1.Type.String(),
    reason: typebox_1.Type.Optional(typebox_1.Type.String()),
});
//# sourceMappingURL=users.schema.js.map