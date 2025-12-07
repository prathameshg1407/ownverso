// ==== FILE: src/api/v1/author/author.routes.ts ====
/**
 * Author Routes
 */

import type { FastifyPluginAsync } from 'fastify';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import { requireAuth } from '@/api/v1/auth/guards';
import { requireAuthorAccount } from './guards/author.guard';
import * as handlers from './handlers';
import * as schemas from './author.schema';

export const authorRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

  // ─────────────────────────────────────────────────────────────────────
  // Author Account Registration
  // ─────────────────────────────────────────────────────────────────────

  app.post('/register', {
    schema: {
      tags: ['Author'],
      summary: 'Register as an author',
      description: 'Upgrade current user account to author status',
      body: schemas.RegisterAuthorRequestSchema,
      response: { 201: schemas.RegisterAuthorResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAuth,
    handler: handlers.registerAuthorHandler,
  });

  // ─────────────────────────────────────────────────────────────────────
  // Author Account Management
  // ─────────────────────────────────────────────────────────────────────

  app.get('/account', {
    schema: {
      tags: ['Author'],
      summary: 'Get author account',
      response: { 200: schemas.GetAuthorAccountResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [requireAuth, requireAuthorAccount],
    handler: handlers.getAccountHandler,
  });

  app.put('/account', {
    schema: {
      tags: ['Author'],
      summary: 'Update author account',
      body: schemas.UpdateAuthorAccountRequestSchema,
      response: { 200: schemas.UpdateAuthorAccountResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [requireAuth, requireAuthorAccount],
    handler: handlers.updateAccountHandler,
  });

  // ─────────────────────────────────────────────────────────────────────
  // Author Dashboard & Stats
  // ─────────────────────────────────────────────────────────────────────

  app.get('/dashboard', {
    schema: {
      tags: ['Author'],
      summary: 'Get author dashboard',
      response: { 200: schemas.GetAuthorDashboardResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [requireAuth, requireAuthorAccount],
    handler: handlers.getDashboardHandler,
  });

  app.get('/stats', {
    schema: {
      tags: ['Author'],
      summary: 'Get author statistics',
      response: { 200: schemas.GetAuthorStatsResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [requireAuth, requireAuthorAccount],
    handler: handlers.getStatsHandler,
  });

  // ─────────────────────────────────────────────────────────────────────
  // Platform Subscription
  // ─────────────────────────────────────────────────────────────────────

  app.get('/platform-subscription', {
    schema: {
      tags: ['Author', 'Platform Subscription'],
      summary: 'Get platform subscription status',
      response: { 200: schemas.GetPlatformSubscriptionResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [requireAuth, requireAuthorAccount],
    handler: handlers.getSubscriptionHandler,
  });

  app.get('/platform-plans', {
    schema: {
      tags: ['Author', 'Platform Subscription'],
      summary: 'List available platform plans',
      response: { 200: schemas.ListPlatformPlansResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [requireAuth, requireAuthorAccount],
    handler: handlers.listPlansHandler,
  });

  app.post('/platform-subscription/subscribe', {
    schema: {
      tags: ['Author', 'Platform Subscription'],
      summary: 'Subscribe to a platform plan',
      body: schemas.SubscribePlatformRequestSchema,
      response: { 201: schemas.GetPlatformSubscriptionResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [requireAuth, requireAuthorAccount],
    handler: handlers.subscribeHandler,
  });

  app.put('/platform-subscription/change', {
    schema: {
      tags: ['Author', 'Platform Subscription'],
      summary: 'Change platform plan',
      body: schemas.ChangePlatformPlanRequestSchema,
      response: { 200: schemas.GetPlatformSubscriptionResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [requireAuth, requireAuthorAccount],
    handler: handlers.changePlanHandler,
  });

  app.post('/platform-subscription/cancel', {
    schema: {
      tags: ['Author', 'Platform Subscription'],
      summary: 'Cancel platform subscription',
      response: { 200: schemas.MessageResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [requireAuth, requireAuthorAccount],
    handler: handlers.cancelHandler,
  });

  app.post('/platform-subscription/reactivate', {
    schema: {
      tags: ['Author', 'Platform Subscription'],
      summary: 'Reactivate cancelled subscription',
      response: { 200: schemas.MessageResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [requireAuth, requireAuthorAccount],
    handler: handlers.reactivateHandler,
  });
};