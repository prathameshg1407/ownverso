// ==== FILE: src/config/auth.config.ts ====

/**
 * Authentication Configuration
 */

export const authConfig = {
  /**
   * Password requirements
   */
  password: {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
  },

  /**
   * Account lockout settings
   */
  lockout: {
    maxAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5', 10),
    
    // Progressive lockout thresholds
    thresholds: [
      { attempts: 5, lockoutMinutes: 5 },
      { attempts: 7, lockoutMinutes: 15 },
      { attempts: 10, lockoutMinutes: 60 },
    ],
    
    // Decay: reduce failed count by 1 every X minutes of inactivity
    decayMinutes: 15,
    
    // Delay response after X failed attempts (milliseconds)
    delayAfterAttempts: 3,
    delayMs: 1000,
  },

  /**
   * Token expiration settings
   */
  tokens: {
    emailVerification: {
      expiresIn: '24h',
      expiresInMs: 24 * 60 * 60 * 1000,
    },
    passwordReset: {
      expiresIn: '1h',
      expiresInMs: 60 * 60 * 1000,
    },
    emailChange: {
      expiresIn: '24h',
      expiresInMs: 24 * 60 * 60 * 1000,
    },
    mfaSetup: {
      expiresIn: '10m',
      expiresInMs: 10 * 60 * 1000,
    },
    accountRecovery: {
      expiresIn: '24h',
      expiresInMs: 24 * 60 * 60 * 1000,
    },
  },

  /**
   * Session settings
   */
  session: {
    maxSessionsPerUser: parseInt(process.env.MAX_SESSIONS_PER_USER || '10', 10),
    idleTimeoutHours: 24,
    absoluteTimeoutDays: 30,
    extendOnActivity: true,
  },

  /**
   * Cookie settings
   */
 /**
 * Cookie settings
 */
cookies: {
  accessToken: {
    name: 'ov_access_token',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
    path: '/',
  },
  refreshToken: {
    name: 'ov_refresh_token',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
    path: '/',  // Changed from '/api/v1/auth' to '/' for consistency
  },
},

  /**
   * MFA settings
   */
  mfa: {
    issuer: process.env.MFA_ISSUER || 'Ownverso',
    backupCodesCount: 10,
    backupCodeLength: 8,
    totpWindow: 1, // Allow 1 step before/after for clock drift
  },

  /**
   * OAuth settings
   */
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackUrl: `${process.env.APP_URL}/api/v1/auth/oauth/google/callback`,
      scopes: ['openid', 'email', 'profile'],
    },
    // Stubs for other providers
    apple: {
      clientId: process.env.APPLE_CLIENT_ID || '',
      clientSecret: process.env.APPLE_CLIENT_SECRET || '',
      callbackUrl: `${process.env.APP_URL}/api/v1/auth/oauth/apple/callback`,
    },
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID || '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
      callbackUrl: `${process.env.APP_URL}/api/v1/auth/oauth/twitter/callback`,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
      callbackUrl: `${process.env.APP_URL}/api/v1/auth/oauth/discord/callback`,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
      callbackUrl: `${process.env.APP_URL}/api/v1/auth/oauth/facebook/callback`,
    },
  },

  /**
   * Rate limiting for auth endpoints
   */
  rateLimit: {
    login: {
      max: 5,
      windowMs: 60 * 1000, // 1 minute
    },
    register: {
      max: 3,
      windowMs: 60 * 1000,
    },
    passwordReset: {
      max: 3,
      windowMs: 60 * 60 * 1000, // 1 hour
    },
    emailVerification: {
      max: 5,
      windowMs: 60 * 60 * 1000,
    },
    mfa: {
      max: 5,
      windowMs: 60 * 1000,
    },
    refresh: {
      max: 10,
      windowMs: 60 * 1000,
    },
  },

  /**
   * Frontend URLs for email links
   */
  frontendUrls: {
    verifyEmail: `${process.env.FRONTEND_URL}/verify-email`,
    resetPassword: `${process.env.FRONTEND_URL}/reset-password`,
    confirmEmailChange: `${process.env.FRONTEND_URL}/confirm-email-change`,
    mfaSetup: `${process.env.FRONTEND_URL}/mfa/setup`,
    oauthSuccess: `${process.env.FRONTEND_URL}/oauth/success`,
    oauthError: `${process.env.FRONTEND_URL}/oauth/error`,
  },
} as const;

export type AuthConfig = typeof authConfig;