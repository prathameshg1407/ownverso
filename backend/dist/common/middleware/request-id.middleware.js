"use strict";
/**
 * Request ID Middleware
 *
 * Ensures every request has a unique identifier for tracing.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdMiddleware = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const crypto_1 = require("crypto");
const app_constants_1 = require("../../common/constants/app.constants");
const requestIdMiddlewarePlugin = async (fastify) => {
    fastify.addHook('onRequest', async (request, reply) => {
        // Use existing request ID from header or generate new one
        const requestId = request.headers[app_constants_1.HEADERS.REQUEST_ID] || (0, crypto_1.randomUUID)();
        // Set request ID on the request object
        request.requestId = requestId;
        // Also track the start time for request duration logging
        request.startTime = process.hrtime.bigint();
        // Add request ID to response headers
        reply.header(app_constants_1.HEADERS.REQUEST_ID, requestId);
    });
};
exports.requestIdMiddleware = (0, fastify_plugin_1.default)(requestIdMiddlewarePlugin, {
    name: 'request-id-middleware',
});
//# sourceMappingURL=request-id.middleware.js.map