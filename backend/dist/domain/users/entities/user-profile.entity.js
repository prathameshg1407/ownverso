"use strict";
/**
 * User Profile Entity
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserProfileEntity = toUserProfileEntity;
function toUserProfileEntity(profile) {
    return {
        userId: profile.userId,
        avatarUrl: profile.avatarUrl,
        bio: profile.bio,
        locale: profile.locale,
        timezone: profile.timezone,
        dataRegion: profile.dataRegion,
        websiteUrl: profile.websiteUrl,
        twitterHandle: profile.twitterHandle,
        instagramHandle: profile.instagramHandle,
        tiktokHandle: profile.tiktokHandle,
        discordHandle: profile.discordHandle,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
    };
}
//# sourceMappingURL=user-profile.entity.js.map