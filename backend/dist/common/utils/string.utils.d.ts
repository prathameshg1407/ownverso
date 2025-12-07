/**
 * String Utilities
 */
/**
 * Generate a URL-safe slug from a string
 */
export declare function slugify(text: string): string;
/**
 * Truncate a string to a specified length
 */
export declare function truncate(str: string, length: number, suffix?: string): string;
/**
 * Capitalize first letter of a string
 */
export declare function capitalize(str: string): string;
/**
 * Convert string to title case
 */
export declare function titleCase(str: string): string;
/**
 * Convert camelCase to snake_case
 */
export declare function camelToSnake(str: string): string;
/**
 * Convert snake_case to camelCase
 */
export declare function snakeToCamel(str: string): string;
/**
 * Remove HTML tags from a string
 */
export declare function stripHtml(html: string): string;
/**
 * Escape HTML special characters
 */
export declare function escapeHtml(str: string): string;
/**
 * Generate a random string
 */
export declare function randomString(length?: number): string;
/**
 * Mask sensitive data (e.g., email, phone)
 */
export declare function maskEmail(email: string): string;
/**
 * Check if string is empty or whitespace only
 */
export declare function isBlank(str: string | null | undefined): boolean;
/**
 * Extract initials from a name
 */
export declare function getInitials(name: string, maxLength?: number): string;
//# sourceMappingURL=string.utils.d.ts.map