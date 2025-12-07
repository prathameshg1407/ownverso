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

import { PrismaClient, Prisma } from '@prisma/client';

import { databaseConfig } from '@/config/database.config';
import { appConfig } from '@/config/app.config';
import { logger } from '@/core/logger';

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
function buildConnectionUrl(): string {
  const baseUrl = process.env.DATABASE_URL;

  if (!baseUrl) {
    throw new Error('DATABASE_URL environment variable is not defined');
  }

  try {
    const url = new URL(baseUrl);

    // Add connection pool parameters if not already set
    const params: Record<string, string> = {
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
  } catch (error) {
    // If URL parsing fails (e.g., complex connection strings), return original
    logger.warn(
      { error },
      'Could not parse DATABASE_URL, using original connection string'
    );
    return baseUrl;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Prisma Client Factory
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create Prisma client instance with optimized settings
 */
function createPrismaClient(): PrismaClient {
  const logLevels: Prisma.LogLevel[] = ['error', 'warn'];

  // Add query logging in development if enabled
  if (databaseConfig.logQueries && appConfig.isDevelopment) {
    logLevels.push('query');
  }

  const client = new PrismaClient({
    log: logLevels.map((level) => ({
      emit: 'event' as const,
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
function setupEventHandlers(client: PrismaClient): void {
  // Query logging with slow query detection
  client.$on('query' as never, (e: Prisma.QueryEvent) => {
    const { query, params, duration } = e;

    if (duration > SLOW_QUERY_THRESHOLD_MS) {
      logger.warn(
        {
          query: formatQuery(query),
          params: safeParseParams(params),
          duration,
          threshold: SLOW_QUERY_THRESHOLD_MS,
        },
        `🐌 Slow Query Detected (${duration}ms)`
      );
    } else if (appConfig.isDevelopment && databaseConfig.logQueries) {
      logger.debug(
        {
          query: formatQuery(query),
          duration,
        },
        'Prisma Query'
      );
    }
  });

  client.$on('error' as never, (e: { message: string; target?: string }) => {
    logger.error(
      {
        error: e.message,
        target: e.target,
      },
      'Prisma Error'
    );
  });

  client.$on('warn' as never, (e: { message: string }) => {
    logger.warn({ warning: e.message }, 'Prisma Warning');
  });
}

/**
 * Format query for readable logging (truncate if too long)
 */
function formatQuery(query: string): string {
  const maxLength = 500;
  if (query.length > maxLength) {
    return query.substring(0, maxLength) + '... (truncated)';
  }
  return query;
}

/**
 * Safely parse query params for logging
 */
function safeParseParams(params: string): unknown {
  try {
    return JSON.parse(params);
  } catch {
    return params;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Singleton Instance
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Global Prisma client instance (singleton)
 */
export const prisma = createPrismaClient();

// ─────────────────────────────────────────────────────────────────────────────
// Connection Management
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Connect Prisma client with health check and warm-up
 */
export async function connectPrisma(): Promise<number> {
  const startTime = Date.now();

  try {
    // Connect to database
    await prisma.$connect();

    // Warm up connection pool with parallel queries
    // This pre-establishes connections to reduce first-request latency
    const warmupPromises = Array.from({ length: WARMUP_QUERY_COUNT }, () =>
      prisma.$queryRaw`SELECT 1 as warmup`
    );
    await Promise.all(warmupPromises);

    const connectionTime = Date.now() - startTime;

    logger.info({ connectionTime }, `Prisma client connected (${connectionTime}ms)`);

    // Log database info in development
    if (appConfig.isDevelopment) {
      await logDatabaseInfo();
    }

    return connectionTime;
  } catch (error) {
    const connectionTime = Date.now() - startTime;
    logger.error(
      { error, connectionTime },
      'Failed to connect Prisma client'
    );
    throw error;
  }
}

/**
 * Log database connection info (development only)
 */
async function logDatabaseInfo(): Promise<void> {
  try {
    const [versionResult, connectionResult] = await Promise.all([
      prisma.$queryRaw<Array<{ version: string }>>`SELECT version()`,
      prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT count(*) FROM pg_stat_activity 
        WHERE datname = current_database()
      `,
    ]);

    const version = versionResult[0]?.version?.split(' ').slice(0, 2).join(' ') || 'Unknown';
    const activeConnections = Number(connectionResult[0]?.count || 0);

    logger.info(
      {
        database: version,
        activeConnections,
        poolSize: CONNECTION_POOL_SIZE,
      },
      'Database info'
    );
  } catch (error) {
    logger.debug({ error }, 'Could not fetch database info');
  }
}

/**
 * Disconnect Prisma client gracefully
 */
export async function disconnectPrisma(): Promise<void> {
  try {
    await prisma.$disconnect();
    logger.info('Prisma client disconnected');
  } catch (error) {
    logger.error({ error }, 'Error disconnecting Prisma client');
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Health Check
// ─────────────────────────────────────────────────────────────────────────────

export interface DatabaseHealthResult {
  healthy: boolean;
  latency: number;
  error?: string;
}

/**
 * Health check for database connection
 */
export async function checkDatabaseHealth(): Promise<DatabaseHealthResult> {
  const startTime = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      healthy: true,
      latency: Date.now() - startTime,
    };
  } catch (error) {
    return {
      healthy: false,
      latency: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Retry Logic
// ─────────────────────────────────────────────────────────────────────────────

export interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  operationName?: string;
}

/**
 * Execute database operation with retry logic for transient failures
 */
export async function executeWithRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    operationName = 'database operation',
  } = options;

  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      const isRetryable = isRetryableError(lastError);
      const isLastAttempt = attempt === maxRetries;

      if (!isRetryable || isLastAttempt) {
        logger.error(
          {
            operation: operationName,
            attempt,
            maxRetries,
            error: lastError.message,
            retryable: isRetryable,
          },
          `${operationName} failed`
        );
        throw lastError;
      }

      const delay = baseDelay * attempt; // Linear backoff
      logger.warn(
        {
          operation: operationName,
          attempt,
          maxRetries,
          error: lastError.message,
          retryIn: delay,
        },
        `${operationName} failed, retrying...`
      );

      await sleep(delay);
    }
  }

  throw lastError;
}

/**
 * Check if error is retryable (transient failure)
 */
function isRetryableError(error: Error): boolean {
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
  return retryablePatterns.some((pattern) =>
    message.includes(pattern.toLowerCase())
  );
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─────────────────────────────────────────────────────────────────────────────
// Transaction Helpers
// ─────────────────────────────────────────────────────────────────────────────

export type TransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

/**
 * Execute operations in a transaction with timeout
 */
export async function withTransaction<T>(
  fn: (tx: TransactionClient) => Promise<T>,
  options?: {
    maxWait?: number;
    timeout?: number;
  }
): Promise<T> {
  return prisma.$transaction(fn, {
    maxWait: options?.maxWait ?? 5000,
    timeout: options?.timeout ?? 10000,
  });
}