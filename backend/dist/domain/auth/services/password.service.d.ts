/**
 * Password Domain Service
 * Password reset and change operations
 */
export declare const passwordDomainService: {
    /**
     * Request password reset (sends email)
     */
    readonly requestReset: (email: string, requestedIp?: string) => Promise<void>;
    /**
     * Reset password using token
     */
    readonly resetPassword: (token: string, newPassword: string, usedIp?: string) => Promise<void>;
    /**
     * Change password (authenticated user)
     */
    readonly changePassword: (userId: bigint, currentPassword: string, newPassword: string, currentSessionId?: bigint) => Promise<void>;
    /**
     * Check password strength
     */
    readonly checkStrength: (password: string) => import("../../../core/security").PasswordStrengthResult;
};
export type PasswordDomainService = typeof passwordDomainService;
//# sourceMappingURL=password.service.d.ts.map