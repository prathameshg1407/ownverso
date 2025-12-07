/**
 * User Profile Repository
 */

import { prisma } from '@/core/database';
import type { UserProfile } from '@prisma/client';
import type { UpdateProfileInput } from '../types/user.types';

export const userProfileRepository = {
  async findByUserId(userId: bigint): Promise<UserProfile | null> {
    return prisma.userProfile.findUnique({ where: { userId } });
  },

  async update(userId: bigint, input: UpdateProfileInput): Promise<UserProfile> {
    return prisma.userProfile.update({ where: { userId }, data: input });
  },

  async updateAvatar(userId: bigint, avatarUrl: string | null): Promise<UserProfile> {
    return prisma.userProfile.update({ where: { userId }, data: { avatarUrl } });
  },

  async ensureExists(userId: bigint): Promise<UserProfile> {
    return prisma.userProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
  },
};

export type UserProfileRepository = typeof userProfileRepository;