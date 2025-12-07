/**
 * User Preferences Repository
 */
import type { UserPreferences } from '@prisma/client';
import type { UpdatePreferencesInput } from '../types/user.types';
export declare const userPreferencesRepository: {
    findByUserId(userId: bigint): Promise<UserPreferences | null>;
    update(userId: bigint, input: UpdatePreferencesInput): Promise<UserPreferences>;
    ensureExists(userId: bigint): Promise<UserPreferences>;
};
export type UserPreferencesRepository = typeof userPreferencesRepository;
//# sourceMappingURL=user-preferences.repository.d.ts.map