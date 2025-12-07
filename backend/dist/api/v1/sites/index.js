"use strict";
// ==== FILE: src/api/v1/sites/sites.routes.ts ====
/**
 * Sites Routes
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitesRoutes = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const guards_1 = require("../../../api/v1/auth/guards");
const guards_2 = require("../../../api/v1/author/guards");
const guards_3 = require("./guards");
const handlers = __importStar(require("./handlers"));
const schemas = __importStar(require("./sites.schema"));
const sitesRoutes = async (fastify) => {
    const app = fastify.withTypeProvider();
    // All routes require authentication
    app.addHook('preHandler', guards_1.requireAuth);
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
        preHandler: guards_2.requireAuthorAccount,
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
        preHandler: guards_2.requireAuthorAccount,
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
        preHandler: guards_3.requireSiteAccess,
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
        preHandler: guards_3.requireSiteManager,
        handler: handlers.updateSiteHandler,
    });
    app.delete('/:siteId', {
        schema: {
            tags: ['Sites'],
            summary: 'Delete site',
            params: schemas.SiteIdParamSchema,
            response: { 204: type_provider_typebox_1.Type.Null() },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_3.requireSiteOwner,
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
        preHandler: guards_3.requireSiteAccess,
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
        preHandler: guards_3.requireSiteAccess,
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
        preHandler: guards_3.requireSiteManager,
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
        preHandler: guards_3.requireSiteManager,
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
        preHandler: guards_3.requireSiteManager,
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
        preHandler: guards_3.requireSiteManager,
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
        preHandler: guards_3.requireSiteManager,
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
        preHandler: guards_3.requireSiteManager,
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
        preHandler: guards_3.requireSiteManager,
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
        preHandler: guards_3.requireSiteManager,
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
        preHandler: guards_3.requireSiteOwner,
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
        preHandler: guards_3.requireSiteOwner,
        handler: handlers.verifyDomainHandler,
    });
    app.delete('/:siteId/domain', {
        schema: {
            tags: ['Sites', 'Domain'],
            summary: 'Remove custom domain',
            params: schemas.SiteIdParamSchema,
            response: { 204: type_provider_typebox_1.Type.Null() },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_3.requireSiteOwner,
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
        preHandler: guards_3.requireSiteOwner,
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
        preHandler: guards_3.requireSiteAccess,
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
        preHandler: guards_3.requireSiteEditor,
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
        preHandler: guards_3.requireSiteAccess,
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
        preHandler: guards_3.requireSiteEditor,
        handler: handlers.updatePageHandler,
    });
    app.delete('/:siteId/pages/:pageId', {
        schema: {
            tags: ['Sites', 'Pages'],
            summary: 'Delete page',
            params: schemas.PageIdParamSchema,
            response: { 204: type_provider_typebox_1.Type.Null() },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_3.requireSiteEditor,
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
        preHandler: guards_3.requireSiteEditor,
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
        preHandler: guards_3.requireSiteManager,
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
        preHandler: guards_3.requireSiteManager,
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
        preHandler: guards_3.requireSiteManager,
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
        preHandler: guards_3.requireSiteManager,
        handler: handlers.updateCollaboratorHandler,
    });
    app.delete('/:siteId/collaborators/:collaboratorId', {
        schema: {
            tags: ['Sites', 'Collaborators'],
            summary: 'Remove collaborator',
            params: schemas.CollaboratorIdParamSchema,
            response: { 204: type_provider_typebox_1.Type.Null() },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_3.requireSiteManager,
        handler: handlers.removeCollaboratorHandler,
    });
};
exports.sitesRoutes = sitesRoutes;
//# sourceMappingURL=index.js.map