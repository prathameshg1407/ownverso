/**
 * Graceful Shutdown Plugin
 *
 * Handles graceful server shutdown.
 */

import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { logger } from '@/core/logger';

const gracefulShutdownPluginImpl: FastifyPluginAsync = async (fastify) => {
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

  let isShuttingDown = false;

  const shutdown = async (signal: string) => {
    if (isShuttingDown) {
      logger.warn('Shutdown already in progress, ignoring signal');
      return;
    }

    isShuttingDown = true;
    logger.info({ signal }, 'Received shutdown signal, starting graceful shutdown...');

    const shutdownTimeout = setTimeout(() => {
      logger.error('Graceful shutdown timed out, forcing exit');
      process.exit(1);
    }, 30000); // 30 second timeout

    try {
      // Close the server (stops accepting new connections)
      await fastify.close();
      logger.info('Server closed successfully');

      clearTimeout(shutdownTimeout);
      process.exit(0);
    } catch (error) {
      logger.error({ error }, 'Error during shutdown');
      clearTimeout(shutdownTimeout);
      process.exit(1);
    }
  };

  // Register signal handlers
  for (const signal of signals) {
    process.on(signal, () => {
      shutdown(signal).catch((error) => {
        logger.error({ error }, 'Shutdown handler error');
        process.exit(1);
      });
    });
  }

  // Handle uncaught exceptions during request handling
  process.on('uncaughtException', (error) => {
    logger.fatal({ error }, 'Uncaught exception');
    shutdown('uncaughtException').catch(() => process.exit(1));
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason) => {
    logger.fatal({ reason }, 'Unhandled rejection');
    shutdown('unhandledRejection').catch(() => process.exit(1));
  });
};

export const gracefulShutdownPlugin = fp(gracefulShutdownPluginImpl, {
  name: 'graceful-shutdown-plugin',
});