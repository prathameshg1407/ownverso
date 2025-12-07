/**
 * Public User Service
 */
import type { PublicUserDTO } from '../types/user.types';
export declare const publicUserService: {
    getByUsername(username: string): Promise<PublicUserDTO>;
    getByPublicId(publicId: string): Promise<PublicUserDTO>;
};
export type PublicUserService = typeof publicUserService;
//# sourceMappingURL=public-user.service.d.ts.map