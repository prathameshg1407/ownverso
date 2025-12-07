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
/**
 * Global Prisma client instance (singleton)
 */
export declare const prisma: PrismaClient<Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
/**
 * Connect Prisma client with health check and warm-up
 */
export declare function connectPrisma(): Promise<number>;
/**
 * Disconnect Prisma client gracefully
 */
export declare function disconnectPrisma(): Promise<void>;
export interface DatabaseHealthResult {
    healthy: boolean;
    latency: number;
    error?: string;
}
/**
 * Health check for database connection
 */
export declare function checkDatabaseHealth(): Promise<DatabaseHealthResult>;
export interface RetryOptions {
    maxRetries?: number;
    baseDelay?: number;
    operationName?: string;
}
/**
 * Execute database operation with retry logic for transient failures
 */
export declare function executeWithRetry<T>(operation: () => Promise<T>, options?: RetryOptions): Promise<T>;
export type TransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;
/**
 * Execute operations in a transaction with timeout
 */
export declare function withTransaction<T>(fn: (tx: TransactionClient) => Promise<T>, options?: {
    maxWait?: number;
    timeout?: number;
}): Promise<T>;
//# sourceMappingURL=prisma.service.d.ts.map