/**
 * User Profile Service
 */

import { logger } from '@/core/logger';
import { userProfileRepository } from '../repositories/user-profile.repository';
import { profileMapper } from '../mappers/user.mapper';
import type { UpdateProfileInput, UserProfileDTO } from '../types/user.types';

export const userProfileService = {
  async getProfile(userId: bigint): Promise<UserProfileDTO> {
    const profile = await userProfileRepository.ensureExists(userId);
    return profileMapper.toDTO(profile);
  },

  async updateProfile(userId: bigint, data: UpdateProfileInput): Promise<UserProfileDTO> {
    await userProfileRepository.ensureExists(userId);
    const profile = await userProfileRepository.update(userId, data);

    logger.info({ userId: userId.toString() }, 'User profile updated');
    return profileMapper.toDTO(profile);
  },

  async updateAvatar(userId: bigint, avatarUrl: string): Promise<{ avatarUrl: string }> {
    await userProfileRepository.ensureExists(userId);
    const profile = await userProfileRepository.updateAvatar(userId, avatarUrl);

    logger.info({ userId: userId.toString() }, 'User avatar updated');
    return { avatarUrl: profile.avatarUrl! };
  },

  async removeAvatar(userId: bigint): Promise<void> {
    await userProfileRepository.ensureExists(userId);
    await userProfileRepository.updateAvatar(userId, null);

    logger.info({ userId: userId.toString() }, 'User avatar removed');
  },
};

export type UserProfileService = typeof userProfileService;