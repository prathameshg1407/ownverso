/**
 * User Security Repository
 */
import type { UserSecurity } from '@prisma/client';
import type { UpdateLoginInfoInput } from '../types/user.types';
interface LockoutResult {
    failedCount: number;
    lockedUntil: Date | null;
}
interface AccountLockStatus {
    locked: boolean;
    until: Date | null;
}
export declare const userSecurityRepository: {
    findByUserId(userId: bigint): Promise<UserSecurity | null>;
    create(userId: bigint): Promise<UserSecurity>;
    ensureExists(userId: bigint): Promise<UserSecurity>;
    setEmailVerified(userId: bigint): Promise<void>;
    updateLoginInfo(userId: bigint, input: UpdateLoginInfoInput): Promise<void>;
    incrementFailedLoginCount(userId: bigint): Promise<LockoutResult>;
    unlockAccount(userId: bigint): Promise<void>;
    setMfaSecret(userId: bigint, secret: string, backupCodes: string[]): Promise<void>;
    enableMfa(userId: bigint): Promise<void>;
    disableMfa(userId: bigint): Promise<void>;
    updateBackupCodes(userId: bigint, backupCodes: string[]): Promise<void>;
    setPasswordChanged(userId: bigint): Promise<void>;
    setForceLogout(userId: bigint): Promise<void>;
    addStatusHistory(userId: bigint, status: string, reason?: string): Promise<void>;
    isAccountLocked(userId: bigint): Promise<AccountLockStatus>;
    decayFailedCounts(): Promise<number>;
};
export type UserSecurityRepository = typeof userSecurityRepository;
export {};
//# sourceMappingURL=user-security.repository.d.ts.map