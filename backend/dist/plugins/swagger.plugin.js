"use strict";
/**
 * Swagger Plugin
 *
 * Configures API documentation with Swagger/OpenAPI.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerPlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const config_1 = require("../config");
const swaggerPluginImpl = async (fastify) => {
    // Register Swagger
    await fastify.register(swagger_1.default, {
        openapi: {
            openapi: '3.0.3',
            info: {
                title: config_1.config.swagger.title,
                description: config_1.config.swagger.description,
                version: config_1.config.swagger.version,
                contact: {
                    name: 'Ownverso Support',
                    email: 'support@ownverso.com',
                    url: 'https://ownverso.com/support',
                },
                license: {
                    name: 'Proprietary',
                    url: 'https://ownverso.com/terms',
                },
            },
            servers: [
                {
                    url: config_1.config.app.url,
                    description: config_1.config.app.nodeEnv === 'production' ? 'Production' : 'Development',
                },
            ],
            tags: [
                { name: 'Health', description: 'Health check endpoints' },
                { name: 'Auth', description: 'Authentication endpoints' },
                { name: 'Users', description: 'User management endpoints' },
                { name: 'Sites', description: 'Site management endpoints' },
                { name: 'Series', description: 'Series management endpoints' },
                { name: 'Chapters', description: 'Chapter management endpoints' },
                { name: 'Subscriptions', description: 'Subscription management endpoints' },
                { name: 'Payments', description: 'Payment endpoints' },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                        description: 'Enter your JWT token',
                    },
                    apiKey: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'X-API-Key',
                        description: 'API Key for external access',
                    },
                },
            },
            security: [{ bearerAuth: [] }],
        },
    });
    // Register Swagger UI
    await fastify.register(swagger_ui_1.default, {
        routePrefix: config_1.config.swagger.path,
        uiConfig: {
            docExpansion: 'list',
            deepLinking: true,
            persistAuthorization: true,
            displayOperationId: true,
            filter: true,
            showExtensions: true,
            showCommonExtensions: true,
            syntaxHighlight: {
                activate: true,
                theme: 'monokai',
            },
        },
        uiHooks: {
            onRequest: function (_request, _reply, next) {
                next();
            },
            preHandler: function (_request, _reply, next) {
                next();
            },
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
    });
};
exports.swaggerPlugin = (0, fastify_plugin_1.default)(swaggerPluginImpl, {
    name: 'swagger-plugin',
});
//# sourceMappingURL=swagger.plugin.js.map