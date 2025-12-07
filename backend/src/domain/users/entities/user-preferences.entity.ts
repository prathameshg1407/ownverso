/**
 * User Preferences Entity
 */

import type { UserPreferences, EmailDigestFrequency, ContentRating } from '@prisma/client';

export interface UserPreferencesEntity {
  readonly userId: bigint;
  readonly emailNotifications: boolean;
  readonly pushNotifications: boolean;
  readonly emailDigestFrequency: EmailDigestFrequency;
  readonly contentLanguages: string[];
  readonly contentRatings: ContentRating[];
  readonly hiddenGenres: string[];
  readonly hiddenTags: string[];
  readonly showOnlineStatus: boolean;
  readonly showReadingActivity: boolean;
  readonly allowDirectMessages: boolean;
  readonly marketingEmails: boolean;
  readonly newsletterOptIn: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export function toUserPreferencesEntity(prefs: UserPreferences): UserPreferencesEntity {
  return {
    userId: prefs.userId,
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
    createdAt: prefs.createdAt,
    updatedAt: prefs.updatedAt,
  };
}