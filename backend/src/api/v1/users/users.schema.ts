/**
 * Base Schema Definitions
 */

import { Type } from '@sinclair/typebox';
import { REGEX } from '@/common/constants/app.constants';

// Primitives
export const CuidSchema = Type.String({ pattern: '^c[a-z0-9]{24}$' });
export const UsernameSchema = Type.String({
  minLength: 3,
  maxLength: 30,
  pattern: REGEX.USERNAME.source,
});
export const DisplayNameSchema = Type.String({ minLength: 1, maxLength: 100 });
export const EmailSchema = Type.String({ format: 'email', minLength: 3, maxLength: 255 });
export const DateTimeSchema = Type.String({ format: 'date-time' });

// Nullable types
export const NullableDateTimeSchema = Type.Union([DateTimeSchema, Type.Null()]);
export const NullableStringSchema = Type.Union([Type.String(), Type.Null()]);




/**
 * Enum Schema Definitions
 */


export const UserRoleSchema = Type.Union([
  Type.Literal('READER'),
  Type.Literal('AUTHOR'),
  Type.Literal('COLLABORATOR'),
  Type.Literal('MODERATOR'),
  Type.Literal('ADMIN'),
  Type.Literal('SUPER_ADMIN'),
]);

export const UserStatusSchema = Type.Union([
  Type.Literal('PENDING_VERIFICATION'),
  Type.Literal('ACTIVE'),
  Type.Literal('SUSPENDED'),
  Type.Literal('BANNED'),
  Type.Literal('DELETED'),
  Type.Literal('DEACTIVATED'),
]);

export const DataRegionSchema = Type.Union([
  Type.Literal('INDIA'),
  Type.Literal('SOUTHEAST_ASIA'),
  Type.Literal('EUROPE'),
  Type.Literal('NORTH_AMERICA'),
  Type.Literal('SOUTH_AMERICA'),
  Type.Literal('AUSTRALIA'),
  Type.Literal('JAPAN'),
]);

export const EmailDigestFrequencySchema = Type.Union([
  Type.Literal('INSTANT'),
  Type.Literal('HOURLY'),
  Type.Literal('DAILY'),
  Type.Literal('WEEKLY'),
  Type.Literal('NEVER'),
]);

export const ContentRatingSchema = Type.Union([
  Type.Literal('EVERYONE'),
  Type.Literal('TEEN'),
  Type.Literal('MATURE'),
  Type.Literal('ADULT_ONLY'),
]);




export const UserProfileSchema = Type.Object({
  avatarUrl: NullableStringSchema,
  bio: NullableStringSchema,
  locale: Type.String(),
  timezone: Type.String(),
  dataRegion: DataRegionSchema,
  websiteUrl: NullableStringSchema,
  twitterHandle: NullableStringSchema,
  instagramHandle: NullableStringSchema,
  tiktokHandle: NullableStringSchema,
  discordHandle: NullableStringSchema,
});

export const UserPreferencesSchema = Type.Object({
  emailNotifications: Type.Boolean(),
  pushNotifications: Type.Boolean(),
  emailDigestFrequency: EmailDigestFrequencySchema,
  contentLanguages: Type.Array(Type.String()),
  contentRatings: Type.Array(ContentRatingSchema),
  hiddenGenres: Type.Array(Type.String()),
  hiddenTags: Type.Array(Type.String()),
  showOnlineStatus: Type.Boolean(),
  showReadingActivity: Type.Boolean(),
  allowDirectMessages: Type.Boolean(),
  marketingEmails: Type.Boolean(),
  newsletterOptIn: Type.Boolean(),
});

export const UserSecurityInfoSchema = Type.Object({
  mfaEnabled: Type.Boolean(),
  lastLoginAt: NullableDateTimeSchema,
  lastLoginIp: NullableStringSchema,
  lastLoginUserAgent: NullableStringSchema,
  failedLoginCount: Type.Integer(),
  lockedUntil: NullableDateTimeSchema,
  passwordChangedAt: NullableDateTimeSchema,
  emailVerifiedAt: NullableDateTimeSchema,
});

export const ReaderProfileSchema = Type.Object({
  preferredGenres: Type.Array(Type.String()),
  totalSeriesRead: Type.Integer(),
  totalChaptersRead: Type.Integer(),
  totalReadTimeHours: Type.Number(),
  totalWordsRead: Type.Integer(),
  activeSubscriptions: Type.Integer(),
  lifetimeSpent: Type.Integer(),
  lifetimeCurrency: Type.String(),
});

export const AuthorAccountSummarySchema = Type.Object({
  penName: NullableStringSchema,
  tagline: NullableStringSchema,
  isVerified: Type.Boolean(),
  platformTier: Type.String(),
  seriesCount: Type.Integer(),
  activeSubscriberCount: Type.Integer(),
});

export const LoginHistoryEntrySchema = Type.Object({
  id: Type.String(),
  ipAddress: NullableStringSchema,
  userAgent: NullableStringSchema,
  deviceType: Type.String(),
  deviceOs: NullableStringSchema,
  browser: NullableStringSchema,
  country: NullableStringSchema,
  city: NullableStringSchema,
  lastActiveAt: DateTimeSchema,
  createdAt: DateTimeSchema,
  isCurrent: Type.Boolean(),
});

export const StatusHistoryEntrySchema = Type.Object({
  status: Type.String(),
  timestamp: Type.String(),
  reason: Type.Optional(Type.String()),
});