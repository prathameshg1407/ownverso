/**
 * MFA Domain Service
 * Multi-factor authentication operations
 */
import type { MfaSetupResult, MfaStatusDTO } from '../types/auth.types';
export declare const mfaDomainService: {
    /**
     * Initialize MFA setup
     */
    readonly initSetup: (userId: bigint) => Promise<MfaSetupResult>;
    /**
     * Verify and complete MFA setup
     */
    readonly verifySetup: (userId: bigint, code: string) => Promise<{
        backupCodes: string[];
    }>;
    /**
     * Disable MFA
     */
    readonly disable: (userId: bigint, password: string, code?: string) => Promise<void>;
    /**
     * Regenerate backup codes
     */
    readonly regenerateBackupCodes: (userId: bigint, password: string) => Promise<string[]>;
    /**
     * Recover account using backup code
     */
    readonly recoverWithBackupCode: (email: string, backupCode: string) => Promise<{
        success: boolean;
        remainingCodes: number;
    }>;
    /**
     * Get MFA status
     */
    readonly getStatus: (userId: bigint) => Promise<MfaStatusDTO>;
};
export type MfaDomainService = typeof mfaDomainService;
//# sourceMappingURL=mfa.service.d.ts.map