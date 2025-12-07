/**
 * User Security Service
 */
import type { UserSecurityDTO, LoginHistoryDTO, UpdateSecuritySettingsInput } from '../types/user.types';
export declare const userSecurityService: {
    getSecurityInfo(userId: bigint): Promise<UserSecurityDTO>;
    getLoginHistory(userId: bigint, currentSessionId?: string): Promise<LoginHistoryDTO[]>;
    updateSecuritySettings(userId: bigint, input: UpdateSecuritySettingsInput): Promise<UserSecurityDTO>;
    forceLogoutAll(userId: bigint): Promise<number>;
    invalidateSecurityCache(userId: bigint): Promise<void>;
    invalidateSessionsCache(userId: bigint): Promise<void>;
};
export type UserSecurityService = typeof userSecurityService;
//# sourceMappingURL=user-security.service.d.ts.map