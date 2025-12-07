
// // ==== FILE: src/config/app.config.ts ====

// /**
//  * Application Configuration
//  */

// export const appConfig = {
//   /**
//    * Application name
//    */
//   name: process.env.APP_NAME || 'ownverso',

//   /**
//    * Application version
//    */
//   version: process.env.APP_VERSION || '1.0.0',

//   /**
//    * Node environment
//    */
//   nodeEnv: (process.env.NODE_ENV || 'development') as
//     | 'development'
//     | 'test'
//     | 'staging'
//     | 'production',

//   /**
//    * Server port
//    */
//   port: parseInt(process.env.APP_PORT || '3001', 10),

//   /**
//    * Server host
//    */
//   host: process.env.APP_HOST || '0.0.0.0',

//   /**
//    * Application URL (for generating links)
//    */
//   url: process.env.APP_URL || 'http://localhost:3001',

//   /**
//    * Frontend URL (for CORS and redirects)
//    */
//   frontendUrl: process.env.APP_FRONTEND_URL || 'http://localhost:3000',

//   /**
//    * Is development environment
//    */
//   isDevelopment: process.env.NODE_ENV === 'development',

//   /**
//    * Is production environment
//    */
//   isProduction: process.env.NODE_ENV === 'production',

//   /**
//    * Is test environment
//    */
//   isTest: process.env.NODE_ENV === 'test',

//   /**
//    * Log level
//    */
//   logLevel: process.env.LOG_LEVEL || 'info',

//   /**
//    * Log format
//    */
//   logFormat: (process.env.LOG_FORMAT || 'json') as 'json' | 'pretty',
// } as const;

// export type AppConfig = typeof appConfig;

// // ==== FILE: src/config/configuration.ts ====

// /**
//  * Configuration Loader
//  *
//  * Loads and assembles all configuration from environment variables.
//  */

// import { appConfig } from './app.config';
// import { databaseConfig } from './database.config';
// import { redisConfig } from './redis.config';
// import { jwtConfig } from './jwt.config';

// /**
//  * Complete application configuration
//  */
// export const config = {
//   app: appConfig,
//   database: databaseConfig,
//   redis: redisConfig,
//   jwt: jwtConfig,

//   /**
//    * CORS configuration
//    */
//   cors: {
//     origins: process.env.CORS_ORIGINS?.split(',').map((o) => o.trim()) || [
//       'http://localhost:5173',
//     ],
//     credentials: process.env.CORS_CREDENTIALS === 'true',
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     allowedHeaders: [
//       'Content-Type',
//       'Authorization',
//       'X-Request-ID',
//       'X-Correlation-ID',
//     ],
//     exposedHeaders: ['X-Request-ID', 'X-RateLimit-Remaining'],
//     maxAge: 86400, // 24 hours
//   },

//   /**
//    * Rate limiting configuration
//    */
//   rateLimit: {
//     enabled: process.env.RATE_LIMIT_ENABLED !== 'false',
//     global: {
//       max: parseInt(process.env.RATE_LIMIT_GLOBAL_MAX || '1000', 10),
//       timeWindow: parseInt(
//         process.env.RATE_LIMIT_GLOBAL_WINDOW_MS || '60000',
//         10
//       ),
//     },
//     auth: {
//       max: parseInt(process.env.RATE_LIMIT_AUTH_MAX || '10', 10),
//       timeWindow: parseInt(
//         process.env.RATE_LIMIT_AUTH_WINDOW_MS || '60000',
//         10
//       ),
//     },
//   },

//   /**
//    * Swagger documentation configuration
//    */
//   swagger: {
//     enabled:
//       process.env.SWAGGER_ENABLED === 'true' ||
//       process.env.NODE_ENV === 'development',
//     path: process.env.SWAGGER_PATH || '/docs',
//     title: process.env.SWAGGER_TITLE || 'Ownverso API',
//     description:
//       process.env.SWAGGER_DESCRIPTION ||
//       'API documentation for Ownverso Platform',
//     version: process.env.SWAGGER_VERSION || '1.0.0',
//   },

//   /**
//    * Password hashing configuration (Argon2)
//    */
//   argon2: {
//     memoryCost: parseInt(process.env.ARGON2_MEMORY_COST || '65536', 10),
//     timeCost: parseInt(process.env.ARGON2_TIME_COST || '3', 10),
//     parallelism: parseInt(process.env.ARGON2_PARALLELISM || '4', 10),
//   },

//   /**
//    * Security configuration
//    */
//   security: {
//     encryptionKey: process.env.ENCRYPTION_KEY,
//     apiKeySalt: process.env.API_KEY_SALT,
//   },
// } as const;

// export type Config = typeof config;

// // ==== FILE: src/config/database.config.ts ====

// /**
//  * Database Configuration
//  */

// export const databaseConfig = {
//   /**
//    * Database connection URL
//    */
//   url: process.env.DATABASE_URL || '',

//   /**
//    * Minimum pool connections
//    */
//   poolMin: parseInt(process.env.DATABASE_POOL_MIN || '2', 10),

//   /**
//    * Maximum pool connections
//    */
//   poolMax: parseInt(process.env.DATABASE_POOL_MAX || '10', 10),

//   /**
//    * Enable query logging
//    */
//   logQueries: process.env.DATABASE_LOG_QUERIES === 'true',

//   /**
//    * Connection timeout (ms)
//    */
//   connectionTimeout: 30000,

//   /**
//    * Idle timeout (ms)
//    */
//   idleTimeout: 60000,
// } as const;

// export type DatabaseConfig = typeof databaseConfig;

// // ==== FILE: src/config/jwt.config.ts ====

// /**
//  * JWT Configuration
//  */

// /**
//  * Parse duration string to milliseconds
//  */
// function parseDuration(duration: string): number {
//   const match = duration.match(/^(\d+)(s|m|h|d)$/);
//   if (!match) {
//     return 900000; // Default 15 minutes
//   }

//   const value = parseInt(match[1]!, 10);
//   const unit = match[2];

//   switch (unit) {
//     case 's':
//       return value * 1000;
//     case 'm':
//       return value * 60 * 1000;
//     case 'h':
//       return value * 60 * 60 * 1000;
//     case 'd':
//       return value * 24 * 60 * 60 * 1000;
//     default:
//       return 900000;
//   }
// }

// export const jwtConfig = {
//   /**
//    * Access token configuration
//    */
//   access: {
//     secret: process.env.JWT_ACCESS_SECRET || 'development-access-secret-key',
//     expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
//     expiresInMs: parseDuration(process.env.JWT_ACCESS_EXPIRES_IN || '15m'),
//   },

//   /**
//    * Refresh token configuration
//    */
//   refresh: {
//     secret: process.env.JWT_REFRESH_SECRET || 'development-refresh-secret-key',
//     expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
//     expiresInMs: parseDuration(process.env.JWT_REFRESH_EXPIRES_IN || '7d'),
//   },

//   /**
//    * Token issuer
//    */
//   issuer: process.env.JWT_ISSUER || 'ownverso',

//   /**
//    * Token audience
//    */
//   audience: process.env.JWT_AUDIENCE || 'ownverso-api',

//   /**
//    * Algorithm for signing
//    */
//   algorithm: 'HS256' as const,
// } as const;

// export type JwtConfig = typeof jwtConfig;

// // ==== FILE: src/config/redis.config.ts ====

// /**
//  * Redis Configuration
//  */

// export const redisConfig = {
//   /**
//    * Redis connection URL
//    */
//   url: process.env.REDIS_URL || 'redis://localhost:6379',

//   /**
//    * Redis host (fallback if URL not provided)
//    */
//   host: process.env.REDIS_HOST || 'localhost',

//   /**
//    * Redis port
//    */
//   port: parseInt(process.env.REDIS_PORT || '6379', 10),

//   /**
//    * Redis password
//    */
//   password: process.env.REDIS_PASSWORD || undefined,

//   /**
//    * Redis database number
//    */
//   db: parseInt(process.env.REDIS_DB || '0', 10),

//   /**
//    * Key prefix for namespacing
//    */
//   keyPrefix: process.env.REDIS_KEY_PREFIX || 'ownverso:',

//   /**
//    * Enable ready check
//    */
//   enableReadyCheck: true,

//   /**
//    * Maximum retries per request
//    */
//   maxRetriesPerRequest: 3,

//   /**
//    * Lazy connect (connect on first command)
//    */
//   lazyConnect: false,
// } as const;

// export type RedisConfig = typeof redisConfig;

// // ==== FILE: src/config/validation.ts ====

// /**
//  * Configuration Validation
//  *
//  * Validates all required environment variables on startup.
//  */

// import { z } from 'zod';

// /**
//  * Environment validation schema
//  */
// const envSchema = z.object({
//   // Application
//   NODE_ENV: z
//     .enum(['development', 'test', 'staging', 'production'])
//     .default('development'),
//   APP_NAME: z.string().default('ownverso'),
//   APP_VERSION: z.string().default('1.0.0'),
//   APP_PORT: z.string().regex(/^\d+$/).default('3000'),
//   APP_HOST: z.string().default('0.0.0.0'),
//   APP_URL: z.string().url().optional(),
//   APP_FRONTEND_URL: z.string().url().optional(),

//   // Logging
//   LOG_LEVEL: z
//     .enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
//     .default('info'),
//   LOG_FORMAT: z.enum(['json', 'pretty']).default('json'),

//   // Database
//   DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

//   // Redis
//   REDIS_URL: z.string().min(1, 'REDIS_URL is required'),

//   // JWT
//   JWT_ACCESS_SECRET: z
//     .string()
//     .min(32, 'JWT_ACCESS_SECRET must be at least 32 characters'),
//   JWT_REFRESH_SECRET: z
//     .string()
//     .min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
//   JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
//   JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

//   // Session
//   SESSION_SECRET: z
//     .string()
//     .min(32, 'SESSION_SECRET must be at least 32 characters'),

//   // CORS
//   CORS_ORIGINS: z.string().default('http://localhost:5173'),
// });

// export type EnvConfig = z.infer<typeof envSchema>;

// /**
//  * Validation result
//  */
// export interface ValidationResult {
//   success: boolean;
//   errors: string[];
//   data?: EnvConfig;
// }

// /**
//  * Validate environment configuration
//  */
// export function validateConfig(): ValidationResult {
//   const result = envSchema.safeParse(process.env);

//   if (!result.success) {
//     const errors = result.error.errors.map((err) => {
//       const path = err.path.join('.');
//       return `${path}: ${err.message}`;
//     });

//     return {
//       success: false,
//       errors,
//     };
//   }

//   return {
//     success: true,
//     errors: [],
//     data: result.data,
//   };
// }

// /**
//  * Assert configuration is valid (throws on failure)
//  */
// export function assertConfigValid(): EnvConfig {
//   const result = validateConfig();

//   if (!result.success) {
//     throw new Error(
//       `Configuration validation failed:\n${result.errors.join('\n')}`
//     );
//   }

//   return result.data!;
// }

// // ==== FILE: src/config/index.ts ====

// /**
//  * Configuration Module
//  *
//  * Central configuration management with validation.
//  */

// export { config } from './configuration';
// export { validateConfig, assertConfigValid } from './validation';
// export { appConfig } from './app.config';
// export { databaseConfig } from './database.config';
// export { redisConfig } from './redis.config';
// export { jwtConfig } from './jwt.config';

// export type { Config } from './configuration';
// export type { AppConfig } from './app.config';
// export type { DatabaseConfig } from './database.config';
// export type { RedisConfig } from './redis.config';
// export type { JwtConfig } from './jwt.config';
// export type { EnvConfig, ValidationResult } from './validation';

// // ==== FILE: src/core/database/prisma.service.ts ====

// /**
//  * Prisma Service
//  *
//  * Provides Prisma client management.
//  */

// import { PrismaClient } from '@prisma/client';

// import { databaseConfig } from '@/config/database.config';
// import { appConfig } from '@/config/app.config';
// import { logger } from '@/core/logger';

// /**
//  * Create Prisma client instance
//  */
// export function createPrismaClient(): PrismaClient {
//   const logLevels: Array<'query' | 'info' | 'warn' | 'error'> = ['error', 'warn'];

//   if (databaseConfig.logQueries && appConfig.isDevelopment) {
//     logLevels.push('query');
//   }

//   const client = new PrismaClient({
//     log: logLevels.map((level) => ({
//       emit: 'event' as const,
//       level,
//     })),
//   });

//   // Set up logging
//   if (appConfig.isDevelopment) {
//     client.$on('query' as never, (e: { query: string; params: string; duration: number }) => {
//       logger.debug(
//         {
//           query: e.query,
//           params: e.params,
//           duration: e.duration,
//         },
//         'Prisma Query'
//       );
//     });
//   }

//   client.$on('error' as never, (e: { message: string }) => {
//     logger.error({ error: e.message }, 'Prisma Error');
//   });

//   client.$on('warn' as never, (e: { message: string }) => {
//     logger.warn({ warning: e.message }, 'Prisma Warning');
//   });

//   return client;
// }

// /**
//  * Global Prisma client instance
//  */
// export const prisma = createPrismaClient();

// /**
//  * Connect Prisma client
//  */
// export async function connectPrisma(): Promise<void> {
//   await prisma.$connect();
//   logger.info('Prisma client connected');
// }

// /**
//  * Disconnect Prisma client
//  */
// export async function disconnectPrisma(): Promise<void> {
//   await prisma.$disconnect();
//   logger.info('Prisma client disconnected');
// }

// // ==== FILE: src/core/cache/redis.service.ts ====

// /**
//  * Redis Service
//  *
//  * Provides Redis client management.
//  */

// import Redis from 'ioredis';

// import { redisConfig } from '@/config/redis.config';
// import { logger } from '@/core/logger';

// /**
//  * Create Redis client instance
//  */
// export function createRedisClient(): Redis {
//   const client = new Redis(redisConfig.url, {
//     keyPrefix: redisConfig.keyPrefix,
//     enableReadyCheck: redisConfig.enableReadyCheck,
//     maxRetriesPerRequest: redisConfig.maxRetriesPerRequest,
//     lazyConnect: redisConfig.lazyConnect,
//     retryStrategy: (times: number) => {
//       if (times > 10) {
//         logger.error('Redis connection failed after 10 retries');
//         return null;
//       }
//       return Math.min(times * 100, 3000);
//     },
//   });

//   client.on('connect', () => {
//     logger.info('Redis client connected');
//   });

//   client.on('ready', () => {
//     logger.info('Redis client ready');
//   });

//   client.on('error', (error) => {
//     logger.error({ error }, 'Redis client error');
//   });

//   client.on('close', () => {
//     logger.warn('Redis client connection closed');
//   });

//   client.on('reconnecting', () => {
//     logger.info('Redis client reconnecting');
//   });

//   return client;
// }

// /**
//  * Global Redis client instance
//  */
// export const redis = createRedisClient();

// /**
//  * Disconnect Redis client
//  */
// export async function disconnectRedis(): Promise<void> {
//   await redis.quit();
//   logger.info('Redis client disconnected');
// }

// // ==== FILE: src/core/cache/cache.service.ts ====

// /**
//  * Cache Service
//  *
//  * High-level caching abstraction over Redis.
//  */

// import { redis } from './redis.service';
// import { logger } from '@/core/logger';

// export interface CacheService {
//   get<T>(key: string): Promise<T | null>;
//   set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
//   del(key: string): Promise<void>;
//   exists(key: string): Promise<boolean>;
//   expire(key: string, ttlSeconds: number): Promise<void>;
//   ttl(key: string): Promise<number>;
//   keys(pattern: string): Promise<string[]>;
//   flush(): Promise<void>;
// }

// /**
//  * Cache service implementation
//  */
// export const cacheService: CacheService = {
//   /**
//    * Get a cached value
//    */
//   async get<T>(key: string): Promise<T | null> {
//     try {
//       const value = await redis.get(key);
//       if (!value) {
//         return null;
//       }
//       return JSON.parse(value) as T;
//     } catch (error) {
//       logger.error({ error, key }, 'Cache get error');
//       return null;
//     }
//   },

//   /**
//    * Set a cached value
//    */
//   async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
//     try {
//       const serialized = JSON.stringify(value);
//       if (ttlSeconds) {
//         await redis.setex(key, ttlSeconds, serialized);
//       } else {
//         await redis.set(key, serialized);
//       }
//     } catch (error) {
//       logger.error({ error, key }, 'Cache set error');
//     }
//   },

//   /**
//    * Delete a cached value
//    */
//   async del(key: string): Promise<void> {
//     try {
//       await redis.del(key);
//     } catch (error) {
//       logger.error({ error, key }, 'Cache delete error');
//     }
//   },

//   /**
//    * Check if a key exists
//    */
//   async exists(key: string): Promise<boolean> {
//     try {
//       const result = await redis.exists(key);
//       return result === 1;
//     } catch (error) {
//       logger.error({ error, key }, 'Cache exists error');
//       return false;
//     }
//   },

//   /**
//    * Set expiration on a key
//    */
//   async expire(key: string, ttlSeconds: number): Promise<void> {
//     try {
//       await redis.expire(key, ttlSeconds);
//     } catch (error) {
//       logger.error({ error, key }, 'Cache expire error');
//     }
//   },

//   /**
//    * Get TTL of a key
//    */
//   async ttl(key: string): Promise<number> {
//     try {
//       return await redis.ttl(key);
//     } catch (error) {
//       logger.error({ error, key }, 'Cache TTL error');
//       return -1;
//     }
//   },

//   /**
//    * Get keys matching a pattern
//    */
//   async keys(pattern: string): Promise<string[]> {
//     try {
//       return await redis.keys(pattern);
//     } catch (error) {
//       logger.error({ error, pattern }, 'Cache keys error');
//       return [];
//     }
//   },

//   /**
//    * Flush all keys (use with caution)
//    */
//   async flush(): Promise<void> {
//     try {
//       await redis.flushdb();
//       logger.warn('Cache flushed');
//     } catch (error) {
//       logger.error({ error }, 'Cache flush error');
//     }
//   },
// };

// // ==== FILE: src/core/logger/logger.service.ts ====

// // src/core/logger.ts
// /**
//  * Logger Service
//  *
//  * Provides structured logging with Pino.
//  */

// import pino, { Logger as PinoLogger, LoggerOptions as PinoLoggerOptions } from 'pino';
// import { FastifyBaseLogger } from 'fastify';

// import { appConfig } from '@/config/app.config';

// export type Logger = PinoLogger;
// export type LoggerOptions = PinoLoggerOptions;

// /**
//  * Create a logger instance
//  */
// export function createLogger(options: LoggerOptions = {}): Logger {
//   const isDevelopment = appConfig.nodeEnv === 'development';
//   const isTest = appConfig.nodeEnv === 'test';

//   const baseOptions: LoggerOptions = {
//     name: appConfig.name,
//     level: isTest ? 'silent' : appConfig.logLevel,
//     timestamp: pino.stdTimeFunctions.isoTime,
//     formatters: {
//       level: (label) => ({ level: label }),
//       bindings: (bindings) => ({
//         pid: bindings.pid,
//         hostname: bindings.hostname,
//         name: bindings.name,
//       }),
//     },
//     redact: {
//       paths: [
//         'password',
//         'passwordHash',
//         'accessToken',
//         'refreshToken',
//         'token',
//         'secret',
//         'apiKey',
//         'authorization',
//         'cookie',
//         'req.headers.authorization',
//         'req.headers.cookie',
//       ],
//       censor: '[REDACTED]',
//     },
//   };

//   // Use pretty printing in development
//   if (isDevelopment && appConfig.logFormat === 'pretty') {
//     return pino({
//       ...baseOptions,
//       ...options,
//       transport: {
//         target: 'pino-pretty',
//         options: {
//           colorize: true,
//           translateTime: 'SYS:standard',
//           ignore: 'pid,hostname',
//           singleLine: false,
//         },
//       },
//     });
//   }

//   return pino({
//     ...baseOptions,
//     ...options,
//   });
// }

// /**
//  * Default application logger
//  */
// export const logger = createLogger();

// /**
//  * Logger compatible with Fastify's expected type
//  * Use this when passing to Fastify
//  */
// export const fastifyLogger = logger as FastifyBaseLogger;

// /**
//  * Create a child logger with additional context
//  */
// export function createChildLogger(
//   bindings: Record<string, unknown>
// ): Logger {
//   return logger.child(bindings);
// }

// // ==== FILE: src/core/index.ts ====

// /**
//  * Core Module Exports
//  */

// export * from './logger';
// export * from './database';
// export * from './cache';

// // ==== FILE: src/common/errors/base.error.ts ====

// /**
//  * Base Error Class
//  *
//  * Foundation for all custom application errors.
//  */

// import { ERROR_CODES, ErrorCode } from '@/common/constants/error-codes.constants';
// import { HTTP_STATUS } from '@/common/constants/http-status.constants';

// export interface ErrorDetails {
//   [key: string]: unknown;
// }

// export interface SerializedError {
//   success: false;
//   error: {
//     code: string;
//     message: string;
//     statusCode: number;
//     details?: ErrorDetails;
//     stack?: string;
//   };
//   timestamp: string;
//   requestId?: string;
// }

// /**
//  * Base error class for all application errors
//  */
// export class BaseError extends Error {
//   public readonly code: ErrorCode;
//   public readonly statusCode: number;
//   public readonly details?: ErrorDetails;
//   public readonly isOperational: boolean;
//   public readonly timestamp: Date;

//   constructor(
//     message: string,
//     code: ErrorCode = ERROR_CODES.INTERNAL_ERROR,
//     statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
//     details?: ErrorDetails,
//     isOperational: boolean = true
//   ) {
//     super(message);

//     this.name = this.constructor.name;
//     this.code = code;
//     this.statusCode = statusCode;
//     this.details = details;
//     this.isOperational = isOperational;
//     this.timestamp = new Date();

//     // Maintains proper stack trace for where error was thrown
//     Error.captureStackTrace(this, this.constructor);
//   }

//   /**
//    * Serialize error for API response
//    */
//   serialize(requestId?: string, includeStack: boolean = false): SerializedError {
//     return {
//       success: false,
//       error: {
//         code: this.code,
//         message: this.message,
//         statusCode: this.statusCode,
//         details: this.details,
//         ...(includeStack && { stack: this.stack }),
//       },
//       timestamp: this.timestamp.toISOString(),
//       ...(requestId && { requestId }),
//     };
//   }

//   /**
//    * Convert error to JSON
//    */
//   toJSON(): Record<string, unknown> {
//     return {
//       name: this.name,
//       message: this.message,
//       code: this.code,
//       statusCode: this.statusCode,
//       details: this.details,
//       timestamp: this.timestamp.toISOString(),
//     };
//   }
// }

// // ==== FILE: src/common/errors/http.errors.ts ====

// /**
//  * HTTP Errors
//  *
//  * Standard HTTP error classes for API responses.
//  */

// import { BaseError, ErrorDetails } from './base.error';
// import { ERROR_CODES, ErrorCode } from '@/common/constants/error-codes.constants';
// import { HTTP_STATUS } from '@/common/constants/http-status.constants';

// /**
//  * Generic HTTP Error
//  */
// export class HttpError extends BaseError {
//   constructor(
//     message: string,
//     statusCode: number,
//     code?: ErrorCode,
//     details?: ErrorDetails
//   ) {
//     super(message, code || ERROR_CODES.INTERNAL_ERROR, statusCode, details);
//   }
// }

// /**
//  * 400 Bad Request
//  */
// export class BadRequestError extends BaseError {
//   constructor(
//     message: string = 'Bad Request',
//     code: ErrorCode = ERROR_CODES.BAD_REQUEST,
//     details?: ErrorDetails
//   ) {
//     super(message, code, HTTP_STATUS.BAD_REQUEST, details);
//   }
// }

// /**
//  * 401 Unauthorized
//  */
// export class UnauthorizedError extends BaseError {
//   constructor(
//     message: string = 'Unauthorized',
//     code: ErrorCode = ERROR_CODES.AUTH_REQUIRED,
//     details?: ErrorDetails
//   ) {
//     super(message, code, HTTP_STATUS.UNAUTHORIZED, details);
//   }
// }

// /**
//  * 403 Forbidden
//  */
// export class ForbiddenError extends BaseError {
//   constructor(
//     message: string = 'Forbidden',
//     code: ErrorCode = ERROR_CODES.FORBIDDEN,
//     details?: ErrorDetails
//   ) {
//     super(message, code, HTTP_STATUS.FORBIDDEN, details);
//   }
// }

// /**
//  * 404 Not Found
//  */
// export class NotFoundError extends BaseError {
//   constructor(
//     message: string = 'Resource not found',
//     code: ErrorCode = ERROR_CODES.NOT_FOUND,
//     details?: ErrorDetails
//   ) {
//     super(message, code, HTTP_STATUS.NOT_FOUND, details);
//   }
// }

// /**
//  * 409 Conflict
//  */
// export class ConflictError extends BaseError {
//   constructor(
//     message: string = 'Conflict',
//     code: ErrorCode = ERROR_CODES.CONFLICT,
//     details?: ErrorDetails
//   ) {
//     super(message, code, HTTP_STATUS.CONFLICT, details);
//   }
// }

// /**
//  * 422 Unprocessable Entity
//  */
// export class UnprocessableEntityError extends BaseError {
//   constructor(
//     message: string = 'Unprocessable Entity',
//     code: ErrorCode = ERROR_CODES.VALIDATION_ERROR,
//     details?: ErrorDetails
//   ) {
//     super(message, code, HTTP_STATUS.UNPROCESSABLE_ENTITY, details);
//   }
// }

// /**
//  * 429 Too Many Requests
//  */
// export class TooManyRequestsError extends BaseError {
//   public readonly retryAfter?: number;

//   constructor(
//     message: string = 'Too many requests',
//     retryAfter?: number,
//     details?: ErrorDetails
//   ) {
//     super(message, ERROR_CODES.RATE_LIMITED, HTTP_STATUS.TOO_MANY_REQUESTS, details);
//     this.retryAfter = retryAfter;
//   }
// }

// /**
//  * 500 Internal Server Error
//  */
// export class InternalServerError extends BaseError {
//   constructor(
//     message: string = 'Internal Server Error',
//     code: ErrorCode = ERROR_CODES.INTERNAL_ERROR,
//     details?: ErrorDetails
//   ) {
//     super(message, code, HTTP_STATUS.INTERNAL_SERVER_ERROR, details, false);
//   }
// }

// /**
//  * 503 Service Unavailable
//  */
// export class ServiceUnavailableError extends BaseError {
//   constructor(
//     message: string = 'Service Unavailable',
//     code: ErrorCode = ERROR_CODES.SERVICE_UNAVAILABLE,
//     details?: ErrorDetails
//   ) {
//     super(message, code, HTTP_STATUS.SERVICE_UNAVAILABLE, details);
//   }
// }

// // ==== FILE: src/common/errors/validation.error.ts ====

// /**
//  * Validation Error
//  *
//  * Error class for request validation failures.
//  */

// import { BaseError, ErrorDetails } from './base.error';
// import { ERROR_CODES } from '@/common/constants/error-codes.constants';
// import { HTTP_STATUS } from '@/common/constants/http-status.constants';

// export interface ValidationErrorField {
//   field: string;
//   message: string;
//   value?: unknown;
//   constraint?: string;
// }

// export interface ValidationErrorDetails extends ErrorDetails {
//   errors: ValidationErrorField[];
// }

// /**
//  * Validation error for request validation failures
//  */
// export class ValidationError extends BaseError {
//   public readonly errors: ValidationErrorField[];

//   constructor(
//     errors: ValidationErrorField[],
//     message: string = 'Validation failed'
//   ) {
//     const details: ValidationErrorDetails = { errors };
//     super(
//       message,
//       ERROR_CODES.VALIDATION_ERROR,
//       HTTP_STATUS.UNPROCESSABLE_ENTITY,
//       details
//     );
//     this.errors = errors;
//   }

//   /**
//    * Create validation error from Zod error
//    */
//   static fromZodError(zodError: { issues: Array<{ path: (string | number)[]; message: string }> }): ValidationError {
//     const errors: ValidationErrorField[] = zodError.issues.map((issue) => ({
//       field: issue.path.join('.'),
//       message: issue.message,
//     }));
//     return new ValidationError(errors);
//   }

//   /**
//    * Create validation error from AJV errors
//    */
//   static fromAjvErrors(
//     ajvErrors: Array<{ instancePath: string; message?: string; params?: Record<string, unknown> }>
//   ): ValidationError {
//     const errors: ValidationErrorField[] = ajvErrors.map((error) => ({
//       field: error.instancePath.replace(/^\//, '').replace(/\//g, '.') || 'root',
//       message: error.message || 'Invalid value',
//       constraint: error.params ? JSON.stringify(error.params) : undefined,
//     }));
//     return new ValidationError(errors);
//   }

//   /**
//    * Create single field validation error
//    */
//   static field(field: string, message: string, value?: unknown): ValidationError {
//     return new ValidationError([{ field, message, value }]);
//   }
// }

// // ==== FILE: src/common/filters/global-exception.filter.ts ====

// /**
//  * Global Exception Filter
//  *
//  * Handles all uncaught errors and formats consistent error responses.
//  */

// import { FastifyError, FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

// import { BaseError, SerializedError } from '@/common/errors/base.error';
// import { ValidationError } from '@/common/errors/validation.error';
// import { InternalServerError } from '@/common/errors/http.errors';
// import { ERROR_CODES } from '@/common/constants/error-codes.constants';
// import { HTTP_STATUS } from '@/common/constants/http-status.constants';
// import { logger } from '@/core/logger';
// import { appConfig } from '@/config/app.config';

// /**
//  * Interface for Prisma known request errors (duck typing)
//  */
// interface PrismaKnownRequestError extends Error {
//   code: string;
//   meta?: Record<string, unknown>;
//   clientVersion?: string;
// }

// /**
//  * Global exception handler for Fastify
//  */
// export function globalExceptionFilter(
//    this: FastifyInstance, 
//   error: Error,
//   request: FastifyRequest,
//   reply: FastifyReply
// ): void {
//   const requestId = request.id;
//   const includeStack = appConfig.isDevelopment;

//   // Log the error
//   logError(error, request);

//   // Handle different error types
//   let response: SerializedError;

//   if (error instanceof BaseError) {
//     // Custom application error
//     response = error.serialize(requestId, includeStack);
//   } else if (isValidationError(error)) {
//     // Fastify/AJV validation error
//     const validationError = handleValidationError(error);
//     response = validationError.serialize(requestId, includeStack);
//   } else if (isPrismaError(error)) {
//     // Prisma database error
//     const prismaError = handlePrismaError(error);
//     response = prismaError.serialize(requestId, includeStack);
//   } else if (isFastifyError(error)) {
//     // Fastify framework error
//     const fastifyError = handleFastifyError(error);
//     response = fastifyError.serialize(requestId, includeStack);
//   } else {
//     // Unknown error - wrap in InternalServerError
//     const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
//     const internalError = new InternalServerError(
//       appConfig.isProduction ? 'An unexpected error occurred' : errorMessage
//     );
//     response = internalError.serialize(requestId, includeStack);
//   }

//   // Send response
//   reply.status(response.error.statusCode).send(response);
// }

// /**
//  * Log error with context
//  */
// function logError(error: Error, request: FastifyRequest): void {
//   const errorContext = {
//     error: {
//       name: error.name,
//       message: error.message,
//       stack: error.stack,
//     },
//     request: {
//       id: request.id,
//       method: request.method,
//       url: request.url,
//       ip: request.ip,
//       userAgent: request.headers['user-agent'],
//     },
//   };

//   if (error instanceof BaseError && error.isOperational) {
//     logger.warn(errorContext, `Operational error: ${error.message}`);
//   } else {
//     logger.error(errorContext, `Unexpected error: ${error.message}`);
//   }
// }

// /**
//  * Check if error is a validation error
//  */
// function isValidationError(error: unknown): error is FastifyError & { validation: unknown[] } {
//   return (
//     typeof error === 'object' &&
//     error !== null &&
//     'validation' in error &&
//     Array.isArray((error as Record<string, unknown>).validation)
//   );
// }

// /**
//  * Handle validation errors
//  */
// function handleValidationError(error: FastifyError & { validation: unknown[] }): ValidationError {
//   const errors = (error.validation || []).map((err: unknown) => {
//     const validationErr = err as { instancePath?: string; message?: string; params?: unknown };
//     return {
//       field: validationErr.instancePath?.replace(/^\//, '').replace(/\//g, '.') || 'unknown',
//       message: validationErr.message || 'Invalid value',
//     };
//   });
//   return new ValidationError(errors, 'Validation failed');
// }

// /**
//  * Check if error is a Prisma error using duck typing
//  * This avoids issues with Prisma namespace exports
//  */
// function isPrismaError(error: unknown): error is PrismaKnownRequestError {
//   if (typeof error !== 'object' || error === null) {
//     return false;
//   }

//   const prismaError = error as Record<string, unknown>;
  
//   return (
//     typeof prismaError.code === 'string' &&
//     prismaError.code.startsWith('P') &&
//     'clientVersion' in prismaError
//   );
// }

// /**
//  * Handle Prisma errors
//  */
// function handlePrismaError(error: PrismaKnownRequestError): BaseError {
//   switch (error.code) {
//     case 'P2002': {
//       // Unique constraint violation
//       const target = Array.isArray(error.meta?.target)
//         ? (error.meta.target as string[]).join(', ')
//         : 'field';
//       return new BaseError(
//         `A record with this ${target} already exists`,
//         ERROR_CODES.CONFLICT,
//         HTTP_STATUS.CONFLICT,
//         { target }
//       );
//     }
//     case 'P2025':
//       // Record not found
//       return new BaseError(
//         'Record not found',
//         ERROR_CODES.NOT_FOUND,
//         HTTP_STATUS.NOT_FOUND
//       );
//     case 'P2003':
//       // Foreign key constraint failed
//       return new BaseError(
//         'Related record not found',
//         ERROR_CODES.BAD_REQUEST,
//         HTTP_STATUS.BAD_REQUEST
//       );
//     case 'P2014':
//       // Required relation violation
//       return new BaseError(
//         'Required relation violation',
//         ERROR_CODES.BAD_REQUEST,
//         HTTP_STATUS.BAD_REQUEST
//       );
//     default:
//       logger.error({ code: error.code, meta: error.meta }, 'Unhandled Prisma error');
//       return new InternalServerError('Database error occurred');
//   }
// }

// /**
//  * Check if error is a Fastify error
//  */
// function isFastifyError(error: unknown): error is FastifyError {
//   return (
//     typeof error === 'object' &&
//     error !== null &&
//     'statusCode' in error &&
//     typeof (error as Record<string, unknown>).statusCode === 'number'
//   );
// }

// /**
//  * Handle Fastify errors
//  */
// function handleFastifyError(error: FastifyError): BaseError {
//   const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

//   // Map status codes to error codes
//   const codeMap: Record<number, string> = {
//     400: ERROR_CODES.BAD_REQUEST,
//     401: ERROR_CODES.AUTH_REQUIRED,
//     403: ERROR_CODES.FORBIDDEN,
//     404: ERROR_CODES.NOT_FOUND,
//     429: ERROR_CODES.RATE_LIMITED,
//   };

//   const code = codeMap[statusCode] || ERROR_CODES.INTERNAL_ERROR;

//   return new BaseError(
//     error.message,
//     code as (typeof ERROR_CODES)[keyof typeof ERROR_CODES],
//     statusCode
//   );
// }

// // ==== FILE: src/common/interfaces/request.interface.ts ====

// /**
//  * Request Interfaces
//  */

// import type { FastifyRequest } from 'fastify';
// import type { UserRole } from '@prisma/client';

// /**
//  * Authenticated user data
//  */
// export interface AuthUser {
//   id: bigint;
//   publicId: string;
//   email: string;
//   username: string;
//   displayName: string;
//   role: UserRole;
//   emailVerified: boolean;
// }

// /**
//  * JWT Token Payload
//  */
// export interface TokenPayload {
//   sub: string;
//   email: string;
//   role: UserRole;
//   type: 'access' | 'refresh';
//   iat: number;
//   exp: number;
//   iss: string;
//   aud: string;
// }

// /**
//  * Extended request with authentication
//  */
// export interface AuthenticatedRequest extends FastifyRequest {
//   user: AuthUser;
//   jwtPayload: TokenPayload;
// }

// /**
//  * Request with optional authentication
//  */
// export interface OptionalAuthRequest extends FastifyRequest {
//   user?: AuthUser;
//   jwtPayload?: TokenPayload;
// }

// /**
//  * Request context for logging
//  */
// export interface RequestContext {
//   requestId: string;
//   method: string;
//   url: string;
//   ip: string;
//   userAgent?: string;
//   userId?: string;
// }

// /**
//  * Sort options
//  */
// export interface SortOptions {
//   field: string;
//   order: 'asc' | 'desc';
// }

// /**
//  * Filter options
//  */
// export interface FilterOptions {
//   [key: string]: string | number | boolean | string[] | undefined;
// }

// /**
//  * Date range filter
//  */
// export interface DateRangeFilter {
//   from?: Date;
//   to?: Date;
// }

// // ==== FILE: src/common/interfaces/response.interface.ts ====

// /**
//  * Response Interfaces
//  */

// /**
//  * Base API response
//  */
// export interface ApiResponse<T = unknown> {
//   success: boolean;
//   data?: T;
//   message?: string;
//   timestamp: string;
//   requestId?: string;
// }

// /**
//  * Success response
//  */
// export interface SuccessResponse<T = unknown> extends ApiResponse<T> {
//   success: true;
//   data: T;
// }

// /**
//  * Error response
//  */
// export interface ErrorResponse extends ApiResponse {
//   success: false;
//   error: {
//     code: string;
//     message: string;
//     statusCode: number;
//     details?: Record<string, unknown>;
//   };
// }

// /**
//  * List response with items
//  */
// export interface ListResponse<T> extends SuccessResponse<T[]> {
//   meta?: {
//     total?: number;
//     count: number;
//   };
// }

// /**
//  * Health check response
//  */
// export interface HealthCheckResponse {
//   status: 'healthy' | 'degraded' | 'unhealthy';
//   timestamp: string;
//   version: string;
//   uptime: number;
//   checks?: {
//     [service: string]: {
//       status: 'up' | 'down';
//       latency?: number;
//       message?: string;
//     };
//   };
// }

// /**
//  * Create success response helper
//  */
// export function createSuccessResponse<T>(
//   data: T,
//   requestId?: string
// ): SuccessResponse<T> {
//   return {
//     success: true,
//     data,
//     timestamp: new Date().toISOString(),
//     requestId,
//   };
// }

// /**
//  * Create list response helper
//  */
// export function createListResponse<T>(
//   items: T[],
//   total?: number,
//   requestId?: string
// ): ListResponse<T> {
//   return {
//     success: true,
//     data: items,
//     meta: {
//       count: items.length,
//       total,
//     },
//     timestamp: new Date().toISOString(),
//     requestId,
//   };
// }

// // ==== FILE: src/common/middleware/logger.middleware.ts ====

// /**
//  * Logger Middleware
//  *
//  * Logs incoming requests and outgoing responses.
//  */

// import { FastifyPluginAsync } from 'fastify';
// import fp from 'fastify-plugin';

// import { logger } from '@/core/logger';
// import { appConfig } from '@/config/app.config';

// const loggerMiddlewarePlugin: FastifyPluginAsync = async (fastify) => {
//   // Log incoming requests
//   fastify.addHook('onRequest', async (request) => {
//     // Skip health check endpoints in production
//     if (appConfig.isProduction && request.url.startsWith('/health')) {
//       return;
//     }

//     logger.info(
//       {
//         requestId: request.id,
//         method: request.method,
//         url: request.url,
//         ip: request.ip,
//         userAgent: request.headers['user-agent'],
//       },
//       'Incoming request'
//     );
//   });

//   // Log outgoing responses
//   fastify.addHook('onResponse', async (request, reply) => {
//     // Skip health check endpoints in production
//     if (appConfig.isProduction && request.url.startsWith('/health')) {
//       return;
//     }

//     // Calculate request duration
//     const duration = request.startTime
//       ? Number(process.hrtime.bigint() - request.startTime) / 1_000_000 // Convert to ms
//       : 0;

//     const logData = {
//       requestId: request.id,
//       method: request.method,
//       url: request.url,
//       statusCode: reply.statusCode,
//       duration: `${duration.toFixed(2)}ms`,
//     };

//     if (reply.statusCode >= 500) {
//       logger.error(logData, 'Request completed with error');
//     } else if (reply.statusCode >= 400) {
//       logger.warn(logData, 'Request completed with client error');
//     } else {
//       logger.info(logData, 'Request completed');
//     }
//   });
// };

// export const loggerMiddleware = fp(loggerMiddlewarePlugin, {
//   name: 'logger-middleware',
// });

// // ==== FILE: src/common/middleware/request-id.middleware.ts ====

// /**
//  * Request ID Middleware
//  *
//  * Ensures every request has a unique identifier for tracing.
//  */

// import { FastifyPluginAsync } from 'fastify';
// import fp from 'fastify-plugin';
// import { randomUUID } from 'crypto';

// import { HEADERS } from '@/common/constants/app.constants';

// const requestIdMiddlewarePlugin: FastifyPluginAsync = async (fastify) => {
//   fastify.addHook('onRequest', async (request, reply) => {
//     // Use existing request ID from header or generate new one
//     const requestId =
//       (request.headers[HEADERS.REQUEST_ID] as string) || randomUUID();

//     // Set request ID on the request object
//     request.requestId = requestId;

//     // Also track the start time for request duration logging
//     request.startTime = process.hrtime.bigint();

//     // Add request ID to response headers
//     reply.header(HEADERS.REQUEST_ID, requestId);
//   });
// };

// export const requestIdMiddleware = fp(requestIdMiddlewarePlugin, {
//   name: 'request-id-middleware',
// });

// // ==== FILE: src/common/middleware/security.middleware.ts ====

// /**
//  * Security Middleware
//  *
//  * Additional security measures for requests.
//  */

// import { FastifyPluginAsync } from 'fastify';
// import fp from 'fastify-plugin';

// const securityMiddlewarePlugin: FastifyPluginAsync = async (fastify) => {
//   // Remove sensitive headers from requests
//   fastify.addHook('onRequest', async (request) => {
//     // Remove any server-side-only headers that might have leaked
//     delete request.headers['x-powered-by'];
//   });

//   // Add security headers to responses
//   fastify.addHook('onSend', async (_request, reply, payload) => {
//     // Prevent MIME type sniffing
//     reply.header('X-Content-Type-Options', 'nosniff');

//     // Prevent clickjacking
//     reply.header('X-Frame-Options', 'DENY');

//     // Enable XSS filter
//     reply.header('X-XSS-Protection', '1; mode=block');

//     // Control referrer information
//     reply.header('Referrer-Policy', 'strict-origin-when-cross-origin');

//     // Remove server identification
//     reply.removeHeader('X-Powered-By');

//     return payload;
//   });
// };

// export const securityMiddleware = fp(securityMiddlewarePlugin, {
//   name: 'security-middleware',
// });

// // ==== FILE: src/common/dto/pagination.dto.ts ====

// /**
//  * Pagination DTOs
//  */

// import { PAGINATION } from '@/common/constants/app.constants';

// /**
//  * Pagination query parameters
//  */
// export interface PaginationQuery {
//   page?: number;
//   limit?: number;
//   sortBy?: string;
//   sortOrder?: 'asc' | 'desc';
// }

// /**
//  * Validated pagination parameters
//  */
// export interface PaginationParams {
//   page: number;
//   limit: number;
//   skip: number;
//   sortBy: string;
//   sortOrder: 'asc' | 'desc';
// }

// /**
//  * Pagination metadata in response
//  */
// export interface PaginationMeta {
//   page: number;
//   limit: number;
//   totalItems: number;
//   totalPages: number;
//   hasNextPage: boolean;
//   hasPreviousPage: boolean;
// }

// /**
//  * Paginated response wrapper
//  */
// export interface PaginatedResponse<T> {
//   success: true;
//   data: T[];
//   meta: PaginationMeta;
// }

// /**
//  * Parse and validate pagination query
//  */
// export function parsePaginationQuery(
//   query: PaginationQuery,
//   defaultSortBy: string = 'createdAt'
// ): PaginationParams {
//   let page = Number(query.page) || PAGINATION.DEFAULT_PAGE;
//   let limit = Number(query.limit) || PAGINATION.DEFAULT_LIMIT;

//   // Ensure valid bounds
//   page = Math.max(1, page);
//   limit = Math.min(Math.max(PAGINATION.MIN_LIMIT, limit), PAGINATION.MAX_LIMIT);

//   const skip = (page - 1) * limit;
//   const sortBy = query.sortBy || defaultSortBy;
//   const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';

//   return { page, limit, skip, sortBy, sortOrder };
// }

// /**
//  * Create pagination metadata
//  */
// export function createPaginationMeta(
//   page: number,
//   limit: number,
//   totalItems: number
// ): PaginationMeta {
//   const totalPages = Math.ceil(totalItems / limit);

//   return {
//     page,
//     limit,
//     totalItems,
//     totalPages,
//     hasNextPage: page < totalPages,
//     hasPreviousPage: page > 1,
//   };
// }

// /**
//  * Create paginated response
//  */
// export function createPaginatedResponse<T>(
//   data: T[],
//   page: number,
//   limit: number,
//   totalItems: number
// ): PaginatedResponse<T> {
//   return {
//     success: true,
//     data,
//     meta: createPaginationMeta(page, limit, totalItems),
//   };
// }

// // ==== FILE: src/common/constants/app.constants.ts ====

// /**
//  * Application Constants
//  */

// /**
//  * Pagination defaults
//  */
// export const PAGINATION = {
//   DEFAULT_PAGE: 1,
//   DEFAULT_LIMIT: 20,
//   MAX_LIMIT: 100,
//   MIN_LIMIT: 1,
// } as const;

// /**
//  * Cache TTL values (in seconds)
//  */
// export const CACHE_TTL = {
//   SHORT: 60, // 1 minute
//   MEDIUM: 300, // 5 minutes
//   LONG: 3600, // 1 hour
//   DAY: 86400, // 24 hours
//   WEEK: 604800, // 7 days
// } as const;

// /**
//  * Rate limit windows (in milliseconds)
//  */
// export const RATE_LIMIT_WINDOW = {
//   SECOND: 1000,
//   MINUTE: 60000,
//   HOUR: 3600000,
//   DAY: 86400000,
// } as const;

// /**
//  * Token expiration times
//  */
// export const TOKEN_EXPIRY = {
//   EMAIL_VERIFICATION: '24h',
//   PASSWORD_RESET: '1h',
//   MFA_SETUP: '10m',
//   REFRESH_TOKEN: '7d',
//   ACCESS_TOKEN: '15m',
// } as const;

// /**
//  * File upload limits
//  */
// export const FILE_LIMITS = {
//   MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
//   MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
//   MAX_AVATAR_SIZE: 2 * 1024 * 1024, // 2MB
//   MAX_FILES_PER_REQUEST: 10,
// } as const;

// /**
//  * Content limits
//  */
// export const CONTENT_LIMITS = {
//   MAX_TITLE_LENGTH: 200,
//   MAX_SLUG_LENGTH: 100,
//   MAX_SYNOPSIS_LENGTH: 5000,
//   MAX_CHAPTER_CONTENT_LENGTH: 500000,
//   MAX_COMMENT_LENGTH: 10000,
//   MAX_BIO_LENGTH: 1000,
//   MAX_TAGS_PER_SERIES: 20,
//   MAX_GENRES_PER_SERIES: 5,
// } as const;

// /**
//  * Session settings
//  */
// export const SESSION = {
//   MAX_SESSIONS_PER_USER: 10,
//   IDLE_TIMEOUT_HOURS: 24,
//   ABSOLUTE_TIMEOUT_DAYS: 30,
// } as const;

// /**
//  * API versioning
//  */
// export const API = {
//   CURRENT_VERSION: 'v1',
//   SUPPORTED_VERSIONS: ['v1'],
//   PREFIX: '/api',
// } as const;

// /**
//  * Request headers
//  */
// export const HEADERS = {
//   REQUEST_ID: 'x-request-id',
//   CORRELATION_ID: 'x-correlation-id',
//   AUTHORIZATION: 'authorization',
//   API_KEY: 'x-api-key',
//   RATE_LIMIT_REMAINING: 'x-ratelimit-remaining',
//   RATE_LIMIT_RESET: 'x-ratelimit-reset',
// } as const;

// /**
//  * Regex patterns
//  */
// export const REGEX = {
//   EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//   USERNAME: /^[a-zA-Z0-9_-]{3,30}$/,
//   SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
//   UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
//   CUID: /^c[a-z0-9]{24}$/,
//   HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
//   URL: /^https?:\/\/.+/,
//   PHONE: /^\+?[1-9]\d{1,14}$/,
// } as const;

// // ==== FILE: src/common/constants/error-codes.constants.ts ====

// /**
//  * Application Error Codes
//  *
//  * Standardized error codes for API responses.
//  * Format: DOMAIN_ERROR_TYPE
//  */

// export const ERROR_CODES = {
//   // ─────────────────────────────────────────────────────────────────────────
//   // General Errors (GEN)
//   // ─────────────────────────────────────────────────────────────────────────
//   INTERNAL_ERROR: 'GEN_INTERNAL_ERROR',
//   VALIDATION_ERROR: 'GEN_VALIDATION_ERROR',
//   NOT_FOUND: 'GEN_NOT_FOUND',
//   BAD_REQUEST: 'GEN_BAD_REQUEST',
//   FORBIDDEN: 'GEN_FORBIDDEN',
//   METHOD_NOT_ALLOWED: 'GEN_METHOD_NOT_ALLOWED',
//   CONFLICT: 'GEN_CONFLICT',
//   RATE_LIMITED: 'GEN_RATE_LIMITED',
//   SERVICE_UNAVAILABLE: 'GEN_SERVICE_UNAVAILABLE',

//   // ─────────────────────────────────────────────────────────────────────────
//   // Authentication Errors (AUTH)
//   // ─────────────────────────────────────────────────────────────────────────
//   AUTH_REQUIRED: 'AUTH_REQUIRED',
//   AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
//   AUTH_INVALID_TOKEN: 'AUTH_INVALID_TOKEN',
//   AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
//   AUTH_TOKEN_REVOKED: 'AUTH_TOKEN_REVOKED',
//   AUTH_REFRESH_TOKEN_INVALID: 'AUTH_REFRESH_TOKEN_INVALID',
//   AUTH_REFRESH_TOKEN_EXPIRED: 'AUTH_REFRESH_TOKEN_EXPIRED',
//   AUTH_SESSION_EXPIRED: 'AUTH_SESSION_EXPIRED',
//   AUTH_SESSION_INVALID: 'AUTH_SESSION_INVALID',
//   AUTH_MFA_REQUIRED: 'AUTH_MFA_REQUIRED',
//   AUTH_MFA_INVALID: 'AUTH_MFA_INVALID',
//   AUTH_EMAIL_NOT_VERIFIED: 'AUTH_EMAIL_NOT_VERIFIED',
//   AUTH_ACCOUNT_LOCKED: 'AUTH_ACCOUNT_LOCKED',
//   AUTH_ACCOUNT_SUSPENDED: 'AUTH_ACCOUNT_SUSPENDED',
//   AUTH_ACCOUNT_BANNED: 'AUTH_ACCOUNT_BANNED',
//   AUTH_ACCOUNT_DELETED: 'AUTH_ACCOUNT_DELETED',

//   // ─────────────────────────────────────────────────────────────────────────
//   // User Errors (USER)
//   // ─────────────────────────────────────────────────────────────────────────
//   USER_NOT_FOUND: 'USER_NOT_FOUND',
//   USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
//   USER_EMAIL_TAKEN: 'USER_EMAIL_TAKEN',
//   USER_USERNAME_TAKEN: 'USER_USERNAME_TAKEN',
//   USER_INVALID_PASSWORD: 'USER_INVALID_PASSWORD',
//   USER_PASSWORD_TOO_WEAK: 'USER_PASSWORD_TOO_WEAK',
//   USER_SAME_PASSWORD: 'USER_SAME_PASSWORD',
//   USER_PROFILE_INCOMPLETE: 'USER_PROFILE_INCOMPLETE',

//   // ─────────────────────────────────────────────────────────────────────────
//   // Site Errors (SITE)
//   // ─────────────────────────────────────────────────────────────────────────
//   SITE_NOT_FOUND: 'SITE_NOT_FOUND',
//   SITE_SLUG_TAKEN: 'SITE_SLUG_TAKEN',
//   SITE_LIMIT_REACHED: 'SITE_LIMIT_REACHED',
//   SITE_SUSPENDED: 'SITE_SUSPENDED',
//   SITE_DOMAIN_INVALID: 'SITE_DOMAIN_INVALID',
//   SITE_DOMAIN_NOT_VERIFIED: 'SITE_DOMAIN_NOT_VERIFIED',

//   // ─────────────────────────────────────────────────────────────────────────
//   // Content Errors (CONTENT)
//   // ─────────────────────────────────────────────────────────────────────────
//   SERIES_NOT_FOUND: 'CONTENT_SERIES_NOT_FOUND',
//   SERIES_SLUG_TAKEN: 'CONTENT_SERIES_SLUG_TAKEN',
//   SERIES_LIMIT_REACHED: 'CONTENT_SERIES_LIMIT_REACHED',
//   CHAPTER_NOT_FOUND: 'CONTENT_CHAPTER_NOT_FOUND',
//   CHAPTER_SLUG_TAKEN: 'CONTENT_CHAPTER_SLUG_TAKEN',
//   CHAPTER_LIMIT_REACHED: 'CONTENT_CHAPTER_LIMIT_REACHED',
//   CHAPTER_ACCESS_DENIED: 'CONTENT_CHAPTER_ACCESS_DENIED',
//   CHAPTER_NOT_PUBLISHED: 'CONTENT_CHAPTER_NOT_PUBLISHED',

//   // ─────────────────────────────────────────────────────────────────────────
//   // Subscription Errors (SUB)
//   // ─────────────────────────────────────────────────────────────────────────
//   SUBSCRIPTION_NOT_FOUND: 'SUB_NOT_FOUND',
//   SUBSCRIPTION_ALREADY_EXISTS: 'SUB_ALREADY_EXISTS',
//   SUBSCRIPTION_EXPIRED: 'SUB_EXPIRED',
//   SUBSCRIPTION_CANCELLED: 'SUB_CANCELLED',
//   SUBSCRIPTION_TIER_NOT_FOUND: 'SUB_TIER_NOT_FOUND',
//   SUBSCRIPTION_TIER_UNAVAILABLE: 'SUB_TIER_UNAVAILABLE',
//   SUBSCRIPTION_UPGRADE_FAILED: 'SUB_UPGRADE_FAILED',
//   SUBSCRIPTION_DOWNGRADE_FAILED: 'SUB_DOWNGRADE_FAILED',

//   // ─────────────────────────────────────────────────────────────────────────
//   // Payment Errors (PAY)
//   // ─────────────────────────────────────────────────────────────────────────
//   PAYMENT_FAILED: 'PAY_FAILED',
//   PAYMENT_DECLINED: 'PAY_DECLINED',
//   PAYMENT_EXPIRED: 'PAY_EXPIRED',
//   PAYMENT_NOT_FOUND: 'PAY_NOT_FOUND',
//   PAYMENT_ALREADY_PROCESSED: 'PAY_ALREADY_PROCESSED',
//   PAYMENT_REFUND_FAILED: 'PAY_REFUND_FAILED',
//   PAYMENT_METHOD_INVALID: 'PAY_METHOD_INVALID',
//   PAYMENT_GATEWAY_ERROR: 'PAY_GATEWAY_ERROR',
//   PAYMENT_WEBHOOK_INVALID: 'PAY_WEBHOOK_INVALID',

//   // ─────────────────────────────────────────────────────────────────────────
//   // File/Media Errors (FILE)
//   // ─────────────────────────────────────────────────────────────────────────
//   FILE_NOT_FOUND: 'FILE_NOT_FOUND',
//   FILE_TOO_LARGE: 'FILE_TOO_LARGE',
//   FILE_TYPE_NOT_ALLOWED: 'FILE_TYPE_NOT_ALLOWED',
//   FILE_UPLOAD_FAILED: 'FILE_UPLOAD_FAILED',
//   FILE_PROCESSING_FAILED: 'FILE_PROCESSING_FAILED',
//   STORAGE_LIMIT_REACHED: 'FILE_STORAGE_LIMIT_REACHED',

//   // ─────────────────────────────────────────────────────────────────────────
//   // API Key Errors (API)
//   // ─────────────────────────────────────────────────────────────────────────
//   API_KEY_INVALID: 'API_KEY_INVALID',
//   API_KEY_EXPIRED: 'API_KEY_EXPIRED',
//   API_KEY_REVOKED: 'API_KEY_REVOKED',
//   API_KEY_RATE_LIMITED: 'API_KEY_RATE_LIMITED',
//   API_KEY_PERMISSION_DENIED: 'API_KEY_PERMISSION_DENIED',

//   // ─────────────────────────────────────────────────────────────────────────
//   // Verification Errors (VER)
//   // ─────────────────────────────────────────────────────────────────────────
//   VERIFICATION_TOKEN_INVALID: 'VER_TOKEN_INVALID',
//   VERIFICATION_TOKEN_EXPIRED: 'VER_TOKEN_EXPIRED',
//   VERIFICATION_TOKEN_USED: 'VER_TOKEN_USED',
//   VERIFICATION_EMAIL_FAILED: 'VER_EMAIL_FAILED',

//   // ─────────────────────────────────────────────────────────────────────────
//   // External Service Errors (EXT)
//   // ─────────────────────────────────────────────────────────────────────────
//   EXTERNAL_SERVICE_ERROR: 'EXT_SERVICE_ERROR',
//   EXTERNAL_SERVICE_TIMEOUT: 'EXT_SERVICE_TIMEOUT',
//   EXTERNAL_SERVICE_UNAVAILABLE: 'EXT_SERVICE_UNAVAILABLE',
// } as const;

// export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

// // ==== FILE: src/common/constants/http-status.constants.ts ====

// /**
//  * HTTP Status Codes
//  */

// export const HTTP_STATUS = {
//   // 2xx Success
//   OK: 200,
//   CREATED: 201,
//   ACCEPTED: 202,
//   NO_CONTENT: 204,

//   // 3xx Redirection
//   MOVED_PERMANENTLY: 301,
//   FOUND: 302,
//   SEE_OTHER: 303,
//   NOT_MODIFIED: 304,
//   TEMPORARY_REDIRECT: 307,
//   PERMANENT_REDIRECT: 308,

//   // 4xx Client Errors
//   BAD_REQUEST: 400,
//   UNAUTHORIZED: 401,
//   PAYMENT_REQUIRED: 402,
//   FORBIDDEN: 403,
//   NOT_FOUND: 404,
//   METHOD_NOT_ALLOWED: 405,
//   NOT_ACCEPTABLE: 406,
//   CONFLICT: 409,
//   GONE: 410,
//   UNPROCESSABLE_ENTITY: 422,
//   TOO_MANY_REQUESTS: 429,

//   // 5xx Server Errors
//   INTERNAL_SERVER_ERROR: 500,
//   NOT_IMPLEMENTED: 501,
//   BAD_GATEWAY: 502,
//   SERVICE_UNAVAILABLE: 503,
//   GATEWAY_TIMEOUT: 504,
// } as const;

// export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

// /**
//  * HTTP Status Messages
//  */
// export const HTTP_STATUS_MESSAGES: Record<number, string> = {
//   200: 'OK',
//   201: 'Created',
//   202: 'Accepted',
//   204: 'No Content',
//   301: 'Moved Permanently',
//   302: 'Found',
//   304: 'Not Modified',
//   400: 'Bad Request',
//   401: 'Unauthorized',
//   402: 'Payment Required',
//   403: 'Forbidden',
//   404: 'Not Found',
//   405: 'Method Not Allowed',
//   409: 'Conflict',
//   422: 'Unprocessable Entity',
//   429: 'Too Many Requests',
//   500: 'Internal Server Error',
//   501: 'Not Implemented',
//   502: 'Bad Gateway',
//   503: 'Service Unavailable',
//   504: 'Gateway Timeout',
// };

// // ==== FILE: src/common/utils/crypto.utils.ts ====

// /**
//  * Cryptography Utilities
//  */

// import { randomBytes, createHash, createHmac, timingSafeEqual } from 'crypto';
// import { hash, verify, Options as Argon2Options } from 'argon2';

// import { config } from '@/config';

// /**
//  * Generate a random token
//  */
// export function generateToken(length: number = 32): string {
//   return randomBytes(length).toString('hex');
// }

// /**
//  * Generate a URL-safe random token
//  */
// export function generateUrlSafeToken(length: number = 32): string {
//   return randomBytes(length).toString('base64url');
// }

// /**
//  * Hash a string using SHA-256
//  */
// export function sha256(data: string): string {
//   return createHash('sha256').update(data).digest('hex');
// }

// /**
//  * Hash a string using SHA-512
//  */
// export function sha512(data: string): string {
//   return createHash('sha512').update(data).digest('hex');
// }

// /**
//  * Create HMAC signature
//  */
// export function hmacSign(data: string, secret: string): string {
//   return createHmac('sha256', secret).update(data).digest('hex');
// }

// /**
//  * Verify HMAC signature (timing-safe)
//  */
// export function hmacVerify(data: string, signature: string, secret: string): boolean {
//   const expectedSignature = hmacSign(data, secret);
//   const sigBuffer = Buffer.from(signature);
//   const expectedBuffer = Buffer.from(expectedSignature);

//   if (sigBuffer.length !== expectedBuffer.length) {
//     return false;
//   }

//   return timingSafeEqual(sigBuffer, expectedBuffer);
// }

// /**
//  * Hash a password using Argon2
//  */
// export async function hashPassword(password: string): Promise<string> {
//   const options: Argon2Options = {
//     memoryCost: config.argon2.memoryCost,
//     timeCost: config.argon2.timeCost,
//     parallelism: config.argon2.parallelism,
//     type: 2, // Argon2id
//   };

//   return hash(password, options);
// }

// /**
//  * Verify a password against a hash
//  */
// export async function verifyPassword(hash: string, password: string): Promise<boolean> {
//   try {
//     return await verify(hash, password);
//   } catch {
//     return false;
//   }
// }

// /**
//  * Generate API key
//  */
// export function generateApiKey(prefix: string = 'ov'): { key: string; hash: string } {
//   const token = generateToken(32);
//   const key = `${prefix}_${token}`;
//   const keyHash = sha256(key);
//   return { key, hash: keyHash };
// }

// /**
//  * Hash an API key for storage
//  */
// export function hashApiKey(key: string): string {
//   return sha256(key);
// }

// /**
//  * Generate a short code (for verification, referral, etc.)
//  */
// export function generateShortCode(length: number = 6): string {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   let code = '';
//   const bytes = randomBytes(length);
//   for (let i = 0; i < length; i++) {
//     code += chars[bytes[i]! % chars.length];
//   }
//   return code;
// }

// /**
//  * Generate a numeric OTP
//  */
// export function generateOTP(length: number = 6): string {
//   const max = Math.pow(10, length) - 1;
//   const min = Math.pow(10, length - 1);
//   const num = Math.floor(Math.random() * (max - min + 1)) + min;
//   return num.toString();
// }

// /**
//  * Timing-safe string comparison
//  */
// export function safeCompare(a: string, b: string): boolean {
//   if (a.length !== b.length) {
//     return false;
//   }
//   return timingSafeEqual(Buffer.from(a), Buffer.from(b));
// }

// // ==== FILE: src/common/utils/validation.utils.ts ====

// /**
//  * Validation Utilities
//  */

// import { REGEX } from '@/common/constants/app.constants';

// /**
//  * Check if a string is a valid email
//  */
// export function isValidEmail(email: string): boolean {
//   return REGEX.EMAIL.test(email);
// }

// /**
//  * Check if a string is a valid username
//  */
// export function isValidUsername(username: string): boolean {
//   return REGEX.USERNAME.test(username);
// }

// /**
//  * Check if a string is a valid slug
//  */
// export function isValidSlug(slug: string): boolean {
//   return REGEX.SLUG.test(slug);
// }

// /**
//  * Check if a string is a valid UUID
//  */
// export function isValidUUID(uuid: string): boolean {
//   return REGEX.UUID.test(uuid);
// }

// /**
//  * Check if a string is a valid CUID
//  */
// export function isValidCUID(cuid: string): boolean {
//   return REGEX.CUID.test(cuid);
// }

// /**
//  * Check if a string is a valid URL
//  */
// export function isValidURL(url: string): boolean {
//   try {
//     new URL(url);
//     return true;
//   } catch {
//     return false;
//   }
// }

// /**
//  * Check if a string is a valid hex color
//  */
// export function isValidHexColor(color: string): boolean {
//   return REGEX.HEX_COLOR.test(color);
// }

// /**
//  * Check password strength
//  */
// export interface PasswordStrength {
//   score: number; // 0-4
//   level: 'very_weak' | 'weak' | 'fair' | 'strong' | 'very_strong';
//   feedback: string[];
// }

// export function checkPasswordStrength(password: string): PasswordStrength {
//   const feedback: string[] = [];
//   let score = 0;

//   // Length checks
//   if (password.length >= 8) score++;
//   if (password.length >= 12) score++;
//   if (password.length < 8) feedback.push('Use at least 8 characters');

//   // Character variety checks
//   if (/[a-z]/.test(password)) score += 0.5;
//   else feedback.push('Add lowercase letters');

//   if (/[A-Z]/.test(password)) score += 0.5;
//   else feedback.push('Add uppercase letters');

//   if (/[0-9]/.test(password)) score += 0.5;
//   else feedback.push('Add numbers');

//   if (/[^a-zA-Z0-9]/.test(password)) score += 0.5;
//   else feedback.push('Add special characters');

//   // Common patterns (reduce score)
//   if (/^[a-zA-Z]+$/.test(password)) score -= 0.5;
//   if (/^[0-9]+$/.test(password)) score -= 0.5;
//   if (/(.)\1{2,}/.test(password)) {
//     score -= 0.5;
//     feedback.push('Avoid repeated characters');
//   }

//   // Normalize score
//   score = Math.max(0, Math.min(4, Math.floor(score)));

//   const levels: PasswordStrength['level'][] = [
//     'very_weak',
//     'weak',
//     'fair',
//     'strong',
//     'very_strong',
//   ];

//   return {
//     score,
//     level: levels[score]!,
//     feedback,
//   };
// }

// /**
//  * Sanitize a string for safe output
//  */
// export function sanitizeString(str: string): string {
//   return str
//     .trim()
//     .replace(/[<>]/g, '') // Remove angle brackets
//     .replace(/javascript:/gi, '') // Remove javascript: URLs
//     .replace(/on\w+=/gi, ''); // Remove event handlers
// }

// /**
//  * Normalize email address
//  */
// export function normalizeEmail(email: string): string {
//   const [local, domain] = email.toLowerCase().trim().split('@');
//   if (!local || !domain) return email;

//   // Remove dots and everything after + in Gmail addresses
//   if (domain === 'gmail.com' || domain === 'googlemail.com') {
//     const normalizedLocal = local.replace(/\./g, '').split('+')[0];
//     return `${normalizedLocal}@${domain}`;
//   }

//   return `${local}@${domain}`;
// }

// /**
//  * Validate pagination parameters
//  */
// export function validatePagination(
//   page?: number | string,
//   limit?: number | string,
//   defaults = { page: 1, limit: 20, maxLimit: 100 }
// ): { page: number; limit: number; skip: number } {
//   let parsedPage = typeof page === 'string' ? parseInt(page, 10) : page;
//   let parsedLimit = typeof limit === 'string' ? parseInt(limit, 10) : limit;

//   parsedPage = Number.isNaN(parsedPage) || !parsedPage || parsedPage < 1 
//     ? defaults.page 
//     : parsedPage;

//   parsedLimit = Number.isNaN(parsedLimit) || !parsedLimit || parsedLimit < 1
//     ? defaults.limit
//     : Math.min(parsedLimit, defaults.maxLimit);

//   return {
//     page: parsedPage,
//     limit: parsedLimit,
//     skip: (parsedPage - 1) * parsedLimit,
//   };
// }

// // ==== FILE: src/common/utils/string.utils.ts ====

// /**
//  * String Utilities
//  */

// /**
//  * Generate a URL-safe slug from a string
//  */
// export function slugify(text: string): string {
//   return text
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, '-') // Replace spaces with -
//     .replace(/[^\w\-]+/g, '') // Remove non-word chars
//     .replace(/\-\-+/g, '-') // Replace multiple - with single -
//     .replace(/^-+/, '') // Trim - from start
//     .replace(/-+$/, ''); // Trim - from end
// }

// /**
//  * Truncate a string to a specified length
//  */
// export function truncate(str: string, length: number, suffix: string = '...'): string {
//   if (str.length <= length) {
//     return str;
//   }
//   return str.slice(0, length - suffix.length) + suffix;
// }

// /**
//  * Capitalize first letter of a string
//  */
// export function capitalize(str: string): string {
//   if (!str) return str;
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

// /**
//  * Convert string to title case
//  */
// export function titleCase(str: string): string {
//   return str
//     .toLowerCase()
//     .split(' ')
//     .map((word) => capitalize(word))
//     .join(' ');
// }

// /**
//  * Convert camelCase to snake_case
//  */
// export function camelToSnake(str: string): string {
//   return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
// }

// /**
//  * Convert snake_case to camelCase
//  */
// export function snakeToCamel(str: string): string {
//   return str.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
// }

// /**
//  * Remove HTML tags from a string
//  */
// export function stripHtml(html: string): string {
//   return html.replace(/<[^>]*>/g, '');
// }

// /**
//  * Escape HTML special characters
//  */
// export function escapeHtml(str: string): string {
//   const htmlEscapes: Record<string, string> = {
//     '&': '&amp;',
//     '<': '&lt;',
//     '>': '&gt;',
//     '"': '&quot;',
//     "'": '&#39;',
//   };
//   return str.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
// }

// /**
//  * Generate a random string
//  */
// export function randomString(length: number = 16): string {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return result;
// }

// /**
//  * Mask sensitive data (e.g., email, phone)
//  */
// export function maskEmail(email: string): string {
//   const [local, domain] = email.split('@');
//   if (!local || !domain) return email;
//   const maskedLocal =
//     local.length <= 2
//       ? '*'.repeat(local.length)
//       : local[0] + '*'.repeat(local.length - 2) + local[local.length - 1];
//   return `${maskedLocal}@${domain}`;
// }

// /**
//  * Check if string is empty or whitespace only
//  */
// export function isBlank(str: string | null | undefined): boolean {
//   return !str || str.trim().length === 0;
// }

// /**
//  * Extract initials from a name
//  */
// export function getInitials(name: string, maxLength: number = 2): string {
//   return name
//     .split(' ')
//     .map((word) => word[0])
//     .filter(Boolean)
//     .slice(0, maxLength)
//     .join('')
//     .toUpperCase();
// }

// // ==== FILE: src/plugins/helmet.plugin.ts ====

// /**
//  * Helmet Plugin
//  *
//  * Configures security headers.
//  */

// import { FastifyPluginAsync } from 'fastify';
// import fp from 'fastify-plugin';
// import helmet from '@fastify/helmet';

// import { appConfig } from '@/config/app.config';

// const helmetPluginImpl: FastifyPluginAsync = async (fastify) => {
//   await fastify.register(helmet, {
//     // Content Security Policy
//     contentSecurityPolicy: appConfig.isProduction
//       ? {
//           directives: {
//             defaultSrc: ["'self'"],
//             styleSrc: ["'self'", "'unsafe-inline'"],
//             scriptSrc: ["'self'"],
//             imgSrc: ["'self'", 'data:', 'https:'],
//             connectSrc: ["'self'"],
//             fontSrc: ["'self'"],
//             objectSrc: ["'none'"],
//             mediaSrc: ["'self'"],
//             frameSrc: ["'none'"],
//           },
//         }
//       : false, // Disable in development for easier debugging

//     // Cross-Origin settings
//     crossOriginEmbedderPolicy: false,
//     crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
//     crossOriginResourcePolicy: { policy: 'cross-origin' },

//     // Other security headers
//     dnsPrefetchControl: { allow: false },
//     frameguard: { action: 'deny' },
//     hidePoweredBy: true,
//     hsts: appConfig.isProduction
//       ? {
//           maxAge: 31536000, // 1 year
//           includeSubDomains: true,
//           preload: true,
//         }
//       : false,
//     ieNoOpen: true,
//     noSniff: true,
//     originAgentCluster: true,
//     permittedCrossDomainPolicies: { permittedPolicies: 'none' },
//     referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
//     xssFilter: true,
//   });
// };

// export const helmetPlugin = fp(helmetPluginImpl, {
//   name: 'helmet-plugin',
// });

// // ==== FILE: src/plugins/cors.plugin.ts ====

// /**
//  * CORS Plugin
//  *
//  * Configures Cross-Origin Resource Sharing.
//  */

// import type { FastifyInstance } from 'fastify';
// import fp from 'fastify-plugin';
// import cors from '@fastify/cors';

// import { config } from '@/config';

// async function corsPluginImpl(fastify: FastifyInstance): Promise<void> {
//   // Use type assertion to bypass the complex generic mismatch
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   await (fastify as any).register(cors, {
//     origin: (origin: string | undefined, callback: (err: Error | null, allow: boolean) => void) => {
//       // Allow requests with no origin (mobile apps, curl, etc.)
//       if (!origin) {
//         callback(null, true);
//         return;
//       }

//       // Check if origin is in allowed list
//       const isAllowed = config.cors.origins.some((allowed) => {
//         if (allowed === '*') return true;
//         if (allowed.startsWith('*.')) {
//           // Wildcard subdomain matching
//           const domain = allowed.slice(2);
//           return origin.endsWith(domain);
//         }
//         return origin === allowed;
//       });

//       callback(null, isAllowed);
//     },
//     credentials: config.cors.credentials,
//     methods: config.cors.methods,
//     allowedHeaders: config.cors.allowedHeaders,
//     exposedHeaders: config.cors.exposedHeaders,
//     maxAge: config.cors.maxAge,
//     preflight: true,
//     strictPreflight: true,
//   });
// }

// export const corsPlugin = fp(corsPluginImpl, {
//   name: 'cors-plugin',
// });

// // ==== FILE: src/plugins/compress.plugin.ts ====

// /**
//  * Compression Plugin
//  *
//  * Enables response compression.
//  */

// import { FastifyPluginAsync } from 'fastify';
// import fp from 'fastify-plugin';
// import compress from '@fastify/compress';

// const compressPluginImpl: FastifyPluginAsync = async (fastify) => {
//   await fastify.register(compress, {
//     // Global compression
//     global: true,

//     // Compression threshold (don&apos;t compress small responses)
//     threshold: 1024, // 1KB

//     // Encoding preference
//     encodings: ['gzip', 'deflate'],

//     // Skip compression for certain content types
//     removeContentLengthHeader: true,

//     // Custom should compress
//     customTypes: /^text\/|\+json$|\+text$|\+xml$/,
//   });
// };

// export const compressPlugin = fp(compressPluginImpl, {
//   name: 'compress-plugin',
// });

// // ==== FILE: src/plugins/prisma.plugin.ts ====

// /**
//  * Prisma Plugin
//  *
//  * Provides Prisma client as a Fastify decorator.
//  */

// import type { FastifyInstance } from 'fastify';
// import fp from 'fastify-plugin';

// import { prisma, connectPrisma, disconnectPrisma } from '@/core/database';
// import { logger } from '@/core/logger';

// async function prismaPluginImpl(fastify: FastifyInstance): Promise<void> {
//   // Connect to database
//   try {
//     await connectPrisma();
//     logger.info('Database connected');
//   } catch (error) {
//     logger.error({ error }, 'Failed to connect to database');
//     throw error;
//   }

//   // Decorate fastify with prisma client
//   fastify.decorate('prisma', prisma);

//   // Disconnect on close
//   fastify.addHook('onClose', async () => {
//     await disconnectPrisma();
//     logger.info('Database disconnected');
//   });
// }

// export const prismaPlugin = fp(prismaPluginImpl, {
//   name: 'prisma-plugin',
// });

// // ==== FILE: src/plugins/redis.plugin.ts ====

// /**
//  * Redis Plugin
//  *
//  * Provides Redis client as a Fastify decorator.
//  */

// import { FastifyPluginAsync } from 'fastify';
// import fp from 'fastify-plugin';

// import { redis, disconnectRedis } from '@/core/cache';
// import { logger } from '@/core/logger';

// const redisPluginImpl: FastifyPluginAsync = async (fastify) => {
//   // Wait for Redis to be ready
//   try {
//     await redis.ping();
//     logger.info('Redis connected');
//   } catch (error) {
//     logger.error({ error }, 'Failed to connect to Redis');
//     throw error;
//   }

//   // Decorate fastify with redis client
//   fastify.decorate('redis', redis);

//   // Disconnect on close
//   fastify.addHook('onClose', async () => {
//     await disconnectRedis();
//     logger.info('Redis disconnected');
//   });
// };

// export const redisPlugin = fp(redisPluginImpl, {
//   name: 'redis-plugin',
// });

// // ==== FILE: src/plugins/swagger.plugin.ts ====

// /**
//  * Swagger Plugin
//  *
//  * Configures API documentation with Swagger/OpenAPI.
//  */

// import { FastifyPluginAsync } from 'fastify';
// import fp from 'fastify-plugin';
// import swagger from '@fastify/swagger';
// import swaggerUi from '@fastify/swagger-ui';

// import { config } from '@/config';

// const swaggerPluginImpl: FastifyPluginAsync = async (fastify) => {
//   // Register Swagger
//   await fastify.register(swagger, {
//     openapi: {
//       openapi: '3.0.3',
//       info: {
//         title: config.swagger.title,
//         description: config.swagger.description,
//         version: config.swagger.version,
//         contact: {
//           name: 'Ownverso Support',
//           email: 'support@ownverso.com',
//           url: 'https://ownverso.com/support',
//         },
//         license: {
//           name: 'Proprietary',
//           url: 'https://ownverso.com/terms',
//         },
//       },
//       servers: [
//         {
//           url: config.app.url,
//           description: config.app.nodeEnv === 'production' ? 'Production' : 'Development',
//         },
//       ],
//       tags: [
//         { name: 'Health', description: 'Health check endpoints' },
//         { name: 'Auth', description: 'Authentication endpoints' },
//         { name: 'Users', description: 'User management endpoints' },
//         { name: 'Sites', description: 'Site management endpoints' },
//         { name: 'Series', description: 'Series management endpoints' },
//         { name: 'Chapters', description: 'Chapter management endpoints' },
//         { name: 'Subscriptions', description: 'Subscription management endpoints' },
//         { name: 'Payments', description: 'Payment endpoints' },
//       ],
//       components: {
//         securitySchemes: {
//           bearerAuth: {
//             type: 'http',
//             scheme: 'bearer',
//             bearerFormat: 'JWT',
//             description: 'Enter your JWT token',
//           },
//           apiKey: {
//             type: 'apiKey',
//             in: 'header',
//             name: 'X-API-Key',
//             description: 'API Key for external access',
//           },
//         },
//       },
//       security: [{ bearerAuth: [] }],
//     },
//   });

//   // Register Swagger UI
//   await fastify.register(swaggerUi, {
//     routePrefix: config.swagger.path,
//     uiConfig: {
//       docExpansion: 'list',
//       deepLinking: true,
//       persistAuthorization: true,
//       displayOperationId: true,
//       filter: true,
//       showExtensions: true,
//       showCommonExtensions: true,
//       syntaxHighlight: {
//         activate: true,
//         theme: 'monokai',
//       },
//     },
//     uiHooks: {
//       onRequest: function (_request, _reply, next) {
//         next();
//       },
//       preHandler: function (_request, _reply, next) {
//         next();
//       },
//     },
//     staticCSP: true,
//     transformStaticCSP: (header) => header,
//   });
// };

// export const swaggerPlugin = fp(swaggerPluginImpl, {
//   name: 'swagger-plugin',
// });

// // ==== FILE: src/plugins/graceful-shutdown.plugin.ts ====

// /**
//  * Graceful Shutdown Plugin
//  *
//  * Handles graceful server shutdown.
//  */

// import { FastifyPluginAsync } from 'fastify';
// import fp from 'fastify-plugin';

// import { logger } from '@/core/logger';

// const gracefulShutdownPluginImpl: FastifyPluginAsync = async (fastify) => {
//   const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

//   let isShuttingDown = false;

//   const shutdown = async (signal: string) => {
//     if (isShuttingDown) {
//       logger.warn('Shutdown already in progress, ignoring signal');
//       return;
//     }

//     isShuttingDown = true;
//     logger.info({ signal }, 'Received shutdown signal, starting graceful shutdown...');

//     const shutdownTimeout = setTimeout(() => {
//       logger.error('Graceful shutdown timed out, forcing exit');
//       process.exit(1);
//     }, 30000); // 30 second timeout

//     try {
//       // Close the server (stops accepting new connections)
//       await fastify.close();
//       logger.info('Server closed successfully');

//       clearTimeout(shutdownTimeout);
//       process.exit(0);
//     } catch (error) {
//       logger.error({ error }, 'Error during shutdown');
//       clearTimeout(shutdownTimeout);
//       process.exit(1);
//     }
//   };

//   // Register signal handlers
//   for (const signal of signals) {
//     process.on(signal, () => {
//       shutdown(signal).catch((error) => {
//         logger.error({ error }, 'Shutdown handler error');
//         process.exit(1);
//       });
//     });
//   }

//   // Handle uncaught exceptions during request handling
//   process.on('uncaughtException', (error) => {
//     logger.fatal({ error }, 'Uncaught exception');
//     shutdown('uncaughtException').catch(() => process.exit(1));
//   });

//   // Handle unhandled promise rejections
//   process.on('unhandledRejection', (reason) => {
//     logger.fatal({ reason }, 'Unhandled rejection');
//     shutdown('unhandledRejection').catch(() => process.exit(1));
//   });
// };

// export const gracefulShutdownPlugin = fp(gracefulShutdownPluginImpl, {
//   name: 'graceful-shutdown-plugin',
// });

// // ==== FILE: src/plugins/index.ts ====

// /**
//  * Plugins Module Exports
//  */

// export { corsPlugin } from './cors.plugin';
// export { helmetPlugin } from './helmet.plugin';
// export { compressPlugin } from './compress.plugin';
// export { swaggerPlugin } from './swagger.plugin';
// export { prismaPlugin } from './prisma.plugin';
// export { redisPlugin } from './redis.plugin';
// export { gracefulShutdownPlugin } from './graceful-shutdown.plugin';

// // ==== FILE: src/types/environment.d.ts ====

// /**
//  * Environment Variable Type Definitions
//  *
//  * Provides type safety for environment variables.
//  */

// export interface EnvironmentVariables {
//   // Application
//   NODE_ENV: 'development' | 'test' | 'staging' | 'production';
//   APP_NAME: string;
//   APP_VERSION: string;
//   APP_PORT: string;
//   APP_HOST: string;
//   APP_URL: string;
//   APP_FRONTEND_URL: string;

//   // Logging
//   LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
//   LOG_FORMAT: 'json' | 'pretty';

//   // Database
//   DATABASE_URL: string;
//   DATABASE_POOL_MIN?: string;
//   DATABASE_POOL_MAX?: string;
//   DATABASE_LOG_QUERIES?: string;

//   // Redis
//   REDIS_URL: string;
//   REDIS_HOST?: string;
//   REDIS_PORT?: string;
//   REDIS_PASSWORD?: string;
//   REDIS_DB?: string;
//   REDIS_KEY_PREFIX?: string;

//   // JWT
//   JWT_ACCESS_SECRET: string;
//   JWT_REFRESH_SECRET: string;
//   JWT_ACCESS_EXPIRES_IN: string;
//   JWT_REFRESH_EXPIRES_IN: string;
//   JWT_ISSUER?: string;
//   JWT_AUDIENCE?: string;

//   // Session
//   SESSION_SECRET: string;
//   SESSION_MAX_AGE?: string;

//   // Argon2
//   ARGON2_MEMORY_COST?: string;
//   ARGON2_TIME_COST?: string;
//   ARGON2_PARALLELISM?: string;

//   // CORS
//   CORS_ORIGINS: string;
//   CORS_CREDENTIALS?: string;

//   // Rate Limiting
//   RATE_LIMIT_ENABLED?: string;
//   RATE_LIMIT_GLOBAL_MAX?: string;
//   RATE_LIMIT_GLOBAL_WINDOW_MS?: string;

//   // Swagger
//   SWAGGER_ENABLED?: string;
//   SWAGGER_PATH?: string;
//   SWAGGER_TITLE?: string;
//   SWAGGER_DESCRIPTION?: string;
//   SWAGGER_VERSION?: string;

//   // Security
//   ENCRYPTION_KEY?: string;
//   API_KEY_SALT?: string;
// }

// declare global {
//   namespace NodeJS {
//     interface ProcessEnv extends EnvironmentVariables {}
//   }
// }

// // ==== FILE: src/types/fastify.d.ts ====

// /**
//  * Fastify Type Extensions
//  *
//  * Extends Fastify types with custom decorators and properties.
//  */

// import type { FastifyRequest, FastifyReply } from 'fastify';
// import type { PrismaClient } from '@prisma/client';
// import type { Redis } from 'ioredis';
// import type { UserRole } from '@prisma/client';

// declare module 'fastify' {
//   interface FastifyInstance {
//     /**
//      * Prisma database client
//      */
//     prisma: PrismaClient;

//     /**
//      * Redis client
//      */
//     redis: Redis;

//     /**
//      * Application configuration
//      */
//     config: typeof import('@/config').config;

//     /**
//      * Authenticate request decorator
//      */
//     authenticate: (
//       request: FastifyRequest,
//       reply: FastifyReply
//     ) => Promise<void>;

//     /**
//      * Optional authentication decorator
//      */
//     authenticateOptional: (
//       request: FastifyRequest,
//       reply: FastifyReply
//     ) => Promise<void>;
//   }

//   interface FastifyRequest {
//     /**
//      * Unique request identifier
//      */
//     requestId: string;

//     /**
//      * Request start time for timing
//      */
//     startTime: bigint;

//     /**
//      * Authenticated user (if authenticated)
//      */
//     user?: AuthenticatedUser;

//     /**
//      * JWT payload (if authenticated)
//      */
//     jwtPayload?: JwtPayload;
//   }

//   interface FastifyContextConfig {
//     /**
//      * Roles allowed to access this route
//      */
//     roles?: UserRole[];

//     /**
//      * Whether authentication is required
//      */
//     auth?: boolean;

//     /**
//      * Whether to skip rate limiting
//      */
//     skipRateLimit?: boolean;

//     /**
//      * Custom rate limit for this route
//      */
//     rateLimit?: {
//       max: number;
//       timeWindow: number;
//     };
//   }
// }

// /**
//  * Authenticated user attached to request
//  */
// export interface AuthenticatedUser {
//   id: bigint;
//   publicId: string;
//   email: string;
//   username: string;
//   displayName: string;
//   role: UserRole;
//   emailVerified: boolean;
// }

// /**
//  * JWT payload structure
//  */
// export interface JwtPayload {
//   sub: string; // User public ID
//   email: string;
//   role: UserRole;
//   type: 'access' | 'refresh';
//   iat: number;
//   exp: number;
//   iss: string;
//   aud: string;
// }

// // ==== FILE: src/types/global.d.ts ====

// /**
//  * Global Type Declarations
//  */

// declare global {
//   namespace NodeJS {
//     interface ProcessEnv {
//       NODE_ENV: 'development' | 'test' | 'staging' | 'production';
//       APP_NAME: string;
//       APP_VERSION: string;
//       APP_PORT: string;
//       APP_HOST: string;
//       APP_URL: string;
//       APP_FRONTEND_URL: string;
//       LOG_LEVEL: string;
//       LOG_FORMAT: string;
//       DATABASE_URL: string;
//       REDIS_URL: string;
//       JWT_ACCESS_SECRET: string;
//       JWT_REFRESH_SECRET: string;
//       JWT_ACCESS_EXPIRES_IN: string;
//       JWT_REFRESH_EXPIRES_IN: string;
//     }
//   }

//   /**
//    * BigInt serialization for JSON
//    */
//   interface BigInt {
//     toJSON(): string;
//   }
// }

// // BigInt JSON serialization
// BigInt.prototype.toJSON = function () {
//   return this.toString();
// };

// export {};

// // ==== FILE: src/types/modules.d.ts ====

// /**
//  * Module Declarations
//  *
//  * Type declarations for modules without TypeScript definitions.
//  */

// // Declare any untyped modules here
// declare module 'some-untyped-module' {
//   const content: unknown;
//   export default content;
// }

// // ==== FILE: src/schemas/common/id.schema.ts ====

// /**
//  * ID Schemas
//  */

// import { Type, Static } from '@sinclair/typebox';

// /**
//  * CUID schema (used by Prisma)
//  */
// export const CuidSchema = Type.String({
//   pattern: '^c[a-z0-9]{24}$',
//   description: 'CUID identifier',
//   examples: ['clxyz1234567890abcdefghij'],
// });

// export type Cuid = Static<typeof CuidSchema>;

// /**
//  * UUID schema
//  */
// export const UuidSchema = Type.String({
//   format: 'uuid',
//   description: 'UUID identifier',
//   examples: ['550e8400-e29b-41d4-a716-446655440000'],
// });

// export type Uuid = Static<typeof UuidSchema>;

// /**
//  * BigInt ID schema (as string)
//  */
// export const BigIntIdSchema = Type.String({
//   pattern: '^[0-9]+$',
//   description: 'BigInt identifier as string',
//   examples: ['12345678901234567890'],
// });

// export type BigIntId = Static<typeof BigIntIdSchema>;

// /**
//  * ID parameter schema (CUID)
//  */
// export const IdParamSchema = Type.Object({
//   id: CuidSchema,
// });

// export type IdParam = Static<typeof IdParamSchema>;

// /**
//  * Slug parameter schema
//  */
// export const SlugParamSchema = Type.Object({
//   slug: Type.String({
//     pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
//     minLength: 1,
//     maxLength: 100,
//     description: 'URL-safe slug',
//   }),
// });

// export type SlugParam = Static<typeof SlugParamSchema>;

// /**
//  * Public ID parameter schema
//  */
// export const PublicIdParamSchema = Type.Object({
//   publicId: CuidSchema,
// });

// export type PublicIdParam = Static<typeof PublicIdParamSchema>;

// /**
//  * Site ID and Series ID params
//  */
// export const SiteSeriesParamsSchema = Type.Object({
//   siteId: CuidSchema,
//   seriesId: CuidSchema,
// });

// export type SiteSeriesParams = Static<typeof SiteSeriesParamsSchema>;

// /**
//  * Site ID, Series ID, and Chapter ID params
//  */
// export const SiteSeriesChapterParamsSchema = Type.Object({
//   siteId: CuidSchema,
//   seriesId: CuidSchema,
//   chapterId: CuidSchema,
// });

// export type SiteSeriesChapterParams = Static<typeof SiteSeriesChapterParamsSchema>;

// // ==== FILE: src/schemas/common/pagination.schema.ts ====

// /**
//  * Pagination Schemas
//  */

// import { Type, Static } from '@sinclair/typebox';

// import { PAGINATION } from '@/common/constants/app.constants';

// /**
//  * Pagination query schema
//  */
// export const PaginationQuerySchema = Type.Object({
//   page: Type.Optional(
//     Type.Integer({
//       minimum: 1,
//       default: PAGINATION.DEFAULT_PAGE,
//       description: 'Page number (1-indexed)',
//     })
//   ),
//   limit: Type.Optional(
//     Type.Integer({
//       minimum: PAGINATION.MIN_LIMIT,
//       maximum: PAGINATION.MAX_LIMIT,
//       default: PAGINATION.DEFAULT_LIMIT,
//       description: 'Number of items per page',
//     })
//   ),
//   sortBy: Type.Optional(
//     Type.String({
//       description: 'Field to sort by',
//     })
//   ),
//   sortOrder: Type.Optional(
//     Type.Union([Type.Literal('asc'), Type.Literal('desc')], {
//       default: 'desc',
//       description: 'Sort order',
//     })
//   ),
// });

// export type PaginationQuery = Static<typeof PaginationQuerySchema>;

// /**
//  * Pagination meta schema
//  */
// export const PaginationMetaSchema = Type.Object({
//   page: Type.Integer({ description: 'Current page number' }),
//   limit: Type.Integer({ description: 'Items per page' }),
//   totalItems: Type.Integer({ description: 'Total number of items' }),
//   totalPages: Type.Integer({ description: 'Total number of pages' }),
//   hasNextPage: Type.Boolean({ description: 'Whether there is a next page' }),
//   hasPreviousPage: Type.Boolean({ description: 'Whether there is a previous page' }),
// });

// export type PaginationMeta = Static<typeof PaginationMetaSchema>;

// /**
//  * Create paginated response schema
//  */
// export function createPaginatedResponseSchema<T extends ReturnType<typeof Type.Object>>(
//   itemSchema: T
// ) {
//   return Type.Object({
//     success: Type.Literal(true),
//     data: Type.Array(itemSchema),
//     meta: PaginationMetaSchema,
//     timestamp: Type.String({ format: 'date-time' }),
//     requestId: Type.Optional(Type.String()),
//   });
// }

// // ==== FILE: src/schemas/common/response.schema.ts ====

// /**
//  * Response Schemas
//  */

// import { Type, Static, TSchema } from '@sinclair/typebox';

// /**
//  * Base success response schema
//  */
// export const SuccessResponseSchema = Type.Object({
//   success: Type.Literal(true),
//   timestamp: Type.String({ format: 'date-time' }),
//   requestId: Type.Optional(Type.String()),
// });

// /**
//  * Create success response schema with data
//  */
// export function createSuccessResponseSchema<T extends TSchema>(dataSchema: T) {
//   return Type.Object({
//     success: Type.Literal(true),
//     data: dataSchema,
//     timestamp: Type.String({ format: 'date-time' }),
//     requestId: Type.Optional(Type.String()),
//   });
// }

// /**
//  * Error detail schema
//  */
// export const ErrorDetailSchema = Type.Object({
//   code: Type.String({ description: 'Error code' }),
//   message: Type.String({ description: 'Error message' }),
//   statusCode: Type.Integer({ description: 'HTTP status code' }),
//   details: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
// });

// /**
//  * Error response schema
//  */
// export const ErrorResponseSchema = Type.Object({
//   success: Type.Literal(false),
//   error: ErrorDetailSchema,
//   timestamp: Type.String({ format: 'date-time' }),
//   requestId: Type.Optional(Type.String()),
// });

// export type ErrorResponse = Static<typeof ErrorResponseSchema>;

// /**
//  * Validation error field schema
//  */
// export const ValidationErrorFieldSchema = Type.Object({
//   field: Type.String({ description: 'Field name' }),
//   message: Type.String({ description: 'Validation error message' }),
//   value: Type.Optional(Type.Unknown({ description: 'Invalid value' })),
// });

// /**
//  * Validation error response schema
//  */
// export const ValidationErrorResponseSchema = Type.Object({
//   success: Type.Literal(false),
//   error: Type.Object({
//     code: Type.Literal('GEN_VALIDATION_ERROR'),
//     message: Type.String(),
//     statusCode: Type.Literal(422),
//     details: Type.Object({
//       errors: Type.Array(ValidationErrorFieldSchema),
//     }),
//   }),
//   timestamp: Type.String({ format: 'date-time' }),
//   requestId: Type.Optional(Type.String()),
// });

// export type ValidationErrorResponse = Static<typeof ValidationErrorResponseSchema>;

// /**
//  * Message response schema (for simple success messages)
//  */
// export const MessageResponseSchema = Type.Object({
//   success: Type.Literal(true),
//   message: Type.String(),
//   timestamp: Type.String({ format: 'date-time' }),
//   requestId: Type.Optional(Type.String()),
// });

// export type MessageResponse = Static<typeof MessageResponseSchema>;

// /**
//  * Empty success response (for DELETE operations)
//  */
// export const EmptySuccessResponseSchema = Type.Object({
//   success: Type.Literal(true),
//   timestamp: Type.String({ format: 'date-time' }),
//   requestId: Type.Optional(Type.String()),
// });

// export type EmptySuccessResponse = Static<typeof EmptySuccessResponseSchema>;

// // ==== FILE: src/schemas/index.ts ====

// /**
//  * Schemas Module Exports
//  */

// export * from './common/pagination.schema';
// export * from './common/id.schema';
// export * from './common/response.schema';

// // ==== FILE: src/api/health/handlers/liveness.handler.ts ====

// /**
//  * Liveness Handler
//  *
//  * Simple check to verify the server is running.
//  */

// import { FastifyRequest, FastifyReply } from 'fastify';

// export async function livenessHandler(
//   _request: FastifyRequest,
//   reply: FastifyReply
// ): Promise<void> {
//   reply.send({
//     status: 'ok',
//     timestamp: new Date().toISOString(),
//   });
// }

// // ==== FILE: src/api/health/handlers/readiness.handler.ts ====

// /**
//  * Readiness Handler
//  *
//  * Comprehensive check of all dependencies.
//  */

// import { FastifyRequest, FastifyReply } from 'fastify';

// import { appConfig } from '@/config/app.config';
// import { logger } from '@/core/logger';

// interface HealthCheck {
//   status: 'up' | 'down';
//   latency?: number;
//   message?: string;
// }

// interface ReadinessResponse {
//   status: 'healthy' | 'degraded' | 'unhealthy';
//   timestamp: string;
//   version: string;
//   uptime: number;
//   checks: Record<string, HealthCheck>;
// }

// const startTime = Date.now();

// export async function readinessHandler(
//   request: FastifyRequest,
//   reply: FastifyReply
// ): Promise<void> {
//   const checks: Record<string, HealthCheck> = {};
//   let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

//   // Check database
//   try {
//     const dbStart = Date.now();
//     await request.server.prisma.$queryRaw`SELECT 1`;
//     checks['database'] = {
//       status: 'up',
//       latency: Date.now() - dbStart,
//     };
//   } catch (error) {
//     logger.error({ error }, 'Database health check failed');
//     checks['database'] = {
//       status: 'down',
//       message: 'Database connection failed',
//     };
//     overallStatus = 'unhealthy';
//   }

//   // Check Redis
//   try {
//     const redisStart = Date.now();
//     await request.server.redis.ping();
//     checks['redis'] = {
//       status: 'up',
//       latency: Date.now() - redisStart,
//     };
//   } catch (error) {
//     logger.error({ error }, 'Redis health check failed');
//     checks['redis'] = {
//       status: 'down',
//       message: 'Redis connection failed',
//     };
//     // Redis down is degraded, not unhealthy (caching is not critical)
//     if (overallStatus === 'healthy') {
//       overallStatus = 'degraded';
//     }
//   }

//   // Check memory usage
//   const memoryUsage = process.memoryUsage();
//   const heapUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
//   const heapTotalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
//   const heapUsedPercent = Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100);

//   checks['memory'] = {
//     status: heapUsedPercent < 90 ? 'up' : 'down',
//     message: `${heapUsedMB}MB / ${heapTotalMB}MB (${heapUsedPercent}%)`,
//   };

//   if (heapUsedPercent >= 90) {
//     logger.warn({ heapUsedPercent }, 'High memory usage detected');
//     if (overallStatus === 'healthy') {
//       overallStatus = 'degraded';
//     }
//   }

//   const response: ReadinessResponse = {
//     status: overallStatus,
//     timestamp: new Date().toISOString(),
//     version: appConfig.version,
//     uptime: Math.floor((Date.now() - startTime) / 1000),
//     checks,
//   };

//   const statusCode = overallStatus === 'unhealthy' ? 503 : 200;
//   reply.status(statusCode).send(response);
// }

// // ==== FILE: src/api/health/index.ts ====

// /**
//  * Health Routes
//  */

// import { FastifyPluginAsync } from 'fastify';

// import { livenessHandler } from './handlers/liveness.handler';
// import { readinessHandler } from './handlers/readiness.handler';

// export const healthRoutes: FastifyPluginAsync = async (fastify) => {
//   // Liveness probe - is the server running?
//   fastify.get('/live', {
//     schema: {
//       tags: ['Health'],
//       summary: 'Liveness probe',
//       description: 'Check if the server is running',
//       response: {
//         200: {
//           type: 'object',
//           properties: {
//             status: { type: 'string', enum: ['ok'] },
//             timestamp: { type: 'string', format: 'date-time' },
//           },
//         },
//       },
//     },
//     handler: livenessHandler,
//   });

//   // Readiness probe - is the server ready to accept traffic?
//   fastify.get('/ready', {
//     schema: {
//       tags: ['Health'],
//       summary: 'Readiness probe',
//       description: 'Check if the server is ready to accept requests',
//       response: {
//         200: {
//           type: 'object',
//           properties: {
//             status: { type: 'string', enum: ['healthy', 'degraded', 'unhealthy'] },
//             timestamp: { type: 'string', format: 'date-time' },
//             version: { type: 'string' },
//             uptime: { type: 'number' },
//             checks: {
//               type: 'object',
//               additionalProperties: {
//                 type: 'object',
//                 properties: {
//                   status: { type: 'string', enum: ['up', 'down'] },
//                   latency: { type: 'number' },
//                   message: { type: 'string' },
//                 },
//               },
//             },
//           },
//         },
//         503: {
//           type: 'object',
//           properties: {
//             status: { type: 'string', enum: ['unhealthy'] },
//             timestamp: { type: 'string', format: 'date-time' },
//             checks: { type: 'object' },
//           },
//         },
//       },
//     },
//     handler: readinessHandler,
//   });

//   // Simple health check
//   fastify.get('/', {
//     schema: {
//       tags: ['Health'],
//       summary: 'Health check',
//       description: 'Simple health check endpoint',
//       response: {
//         200: {
//           type: 'object',
//           properties: {
//             status: { type: 'string' },
//             timestamp: { type: 'string', format: 'date-time' },
//           },
//         },
//       },
//     },
//     handler: async () => ({
//       status: 'ok',
//       timestamp: new Date().toISOString(),
//     }),
//   });
// };

// // ==== FILE: src/api/index.ts ====

// /**
//  * API Routes Registration
//  *
//  * Registers all API routes with the Fastify instance.
//  */

// import { FastifyInstance } from 'fastify';

// import { healthRoutes } from './health';
// import { API } from '@/common/constants/app.constants';

// /**
//  * Register all API routes
//  */
// export async function registerRoutes(app: FastifyInstance): Promise<void> {
//   // Health check routes (no prefix)
//   await app.register(healthRoutes, { prefix: '/health' });

//   // API v1 routes
//   await app.register(
//     async (fastify) => {
//       // Register v1 route modules here
//       // await fastify.register(authRoutes, { prefix: '/auth' });
//       // await fastify.register(usersRoutes, { prefix: '/users' });
//       // await fastify.register(sitesRoutes, { prefix: '/sites' });
//       // etc.

//       // Placeholder route for now
//       fastify.get('/', async () => {
//         return {
//           success: true,
//           message: 'Ownverso API v1',
//           version: '1.0.0',
//           timestamp: new Date().toISOString(),
//         };
//       });
//     },
//     { prefix: `${API.PREFIX}/${API.CURRENT_VERSION}` }
//   );

//   // 404 handler for API routes
//   app.setNotFoundHandler(async (request, reply) => {
//     reply.status(404).send({
//       success: false,
//       error: {
//         code: 'GEN_NOT_FOUND',
//         message: `Route ${request.method} ${request.url} not found`,
//         statusCode: 404,
//       },
//       timestamp: new Date().toISOString(),
//       requestId: request.id,
//     });
//   });
// }

// // ==== FILE: src/app.ts ====

// // src/app.ts
// /**
//  * Fastify Application Factory
//  */

// import Fastify, { FastifyInstance } from 'fastify';
// import type { Server, IncomingMessage, ServerResponse } from 'http';
// import { randomUUID } from 'crypto';

// import { config } from '@/config';
// import { fastifyLogger } from '@/core/logger'; // Import the Fastify-compatible logger
// import { corsPlugin } from '@/plugins/cors.plugin';
// import { helmetPlugin } from '@/plugins/helmet.plugin';
// import { compressPlugin } from '@/plugins/compress.plugin';
// import { swaggerPlugin } from '@/plugins/swagger.plugin';
// import { prismaPlugin } from '@/plugins/prisma.plugin';
// import { redisPlugin } from '@/plugins/redis.plugin';
// import { gracefulShutdownPlugin } from '@/plugins/graceful-shutdown.plugin';
// import { requestIdMiddleware } from '@/common/middleware/request-id.middleware';
// import { loggerMiddleware } from '@/common/middleware/logger.middleware';
// import { globalExceptionFilter } from '@/common/filters/global-exception.filter';
// import { registerRoutes } from '@/api';

// // Define explicit types for the app
// type AppInstance = FastifyInstance<Server, IncomingMessage, ServerResponse>;

// export interface AppOptions {
//   testing?: boolean;
// }

// /**
//  * Build and configure the Fastify application
//  */
// export async function buildApp(options: AppOptions = {}): Promise<AppInstance> {
//   const { testing = false } = options;

//   // Create Fastify instance
//   const app = Fastify({
//     logger: testing ? false : fastifyLogger,
//     disableRequestLogging: true,
//     requestIdHeader: 'x-request-id',
//     requestIdLogLabel: 'requestId',
//     genReqId: () => randomUUID(),
//     ajv: {
//       customOptions: {
//         removeAdditional: 'all',
//         coerceTypes: true,
//         useDefaults: true,
//         allErrors: true,
//         strict: false,
//       },
//     },
//   });

//   // ─────────────────────────────────────────────────────────────────────────
//   // Register Core Plugins (order matters!)
//   // ─────────────────────────────────────────────────────────────────────────

//   await app.register(requestIdMiddleware);
//   await app.register(loggerMiddleware);
//   await app.register(helmetPlugin);
//   await app.register(corsPlugin);
//   await app.register(compressPlugin);

//   // ─────────────────────────────────────────────────────────────────────────
//   // Register Infrastructure Plugins
//   // ─────────────────────────────────────────────────────────────────────────

//   await app.register(prismaPlugin);
//   await app.register(redisPlugin);

//   // ─────────────────────────────────────────────────────────────────────────
//   // Register API Documentation (development/staging only)
//   // ─────────────────────────────────────────────────────────────────────────

//   if (config.swagger.enabled) {
//     await app.register(swaggerPlugin);
//   }

//   // ─────────────────────────────────────────────────────────────────────────
//   // Register Global Error Handler
//   // ─────────────────────────────────────────────────────────────────────────

//   app.setErrorHandler(globalExceptionFilter);

//   // ─────────────────────────────────────────────────────────────────────────
//   // Register Routes
//   // ─────────────────────────────────────────────────────────────────────────

//   await registerRoutes(app);

//   // ─────────────────────────────────────────────────────────────────────────
//   // Register Graceful Shutdown (must be last)
//   // ─────────────────────────────────────────────────────────────────────────

//   if (!testing) {
//     await app.register(gracefulShutdownPlugin);
//   }

//   return app;
// }

// export type App = Awaited<ReturnType<typeof buildApp>>;

// // ==== FILE: src/server.ts ====

// /**
//  * Server Bootstrap
//  *
//  * Handles server initialization, startup, and shutdown procedures.
//  */

// import { buildApp } from './app';
// import { config, validateConfig } from '@/config';
// import { logger } from '@/core/logger';

// /**
//  * Start the HTTP server
//  */
// export async function startServer(): Promise<void> {
//   // Validate configuration
//   const configValidation = validateConfig();
//   if (!configValidation.success) {
//     console.error('Configuration validation failed:');
//     configValidation.errors.forEach((error) => {
//       console.error(`  - ${error}`);
//     });
//     process.exit(1);
//   }

//   logger.info({ env: config.app.nodeEnv }, 'Starting Ownverso Backend...');

//   try {
//     // Build the application
//     const app = await buildApp();

//     // Start listening
//     const address = await app.listen({
//       host: config.app.host,
//       port: config.app.port,
//     });

//     logger.info(
//       {
//         address,
//         environment: config.app.nodeEnv,
//         version: config.app.version,
//       },
//       `🚀 Server is running at ${address}`
//     );

//     // Log documentation URL in development
//     if (config.swagger.enabled) {
//       logger.info(`📚 API Documentation: ${address}${config.swagger.path}`);
//     }
//   } catch (error) {
//     logger.fatal({ error }, 'Failed to start server');
//     throw error;
//   }
// }

// /**
//  * Gracefully stop the server
//  */
// export async function stopServer(): Promise<void> {
//   logger.info('Shutting down server...');
//   // The graceful shutdown plugin handles cleanup
// }

// // ==== FILE: src/index.ts ====

// /**
//  * Application Entry Point
//  *
//  * This is the main entry point for the Ownverso backend application.
//  * It initializes and starts the server.
//  */

// import 'dotenv/config';

// import { startServer } from './server';

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (reason: unknown) => {
//   console.error('Unhandled Rejection:', reason);
//   process.exit(1);
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (error: Error) => {
//   console.error('Uncaught Exception:', error);
//   process.exit(1);
// });

// // Start the server
// startServer().catch((error: unknown) => {
//   console.error('Failed to start server:', error);
//   process.exit(1);
// });
