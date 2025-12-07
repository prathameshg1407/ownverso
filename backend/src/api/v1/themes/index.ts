// ==== FILE: src/api/v1/themes/themes.routes.ts ====
/**
 * Themes Routes
 */

import type { FastifyPluginAsync } from 'fastify';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import { requireAuth } from '@/api/v1/auth/guards';
import { requireAuthorAccount } from '@/api/v1/author/guards';
import * as handlers from './handlers';
import {
  ListThemesResponseSchema,
  GetThemeResponseSchema,
  ThemeIdParamSchema,
} from '../sites/sites.schema';

export const themesRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

  app.get('/', {
    schema: {
      tags: ['Themes'],
      summary: 'List available themes',
      response: { 200: ListThemesResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [requireAuth, requireAuthorAccount],
    handler: handlers.listThemesHandler,
  });

  app.get('/:themeId', {
    schema: {
      tags: ['Themes'],
      summary: 'Get theme details',
      params: ThemeIdParamSchema,
      response: { 200: GetThemeResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [requireAuth, requireAuthorAccount],
    handler: handlers.getThemeHandler,
  });
};