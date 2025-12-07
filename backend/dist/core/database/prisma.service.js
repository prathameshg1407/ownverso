"use strict";
/**
 * Prisma Service
 *
 * Provides Prisma client management with connection pooling and performance monitoring.
 *
 * Optimizations:
 * - Proper connection pool configuration
 * - Warm-up queries on startup
 * - Slow query detection and logging
 * - Retry logic for transient failures
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.connectPrisma = connectPrisma;
exports.disconnectPrisma = disconnectPrisma;
exports.checkDatabaseHealth = checkDatabaseHealth;
exports.executeWithRetry = executeWithRetry;
exports.withTransaction = withTransaction;
const client_1 = require("@prisma/client");
const database_config_1 = require("../../config/database.config");
const app_config_1 = require("../../config/app.config");
const logger_1 = require("../../core/logger");
// ─────────────────────────────────────────────────────────────────────────────
// Configuration Constants
// ─────────────────────────────────────────────────────────────────────────────
const SLOW_QUERY_THRESHOLD_MS = 100;
const CONNECTION_POOL_SIZE = 10;
const POOL_TIMEOUT_SECONDS = 10;
const CONNECT_TIMEOUT_SECONDS = 10;
const WARMUP_QUERY_COUNT = 3;
// ─────────────────────────────────────────────────────────────────────────────
// Connection URL Builder
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Build connection URL with proper pool settings
 */
function buildConnectionUrl() {
    const baseUrl = process.env.DATABASE_URL;
    if (!baseUrl) {
        throw new Error('DATABASE_URL environment variable is not defined');
    }
    try {
        const url = new URL(baseUrl);
        // Add connection pool parameters if not already set
        const params = {
            connection_limit: CONNECTION_POOL_SIZE.toString(),
            pool_timeout: POOL_TIMEOUT_SECONDS.toString(),
            connect_timeout: CONNECT_TIMEOUT_SECONDS.toString(),
        };
        for (const [key, value] of Object.entries(params)) {
            if (!url.searchParams.has(key)) {
                url.searchParams.set(key, value);
            }
        }
        return url.toString();
    }
    catch (error) {
        // If URL parsing fails (e.g., complex connection strings), return original
        logger_1.logger.warn({ error }, 'Could not parse DATABASE_URL, using original connection string');
        return baseUrl;
    }
}
// ─────────────────────────────────────────────────────────────────────────────
// Prisma Client Factory
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Create Prisma client instance with optimized settings
 */
function createPrismaClient() {
    const logLevels = ['error', 'warn'];
    // Add query logging in development if enabled
    if (database_config_1.databaseConfig.logQueries && app_config_1.appConfig.isDevelopment) {
        logLevels.push('query');
    }
    const client = new client_1.PrismaClient({
        log: logLevels.map((level) => ({
            emit: 'event',
            level,
        })),
        datasources: {
            db: {
                url: buildConnectionUrl(),
            },
        },
    });
    setupEventHandlers(client);
    return client;
}
// ─────────────────────────────────────────────────────────────────────────────
// Event Handlers
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Setup event handlers for logging and monitoring
 */
function setupEventHandlers(client) {
    // Query logging with slow query detection
    client.$on('query', (e) => {
        const { query, params, duration } = e;
        if (duration > SLOW_QUERY_THRESHOLD_MS) {
            logger_1.logger.warn({
                query: formatQuery(query),
                params: safeParseParams(params),
                duration,
                threshold: SLOW_QUERY_THRESHOLD_MS,
            }, `🐌 Slow Query Detected (${duration}ms)`);
        }
        else if (app_config_1.appConfig.isDevelopment && database_config_1.databaseConfig.logQueries) {
            logger_1.logger.debug({
                query: formatQuery(query),
                duration,
            }, 'Prisma Query');
        }
    });
    client.$on('error', (e) => {
        logger_1.logger.error({
            error: e.message,
            target: e.target,
        }, 'Prisma Error');
    });
    client.$on('warn', (e) => {
        logger_1.logger.warn({ warning: e.message }, 'Prisma Warning');
    });
}
/**
 * Format query for readable logging (truncate if too long)
 */
function formatQuery(query) {
    const maxLength = 500;
    if (query.length > maxLength) {
        return query.substring(0, maxLength) + '... (truncated)';
    }
    return query;
}
/**
 * Safely parse query params for logging
 */
function safeParseParams(params) {
    try {
        return JSON.parse(params);
    }
    catch {
        return params;
    }
}
// ─────────────────────────────────────────────────────────────────────────────
// Singleton Instance
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Global Prisma client instance (singleton)
 */
exports.prisma = createPrismaClient();
// ─────────────────────────────────────────────────────────────────────────────
// Connection Management
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Connect Prisma client with health check and warm-up
 */
async function connectPrisma() {
    const startTime = Date.now();
    try {
        // Connect to database
        await exports.prisma.$connect();
        // Warm up connection pool with parallel queries
        // This pre-establishes connections to reduce first-request latency
        const warmupPromises = Array.from({ length: WARMUP_QUERY_COUNT }, () => exports.prisma.$queryRaw `SELECT 1 as warmup`);
        await Promise.all(warmupPromises);
        const connectionTime = Date.now() - startTime;
        logger_1.logger.info({ connectionTime }, `Prisma client connected (${connectionTime}ms)`);
        // Log database info in development
        if (app_config_1.appConfig.isDevelopment) {
            await logDatabaseInfo();
        }
        return connectionTime;
    }
    catch (error) {
        const connectionTime = Date.now() - startTime;
        logger_1.logger.error({ error, connectionTime }, 'Failed to connect Prisma client');
        throw error;
    }
}
/**
 * Log database connection info (development only)
 */
async function logDatabaseInfo() {
    try {
        const [versionResult, connectionResult] = await Promise.all([
            exports.prisma.$queryRaw `SELECT version()`,
            exports.prisma.$queryRaw `
        SELECT count(*) FROM pg_stat_activity 
        WHERE datname = current_database()
      `,
        ]);
        const version = versionResult[0]?.version?.split(' ').slice(0, 2).join(' ') || 'Unknown';
        const activeConnections = Number(connectionResult[0]?.count || 0);
        logger_1.logger.info({
            database: version,
            activeConnections,
            poolSize: CONNECTION_POOL_SIZE,
        }, 'Database info');
    }
    catch (error) {
        logger_1.logger.debug({ error }, 'Could not fetch database info');
    }
}
/**
 * Disconnect Prisma client gracefully
 */
async function disconnectPrisma() {
    try {
        await exports.prisma.$disconnect();
        logger_1.logger.info('Prisma client disconnected');
    }
    catch (error) {
        logger_1.logger.error({ error }, 'Error disconnecting Prisma client');
        throw error;
    }
}
/**
 * Health check for database connection
 */
async function checkDatabaseHealth() {
    const startTime = Date.now();
    try {
        await exports.prisma.$queryRaw `SELECT 1`;
        return {
            healthy: true,
            latency: Date.now() - startTime,
        };
    }
    catch (error) {
        return {
            healthy: false,
            latency: Date.now() - startTime,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}
/**
 * Execute database operation with retry logic for transient failures
 */
async function executeWithRetry(operation, options = {}) {
    const { maxRetries = 3, baseDelay = 1000, operationName = 'database operation', } = options;
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        }
        catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            const isRetryable = isRetryableError(lastError);
            const isLastAttempt = attempt === maxRetries;
            if (!isRetryable || isLastAttempt) {
                logger_1.logger.error({
                    operation: operationName,
                    attempt,
                    maxRetries,
                    error: lastError.message,
                    retryable: isRetryable,
                }, `${operationName} failed`);
                throw lastError;
            }
            const delay = baseDelay * attempt; // Linear backoff
            logger_1.logger.warn({
                operation: operationName,
                attempt,
                maxRetries,
                error: lastError.message,
                retryIn: delay,
            }, `${operationName} failed, retrying...`);
            await sleep(delay);
        }
    }
    throw lastError;
}
/**
 * Check if error is retryable (transient failure)
 */
function isRetryableError(error) {
    const retryablePatterns = [
        'Connection refused',
        'Connection reset',
        'ETIMEDOUT',
        'ECONNRESET',
        'ENOTFOUND',
        'connection pool timeout',
        'Too many connections',
        'Connection terminated unexpectedly',
        'Client has encountered a connection error',
    ];
    const message = error.message.toLowerCase();
    return retryablePatterns.some((pattern) => message.includes(pattern.toLowerCase()));
}
/**
 * Sleep utility
 */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Execute operations in a transaction with timeout
 */
async function withTransaction(fn, options) {
    return exports.prisma.$transaction(fn, {
        maxWait: options?.maxWait ?? 5000,
        timeout: options?.timeout ?? 10000,
    });
}
//# sourceMappingURL=prisma.service.js.map