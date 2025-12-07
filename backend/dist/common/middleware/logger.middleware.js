"use strict";
/**
 * Logger Middleware
 *
 * Logs incoming requests and outgoing responses.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const logger_1 = require("../../core/logger");
const app_config_1 = require("../../config/app.config");
const loggerMiddlewarePlugin = async (fastify) => {
    // Log incoming requests
    fastify.addHook('onRequest', async (request) => {
        // Skip health check endpoints in production
        if (app_config_1.appConfig.isProduction && request.url.startsWith('/health')) {
            return;
        }
        logger_1.logger.info({
            requestId: request.id,
            method: request.method,
            url: request.url,
            ip: request.ip,
            userAgent: request.headers['user-agent'],
        }, 'Incoming request');
    });
    // Log outgoing responses
    fastify.addHook('onResponse', async (request, reply) => {
        // Skip health check endpoints in production
        if (app_config_1.appConfig.isProduction && request.url.startsWith('/health')) {
            return;
        }
        // Calculate request duration
        const duration = request.startTime
            ? Number(process.hrtime.bigint() - request.startTime) / 1_000_000 // Convert to ms
            : 0;
        const logData = {
            requestId: request.id,
            method: request.method,
            url: request.url,
            statusCode: reply.statusCode,
            duration: `${duration.toFixed(2)}ms`,
        };
        if (reply.statusCode >= 500) {
            logger_1.logger.error(logData, 'Request completed with error');
        }
        else if (reply.statusCode >= 400) {
            logger_1.logger.warn(logData, 'Request completed with client error');
        }
        else {
            logger_1.logger.info(logData, 'Request completed');
        }
    });
};
exports.loggerMiddleware = (0, fastify_plugin_1.default)(loggerMiddlewarePlugin, {
    name: 'logger-middleware',
});
//# sourceMappingURL=logger.middleware.js.map