/**
 * OAuth Utilities
 */
export declare function generateOAuthState(): string;
export declare function verifyOAuthState(state: string, maxAgeMs?: number): boolean;
export declare function maskEmail(email: string): string;
//# sourceMappingURL=oauth.utils.d.ts.map