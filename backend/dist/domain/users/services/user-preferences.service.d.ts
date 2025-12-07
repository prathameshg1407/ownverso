/**
 * User Preferences Service
 */
import type { UpdatePreferencesInput, UserPreferencesDTO } from '../types/user.types';
export declare const userPreferencesService: {
    getPreferences(userId: bigint): Promise<UserPreferencesDTO>;
    updatePreferences(userId: bigint, data: UpdatePreferencesInput): Promise<UserPreferencesDTO>;
};
export type UserPreferencesService = typeof userPreferencesService;
//# sourceMappingURL=user-preferences.service.d.ts.map