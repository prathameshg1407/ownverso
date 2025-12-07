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

export function toUserProfileEntity(profile: UserProfile): UserProfileEntity {
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