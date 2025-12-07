// ==== FILE: src/api/v1/admin/admin.routes.ts ====
/**
 * Admin Routes
 */

import type { FastifyPluginAsync } from 'fastify';
import { Type, type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import { requireAuth } from '@/api/v1/auth/guards';
import { requireAdmin, requireSuperAdmin } from '@/api/v1/auth/guards/roles.guard';
import * as authorHandlers from './authors/handlers';
import * as siteHandlers from './sites/handlers';
import * as authorSchemas from '../author/author.schema';
import * as siteSchemas from '../sites/sites.schema';

export const adminRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

  // All admin routes require authentication
  app.addHook('preHandler', requireAuth);

  // ─────────────────────────────────────────────────────────────────────
  // Admin Author Routes
  // ─────────────────────────────────────────────────────────────────────

  app.get('/authors', {
    schema: {
      tags: ['Admin', 'Authors'],
      summary: 'List all authors',
      querystring: authorSchemas.AdminAuthorQuerySchema,
      response: { 200: authorSchemas.AdminListAuthorsResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAdmin,
    handler: authorHandlers.listAuthorsHandler,
  });

  app.get('/authors/:userId', {
    schema: {
      tags: ['Admin', 'Authors'],
      summary: 'Get author details',
      params: Type.Object({ userId: Type.String() }),
      response: { 200: authorSchemas.AdminGetAuthorResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAdmin,
    handler: authorHandlers.getAuthorHandler,
  });

  app.put('/authors/:userId/verify', {
    schema: {
      tags: ['Admin', 'Authors'],
      summary: 'Verify/unverify author',
      params: Type.Object({ userId: Type.String() }),
      body: authorSchemas.AdminVerifyAuthorRequestSchema,
      response: { 200: authorSchemas.GetAuthorAccountResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAdmin,
    handler: authorHandlers.verifyAuthorHandler,
  });

  app.put('/authors/:userId/platform-tier', {
    schema: {
      tags: ['Admin', 'Authors'],
      summary: 'Update author platform tier (super admin only)',
      params: Type.Object({ userId: Type.String() }),
      body: authorSchemas.AdminUpdatePlatformTierRequestSchema,
      response: { 200: authorSchemas.GetAuthorAccountResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSuperAdmin,
    handler: authorHandlers.updatePlatformTierHandler,
  });

  // ─────────────────────────────────────────────────────────────────────
  // Admin Site Routes
  // ─────────────────────────────────────────────────────────────────────

  app.get('/sites', {
    schema: {
      tags: ['Admin', 'Sites'],
      summary: 'List all sites',
      querystring: siteSchemas.AdminSiteQuerySchema,
      response: { 200: siteSchemas.AdminListSitesResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAdmin,
    handler: siteHandlers.adminListSitesHandler,
  });

  app.get('/sites/:siteId', {
    schema: {
      tags: ['Admin', 'Sites'],
      summary: 'Get site details',
      params: siteSchemas.SiteIdParamSchema,
      response: { 200: siteSchemas.AdminGetSiteResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAdmin,
    handler: siteHandlers.adminGetSiteHandler,
  });

  app.put('/sites/:siteId/status', {
    schema: {
      tags: ['Admin', 'Sites'],
      summary: 'Update site status',
      params: siteSchemas.SiteIdParamSchema,
      body: siteSchemas.AdminUpdateSiteStatusRequestSchema,
      response: { 200: siteSchemas.GetSiteResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAdmin,
    handler: siteHandlers.updateSiteStatusHandler,
  });
};