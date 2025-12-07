"use strict";
/**
 * Security Middleware
 *
 * Additional security measures for requests.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityMiddleware = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const securityMiddlewarePlugin = async (fastify) => {
    // Remove sensitive headers from requests
    fastify.addHook('onRequest', async (request) => {
        // Remove any server-side-only headers that might have leaked
        delete request.headers['x-powered-by'];
    });
    // Add security headers to responses
    fastify.addHook('onSend', async (_request, reply, payload) => {
        // Prevent MIME type sniffing
        reply.header('X-Content-Type-Options', 'nosniff');
        // Prevent clickjacking
        reply.header('X-Frame-Options', 'DENY');
        // Enable XSS filter
        reply.header('X-XSS-Protection', '1; mode=block');
        // Control referrer information
        reply.header('Referrer-Policy', 'strict-origin-when-cross-origin');
        // Remove server identification
        reply.removeHeader('X-Powered-By');
        return payload;
    });
};
exports.securityMiddleware = (0, fastify_plugin_1.default)(securityMiddlewarePlugin, {
    name: 'security-middleware',
});
//# sourceMappingURL=security.middleware.js.map