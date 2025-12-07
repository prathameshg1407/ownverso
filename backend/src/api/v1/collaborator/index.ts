// ==== FILE: src/api/v1/collaborator/collaborator.routes.ts ====
/**
 * Collaborator Routes
 */

import type { FastifyPluginAsync } from 'fastify';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import { requireAuth } from '@/api/v1/auth/guards';
import * as handlers from './handlers';
import * as schemas from './collaborator.schema';

export const collaboratorRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

  // Accept invite (requires auth)
  app.post('/accept/:token', {
    schema: {
      tags: ['Collaborator'],
      summary: 'Accept collaboration invite',
      params: schemas.InviteTokenParamSchema,
      response: { 200: schemas.AcceptInviteResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAuth,
    handler: handlers.acceptInviteHandler,
  });

  // List sites where user is collaborator
  app.get('/sites', {
    schema: {
      tags: ['Collaborator'],
      summary: 'List sites where you are a collaborator',
      response: { 200: schemas.ListCollaboratorSitesResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAuth,
    handler: handlers.listCollaboratorSitesHandler,
  });
};