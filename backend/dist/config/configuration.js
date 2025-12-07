"use strict";
// ==== FILE: src/config/configuration.ts (UPDATED) ====
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
/**
 * Configuration Loader
 *
 * Loads and assembles all configuration from environment variables.
 */
const app_config_1 = require("./app.config");
const database_config_1 = require("./database.config");
const redis_config_1 = require("./redis.config");
const jwt_config_1 = require("./jwt.config");
const auth_config_1 = require("./auth.config");
/**
 * Complete application configuration
 */
exports.config = {
    app: app_config_1.appConfig,
    database: database_config_1.databaseConfig,
    redis: redis_config_1.redisConfig,
    jwt: jwt_config_1.jwtConfig,
    auth: auth_config_1.authConfig,
    /**
     * CORS configuration
     */
    cors: {
        origins: process.env.CORS_ORIGINS?.split(',').map((o) => o.trim()) || [
            'http://localhost:3000',
            'http://localhost:5173',
        ],
        credentials: true, // Required for cookies
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Request-ID',
            'X-Correlation-ID',
            'X-Client-Type', // web, mobile, api
        ],
        exposedHeaders: ['X-Request-ID', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
        maxAge: 86400, // 24 hours
    },
    /**
     * Rate limiting configuration
     */
    rateLimit: {
        enabled: process.env.RATE_LIMIT_ENABLED !== 'false',
        global: {
            max: parseInt(process.env.RATE_LIMIT_GLOBAL_MAX || '1000', 10),
            timeWindow: parseInt(process.env.RATE_LIMIT_GLOBAL_WINDOW_MS || '60000', 10),
        },
        auth: auth_config_1.authConfig.rateLimit,
    },
    /**
     * Swagger documentation configuration
     */
    swagger: {
        enabled: process.env.SWAGGER_ENABLED === 'true' ||
            process.env.NODE_ENV === 'development',
        path: process.env.SWAGGER_PATH || '/docs',
        title: process.env.SWAGGER_TITLE || 'Ownverso API',
        description: process.env.SWAGGER_DESCRIPTION ||
            'API documentation for Ownverso Platform',
        version: process.env.SWAGGER_VERSION || '1.0.0',
    },
    /**
     * Password hashing configuration (Argon2)
     */
    argon2: {
        memoryCost: parseInt(process.env.ARGON2_MEMORY_COST || '65536', 10),
        timeCost: parseInt(process.env.ARGON2_TIME_COST || '3', 10),
        parallelism: parseInt(process.env.ARGON2_PARALLELISM || '4', 10),
    },
    /**
     * Security configuration
     */
    security: {
        encryptionKey: process.env.ENCRYPTION_KEY,
        apiKeySalt: process.env.API_KEY_SALT,
    },
    /**
     * Email configuration
     */
    email: {
        from: process.env.EMAIL_FROM || 'noreply@ownverso.com',
        fromName: process.env.EMAIL_FROM_NAME || 'Ownverso',
        sendgridApiKey: process.env.SENDGRID_API_KEY,
        // Set to true to actually send emails, false for console logging
        enabled: process.env.EMAIL_ENABLED === 'true',
    },
};
//# sourceMappingURL=configuration.js.map