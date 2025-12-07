/**
 * User Profile Entity
 */
import type { UserProfile, DataRegion } from '@prisma/client';
export interface UserProfileEntity {
    readonly userId: bigint;
    readonly avatarUrl: string | null;
    readonly bio: string | null;
    readonly locale: string;
    readonly timezone: string;
    readonly dataRegion: DataRegion;
    readonly websiteUrl: string | null;
    readonly twitterHandle: string | null;
    readonly instagramHandle: string | null;
    readonly tiktokHandle: string | null;
    readonly discordHandle: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export declare function toUserProfileEntity(profile: UserProfile): UserProfileEntity;
//# sourceMappingURL=user-profile.entity.d.ts.map