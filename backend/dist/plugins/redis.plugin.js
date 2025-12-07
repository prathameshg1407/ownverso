"use strict";
/**
 * Redis Plugin
 *
 * Provides Redis client as a Fastify decorator.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisPlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const cache_1 = require("../core/cache");
const logger_1 = require("../core/logger");
const redisPluginImpl = async (fastify) => {
    // Wait for Redis to be ready
    try {
        await cache_1.redis.ping();
        logger_1.logger.info('Redis connected');
    }
    catch (error) {
        logger_1.logger.error({ error }, 'Failed to connect to Redis');
        throw error;
    }
    // Decorate fastify with redis client
    fastify.decorate('redis', cache_1.redis);
    // Disconnect on close
    fastify.addHook('onClose', async () => {
        await (0, cache_1.disconnectRedis)();
        logger_1.logger.info('Redis disconnected');
    });
};
exports.redisPlugin = (0, fastify_plugin_1.default)(redisPluginImpl, {
    name: 'redis-plugin',
});
//# sourceMappingURL=redis.plugin.js.map