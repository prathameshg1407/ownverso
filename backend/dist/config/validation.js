"use strict";
/**
 * Configuration Validation
 *
 * Validates all required environment variables on startup.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = validateConfig;
exports.assertConfigValid = assertConfigValid;
const zod_1 = require("zod");
/**
 * Environment validation schema
 */
const envSchema = zod_1.z.object({
    // Application
    NODE_ENV: zod_1.z
        .enum(['development', 'test', 'staging', 'production'])
        .default('development'),
    APP_NAME: zod_1.z.string().default('ownverso'),
    APP_VERSION: zod_1.z.string().default('1.0.0'),
    APP_PORT: zod_1.z.string().regex(/^\d+$/).default('3000'),
    APP_HOST: zod_1.z.string().default('0.0.0.0'),
    APP_URL: zod_1.z.string().url().optional(),
    APP_FRONTEND_URL: zod_1.z.string().url().optional(),
    // Logging
    LOG_LEVEL: zod_1.z
        .enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
        .default('info'),
    LOG_FORMAT: zod_1.z.enum(['json', 'pretty']).default('json'),
    // Database
    DATABASE_URL: zod_1.z.string().min(1, 'DATABASE_URL is required'),
    // Redis
    REDIS_URL: zod_1.z.string().min(1, 'REDIS_URL is required'),
    // JWT
    JWT_ACCESS_SECRET: zod_1.z
        .string()
        .min(32, 'JWT_ACCESS_SECRET must be at least 32 characters'),
    JWT_REFRESH_SECRET: zod_1.z
        .string()
        .min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
    JWT_ACCESS_EXPIRES_IN: zod_1.z.string().default('15m'),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string().default('7d'),
    // Session
    SESSION_SECRET: zod_1.z
        .string()
        .min(32, 'SESSION_SECRET must be at least 32 characters'),
    // CORS
    CORS_ORIGINS: zod_1.z.string().default('http://localhost:5173'),
});
/**
 * Validate environment configuration
 */
function validateConfig() {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
        const errors = result.error.errors.map((err) => {
            const path = err.path.join('.');
            return `${path}: ${err.message}`;
        });
        return {
            success: false,
            errors,
        };
    }
    return {
        success: true,
        errors: [],
        data: result.data,
    };
}
/**
 * Assert configuration is valid (throws on failure)
 */
function assertConfigValid() {
    const result = validateConfig();
    if (!result.success) {
        throw new Error(`Configuration validation failed:\n${result.errors.join('\n')}`);
    }
    return result.data;
}
//# sourceMappingURL=validation.js.map