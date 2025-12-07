// ==== FILE: src/lib/validation/user.schema.ts ====
/**
 * User Validation Schemas
 */

import { z } from 'zod';
import { REGEX } from '@/lib/constants/config';

// ─────────────────────────────────────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────────────────────────────────────

export const dataRegionSchema = z.enum([
  'INDIA',
  'SOUTHEAST_ASIA',
  'EUROPE',
  'NORTH_AMERICA',
  'SOUTH_AMERICA',
  'AUSTRALIA',
  'JAPAN',
]);

export const emailDigestFrequencySchema = z.enum(['INSTANT', 'HOURLY', 'DAILY', 'WEEKLY', 'NEVER']);

export const contentRatingSchema = z.enum(['EVERYONE', 'TEEN', 'MATURE', 'ADULT_ONLY']);

// ─────────────────────────────────────────────────────────────────────────────
// Shared Fields
// ─────────────────────────────────────────────────────────────────────────────

const nullableUrl = z.string().url().max(2048).nullable().optional().or(z.literal(''));

const nullableSocialHandle = (maxLength: number) =>
  z.string().max(maxLength).regex(REGEX.socialHandle).nullable().optional().or(z.literal(''));

// ─────────────────────────────────────────────────────────────────────────────
// User & Profile Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const updateUserSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  username: z.string().min(3).max(30).regex(REGEX.username).optional(),
});

export const updateProfileSchema = z.object({
  bio: z.string().max(2000).nullable().optional(),
  locale: z.string().length(2).optional(),
  timezone: z.string().max(50).optional(),
  dataRegion: dataRegionSchema.optional(),
  websiteUrl: nullableUrl,
  twitterHandle: nullableSocialHandle(15),
  instagramHandle: nullableSocialHandle(30),
  tiktokHandle: nullableSocialHandle(24),
  discordHandle: z.string().max(50).nullable().optional().or(z.literal('')),
});

// ─────────────────────────────────────────────────────────────────────────────
// Preferences Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const notificationPreferencesSchema = z.object({
  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
  emailDigestFrequency: emailDigestFrequencySchema.optional(),
  marketingEmails: z.boolean().optional(),
  newsletterOptIn: z.boolean().optional(),
});

export const privacyPreferencesSchema = z.object({
  showOnlineStatus: z.boolean().optional(),
  showReadingActivity: z.boolean().optional(),
  allowDirectMessages: z.boolean().optional(),
});

export const contentPreferencesSchema = z.object({
  contentLanguages: z.array(z.string()).optional(),
  contentRatings: z.array(contentRatingSchema).optional(),
  hiddenGenres: z.array(z.string()).optional(),
  hiddenTags: z.array(z.string()).optional(),
});

export const updatePreferencesSchema = notificationPreferencesSchema
  .merge(privacyPreferencesSchema)
  .merge(contentPreferencesSchema);

// ─────────────────────────────────────────────────────────────────────────────
// Account Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const deleteAccountSchema = z.object({
  confirmation: z.string().refine((v) => v === 'DELETE', 'Type DELETE to confirm'),
  password: z.string().min(1, 'Password is required'),
});

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type NotificationPreferencesFormData = z.infer<typeof notificationPreferencesSchema>;
export type PrivacyPreferencesFormData = z.infer<typeof privacyPreferencesSchema>;
export type ContentPreferencesFormData = z.infer<typeof contentPreferencesSchema>;
export type UpdatePreferencesFormData = z.infer<typeof updatePreferencesSchema>;
export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;