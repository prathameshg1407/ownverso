/**
 * Reader Profile Repository
 */

import { prisma } from '@/core/database';
import type { ReaderProfile } from '@prisma/client';

interface IncrementStats {
  chaptersRead?: number;
  readTimeHours?: number;
  wordsRead?: bigint;
}

export const readerProfileRepository = {
  async findByUserId(userId: bigint): Promise<ReaderProfile | null> {
    return prisma.readerProfile.findUnique({ where: { userId } });
  },

  async ensureExists(userId: bigint): Promise<ReaderProfile> {
    return prisma.readerProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
  },

  async incrementStats(userId: bigint, stats: IncrementStats): Promise<void> {
    const updates: Record<string, { increment: number | bigint }> = {};

    if (stats.chaptersRead) {
      updates.totalChaptersRead = { increment: stats.chaptersRead };
    }
    if (stats.readTimeHours) {
      updates.totalReadTimeHours = { increment: stats.readTimeHours };
    }
    if (stats.wordsRead) {
      updates.totalWordsRead = { increment: stats.wordsRead };
    }

    if (Object.keys(updates).length > 0) {
      await prisma.readerProfile.update({ where: { userId }, data: updates });
    }
  },
};

export type ReaderProfileRepository = typeof readerProfileRepository;