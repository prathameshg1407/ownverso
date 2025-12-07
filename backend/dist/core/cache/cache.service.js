"use strict";
/**
 * Cache Service
 *
 * High-level caching abstraction over Redis.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheService = void 0;
const redis_service_1 = require("./redis.service");
const logger_1 = require("../../core/logger");
/**
 * Cache service implementation
 */
exports.cacheService = {
    /**
     * Get a cached value
     */
    async get(key) {
        try {
            const value = await redis_service_1.redis.get(key);
            if (!value) {
                return null;
            }
            return JSON.parse(value);
        }
        catch (error) {
            logger_1.logger.error({ error, key }, 'Cache get error');
            return null;
        }
    },
    /**
     * Set a cached value
     */
    async set(key, value, ttlSeconds) {
        try {
            const serialized = JSON.stringify(value);
            if (ttlSeconds) {
                await redis_service_1.redis.setex(key, ttlSeconds, serialized);
            }
            else {
                await redis_service_1.redis.set(key, serialized);
            }
        }
        catch (error) {
            logger_1.logger.error({ error, key }, 'Cache set error');
        }
    },
    /**
     * Delete a cached value
     */
    async del(key) {
        try {
            await redis_service_1.redis.del(key);
        }
        catch (error) {
            logger_1.logger.error({ error, key }, 'Cache delete error');
        }
    },
    /**
     * Check if a key exists
     */
    async exists(key) {
        try {
            const result = await redis_service_1.redis.exists(key);
            return result === 1;
        }
        catch (error) {
            logger_1.logger.error({ error, key }, 'Cache exists error');
            return false;
        }
    },
    /**
     * Set expiration on a key
     */
    async expire(key, ttlSeconds) {
        try {
            await redis_service_1.redis.expire(key, ttlSeconds);
        }
        catch (error) {
            logger_1.logger.error({ error, key }, 'Cache expire error');
        }
    },
    /**
     * Get TTL of a key
     */
    async ttl(key) {
        try {
            return await redis_service_1.redis.ttl(key);
        }
        catch (error) {
            logger_1.logger.error({ error, key }, 'Cache TTL error');
            return -1;
        }
    },
    /**
     * Get keys matching a pattern
     */
    async keys(pattern) {
        try {
            return await redis_service_1.redis.keys(pattern);
        }
        catch (error) {
            logger_1.logger.error({ error, pattern }, 'Cache keys error');
            return [];
        }
    },
    /**
     * Flush all keys (use with caution)
     */
    async flush() {
        try {
            await redis_service_1.redis.flushdb();
            logger_1.logger.warn('Cache flushed');
        }
        catch (error) {
            logger_1.logger.error({ error }, 'Cache flush error');
        }
    },
};
//# sourceMappingURL=cache.service.js.map