"use strict";
/**
 * User Preferences Entity
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserPreferencesEntity = toUserPreferencesEntity;
function toUserPreferencesEntity(prefs) {
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
//# sourceMappingURL=user-preferences.entity.js.map