// ==== FILE: src/api/v1/sites/sites.routes.ts ====
/**
 * Sites Routes
 */

import type { FastifyPluginAsync } from 'fastify';
import { Type, type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import { requireAuth } from '@/api/v1/auth/guards';
import { requireAuthorAccount } from '@/api/v1/author/guards';
import {
  requireSiteOwner,
  requireSiteAccess,
  requireSiteManager,
  requireSiteEditor,
} from './guards';
import * as handlers from './handlers';
import * as schemas from './sites.schema';

export const sitesRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

  // All routes require authentication
  app.addHook('preHandler', requireAuth);

  // ─────────────────────────────────────────────────────────────────────
  // Site CRUD
  // ─────────────────────────────────────────────────────────────────────

  app.get('/', {
    schema: {
      tags: ['Sites'],
      summary: 'List sites owned by current author',
      response: { 200: schemas.ListSitesResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAuthorAccount,
    handler: handlers.listSitesHandler,
  });

  app.post('/', {
    schema: {
      tags: ['Sites'],
      summary: 'Create a new site',
      body: schemas.CreateSiteRequestSchema,
      response: { 201: schemas.CreateSiteResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAuthorAccount,
    handler: handlers.createSiteHandler,
  });

  app.get('/:siteId', {
    schema: {
      tags: ['Sites'],
      summary: 'Get site details',
      params: schemas.SiteIdParamSchema,
      response: { 200: schemas.GetSiteResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteAccess,
    handler: handlers.getSiteHandler,
  });

  app.put('/:siteId', {
    schema: {
      tags: ['Sites'],
      summary: 'Update site',
      params: schemas.SiteIdParamSchema,
      body: schemas.UpdateSiteRequestSchema,
      response: { 200: schemas.GetSiteResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteManager,
    handler: handlers.updateSiteHandler,
  });

  app.delete('/:siteId', {
    schema: {
      tags: ['Sites'],
      summary: 'Delete site',
      params: schemas.SiteIdParamSchema,
      response: { 204: Type.Null() },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteOwner,
    handler: handlers.deleteSiteHandler,
  });

  app.get('/:siteId/stats', {
    schema: {
      tags: ['Sites'],
      summary: 'Get site statistics',
      params: schemas.SiteIdParamSchema,
      response: { 200: schemas.GetSiteStatsResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteAccess,
    handler: handlers.getSiteStatsHandler,
  });

  app.get('/:siteId/overview', {
    schema: {
      tags: ['Sites'],
      summary: 'Get site overview',
      params: schemas.SiteIdParamSchema,
      response: { 200: schemas.GetSiteOverviewResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteAccess,
    handler: handlers.getSiteOverviewHandler,
  });

  // ─────────────────────────────────────────────────────────────────────
  // Settings
  // ─────────────────────────────────────────────────────────────────────

  app.get('/:siteId/settings', {
    schema: {
      tags: ['Sites', 'Settings'],
      summary: 'Get all site settings',
      params: schemas.SiteIdParamSchema,
      response: { 200: schemas.GetSiteSettingsResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteManager,
    handler: handlers.getSettingsHandler,
  });

  app.put('/:siteId/settings/general', {
    schema: {
      tags: ['Sites', 'Settings'],
      summary: 'Update general settings',
      params: schemas.SiteIdParamSchema,
      body: schemas.UpdateSiteGeneralRequestSchema,
      response: { 200: schemas.UpdateSiteGeneralResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteManager,
    handler: handlers.updateGeneralHandler,
  });

  app.put('/:siteId/settings/branding', {
    schema: {
      tags: ['Sites', 'Settings'],
      summary: 'Update branding settings',
      params: schemas.SiteIdParamSchema,
      body: schemas.UpdateSiteBrandingRequestSchema,
      response: { 200: schemas.UpdateSiteBrandingResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteManager,
    handler: handlers.updateBrandingHandler,
  });

  app.put('/:siteId/settings/theme', {
    schema: {
      tags: ['Sites', 'Settings'],
      summary: 'Update theme settings',
      params: schemas.SiteIdParamSchema,
      body: schemas.UpdateSiteThemeRequestSchema,
      response: { 200: schemas.UpdateSiteThemeResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteManager,
    handler: handlers.updateThemeHandler,
  });

  app.put('/:siteId/settings/seo', {
    schema: {
      tags: ['Sites', 'Settings'],
      summary: 'Update SEO settings',
      params: schemas.SiteIdParamSchema,
      body: schemas.UpdateSiteSeoRequestSchema,
      response: { 200: schemas.UpdateSiteSeoResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteManager,
    handler: handlers.updateSeoHandler,
  });

  app.put('/:siteId/settings/analytics', {
    schema: {
      tags: ['Sites', 'Settings'],
      summary: 'Update analytics settings',
      params: schemas.SiteIdParamSchema,
      body: schemas.UpdateSiteAnalyticsRequestSchema,
      response: { 200: schemas.UpdateSiteAnalyticsResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteManager,
    handler: handlers.updateAnalyticsHandler,
  });

  app.put('/:siteId/settings/comments', {
    schema: {
      tags: ['Sites', 'Settings'],
      summary: 'Update comments settings',
      params: schemas.SiteIdParamSchema,
      body: schemas.UpdateSiteCommentsRequestSchema,
      response: { 200: schemas.UpdateSiteCommentsResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteManager,
    handler: handlers.updateCommentsHandler,
  });

  // ─────────────────────────────────────────────────────────────────────
  // Domain
  // ─────────────────────────────────────────────────────────────────────

  app.get('/:siteId/domain', {
    schema: {
      tags: ['Sites', 'Domain'],
      summary: 'Get domain configuration',
      params: schemas.SiteIdParamSchema,
      response: { 200: schemas.GetSiteDomainResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteManager,
    handler: handlers.getDomainHandler,
  });

  app.post('/:siteId/domain', {
    schema: {
      tags: ['Sites', 'Domain'],
      summary: 'Add custom domain',
      params: schemas.SiteIdParamSchema,
      body: schemas.AddDomainRequestSchema,
      response: { 201: schemas.GetSiteDomainResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteOwner,
    handler: handlers.addDomainHandler,
  });

  app.post('/:siteId/domain/verify', {
    schema: {
      tags: ['Sites', 'Domain'],
      summary: 'Verify custom domain',
      params: schemas.SiteIdParamSchema,
      response: { 200: schemas.GetSiteDomainResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteOwner,
    handler: handlers.verifyDomainHandler,
  });

  app.delete('/:siteId/domain', {
    schema: {
      tags: ['Sites', 'Domain'],
      summary: 'Remove custom domain',
      params: schemas.SiteIdParamSchema,
      response: { 204: Type.Null() },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteOwner,
    handler: handlers.removeDomainHandler,
  });

  app.post('/:siteId/domain/ssl/provision', {
    schema: {
      tags: ['Sites', 'Domain'],
      summary: 'Provision SSL certificate',
      params: schemas.SiteIdParamSchema,
      response: { 200: schemas.GetSiteDomainResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteOwner,
    handler: handlers.provisionSslHandler,
  });

  // ─────────────────────────────────────────────────────────────────────
  // Pages
  // ─────────────────────────────────────────────────────────────────────

  app.get('/:siteId/pages', {
    schema: {
      tags: ['Sites', 'Pages'],
      summary: 'List site pages',
      params: schemas.SiteIdParamSchema,
      response: { 200: schemas.ListPagesResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteAccess,
    handler: handlers.listPagesHandler,
  });

  app.post('/:siteId/pages', {
    schema: {
      tags: ['Sites', 'Pages'],
      summary: 'Create a page',
      params: schemas.SiteIdParamSchema,
      body: schemas.CreatePageRequestSchema,
      response: { 201: schemas.GetPageResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteEditor,
    handler: handlers.createPageHandler,
  });

  app.get('/:siteId/pages/:pageId', {
    schema: {
      tags: ['Sites', 'Pages'],
      summary: 'Get page details',
      params: schemas.PageIdParamSchema,
      response: { 200: schemas.GetPageResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteAccess,
    handler: handlers.getPageHandler,
  });

  app.put('/:siteId/pages/:pageId', {
    schema: {
      tags: ['Sites', 'Pages'],
      summary: 'Update page',
      params: schemas.PageIdParamSchema,
      body: schemas.UpdatePageRequestSchema,
      response: { 200: schemas.GetPageResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteEditor,
    handler: handlers.updatePageHandler,
  });

  app.delete('/:siteId/pages/:pageId', {
    schema: {
      tags: ['Sites', 'Pages'],
      summary: 'Delete page',
      params: schemas.PageIdParamSchema,
      response: { 204: Type.Null() },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteEditor,
    handler: handlers.deletePageHandler,
  });

  app.put('/:siteId/pages/reorder', {
    schema: {
      tags: ['Sites', 'Pages'],
      summary: 'Reorder pages',
      params: schemas.SiteIdParamSchema,
      body: schemas.ReorderPagesRequestSchema,
      response: { 200: schemas.ListPagesResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteEditor,
    handler: handlers.reorderPagesHandler,
  });

  // ─────────────────────────────────────────────────────────────────────
  // Collaborators
  // ─────────────────────────────────────────────────────────────────────

  app.get('/:siteId/collaborators', {
    schema: {
      tags: ['Sites', 'Collaborators'],
      summary: 'List site collaborators',
      params: schemas.SiteIdParamSchema,
      response: { 200: schemas.ListCollaboratorsResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteManager,
    handler: handlers.listCollaboratorsHandler,
  });

  app.post('/:siteId/collaborators/invite', {
    schema: {
      tags: ['Sites', 'Collaborators'],
      summary: 'Invite a collaborator',
      params: schemas.SiteIdParamSchema,
      body: schemas.InviteCollaboratorRequestSchema,
      response: { 201: schemas.InviteCollaboratorResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteManager,
    handler: handlers.inviteCollaboratorHandler,
  });

  app.get('/:siteId/collaborators/:collaboratorId', {
    schema: {
      tags: ['Sites', 'Collaborators'],
      summary: 'Get collaborator details',
      params: schemas.CollaboratorIdParamSchema,
      response: { 200: schemas.GetCollaboratorResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteManager,
    handler: handlers.getCollaboratorHandler,
  });

  app.put('/:siteId/collaborators/:collaboratorId', {
    schema: {
      tags: ['Sites', 'Collaborators'],
      summary: 'Update collaborator',
      params: schemas.CollaboratorIdParamSchema,
      body: schemas.UpdateCollaboratorRequestSchema,
      response: { 200: schemas.GetCollaboratorResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteManager,
    handler: handlers.updateCollaboratorHandler,
  });

  app.delete('/:siteId/collaborators/:collaboratorId', {
    schema: {
      tags: ['Sites', 'Collaborators'],
      summary: 'Remove collaborator',
      params: schemas.CollaboratorIdParamSchema,
      response: { 204: Type.Null() },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireSiteManager,
    handler: handlers.removeCollaboratorHandler,
  });
};