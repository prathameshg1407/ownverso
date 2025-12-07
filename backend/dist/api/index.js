"use strict";
// ==== FILE: src/api/index.ts (FIXED + MODULES ENABLED) ====
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const app_constants_1 = require("../common/constants/app.constants");
// Base modules
const health_1 = require("./health");
const auth_1 = require("./v1/auth");
const users_1 = require("./v1/users");
// Full feature modules 🟩 (you already built these)
const author_1 = require("./v1/author");
const sites_1 = require("./v1/sites");
const collaborator_1 = require("./v1/collaborator");
const themes_1 = require("./v1/themes");
const admin_1 = require("./v1/admin");
async function registerRoutes(app) {
    // Health check (no API prefix)
    await app.register(health_1.healthRoutes, { prefix: '/health' });
    // API V1 namespace
    await app.register(async (fastify) => {
        // Auth
        await fastify.register(auth_1.authRoutes, { prefix: '/auth' });
        // Users
        await fastify.register(users_1.usersRoutes, { prefix: '/users' });
        await fastify.register(users_1.adminUsersRoutes, { prefix: '/admin/users' });
        // Authors
        await fastify.register(author_1.authorRoutes, { prefix: '/authors' });
        // Sites
        await fastify.register(sites_1.sitesRoutes, { prefix: '/sites' });
        // Collaborators
        await fastify.register(collaborator_1.collaboratorRoutes, { prefix: '/collaborators' });
        // Themes
        await fastify.register(themes_1.themesRoutes, { prefix: '/themes' });
        // Admin (platform-level)
        await fastify.register(admin_1.adminRoutes, { prefix: '/admin' });
        // Root
        fastify.get('/', async () => ({
            success: true,
            message: 'Ownverso API v1',
            timestamp: new Date().toISOString(),
        }));
    }, { prefix: `${app_constants_1.API.PREFIX}/${app_constants_1.API.CURRENT_VERSION}` });
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
//# sourceMappingURL=index.js.map