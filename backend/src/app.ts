/**
 * Fastify Application Factory
 */

import Fastify, { FastifyInstance } from 'fastify';
import type { Server, IncomingMessage, ServerResponse } from 'http';
import { randomUUID } from 'crypto';

import { config } from '@/config';
import { fastifyLogger } from '@/core/logger';
import {
  corsPlugin,
  helmetPlugin,
  compressPlugin,
  swaggerPlugin,
  prismaPlugin,
  redisPlugin,
  gracefulShutdownPlugin,
  rateLimitPlugin,
  authPlugin,
} from '@/plugins';
import { requestIdMiddleware } from '@/common/middleware/request-id.middleware';
import { loggerMiddleware } from '@/common/middleware/logger.middleware';
import { globalExceptionFilter } from '@/common/filters/global-exception.filter';
import { registerRoutes } from '@/api';

// Define explicit types for the app
type AppInstance = FastifyInstance<Server, IncomingMessage, ServerResponse>;

export interface AppOptions {
  testing?: boolean;
}

/**
 * Build and configure the Fastify application
 */
export async function buildApp(options: AppOptions = {}): Promise<AppInstance> {
  const { testing = false } = options;

  // Create Fastify instance
  const app = Fastify({
    logger: testing ? false : fastifyLogger,
    disableRequestLogging: true,
    requestIdHeader: 'x-request-id',
    requestIdLogLabel: 'requestId',
    genReqId: () => randomUUID(),
    ajv: {
      customOptions: {
        removeAdditional: 'all',
        coerceTypes: true,
        useDefaults: true,
        allErrors: true,
        strict: false,
      },
    },
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Register Core Plugins (order matters!)
  // ─────────────────────────────────────────────────────────────────────────
  await app.register(requestIdMiddleware);
  await app.register(loggerMiddleware);
  await app.register(helmetPlugin);
  await app.register(corsPlugin);
  await app.register(compressPlugin);

  // ─────────────────────────────────────────────────────────────────────────
  // Register Infrastructure Plugins
  // ─────────────────────────────────────────────────────────────────────────
  await app.register(prismaPlugin);
  await app.register(redisPlugin);

  // ─────────────────────────────────────────────────────────────────────────
  // Register Rate Limiting
  // ─────────────────────────────────────────────────────────────────────────
  await app.register(rateLimitPlugin);

  // ─────────────────────────────────────────────────────────────────────────
  // Register Auth Plugin
  // ─────────────────────────────────────────────────────────────────────────
  await app.register(authPlugin);

  // ─────────────────────────────────────────────────────────────────────────
  // Register API Documentation (development/staging only)
  // ─────────────────────────────────────────────────────────────────────────
  if (config.swagger.enabled) {
    await app.register(swaggerPlugin);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Register Global Error Handler
  // ─────────────────────────────────────────────────────────────────────────
  app.setErrorHandler(globalExceptionFilter);

  // ─────────────────────────────────────────────────────────────────────────
  // Register Routes
  // ─────────────────────────────────────────────────────────────────────────
  await registerRoutes(app);

  // ─────────────────────────────────────────────────────────────────────────
  // Register Graceful Shutdown (must be last)
  // ─────────────────────────────────────────────────────────────────────────
  if (!testing) {
    await app.register(gracefulShutdownPlugin);
  }

  return app;
}

export type App = Awaited<ReturnType<typeof buildApp>>;