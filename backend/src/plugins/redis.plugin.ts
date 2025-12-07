/**
 * Redis Plugin
 *
 * Provides Redis client as a Fastify decorator.
 */

import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { redis, disconnectRedis } from '@/core/cache';
import { logger } from '@/core/logger';

const redisPluginImpl: FastifyPluginAsync = async (fastify) => {
  // Wait for Redis to be ready
  try {
    await redis.ping();
    logger.info('Redis connected');
  } catch (error) {
    logger.error({ error }, 'Failed to connect to Redis');
    throw error;
  }

  // Decorate fastify with redis client
  fastify.decorate('redis', redis);

  // Disconnect on close
  fastify.addHook('onClose', async () => {
    await disconnectRedis();
    logger.info('Redis disconnected');
  });
};

export const redisPlugin = fp(redisPluginImpl, {
  name: 'redis-plugin',
});