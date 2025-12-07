/**
 * Configuration Validation
 *
 * Validates all required environment variables on startup.
 */

import { z } from 'zod';

/**
 * Environment validation schema
 */
const envSchema = z.object({
  // Application
  NODE_ENV: z
    .enum(['development', 'test', 'staging', 'production'])
    .default('development'),
  APP_NAME: z.string().default('ownverso'),
  APP_VERSION: z.string().default('1.0.0'),
  APP_PORT: z.string().regex(/^\d+$/).default('3000'),
  APP_HOST: z.string().default('0.0.0.0'),
  APP_URL: z.string().url().optional(),
  APP_FRONTEND_URL: z.string().url().optional(),

  // Logging
  LOG_LEVEL: z
    .enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
    .default('info'),
  LOG_FORMAT: z.enum(['json', 'pretty']).default('json'),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // Redis
  REDIS_URL: z.string().min(1, 'REDIS_URL is required'),

  // JWT
  JWT_ACCESS_SECRET: z
    .string()
    .min(32, 'JWT_ACCESS_SECRET must be at least 32 characters'),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  // Session
  SESSION_SECRET: z
    .string()
    .min(32, 'SESSION_SECRET must be at least 32 characters'),

  // CORS
  CORS_ORIGINS: z.string().default('http://localhost:5173'),
});

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
export function validateConfig(): ValidationResult {
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
export function assertConfigValid(): EnvConfig {
  const result = validateConfig();

  if (!result.success) {
    throw new Error(
      `Configuration validation failed:\n${result.errors.join('\n')}`
    );
  }

  return result.data!;
}