/**
 * Email Verification Service
 * Handles email verification and email change flows
 */
export declare const emailVerificationService: {
    /**
     * Verify email with token
     */
    readonly verifyEmail: (token: string, usedIp?: string) => Promise<void>;
    /**
     * Resend verification email
     */
    readonly resendVerification: (userId: bigint, requestedIp?: string) => Promise<void>;
    /**
     * Request email change
     */
    readonly requestEmailChange: (userId: bigint, newEmail: string, requestedIp?: string) => Promise<void>;
    /**
     * Confirm email change with token
     */
    readonly confirmEmailChange: (token: string, usedIp?: string) => Promise<{
        oldEmail: string;
        newEmail: string;
    }>;
};
export type EmailVerificationService = typeof emailVerificationService;
//# sourceMappingURL=email-verification.service.d.ts.map