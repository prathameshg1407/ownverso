/**
 * User Utility Functions
 */
import type { UserWithSecurity } from '../types/user.types';
export interface LoginCheckResult {
    canLogin: boolean;
    reason?: string;
}
/**
 * Check if a user can login based on their status and security settings
 */
export declare function canUserLogin(user: UserWithSecurity): LoginCheckResult;
/**
 * Check if user has a password set (vs OAuth-only)
 */
export declare function hasPassword(user: {
    passwordHash: string | null;
}): boolean;
/**
 * Check if user needs to verify their email
 */
export declare function needsEmailVerification(user: {
    emailVerified: boolean;
    status: string;
}): boolean;
/**
 * Check if user has MFA enabled
 */
export declare function hasMfaEnabled(user: UserWithSecurity): boolean;
/**
 * Check if user account is active
 */
export declare function isActiveUser(user: {
    status: string;
    deletedAt: Date | null;
}): boolean;
/**
 * Mask email for privacy display
 */
export declare function maskEmail(email: string): string;
/**
 * Mask IP address for privacy display
 */
export declare function maskIpAddress(ip: string | null): string | null;
//# sourceMappingURL=user.utils.d.ts.map