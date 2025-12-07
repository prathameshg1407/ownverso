import { VerificationTokenType } from '@prisma/client';
/**
 * Token generation options
 */
export interface TokenGenerationOptions {
    userId: bigint;
    type: VerificationTokenType;
    newEmail?: string;
    requestedIp?: string;
}
/**
 * Token verification result
 */
export interface TokenVerificationResult {
    valid: boolean;
    token?: {
        id: bigint;
        userId: bigint;
        type: VerificationTokenType;
        newEmail: string | null;
        expiresAt: Date;
    };
    error?: string;
}
/**
 * Generated token result
 */
export interface GeneratedToken {
    token: string;
    hashedToken: string;
    expiresAt: Date;
}
/**
 * Token Service
 */
export declare const tokenService: {
    /**
     * Generate a random token
     */
    generateRandomToken(length?: number): GeneratedToken;
    /**
     * Create a verification token
     */
    createToken(options: TokenGenerationOptions): Promise<string>;
    /**
     * Verify a token
     */
    verifyToken(token: string, expectedType: VerificationTokenType): Promise<TokenVerificationResult>;
    /**
     * Mark a token as used
     */
    markTokenAsUsed(tokenId: bigint, usedIp?: string): Promise<void>;
    /**
     * Invalidate all tokens of a type for a user
     */
    invalidateUserTokens(userId: bigint, type?: VerificationTokenType): Promise<number>;
    /**
     * Clean up expired tokens (should be run periodically)
     */
    cleanupExpiredTokens(): Promise<number>;
    /**
     * Verify and consume token in one operation
     */
    verifyAndConsumeToken(token: string, expectedType: VerificationTokenType, usedIp?: string): Promise<TokenVerificationResult>;
    /**
     * Get token URL for email links
     */
    getTokenUrl(type: VerificationTokenType, token: string): string;
};
export type TokenService = typeof tokenService;
//# sourceMappingURL=token.service.d.ts.map