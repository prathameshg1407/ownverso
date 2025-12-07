/**
 * Configuration Validation
 *
 * Validates all required environment variables on startup.
 */
import { z } from 'zod';
/**
 * Environment validation schema
 */
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "test", "staging", "production"]>>;
    APP_NAME: z.ZodDefault<z.ZodString>;
    APP_VERSION: z.ZodDefault<z.ZodString>;
    APP_PORT: z.ZodDefault<z.ZodString>;
    APP_HOST: z.ZodDefault<z.ZodString>;
    APP_URL: z.ZodOptional<z.ZodString>;
    APP_FRONTEND_URL: z.ZodOptional<z.ZodString>;
    LOG_LEVEL: z.ZodDefault<z.ZodEnum<["trace", "debug", "info", "warn", "error", "fatal"]>>;
    LOG_FORMAT: z.ZodDefault<z.ZodEnum<["json", "pretty"]>>;
    DATABASE_URL: z.ZodString;
    REDIS_URL: z.ZodString;
    JWT_ACCESS_SECRET: z.ZodString;
    JWT_REFRESH_SECRET: z.ZodString;
    JWT_ACCESS_EXPIRES_IN: z.ZodDefault<z.ZodString>;
    JWT_REFRESH_EXPIRES_IN: z.ZodDefault<z.ZodString>;
    SESSION_SECRET: z.ZodString;
    CORS_ORIGINS: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    NODE_ENV: "development" | "test" | "staging" | "production";
    APP_NAME: string;
    APP_VERSION: string;
    APP_PORT: string;
    APP_HOST: string;
    LOG_LEVEL: "info" | "trace" | "debug" | "warn" | "error" | "fatal";
    LOG_FORMAT: "json" | "pretty";
    DATABASE_URL: string;
    REDIS_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_EXPIRES_IN: string;
    JWT_REFRESH_EXPIRES_IN: string;
    SESSION_SECRET: string;
    CORS_ORIGINS: string;
    APP_URL?: string | undefined;
    APP_FRONTEND_URL?: string | undefined;
}, {
    DATABASE_URL: string;
    REDIS_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    SESSION_SECRET: string;
    NODE_ENV?: "development" | "test" | "staging" | "production" | undefined;
    APP_NAME?: string | undefined;
    APP_VERSION?: string | undefined;
    APP_PORT?: string | undefined;
    APP_HOST?: string | undefined;
    APP_URL?: string | undefined;
    APP_FRONTEND_URL?: string | undefined;
    LOG_LEVEL?: "info" | "trace" | "debug" | "warn" | "error" | "fatal" | undefined;
    LOG_FORMAT?: "json" | "pretty" | undefined;
    JWT_ACCESS_EXPIRES_IN?: string | undefined;
    JWT_REFRESH_EXPIRES_IN?: string | undefined;
    CORS_ORIGINS?: string | undefined;
}>;
export type EnvConfig = z.infer<typeof envSchema>;
/**
 * Validation result
 */
export interface ValidationResult {
    success: boolean;
    errors: string[];
    data?: EnvConfig;
}
/**
 * Validate environment configuration
 */
export declare function validateConfig(): ValidationResult;
/**
 * Assert configuration is valid (throws on failure)
 */
export declare function assertConfigValid(): EnvConfig;
export {};
//# sourceMappingURL=validation.d.ts.map