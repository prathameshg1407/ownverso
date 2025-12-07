/**
 * Reader Profile Entity
 */

import type { ReaderProfile, ContentType } from '@prisma/client';

export interface ReaderProfileEntity {
  readonly userId: bigint;
  readonly preferredGenres: string[];
  readonly preferredContentTypes: ContentType[];
  readonly totalSeriesRead: number;
  readonly totalChaptersRead: number;
  readonly totalReadTimeHours: number;
  readonly totalWordsRead: bigint;
  readonly activeSubscriptions: number;
  readonly lifetimeSpent: bigint;
  readonly lifetimeCurrency: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export function toReaderProfileEntity(profile: ReaderProfile): ReaderProfileEntity {
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