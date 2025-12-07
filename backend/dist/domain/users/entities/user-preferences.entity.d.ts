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
export declare function toUserPreferencesEntity(prefs: UserPreferences): UserPreferencesEntity;
//# sourceMappingURL=user-preferences.entity.d.ts.map