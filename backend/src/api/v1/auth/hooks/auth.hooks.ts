// ==== FILE: src/api/v1/auth/hooks/auth.hooks.ts ====
/**
 * Auth Hooks Plugin
 */

import type { FastifyPluginAsync, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { logger } from '@/core/logger';
import { deviceService } from '@/core/security';

const AUTH_ROUTE_PREFIX = '/api/v1/auth';

const authHooksPluginImpl: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('preHandler', async (request: FastifyRequest) => {
    if (!request.url.startsWith(AUTH_ROUTE_PREFIX)) return;

    try {
      request.deviceInfo = await deviceService.getSessionDeviceInfo(
        request.headers['user-agent'],
        request.ip,
        request.headers as Record<string, string | string[] | undefined>
      );
    } catch (error) {
      logger.warn({ error }, 'Failed to extract device info');
    }
  });

  fastify.addHook('onResponse', (request, reply, done) => {
    done();
    setImmediate(() => {
      const { url, ip, user } = request;
      const ctx = { ip, userId: user?.publicId };

      if (url.includes('/auth/login') && reply.statusCode === 200) {
        logger.info(ctx, 'User login successful');
      } else if (url.includes('/auth/register') && reply.statusCode === 201) {
        logger.info({ ip }, 'User registration successful');
      } else if (url.includes('/auth/logout') && reply.statusCode >= 200 && reply.statusCode < 300) {
        logger.info(ctx, 'User logged out');
      }
    });
  });
};

export const authHooksPlugin = fp(authHooksPluginImpl, { name: 'auth-hooks-plugin' });