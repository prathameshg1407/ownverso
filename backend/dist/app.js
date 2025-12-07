"use strict";
/**
 * Fastify Application Factory
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const fastify_1 = __importDefault(require("fastify"));
const crypto_1 = require("crypto");
const config_1 = require("./config");
const logger_1 = require("./core/logger");
const plugins_1 = require("./plugins");
const request_id_middleware_1 = require("./common/middleware/request-id.middleware");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const global_exception_filter_1 = require("./common/filters/global-exception.filter");
const api_1 = require("./api");
/**
 * Build and configure the Fastify application
 */
async function buildApp(options = {}) {
    const { testing = false } = options;
    // Create Fastify instance
    const app = (0, fastify_1.default)({
        logger: testing ? false : logger_1.fastifyLogger,
        disableRequestLogging: true,
        requestIdHeader: 'x-request-id',
        requestIdLogLabel: 'requestId',
        genReqId: () => (0, crypto_1.randomUUID)(),
        ajv: {
            customOptions: {
                removeAdditional: 'all',
                coerceTypes: true,
                useDefaults: true,
                allErrors: true,
                strict: false,
            },
        },
    });
    // ─────────────────────────────────────────────────────────────────────────
    // Register Core Plugins (order matters!)
    // ─────────────────────────────────────────────────────────────────────────
    await app.register(request_id_middleware_1.requestIdMiddleware);
    await app.register(logger_middleware_1.loggerMiddleware);
    await app.register(plugins_1.helmetPlugin);
    await app.register(plugins_1.corsPlugin);
    await app.register(plugins_1.compressPlugin);
    // ─────────────────────────────────────────────────────────────────────────
    // Register Infrastructure Plugins
    // ─────────────────────────────────────────────────────────────────────────
    await app.register(plugins_1.prismaPlugin);
    await app.register(plugins_1.redisPlugin);
    // ─────────────────────────────────────────────────────────────────────────
    // Register Rate Limiting
    // ─────────────────────────────────────────────────────────────────────────
    await app.register(plugins_1.rateLimitPlugin);
    // ─────────────────────────────────────────────────────────────────────────
    // Register Auth Plugin
    // ─────────────────────────────────────────────────────────────────────────
    await app.register(plugins_1.authPlugin);
    // ─────────────────────────────────────────────────────────────────────────
    // Register API Documentation (development/staging only)
    // ─────────────────────────────────────────────────────────────────────────
    if (config_1.config.swagger.enabled) {
        await app.register(plugins_1.swaggerPlugin);
    }
    // ─────────────────────────────────────────────────────────────────────────
    // Register Global Error Handler
    // ─────────────────────────────────────────────────────────────────────────
    app.setErrorHandler(global_exception_filter_1.globalExceptionFilter);
    // ─────────────────────────────────────────────────────────────────────────
    // Register Routes
    // ─────────────────────────────────────────────────────────────────────────
    await (0, api_1.registerRoutes)(app);
    // ─────────────────────────────────────────────────────────────────────────
    // Register Graceful Shutdown (must be last)
    // ─────────────────────────────────────────────────────────────────────────
    if (!testing) {
        await app.register(plugins_1.gracefulShutdownPlugin);
    }
    return app;
}
//# sourceMappingURL=app.js.map