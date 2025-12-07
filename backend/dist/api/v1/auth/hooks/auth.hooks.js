"use strict";
// ==== FILE: src/api/v1/auth/hooks/auth.hooks.ts ====
/**
 * Auth Hooks Plugin
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHooksPlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const logger_1 = require("../../../../core/logger");
const security_1 = require("../../../../core/security");
const AUTH_ROUTE_PREFIX = '/api/v1/auth';
const authHooksPluginImpl = async (fastify) => {
    fastify.addHook('preHandler', async (request) => {
        if (!request.url.startsWith(AUTH_ROUTE_PREFIX))
            return;
        try {
            request.deviceInfo = await security_1.deviceService.getSessionDeviceInfo(request.headers['user-agent'], request.ip, request.headers);
        }
        catch (error) {
            logger_1.logger.warn({ error }, 'Failed to extract device info');
        }
    });
    fastify.addHook('onResponse', (request, reply, done) => {
        done();
        setImmediate(() => {
            const { url, ip, user } = request;
            const ctx = { ip, userId: user?.publicId };
            if (url.includes('/auth/login') && reply.statusCode === 200) {
                logger_1.logger.info(ctx, 'User login successful');
            }
            else if (url.includes('/auth/register') && reply.statusCode === 201) {
                logger_1.logger.info({ ip }, 'User registration successful');
            }
            else if (url.includes('/auth/logout') && reply.statusCode >= 200 && reply.statusCode < 300) {
                logger_1.logger.info(ctx, 'User logged out');
            }
        });
    });
};
exports.authHooksPlugin = (0, fastify_plugin_1.default)(authHooksPluginImpl, { name: 'auth-hooks-plugin' });
//# sourceMappingURL=auth.hooks.js.map