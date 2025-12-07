/**
 * Rate Limit Plugin
 *
 * Configures rate limiting with Redis store.
 */

import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import rateLimit from '@fastify/rate-limit';

import { config } from '@/config';
import { redis } from '@/core/cache';
import { logger } from '@/core/logger';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';

/**
 * Rate limit context from @fastify/rate-limit
 */
interface RateLimitContext {
  max: number;
  ttl: number;
}

/**
 * Rate limit key generator
 */
function generateKey(request: FastifyRequest): string {
  return `ratelimit:${request.ip}:${request.routeOptions.url || request.url}`;
}

/**
 * Build error response for rate limit exceeded
 */
function buildErrorResponse(_request: FastifyRequest, context: RateLimitContext) {
  const retryAfter = Math.ceil(context.ttl / 1000);
  return {
    success: false,
    error: {
      code: ERROR_CODES.RATE_LIMITED,
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

const rateLimitPluginImpl: FastifyPluginAsync = async (fastify) => {
  if (!config.rateLimit.enabled) {
    logger.info('Rate limiting is disabled');
    return;
  }

  await fastify.register(rateLimit, {
    global: true,
    max: config.rateLimit.global.max,
    timeWindow: config.rateLimit.global.timeWindow,
    redis,
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
      logger.warn(
        { ip: request.ip, url: request.url, method: request.method },
        'Rate limit approaching'
      );
    },
    onExceeded: (request) => {
      logger.warn(
        { ip: request.ip, url: request.url, method: request.method },
        'Rate limit exceeded'
      );
    },
  });

  logger.info('Rate limiting enabled');
};

export const rateLimitPlugin = fp(rateLimitPluginImpl, {
  name: 'rate-limit-plugin',
  dependencies: ['redis-plugin'],
});

/**
 * Route rate limit configuration type
 */
export interface RouteRateLimitConfig {
  config: {
    rateLimit: {
      max: number;
      timeWindow: number;
    };
  };
}

/**
 * Create route-specific rate limit config
 */
export function createRouteRateLimit(
  max: number,
  timeWindowMs: number
): RouteRateLimitConfig {
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
export const authRateLimits = {
  login: createRouteRateLimit(
    config.auth.rateLimit.login.max,
    config.auth.rateLimit.login.windowMs
  ),
  register: createRouteRateLimit(
    config.auth.rateLimit.register.max,
    config.auth.rateLimit.register.windowMs
  ),
  passwordReset: createRouteRateLimit(
    config.auth.rateLimit.passwordReset.max,
    config.auth.rateLimit.passwordReset.windowMs
  ),
  emailVerification: createRouteRateLimit(
    config.auth.rateLimit.emailVerification.max,
    config.auth.rateLimit.emailVerification.windowMs
  ),
  mfa: createRouteRateLimit(
    config.auth.rateLimit.mfa.max,
    config.auth.rateLimit.mfa.windowMs
  ),
  refresh: createRouteRateLimit(
    config.auth.rateLimit.refresh.max,
    config.auth.rateLimit.refresh.windowMs
  ),
} as const;