/**
 * Redis Service
 *
 * Provides Redis client management.
 */

import Redis from 'ioredis';

import { redisConfig } from '@/config/redis.config';
import { logger } from '@/core/logger';

/**
 * Create Redis client instance
 */
export function createRedisClient(): Redis {
  const client = new Redis(redisConfig.url, {
    keyPrefix: redisConfig.keyPrefix,
    enableReadyCheck: redisConfig.enableReadyCheck,
    maxRetriesPerRequest: redisConfig.maxRetriesPerRequest,
    lazyConnect: redisConfig.lazyConnect,
    retryStrategy: (times: number) => {
      if (times > 10) {
        logger.error('Redis connection failed after 10 retries');
        return null;
      }
      return Math.min(times * 100, 3000);
    },
  });

  client.on('connect', () => {
    logger.info('Redis client connected');
  });

  client.on('ready', () => {
    logger.info('Redis client ready');
  });

  client.on('error', (error) => {
    logger.error({ error }, 'Redis client error');
  });

  client.on('close', () => {
    logger.warn('Redis client connection closed');
  });

  client.on('reconnecting', () => {
    logger.info('Redis client reconnecting');
  });

  return client;
}

/**
 * Global Redis client instance
 */
export const redis = createRedisClient();

/**
 * Disconnect Redis client
 */
export async function disconnectRedis(): Promise<void> {
  await redis.quit();
  logger.info('Redis client disconnected');
}