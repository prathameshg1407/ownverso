/**
 * Swagger Plugin
 *
 * Configures API documentation with Swagger/OpenAPI.
 */

import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import { config } from '@/config';

const swaggerPluginImpl: FastifyPluginAsync = async (fastify) => {
  // Register Swagger
  await fastify.register(swagger, {
    openapi: {
      openapi: '3.0.3',
      info: {
        title: config.swagger.title,
        description: config.swagger.description,
        version: config.swagger.version,
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
          url: config.app.url,
          description: config.app.nodeEnv === 'production' ? 'Production' : 'Development',
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
  await fastify.register(swaggerUi, {
    routePrefix: config.swagger.path,
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

export const swaggerPlugin = fp(swaggerPluginImpl, {
  name: 'swagger-plugin',
});