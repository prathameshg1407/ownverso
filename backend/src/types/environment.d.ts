/**
 * Environment Variable Type Definitions
 *
 * Provides type safety for environment variables.
 */

export interface EnvironmentVariables {
  // Application
  NODE_ENV: 'development' | 'test' | 'staging' | 'production';
  APP_NAME: string;
  APP_VERSION: string;
  APP_PORT: string;
  APP_HOST: string;
  APP_URL: string;
  APP_FRONTEND_URL: string;

  // Logging
  LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  LOG_FORMAT: 'json' | 'pretty';

  // Database
  DATABASE_URL: string;
  DATABASE_POOL_MIN?: string;
  DATABASE_POOL_MAX?: string;
  DATABASE_LOG_QUERIES?: string;

  // Redis
  REDIS_URL: string;
  REDIS_HOST?: string;
  REDIS_PORT?: string;
  REDIS_PASSWORD?: string;
  REDIS_DB?: string;
  REDIS_KEY_PREFIX?: string;

  // JWT
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_EXPIRES_IN: string;
  JWT_REFRESH_EXPIRES_IN: string;
  JWT_ISSUER?: string;
  JWT_AUDIENCE?: string;

  // Session
  SESSION_SECRET: string;
  SESSION_MAX_AGE?: string;

  // Argon2
  ARGON2_MEMORY_COST?: string;
  ARGON2_TIME_COST?: string;
  ARGON2_PARALLELISM?: string;

  // CORS
  CORS_ORIGINS: string;
  CORS_CREDENTIALS?: string;

  // Rate Limiting
  RATE_LIMIT_ENABLED?: string;
  RATE_LIMIT_GLOBAL_MAX?: string;
  RATE_LIMIT_GLOBAL_WINDOW_MS?: string;

  // Swagger
  SWAGGER_ENABLED?: string;
  SWAGGER_PATH?: string;
  SWAGGER_TITLE?: string;
  SWAGGER_DESCRIPTION?: string;
  SWAGGER_VERSION?: string;

  // Security
  ENCRYPTION_KEY?: string;
  API_KEY_SALT?: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}