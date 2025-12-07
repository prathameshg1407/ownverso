/**
 * Auth Service
 * Core authentication business logic
 */
import type { AuthProvider } from '@prisma/client';
import type { RegisterInput, LoginInput, LoginResult, TokenPair, DeviceInfo, UserWithSecurity } from '../types/auth.types';
import type { AccessTokenPayload } from '@/types/fastify';
export declare const authService: {
    /**
     * Register a new user
     */
    readonly register: (input: RegisterInput, deviceInfo: DeviceInfo) => Promise<{
        userId: string;
        requiresEmailVerification: boolean;
    }>;
    /**
     * Login with email/password
     */
    readonly login: (input: LoginInput, deviceInfo: DeviceInfo) => Promise<LoginResult>;
    /**
     * Create an authenticated session with tokens
     */
    readonly createAuthenticatedSession: (user: UserWithSecurity, deviceInfo: DeviceInfo, authProvider: AuthProvider | null) => Promise<LoginResult>;
    /**
     * Verify MFA and complete login
     */
    readonly verifyMfaLogin: (mfaPendingToken: string, code: string) => Promise<LoginResult>;
    /**
     * Refresh access and refresh tokens
     */
    readonly refreshTokens: (refreshToken: string) => Promise<TokenPair>;
    /**
     * Logout current session
     */
    readonly logout: (accessToken: string) => Promise<void>;
    /**
     * Logout all sessions for a user
     */
    readonly logoutAll: (userId: bigint) => Promise<number>;
    /**
     * Validate an access token session
     */
    readonly validateSession: (payload: AccessTokenPayload) => Promise<boolean>;
    readonly findUserForLogin: (emailOrUsername: string) => Promise<UserWithSecurity | null>;
    readonly createMfaPendingToken: (userId: bigint, deviceInfo: DeviceInfo) => Promise<string>;
    readonly createMfaPendingResult: (user: UserWithSecurity, mfaPendingToken: string) => LoginResult;
    readonly handleFailedLogin: (userId: bigint, email: string) => Promise<void>;
};
export type AuthService = typeof authService;
//# sourceMappingURL=auth.service.d.ts.map