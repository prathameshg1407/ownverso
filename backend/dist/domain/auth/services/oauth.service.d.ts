/**
 * OAuth Service
 * Social login with extensible provider support
 */
import type { AuthProvider } from '@prisma/client';
import type { OAuthProfile, AuthAccountDTO, DeviceInfo, LoginResult } from '../types/auth.types';
export declare const oauthService: {
    /**
     * Get OAuth authorization URL
     */
    readonly getAuthorizationUrl: (provider: AuthProvider, state: string) => string;
    /**
     * Handle OAuth callback
     */
    readonly handleCallback: (provider: AuthProvider, code: string, deviceInfo: DeviceInfo) => Promise<LoginResult>;
    /**
     * Login with existing OAuth account
     */
    readonly loginWithOAuthAccount: (userId: bigint, provider: AuthProvider, deviceInfo: DeviceInfo) => Promise<LoginResult>;
    /**
     * Create new user from OAuth profile
     */
    readonly createUserFromOAuth: (profile: OAuthProfile, deviceInfo: DeviceInfo) => Promise<LoginResult>;
    /**
     * Link OAuth account to existing user
     */
    readonly linkAccount: (userId: bigint, provider: AuthProvider, code: string) => Promise<AuthAccountDTO>;
    /**
     * Unlink OAuth account from user
     */
    readonly unlinkAccount: (userId: bigint, provider: AuthProvider) => Promise<void>;
    /**
     * Get all linked OAuth accounts for a user
     */
    readonly getLinkedAccounts: (userId: bigint) => Promise<AuthAccountDTO[]>;
    /**
     * Get list of available OAuth providers
     */
    readonly getAvailableProviders: () => Array<{
        provider: AuthProvider;
        enabled: boolean;
    }>;
    /**
     * Generate username from email
     */
    readonly generateUsername: (email: string) => string;
};
export type OAuthService = typeof oauthService;
//# sourceMappingURL=oauth.service.d.ts.map