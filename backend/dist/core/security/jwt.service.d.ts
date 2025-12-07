import type { UserRole } from '@prisma/client';
/**
 * Token types
 */
export type TokenType = 'access' | 'refresh';
/**
 * Base JWT payload
 */
export interface BaseJwtPayload {
    sub: string;
    type: TokenType;
    iat: number;
    exp: number;
    iss: string;
    aud: string;
}
/**
 * Access token payload
 */
export interface AccessTokenPayload extends BaseJwtPayload {
    type: 'access';
    email: string;
    role: UserRole;
    sessionId: string;
}
/**
 * Refresh token payload
 */
export interface RefreshTokenPayload extends BaseJwtPayload {
    type: 'refresh';
    sessionId: string;
    tokenVersion: number;
}
/**
 * Token pair
 */
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
}
/**
 * User data for token generation
 */
export interface TokenUserData {
    publicId: string;
    email: string;
    role: UserRole;
    sessionId: string;
    tokenVersion?: number;
}
/**
 * JWT Service
 */
export declare const jwtService: {
    /**
     * Generate access token
     */
    generateAccessToken(userData: TokenUserData): string;
    /**
     * Generate refresh token
     */
    generateRefreshToken(userData: TokenUserData): string;
    /**
     * Generate token pair
     */
    generateTokenPair(userData: TokenUserData): TokenPair;
    /**
     * Verify access token
     */
    verifyAccessToken(token: string): AccessTokenPayload;
    /**
     * Verify refresh token
     */
    verifyRefreshToken(token: string): RefreshTokenPayload;
    /**
     * Decode token without verification (for debugging/logging)
     */
    decodeToken(token: string): BaseJwtPayload | null;
    /**
     * Extract token from Authorization header
     */
    extractTokenFromHeader(authHeader: string | undefined): string | null;
    /**
     * Check if token is about to expire (within threshold)
     */
    isTokenExpiringSoon(payload: BaseJwtPayload, thresholdMs?: number): boolean;
    /**
     * Get token expiration date
     */
    getTokenExpiration(payload: BaseJwtPayload): Date;
};
export type JwtService = typeof jwtService;
//# sourceMappingURL=jwt.service.d.ts.map