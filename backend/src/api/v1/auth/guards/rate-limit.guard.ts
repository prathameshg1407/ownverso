// ==== FILE: src/api/v1/auth/guards/rate-limit.guard.ts ====
/**
 * Auth Rate Limit Guards
 */

import type { FastifyRequest, preHandlerHookHandler } from 'fastify';
import { TooManyRequestsError } from '@/common/errors/http.errors';
import { cacheService } from '@/core/cache';
import { logger } from '@/core/logger';

export interface RateLimitConfig {
  readonly max: number;
  readonly windowMs: number;
  readonly keyPrefix: string;
  readonly byUser?: boolean;
  readonly skip?: (request: FastifyRequest) => boolean;
}

type Preset = 'strict' | 'moderate' | 'relaxed';

const PRESETS: Record<Preset, Pick<RateLimitConfig, 'max' | 'windowMs'>> = {
  strict: { max: 3, windowMs: 60_000 },
  moderate: { max: 5, windowMs: 60_000 },
  relaxed: { max: 10, windowMs: 60_000 },
};

const HOUR_MS = 60 * 60 * 1000;

export function createRateLimitGuard(config: RateLimitConfig): preHandlerHookHandler {
  const windowSeconds = Math.ceil(config.windowMs / 1000);

  return async (request) => {
    if (config.skip?.(request)) return;

    const identifier = config.byUser && request.user ? request.user.publicId : request.ip;
    const key = `ratelimit:${config.keyPrefix}:${identifier}`;

    try {
      const current = (await cacheService.get<number>(key)) ?? 0;

      if (current >= config.max) {
        const ttl = await cacheService.ttl(key);
        const minutes = Math.ceil(ttl / 60);

        logger.warn({ ip: request.ip, key, current, max: config.max }, 'Rate limit exceeded');

        throw new TooManyRequestsError(
          minutes === 1
            ? 'Too many requests. Try again in 1 minute.'
            : `Too many requests. Try again in ${minutes} minutes.`,
          ttl,
          { retryAfter: ttl, limit: config.max }
        );
      }

      await cacheService.set(key, current + 1, windowSeconds);
    } catch (error) {
      if (error instanceof TooManyRequestsError) throw error;
      logger.error({ error, key }, 'Rate limit check failed');
    }
  };
}

function fromPreset(preset: Preset, keyPrefix: string): preHandlerHookHandler {
  return createRateLimitGuard({ ...PRESETS[preset], keyPrefix });
}

export const authRateLimitGuards = {
  login: fromPreset('moderate', 'auth:login'),
  register: fromPreset('strict', 'auth:register'),
  refresh: fromPreset('relaxed', 'auth:refresh'),
  mfa: fromPreset('moderate', 'auth:mfa'),
  passwordReset: createRateLimitGuard({ max: 3, windowMs: HOUR_MS, keyPrefix: 'auth:password-reset' }),
  emailVerification: createRateLimitGuard({ max: 5, windowMs: HOUR_MS, keyPrefix: 'auth:email-verify' }),
  oauthCallback: fromPreset('relaxed', 'auth:oauth'),
} as const;