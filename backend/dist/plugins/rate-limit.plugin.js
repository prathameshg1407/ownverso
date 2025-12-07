"use strict";
/**
 * Rate Limit Plugin
 *
 * Configures rate limiting with Redis store.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRateLimits = exports.rateLimitPlugin = void 0;
exports.createRouteRateLimit = createRouteRateLimit;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const config_1 = require("../config");
const cache_1 = require("../core/cache");
const logger_1 = require("../core/logger");
const error_codes_constants_1 = require("../common/constants/error-codes.constants");
/**
 * Rate limit key generator
 */
function generateKey(request) {
    return `ratelimit:${request.ip}:${request.routeOptions.url || request.url}`;
}
/**
 * Build error response for rate limit exceeded
 */
function buildErrorResponse(_request, context) {
    const retryAfter = Math.ceil(context.ttl / 1000);
    return {
        success: false,
        error: {
            code: error_codes_constants_1.ERROR_CODES.RATE_LIMITED,
            message: `Too many requests. Please try again in ${retryAfter} seconds.`,
            statusCode: 429,
            details: {
                retryAfter,
                limit: context.max,
                remaining: 0,
            },
        },
        timestamp: new Date().toISOString(),
    };
}
const rateLimitPluginImpl = async (fastify) => {
    if (!config_1.config.rateLimit.enabled) {
        logger_1.logger.info('Rate limiting is disabled');
        return;
    }
    await fastify.register(rate_limit_1.default, {
        global: true,
        max: config_1.config.rateLimit.global.max,
        timeWindow: config_1.config.rateLimit.global.timeWindow,
        redis: cache_1.redis,
        keyGenerator: generateKey,
        errorResponseBuilder: buildErrorResponse,
        addHeaders: {
            'x-ratelimit-limit': true,
            'x-ratelimit-remaining': true,
            'x-ratelimit-reset': true,
            'retry-after': true,
        },
        allowList: (request) => request.url.startsWith('/health'),
        onExceeding: (request) => {
            logger_1.logger.warn({ ip: request.ip, url: request.url, method: request.method }, 'Rate limit approaching');
        },
        onExceeded: (request) => {
            logger_1.logger.warn({ ip: request.ip, url: request.url, method: request.method }, 'Rate limit exceeded');
        },
    });
    logger_1.logger.info('Rate limiting enabled');
};
exports.rateLimitPlugin = (0, fastify_plugin_1.default)(rateLimitPluginImpl, {
    name: 'rate-limit-plugin',
    dependencies: ['redis-plugin'],
});
/**
 * Create route-specific rate limit config
 */
function createRouteRateLimit(max, timeWindowMs) {
    return {
        config: {
            rateLimit: {
                max,
                timeWindow: timeWindowMs,
            },
        },
    };
}
/**
 * Auth rate limit configurations
 */
exports.authRateLimits = {
    login: createRouteRateLimit(config_1.config.auth.rateLimit.login.max, config_1.config.auth.rateLimit.login.windowMs),
    register: createRouteRateLimit(config_1.config.auth.rateLimit.register.max, config_1.config.auth.rateLimit.register.windowMs),
    passwordReset: createRouteRateLimit(config_1.config.auth.rateLimit.passwordReset.max, config_1.config.auth.rateLimit.passwordReset.windowMs),
    emailVerification: createRouteRateLimit(config_1.config.auth.rateLimit.emailVerification.max, config_1.config.auth.rateLimit.emailVerification.windowMs),
    mfa: createRouteRateLimit(config_1.config.auth.rateLimit.mfa.max, config_1.config.auth.rateLimit.mfa.windowMs),
    refresh: createRouteRateLimit(config_1.config.auth.rateLimit.refresh.max, config_1.config.auth.rateLimit.refresh.windowMs),
};
//# sourceMappingURL=rate-limit.plugin.js.map