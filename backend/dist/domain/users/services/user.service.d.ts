/**
 * User Service
 */
import type { FullUserDTO } from '../types/user.types';
export interface UpdateUserData {
    displayName?: string;
    username?: string;
}
export declare const userService: {
    getCurrentUser(userId: bigint): Promise<FullUserDTO>;
    updateUser(userId: bigint, data: UpdateUserData): Promise<FullUserDTO>;
    initiateAccountDeletion(userId: bigint): Promise<void>;
    getByPublicId(publicId: string): Promise<FullUserDTO>;
    getUserIdFromPublicId(publicId: string): Promise<bigint>;
};
export type UserService = typeof userService;
//# sourceMappingURL=user.service.d.ts.map