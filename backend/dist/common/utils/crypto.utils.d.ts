/**
 * Cryptography Utilities
 */
/**
 * Generate a random token
 */
export declare function generateToken(length?: number): string;
/**
 * Generate a URL-safe random token
 */
export declare function generateUrlSafeToken(length?: number): string;
/**
 * Hash a string using SHA-256
 */
export declare function sha256(data: string): string;
/**
 * Hash a string using SHA-512
 */
export declare function sha512(data: string): string;
/**
 * Create HMAC signature
 */
export declare function hmacSign(data: string, secret: string): string;
/**
 * Verify HMAC signature (timing-safe)
 */
export declare function hmacVerify(data: string, signature: string, secret: string): boolean;
/**
 * Hash a password using Argon2
 */
export declare function hashPassword(password: string): Promise<string>;
/**
 * Verify a password against a hash
 */
export declare function verifyPassword(hash: string, password: string): Promise<boolean>;
/**
 * Generate API key
 */
export declare function generateApiKey(prefix?: string): {
    key: string;
    hash: string;
};
/**
 * Hash an API key for storage
 */
export declare function hashApiKey(key: string): string;
/**
 * Generate a short code (for verification, referral, etc.)
 */
export declare function generateShortCode(length?: number): string;
/**
 * Generate a numeric OTP
 */
export declare function generateOTP(length?: number): string;
/**
 * Timing-safe string comparison
 */
export declare function safeCompare(a: string, b: string): boolean;
//# sourceMappingURL=crypto.utils.d.ts.map