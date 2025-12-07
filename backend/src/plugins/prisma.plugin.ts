/**
 * Prisma Plugin
 *
 * Provides Prisma client as a Fastify decorator.
 */

import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { prisma, connectPrisma, disconnectPrisma } from '@/core/database';
import { logger } from '@/core/logger';

async function prismaPluginImpl(fastify: FastifyInstance): Promise<void> {
  // Connect to database
  try {
    await connectPrisma();
    logger.info('Database connected');
  } catch (error) {
    logger.error({ error }, 'Failed to connect to database');
    throw error;
  }

  // Decorate fastify with prisma client
  fastify.decorate('prisma', prisma);

  // Disconnect on close
  fastify.addHook('onClose', async () => {
    await disconnectPrisma();
    logger.info('Database disconnected');
  });
}

export const prismaPlugin = fp(prismaPluginImpl, {
  name: 'prisma-plugin',
});