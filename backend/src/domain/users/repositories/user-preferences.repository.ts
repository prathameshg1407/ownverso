/**
 * User Preferences Repository
 */

import { prisma } from '@/core/database';
import type { UserPreferences } from '@prisma/client';
import type { UpdatePreferencesInput } from '../types/user.types';

export const userPreferencesRepository = {
  async findByUserId(userId: bigint): Promise<UserPreferences | null> {
    return prisma.userPreferences.findUnique({ where: { userId } });
  },

  async update(userId: bigint, input: UpdatePreferencesInput): Promise<UserPreferences> {
    return prisma.userPreferences.update({ where: { userId }, data: input });
  },

  async ensureExists(userId: bigint): Promise<UserPreferences> {
    return prisma.userPreferences.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
  },
};

export type UserPreferencesRepository = typeof userPreferencesRepository;