"use strict";
// ==== FILE: src/api/v1/admin/admin.routes.ts ====
/**
 * Admin Routes
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
exports.adminRoutes = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const guards_1 = require("../../../api/v1/auth/guards");
const roles_guard_1 = require("../../../api/v1/auth/guards/roles.guard");
const authorHandlers = __importStar(require("./authors/handlers"));
const siteHandlers = __importStar(require("./sites/handlers"));
const authorSchemas = __importStar(require("../author/author.schema"));
const siteSchemas = __importStar(require("../sites/sites.schema"));
const adminRoutes = async (fastify) => {
    const app = fastify.withTypeProvider();
    // All admin routes require authentication
    app.addHook('preHandler', guards_1.requireAuth);
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
        preHandler: roles_guard_1.requireAdmin,
        handler: authorHandlers.listAuthorsHandler,
    });
    app.get('/authors/:userId', {
        schema: {
            tags: ['Admin', 'Authors'],
            summary: 'Get author details',
            params: type_provider_typebox_1.Type.Object({ userId: type_provider_typebox_1.Type.String() }),
            response: { 200: authorSchemas.AdminGetAuthorResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: roles_guard_1.requireAdmin,
        handler: authorHandlers.getAuthorHandler,
    });
    app.put('/authors/:userId/verify', {
        schema: {
            tags: ['Admin', 'Authors'],
            summary: 'Verify/unverify author',
            params: type_provider_typebox_1.Type.Object({ userId: type_provider_typebox_1.Type.String() }),
            body: authorSchemas.AdminVerifyAuthorRequestSchema,
            response: { 200: authorSchemas.GetAuthorAccountResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: roles_guard_1.requireAdmin,
        handler: authorHandlers.verifyAuthorHandler,
    });
    app.put('/authors/:userId/platform-tier', {
        schema: {
            tags: ['Admin', 'Authors'],
            summary: 'Update author platform tier (super admin only)',
            params: type_provider_typebox_1.Type.Object({ userId: type_provider_typebox_1.Type.String() }),
            body: authorSchemas.AdminUpdatePlatformTierRequestSchema,
            response: { 200: authorSchemas.GetAuthorAccountResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: roles_guard_1.requireSuperAdmin,
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
        preHandler: roles_guard_1.requireAdmin,
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
        preHandler: roles_guard_1.requireAdmin,
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
        preHandler: roles_guard_1.requireAdmin,
        handler: siteHandlers.updateSiteStatusHandler,
    });
};
exports.adminRoutes = adminRoutes;
//# sourceMappingURL=index.js.map