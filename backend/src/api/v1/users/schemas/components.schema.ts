/**
 * Component Schema Definitions
 */

import { Type } from '@sinclair/typebox';
import { NullableStringSchema, NullableDateTimeSchema, DateTimeSchema } from './base.schema';
import {
  DataRegionSchema,
  EmailDigestFrequencySchema,
  ContentRatingSchema,
} from './enums.schema';

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