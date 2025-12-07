/**
 * Authentication Configuration
 */
export declare const authConfig: {
    /**
     * Password requirements
     */
    readonly password: {
        readonly minLength: 8;
        readonly maxLength: 128;
        readonly requireUppercase: true;
        readonly requireLowercase: true;
        readonly requireNumbers: true;
        readonly requireSpecialChars: false;
        readonly bcryptRounds: number;
    };
    /**
     * Account lockout settings
     */
    readonly lockout: {
        readonly maxAttempts: number;
        readonly thresholds: readonly [{
            readonly attempts: 5;
            readonly lockoutMinutes: 5;
        }, {
            readonly attempts: 7;
            readonly lockoutMinutes: 15;
        }, {
            readonly attempts: 10;
            readonly lockoutMinutes: 60;
        }];
        readonly decayMinutes: 15;
        readonly delayAfterAttempts: 3;
        readonly delayMs: 1000;
    };
    /**
     * Token expiration settings
     */
    readonly tokens: {
        readonly emailVerification: {
            readonly expiresIn: "24h";
            readonly expiresInMs: number;
        };
        readonly passwordReset: {
            readonly expiresIn: "1h";
            readonly expiresInMs: number;
        };
        readonly emailChange: {
            readonly expiresIn: "24h";
            readonly expiresInMs: number;
        };
        readonly mfaSetup: {
            readonly expiresIn: "10m";
            readonly expiresInMs: number;
        };
        readonly accountRecovery: {
            readonly expiresIn: "24h";
            readonly expiresInMs: number;
        };
    };
    /**
     * Session settings
     */
    readonly session: {
        readonly maxSessionsPerUser: number;
        readonly idleTimeoutHours: 24;
        readonly absoluteTimeoutDays: 30;
        readonly extendOnActivity: true;
    };
    /**
     * Cookie settings
     */
    readonly cookies: {
        readonly accessToken: {
            readonly name: "ov_access_token";
            readonly httpOnly: true;
            readonly secure: boolean;
            readonly sameSite: "lax";
            readonly path: "/";
        };
        readonly refreshToken: {
            readonly name: "ov_refresh_token";
            readonly httpOnly: true;
            readonly secure: boolean;
            readonly sameSite: "lax";
            readonly path: "/api/v1/auth";
        };
    };
    /**
     * MFA settings
     */
    readonly mfa: {
        readonly issuer: string;
        readonly backupCodesCount: 10;
        readonly backupCodeLength: 8;
        readonly totpWindow: 1;
    };
    /**
     * OAuth settings
     */
    readonly oauth: {
        readonly google: {
            readonly clientId: string;
            readonly clientSecret: string;
            readonly callbackUrl: `${string}/api/v1/auth/oauth/google/callback`;
            readonly scopes: readonly ["openid", "email", "profile"];
        };
        readonly apple: {
            readonly clientId: string;
            readonly clientSecret: string;
            readonly callbackUrl: `${string}/api/v1/auth/oauth/apple/callback`;
        };
        readonly twitter: {
            readonly clientId: string;
            readonly clientSecret: string;
            readonly callbackUrl: `${string}/api/v1/auth/oauth/twitter/callback`;
        };
        readonly discord: {
            readonly clientId: string;
            readonly clientSecret: string;
            readonly callbackUrl: `${string}/api/v1/auth/oauth/discord/callback`;
        };
        readonly facebook: {
            readonly clientId: string;
            readonly clientSecret: string;
            readonly callbackUrl: `${string}/api/v1/auth/oauth/facebook/callback`;
        };
    };
    /**
     * Rate limiting for auth endpoints
     */
    readonly rateLimit: {
        readonly login: {
            readonly max: 5;
            readonly windowMs: number;
        };
        readonly register: {
            readonly max: 3;
            readonly windowMs: number;
        };
        readonly passwordReset: {
            readonly max: 3;
            readonly windowMs: number;
        };
        readonly emailVerification: {
            readonly max: 5;
            readonly windowMs: number;
        };
        readonly mfa: {
            readonly max: 5;
            readonly windowMs: number;
        };
        readonly refresh: {
            readonly max: 10;
            readonly windowMs: number;
        };
    };
    /**
     * Frontend URLs for email links
     */
    readonly frontendUrls: {
        readonly verifyEmail: `${string}/verify-email`;
        readonly resetPassword: `${string}/reset-password`;
        readonly confirmEmailChange: `${string}/confirm-email-change`;
        readonly mfaSetup: `${string}/mfa/setup`;
        readonly oauthSuccess: `${string}/oauth/success`;
        readonly oauthError: `${string}/oauth/error`;
    };
};
export type AuthConfig = typeof authConfig;
//# sourceMappingURL=auth.config.d.ts.map