/**
 * Environment Variable Type Declarations
 */

declare namespace NodeJS {
  interface ProcessEnv {
    // Application
    NEXT_PUBLIC_APP_NAME: string;
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_APP_ENV: 'development' | 'staging' | 'production';

    // API
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_API_VERSION: string;

    // Authentication
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    GITHUB_CLIENT_ID?: string;
    GITHUB_CLIENT_SECRET?: string;

    // Feature Flags
    NEXT_PUBLIC_ENABLE_ANALYTICS: string;
    NEXT_PUBLIC_ENABLE_SENTRY: string;
    NEXT_PUBLIC_MAINTENANCE_MODE: string;

    // Third-Party
    NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
    NEXT_PUBLIC_SENTRY_DSN?: string;
    SENTRY_AUTH_TOKEN?: string;
  }
}

export {};