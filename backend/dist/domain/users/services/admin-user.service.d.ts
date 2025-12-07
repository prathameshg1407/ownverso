/**
 * Admin User Service
 */
import { UserRole, UserStatus } from '@prisma/client';
import type { AdminUserQuery, AdminUserSummaryDTO, AdminUserDetailDTO, ImpersonationDTO, ImpersonationContext } from '../types/user.types';
export declare const adminUserService: {
    listUsers(query: AdminUserQuery): Promise<{
        users: AdminUserSummaryDTO[];
        total: number;
    }>;
    getUserDetail(publicId: string): Promise<AdminUserDetailDTO>;
    updateUserStatus(adminUserId: bigint, targetPublicId: string, status: UserStatus, reason?: string): Promise<AdminUserDetailDTO>;
    updateUserRole(adminUserId: bigint, targetPublicId: string, role: UserRole): Promise<AdminUserDetailDTO>;
    impersonateUser(adminUserId: bigint, targetPublicId: string, context: ImpersonationContext): Promise<ImpersonationDTO>;
    revokeImpersonation(impersonationId: string): Promise<void>;
    updateUser(adminUserId: bigint, targetPublicId: string, data: {
        displayName?: string;
        email?: string;
        emailVerified?: boolean;
    }): Promise<AdminUserDetailDTO>;
};
export type AdminUserService = typeof adminUserService;
//# sourceMappingURL=admin-user.service.d.ts.map