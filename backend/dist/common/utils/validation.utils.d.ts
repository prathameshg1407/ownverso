/**
 * Validation Utilities
 */
/**
 * Check if a string is a valid email
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Check if a string is a valid username
 */
export declare function isValidUsername(username: string): boolean;
/**
 * Check if a string is a valid slug
 */
export declare function isValidSlug(slug: string): boolean;
/**
 * Check if a string is a valid UUID
 */
export declare function isValidUUID(uuid: string): boolean;
/**
 * Check if a string is a valid CUID
 */
export declare function isValidCUID(cuid: string): boolean;
/**
 * Check if a string is a valid URL
 */
export declare function isValidURL(url: string): boolean;
/**
 * Check if a string is a valid hex color
 */
export declare function isValidHexColor(color: string): boolean;
/**
 * Password strength levels
 */
export type PasswordStrengthLevel = 'very_weak' | 'weak' | 'fair' | 'strong' | 'very_strong';
/**
 * Password strength result
 */
export interface PasswordStrength {
    score: number;
    level: PasswordStrengthLevel;
    feedback: string[];
}
/**
 * Check password strength
 */
export declare function checkPasswordStrength(password: string): PasswordStrength;
/**
 * Sanitize a string for safe output
 */
export declare function sanitizeString(str: string): string;
/**
 * Normalize email address
 */
export declare function normalizeEmail(email: string): string;
/**
 * Validated pagination result
 */
export interface ValidatedPagination {
    page: number;
    limit: number;
    skip: number;
}
/**
 * Pagination defaults
 */
interface PaginationDefaults {
    page: number;
    limit: number;
    maxLimit: number;
}
/**
 * Validate pagination parameters
 */
export declare function validatePagination(page?: number | string, limit?: number | string, defaults?: PaginationDefaults): ValidatedPagination;
export {};
//# sourceMappingURL=validation.utils.d.ts.map