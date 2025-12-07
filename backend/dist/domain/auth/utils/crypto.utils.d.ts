/**
 * Auth Crypto Utilities
 * Domain-specific cryptographic operations
 */
/**
 * Hash a token using SHA-256 for storage
 */
export declare function hashToken(token: string): string;
/**
 * Generate a cryptographically secure token
 */
export declare function generateToken(prefix?: string): string;
/**
 * Generate a unique session identifier
 */
export declare function generateSessionId(): string;
/**
 * Mask an IP address for privacy (showing only network portion)
 */
export declare function maskIpAddress(ip: string | null): string | null;
/**
 * Constant-time string comparison to prevent timing attacks
 */
export declare function secureCompare(a: string, b: string): boolean;
//# sourceMappingURL=crypto.utils.d.ts.map