"use strict";
/**
 * Reader Profile Entity
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toReaderProfileEntity = toReaderProfileEntity;
function toReaderProfileEntity(profile) {
    return {
        userId: profile.userId,
        preferredGenres: profile.preferredGenres,
        preferredContentTypes: profile.preferredContentTypes,
        totalSeriesRead: profile.totalSeriesRead,
        totalChaptersRead: profile.totalChaptersRead,
        totalReadTimeHours: profile.totalReadTimeHours,
        totalWordsRead: profile.totalWordsRead,
        activeSubscriptions: profile.activeSubscriptions,
        lifetimeSpent: profile.lifetimeSpent,
        lifetimeCurrency: profile.lifetimeCurrency,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
    };
}
//# sourceMappingURL=reader-profile.entity.js.map