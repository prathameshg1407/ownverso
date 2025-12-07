/**
 * Password strength levels
 */
export type PasswordStrengthLevel = 'very_weak' | 'weak' | 'fair' | 'strong' | 'very_strong';
/**
 * Password strength result
 */
export interface PasswordStrengthResult {
    score: number;
    level: PasswordStrengthLevel;
    feedback: string[];
    isAcceptable: boolean;
}
/**
 * Password validation result
 */
export interface PasswordValidationResult {
    isValid: boolean;
    errors: string[];
}
/**
 * Password Service
 */
export declare const passwordService: {
    /**
     * Hash a password using Argon2id
     */
    hash(password: string): Promise<string>;
    /**
     * Verify a password against a hash
     */
    verify(passwordHash: string, password: string): Promise<boolean>;
    /**
     * Validate password meets requirements
     */
    validate(password: string): PasswordValidationResult;
    /**
     * Check password strength
     */
    checkStrength(password: string): PasswordStrengthResult;
    /**
     * Check if password is compromised (placeholder for HaveIBeenPwned integration)
     */
    isCompromised(_password: string): Promise<boolean>;
    /**
     * Generate a random password
     */
    generateRandom(length?: number): string;
};
export type PasswordService = typeof passwordService;
//# sourceMappingURL=password.service.d.ts.map