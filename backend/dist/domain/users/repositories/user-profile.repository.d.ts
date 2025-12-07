/**
 * User Profile Repository
 */
import type { UserProfile } from '@prisma/client';
import type { UpdateProfileInput } from '../types/user.types';
export declare const userProfileRepository: {
    findByUserId(userId: bigint): Promise<UserProfile | null>;
    update(userId: bigint, input: UpdateProfileInput): Promise<UserProfile>;
    updateAvatar(userId: bigint, avatarUrl: string | null): Promise<UserProfile>;
    ensureExists(userId: bigint): Promise<UserProfile>;
};
export type UserProfileRepository = typeof userProfileRepository;
//# sourceMappingURL=user-profile.repository.d.ts.map