/**
 * MFA setup result
 */
export interface MfaSetupResult {
    secret: string;
    otpAuthUrl: string;
    qrCodeDataUrl: string;
    backupCodes: string[];
}
/**
 * MFA Service
 */
export declare const mfaService: {
    /**
     * Generate a new MFA secret
     */
    generateSecret(): string;
    /**
     * Generate OTP Auth URL for authenticator apps
     */
    generateOtpAuthUrl(secret: string, email: string, issuer?: string): string;
    /**
     * Setup MFA for a user
     */
    setupMfa(email: string): Promise<MfaSetupResult>;
    /**
     * Verify a TOTP code
     */
    verifyTotp(secret: string, code: string, window?: number): boolean;
    /**
     * Generate backup codes
     */
    generateBackupCodes(count?: number): string[];
    /**
     * Verify a backup code
     */
    verifyBackupCode(storedCodes: string[], providedCode: string): {
        valid: boolean;
        remainingCodes: string[];
    };
    /**
     * Hash backup codes for storage
     */
    hashBackupCodes(codes: string[]): string[];
    /**
     * Get current TOTP code (for testing)
     */
    getCurrentCode(secret: string): string;
};
export type MfaService = typeof mfaService;
//# sourceMappingURL=mfa.service.d.ts.map