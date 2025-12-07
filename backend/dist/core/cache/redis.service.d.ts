/**
 * Redis Service
 *
 * Provides Redis client management.
 */
import Redis from 'ioredis';
/**
 * Create Redis client instance
 */
export declare function createRedisClient(): Redis;
/**
 * Global Redis client instance
 */
export declare const redis: Redis;
/**
 * Disconnect Redis client
 */
export declare function disconnectRedis(): Promise<void>;
//# sourceMappingURL=redis.service.d.ts.map