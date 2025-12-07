"use strict";
/**
 * Health Routes
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRoutes = void 0;
const liveness_handler_1 = require("./handlers/liveness.handler");
const readiness_handler_1 = require("./handlers/readiness.handler");
const healthRoutes = async (fastify) => {
    // Liveness probe - is the server running?
    fastify.get('/live', {
        schema: {
            tags: ['Health'],
            summary: 'Liveness probe',
            description: 'Check if the server is running',
            response: {
                200: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', enum: ['ok'] },
                        timestamp: { type: 'string', format: 'date-time' },
                    },
                },
            },
        },
        handler: liveness_handler_1.livenessHandler,
    });
    // Readiness probe - is the server ready to accept traffic?
    fastify.get('/ready', {
        schema: {
            tags: ['Health'],
            summary: 'Readiness probe',
            description: 'Check if the server is ready to accept requests',
            response: {
                200: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', enum: ['healthy', 'degraded', 'unhealthy'] },
                        timestamp: { type: 'string', format: 'date-time' },
                        version: { type: 'string' },
                        uptime: { type: 'number' },
                        checks: {
                            type: 'object',
                            additionalProperties: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', enum: ['up', 'down'] },
                                    latency: { type: 'number' },
                                    message: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                503: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', enum: ['unhealthy'] },
                        timestamp: { type: 'string', format: 'date-time' },
                        checks: { type: 'object' },
                    },
                },
            },
        },
        handler: readiness_handler_1.readinessHandler,
    });
    // Simple health check
    fastify.get('/', {
        schema: {
            tags: ['Health'],
            summary: 'Health check',
            description: 'Simple health check endpoint',
            response: {
                200: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        timestamp: { type: 'string', format: 'date-time' },
                    },
                },
            },
        },
        handler: async () => ({
            status: 'ok',
            timestamp: new Date().toISOString(),
        }),
    });
};
exports.healthRoutes = healthRoutes;
//# sourceMappingURL=index.js.map