/**
 * User Preferences Service
 */

import { logger } from '@/core/logger';
import { userPreferencesRepository } from '../repositories/user-preferences.repository';
import { preferencesMapper } from '../mappers/user.mapper';
import type { UpdatePreferencesInput, UserPreferencesDTO } from '../types/user.types';

export const userPreferencesService = {
  async getPreferences(userId: bigint): Promise<UserPreferencesDTO> {
    const prefs = await userPreferencesRepository.ensureExists(userId);
    return preferencesMapper.toDTO(prefs);
  },

  async updatePreferences(
    userId: bigint,
    data: UpdatePreferencesInput,
  ): Promise<UserPreferencesDTO> {
    await userPreferencesRepository.ensureExists(userId);
    const prefs = await userPreferencesRepository.update(userId, data);

    logger.info({ userId: userId.toString() }, 'User preferences updated');
    return preferencesMapper.toDTO(prefs);
  },
};

export type UserPreferencesService = typeof userPreferencesService;