/**
 * Complete application configuration
 */
export declare const config: {
    readonly app: {
        readonly name: string;
        readonly version: string;
        readonly nodeEnv: "development" | "test" | "staging" | "production";
        readonly port: number;
        readonly host: string;
        readonly url: string;
        readonly frontendUrl: string;
        readonly isDevelopment: boolean;
        readonly isProduction: boolean;
        readonly isTest: boolean;
        readonly logLevel: string;
        readonly logFormat: "json" | "pretty";
    };
    readonly database: import("./database.config").DatabaseConfig;
    readonly redis: {
        readonly url: string;
        readonly host: string;
        readonly port: number;
        readonly password: string | undefined;
        readonly db: number;
        readonly keyPrefix: string;
        readonly enableReadyCheck: true;
        readonly maxRetriesPerRequest: 3;
        readonly lazyConnect: false;
    };
    readonly jwt: {
        readonly access: {
            readonly secret: string;
            readonly expiresIn: string;
            readonly expiresInMs: number;
        };
        readonly refresh: {
            readonly secret: string;
            readonly expiresIn: string;
            readonly expiresInMs: number;
        };
        readonly issuer: string;
        readonly audience: string;
        readonly algorithm: "HS256";
    };
    readonly auth: {
        readonly password: {
            readonly minLength: 8;
            readonly maxLength: 128;
            readonly requireUppercase: true;
            readonly requireLowercase: true;
            readonly requireNumbers: true;
            readonly requireSpecialChars: false;
            readonly bcryptRounds: number;
        };
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
        readonly session: {
            readonly maxSessionsPerUser: number;
            readonly idleTimeoutHours: 24;
            readonly absoluteTimeoutDays: 30;
            readonly extendOnActivity: true;
        };
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
        readonly mfa: {
            readonly issuer: string;
            readonly backupCodesCount: 10;
            readonly backupCodeLength: 8;
            readonly totpWindow: 1;
        };
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
        readonly frontendUrls: {
            readonly verifyEmail: `${string}/verify-email`;
            readonly resetPassword: `${string}/reset-password`;
            readonly confirmEmailChange: `${string}/confirm-email-change`;
            readonly mfaSetup: `${string}/mfa/setup`;
            readonly oauthSuccess: `${string}/oauth/success`;
            readonly oauthError: `${string}/oauth/error`;
        };
    };
    /**
     * CORS configuration
     */
    readonly cors: {
        readonly origins: string[];
        readonly credentials: true;
        readonly methods: readonly ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];
        readonly allowedHeaders: readonly ["Content-Type", "Authorization", "X-Request-ID", "X-Correlation-ID", "X-Client-Type"];
        readonly exposedHeaders: readonly ["X-Request-ID", "X-RateLimit-Remaining", "X-RateLimit-Reset"];
        readonly maxAge: 86400;
    };
    /**
     * Rate limiting configuration
     */
    readonly rateLimit: {
        readonly enabled: boolean;
        readonly global: {
            readonly max: number;
            readonly timeWindow: number;
        };
        readonly auth: {
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
    };
    /**
     * Swagger documentation configuration
     */
    readonly swagger: {
        readonly enabled: boolean;
        readonly path: string;
        readonly title: string;
        readonly description: string;
        readonly version: string;
    };
    /**
     * Password hashing configuration (Argon2)
     */
    readonly argon2: {
        readonly memoryCost: number;
        readonly timeCost: number;
        readonly parallelism: number;
    };
    /**
     * Security configuration
     */
    readonly security: {
        readonly encryptionKey: string | undefined;
        readonly apiKeySalt: string | undefined;
    };
    /**
     * Email configuration
     */
    readonly email: {
        readonly from: string;
        readonly fromName: string;
        readonly sendgridApiKey: string | undefined;
        readonly enabled: boolean;
    };
};
export type Config = typeof config;
//# sourceMappingURL=configuration.d.ts.map