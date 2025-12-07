/**
 * Server Bootstrap
 *
 * Handles server initialization, startup, and shutdown procedures.
 */

import { buildApp } from './app';
import { config, validateConfig } from '@/config';
import { logger } from '@/core/logger';

export async function startServer(): Promise<void> {
  const configValidation = validateConfig();
  if (!configValidation.success) {
    logger.error(
      { errors: configValidation.errors },
      'Configuration validation failed'
    );
    process.exit(1);
  }

  logger.info({ env: config.app.nodeEnv }, 'Starting Ownverso Backend...');

  try {
    const app = await buildApp();

    // 🔍 Catch initialization plugin errors
    app.ready((err) => {
      if (err) {
        console.error('🔍 Fastify Ready Error Trace:', err);
      }
    });

    const address = await app.listen({
      host: config.app.host,
      port: config.app.port,
    });

    logger.info(
      {
        address,
        environment: config.app.nodeEnv,
        version: config.app.version,
      },
      `🚀 Server is running at ${address}`
    );

    if (config.swagger.enabled) {
      logger.info(`📚 API Documentation: ${address}${config.swagger.path}`);
    }
  } catch (error: any) {
    console.error('🔥 Server Start Error Trace:', error);
    logger.fatal(
      {
        message: error?.message,
        stack: error?.stack,
        name: error?.name,
      },
      'Failed to start server'
    );
    process.exit(1); // ❌ Prevents missing stack traces
  }
}
