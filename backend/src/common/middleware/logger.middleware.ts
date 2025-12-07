/**
 * Logger Middleware
 *
 * Logs incoming requests and outgoing responses.
 */

import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { logger } from '@/core/logger';
import { appConfig } from '@/config/app.config';

const loggerMiddlewarePlugin: FastifyPluginAsync = async (fastify) => {
  // Log incoming requests
  fastify.addHook('onRequest', async (request) => {
    // Skip health check endpoints in production
    if (appConfig.isProduction && request.url.startsWith('/health')) {
      return;
    }

    logger.info(
      {
        requestId: request.id,
        method: request.method,
        url: request.url,
        ip: request.ip,
        userAgent: request.headers['user-agent'],
      },
      'Incoming request'
    );
  });

  // Log outgoing responses
  fastify.addHook('onResponse', async (request, reply) => {
    // Skip health check endpoints in production
    if (appConfig.isProduction && request.url.startsWith('/health')) {
      return;
    }

    // Calculate request duration
    const duration = request.startTime
      ? Number(process.hrtime.bigint() - request.startTime) / 1_000_000 // Convert to ms
      : 0;

    const logData = {
      requestId: request.id,
      method: request.method,
      url: request.url,
      statusCode: reply.statusCode,
      duration: `${duration.toFixed(2)}ms`,
    };

    if (reply.statusCode >= 500) {
      logger.error(logData, 'Request completed with error');
    } else if (reply.statusCode >= 400) {
      logger.warn(logData, 'Request completed with client error');
    } else {
      logger.info(logData, 'Request completed');
    }
  });
};

export const loggerMiddleware = fp(loggerMiddlewarePlugin, {
  name: 'logger-middleware',
});