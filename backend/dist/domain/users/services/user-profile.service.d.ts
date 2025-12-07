/**
 * User Profile Service
 */
import type { UpdateProfileInput, UserProfileDTO } from '../types/user.types';
export declare const userProfileService: {
    getProfile(userId: bigint): Promise<UserProfileDTO>;
    updateProfile(userId: bigint, data: UpdateProfileInput): Promise<UserProfileDTO>;
    updateAvatar(userId: bigint, avatarUrl: string): Promise<{
        avatarUrl: string;
    }>;
    removeAvatar(userId: bigint): Promise<void>;
};
export type UserProfileService = typeof userProfileService;
//# sourceMappingURL=user-profile.service.d.ts.map