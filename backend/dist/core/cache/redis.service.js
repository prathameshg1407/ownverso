"use strict";
/**
 * Redis Service
 *
 * Provides Redis client management.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
exports.createRedisClient = createRedisClient;
exports.disconnectRedis = disconnectRedis;
const ioredis_1 = __importDefault(require("ioredis"));
const redis_config_1 = require("../../config/redis.config");
const logger_1 = require("../../core/logger");
/**
 * Create Redis client instance
 */
function createRedisClient() {
    const client = new ioredis_1.default(redis_config_1.redisConfig.url, {
        keyPrefix: redis_config_1.redisConfig.keyPrefix,
        enableReadyCheck: redis_config_1.redisConfig.enableReadyCheck,
        maxRetriesPerRequest: redis_config_1.redisConfig.maxRetriesPerRequest,
        lazyConnect: redis_config_1.redisConfig.lazyConnect,
        retryStrategy: (times) => {
            if (times > 10) {
                logger_1.logger.error('Redis connection failed after 10 retries');
                return null;
            }
            return Math.min(times * 100, 3000);
        },
    });
    client.on('connect', () => {
        logger_1.logger.info('Redis client connected');
    });
    client.on('ready', () => {
        logger_1.logger.info('Redis client ready');
    });
    client.on('error', (error) => {
        logger_1.logger.error({ error }, 'Redis client error');
    });
    client.on('close', () => {
        logger_1.logger.warn('Redis client connection closed');
    });
    client.on('reconnecting', () => {
        logger_1.logger.info('Redis client reconnecting');
    });
    return client;
}
/**
 * Global Redis client instance
 */
exports.redis = createRedisClient();
/**
 * Disconnect Redis client
 */
async function disconnectRedis() {
    await exports.redis.quit();
    logger_1.logger.info('Redis client disconnected');
}
//# sourceMappingURL=redis.service.js.map