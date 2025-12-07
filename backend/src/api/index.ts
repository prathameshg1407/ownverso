// ==== FILE: src/api/index.ts (FIXED + MODULES ENABLED) ====

/**
 * API Routes Registration
 */

import { FastifyInstance } from 'fastify';
import { API } from '@/common/constants/app.constants';

// Base modules
import { healthRoutes } from './health';
import { authRoutes } from './v1/auth';
import { usersRoutes, adminUsersRoutes } from './v1/users';

// Full feature modules 🟩 (you already built these)
import { authorRoutes } from './v1/author';
import { sitesRoutes } from './v1/sites';
import { collaboratorRoutes } from './v1/collaborator';
import { themesRoutes } from './v1/themes';
import { adminRoutes } from './v1/admin';

export async function registerRoutes(app: FastifyInstance): Promise<void> {
  // Health check (no API prefix)
  await app.register(healthRoutes, { prefix: '/health' });

  // API V1 namespace
  await app.register(
    async (fastify) => {
      // Auth
      await fastify.register(authRoutes, { prefix: '/auth' });

      // Users
      await fastify.register(usersRoutes, { prefix: '/users' });
      await fastify.register(adminUsersRoutes, { prefix: '/admin/users' });

      // Authors
      await fastify.register(authorRoutes, { prefix: '/authors' });

      // Sites
      await fastify.register(sitesRoutes, { prefix: '/sites' });

      // Collaborators
      await fastify.register(collaboratorRoutes, { prefix: '/collaborators' });

      // Themes
      await fastify.register(themesRoutes, { prefix: '/themes' });

      // Admin (platform-level)
      await fastify.register(adminRoutes, { prefix: '/admin' });

      // Root
      fastify.get('/', async () => ({
        success: true,
        message: 'Ownverso API v1',
        timestamp: new Date().toISOString(),
      }));
    },
    { prefix: `${API.PREFIX}/${API.CURRENT_VERSION}` }
  );

  // Global 404 for API
  app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      success: false,
      error: {
        code: 'GEN_NOT_FOUND',
        message: `Route ${request.method} ${request.url} not found`,
        statusCode: 404,
      },
      timestamp: new Date().toISOString(),
      requestId: request.id,
    });
  });
}
