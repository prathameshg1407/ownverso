"use strict";
// ==== FILE: src/api/v1/auth/guards/rate-limit.guard.ts ====
/**
 * Auth Rate Limit Guards
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRateLimitGuards = void 0;
exports.createRateLimitGuard = createRateLimitGuard;
const http_errors_1 = require("../../../../common/errors/http.errors");
const cache_1 = require("../../../../core/cache");
const logger_1 = require("../../../../core/logger");
const PRESETS = {
    strict: { max: 3, windowMs: 60_000 },
    moderate: { max: 5, windowMs: 60_000 },
    relaxed: { max: 10, windowMs: 60_000 },
};
const HOUR_MS = 60 * 60 * 1000;
function createRateLimitGuard(config) {
    const windowSeconds = Math.ceil(config.windowMs / 1000);
    return async (request) => {
        if (config.skip?.(request))
            return;
        const identifier = config.byUser && request.user ? request.user.publicId : request.ip;
        const key = `ratelimit:${config.keyPrefix}:${identifier}`;
        try {
            const current = (await cache_1.cacheService.get(key)) ?? 0;
            if (current >= config.max) {
                const ttl = await cache_1.cacheService.ttl(key);
                const minutes = Math.ceil(ttl / 60);
                logger_1.logger.warn({ ip: request.ip, key, current, max: config.max }, 'Rate limit exceeded');
                throw new http_errors_1.TooManyRequestsError(minutes === 1
                    ? 'Too many requests. Try again in 1 minute.'
                    : `Too many requests. Try again in ${minutes} minutes.`, ttl, { retryAfter: ttl, limit: config.max });
            }
            await cache_1.cacheService.set(key, current + 1, windowSeconds);
        }
        catch (error) {
            if (error instanceof http_errors_1.TooManyRequestsError)
                throw error;
            logger_1.logger.error({ error, key }, 'Rate limit check failed');
        }
    };
}
function fromPreset(preset, keyPrefix) {
    return createRateLimitGuard({ ...PRESETS[preset], keyPrefix });
}
exports.authRateLimitGuards = {
    login: fromPreset('moderate', 'auth:login'),
    register: fromPreset('strict', 'auth:register'),
    refresh: fromPreset('relaxed', 'auth:refresh'),
    mfa: fromPreset('moderate', 'auth:mfa'),
    passwordReset: createRateLimitGuard({ max: 3, windowMs: HOUR_MS, keyPrefix: 'auth:password-reset' }),
    emailVerification: createRateLimitGuard({ max: 5, windowMs: HOUR_MS, keyPrefix: 'auth:email-verify' }),
    oauthCallback: fromPreset('relaxed', 'auth:oauth'),
};
//# sourceMappingURL=rate-limit.guard.js.map