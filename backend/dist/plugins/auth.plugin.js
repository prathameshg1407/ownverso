"use strict";
/**
 * Auth Plugin
 *
 * Configures JWT authentication and provides auth decorators.
 *
 * Performance optimizations:
 * - Redis caching for session validation
 * - Combined user + session query (single DB call on cache miss)
 * - Request-scoped caching
 * - Async session activity updates (fire-and-forget)
 * - Parallel cache reads
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPlugin = void 0;
exports.invalidateSessionCache = invalidateSessionCache;
exports.invalidateUserAuthCache = invalidateUserAuthCache;
exports.invalidateAllUserAuthCaches = invalidateAllUserAuthCaches;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const config_1 = require("../config");
const logger_1 = require("../core/logger");
const cache_1 = require("../core/cache");
const security_1 = require("../core/security");
const http_errors_1 = require("../common/errors/http.errors");
const error_codes_constants_1 = require("../common/constants/error-codes.constants");
const database_1 = require("../core/database");
const repositories_1 = require("../domain/auth/repositories");
// ─────────────────────────────────────────────────────────────────────────────
// Cache Configuration
// ─────────────────────────────────────────────────────────────────────────────
const CACHE_PREFIX = {
    session: 'session:valid',
    user: 'auth:user',
    combined: 'auth:combined',
};
const CACHE_TTL = {
    session: 60,
    user: 300,
    combined: 60,
};
// User fields needed for authentication
const AUTH_USER_SELECT = {
    id: true,
    publicId: true,
    email: true,
    username: true,
    displayName: true,
    role: true,
    status: true,
    emailVerified: true,
    deletedAt: true,
    createdAt: true,
    profile: {
        select: {
            avatarUrl: true,
            bio: true,
            locale: true,
            timezone: true,
        },
    },
    security: {
        select: {
            lockedUntil: true,
            forceLogoutAt: true,
            failedLoginCount: true,
        },
    },
};
// ─────────────────────────────────────────────────────────────────────────────
// Cache Invalidation Functions (exported for use in other services)
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Invalidate session cache (call on logout, revoke, etc.)
 */
async function invalidateSessionCache(sessionId) {
    const sessionIdStr = sessionId.toString();
    try {
        await Promise.all([
            cache_1.redis.del(`${CACHE_PREFIX.session}:${sessionIdStr}`),
            cache_1.redis.del(`${CACHE_PREFIX.combined}:${sessionIdStr}`),
        ]);
    }
    catch (error) {
        logger_1.logger.debug({ error }, 'Session cache invalidation error');
    }
}
/**
 * Invalidate user auth cache
 */
async function invalidateUserAuthCache(publicId) {
    try {
        await cache_1.redis.del(`${CACHE_PREFIX.user}:${publicId}`);
    }
    catch (error) {
        logger_1.logger.debug({ error }, 'User cache invalidation error');
    }
}
/**
 * Invalidate all auth caches for a user (call on password change, role change, etc.)
 */
async function invalidateAllUserAuthCaches(publicId, sessionIds) {
    try {
        const keysToDelete = [`${CACHE_PREFIX.user}:${publicId}`];
        if (sessionIds) {
            for (const sessionId of sessionIds) {
                const sessionIdStr = sessionId.toString();
                keysToDelete.push(`${CACHE_PREFIX.session}:${sessionIdStr}`);
                keysToDelete.push(`${CACHE_PREFIX.combined}:${sessionIdStr}`);
            }
        }
        if (keysToDelete.length > 0) {
            await cache_1.redis.del(...keysToDelete);
        }
    }
    catch (error) {
        logger_1.logger.debug({ error }, 'User auth caches invalidation error');
    }
}
// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Extract token from request (header or cookie)
 */
function extractToken(request) {
    // Try Authorization header first
    const authHeader = request.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.slice(7);
    }
    // Try cookie
    return request.cookies[config_1.config.auth.cookies.accessToken.name] ?? null;
}
/**
 * Parse user data from cache string
 */
function parseUserFromCache(cached) {
    try {
        const parsed = JSON.parse(cached);
        // Restore BigInt
        parsed.id = BigInt(parsed.id);
        // Restore dates
        if (parsed.deletedAt) {
            parsed.deletedAt = new Date(parsed.deletedAt);
        }
        if (parsed.createdAt) {
            parsed.createdAt = new Date(parsed.createdAt);
        }
        if (parsed.security?.lockedUntil) {
            parsed.security.lockedUntil = new Date(parsed.security.lockedUntil);
        }
        if (parsed.security?.forceLogoutAt) {
            parsed.security.forceLogoutAt = new Date(parsed.security.forceLogoutAt);
        }
        return parsed;
    }
    catch {
        return null;
    }
}
/**
 * Serialize user data for caching
 */
function serializeUserForCache(user) {
    return JSON.stringify({
        ...user,
        id: user.id.toString(),
        deletedAt: user.deletedAt?.toISOString() ?? null,
        createdAt: user.createdAt.toISOString(),
        security: user.security
            ? {
                ...user.security,
                lockedUntil: user.security.lockedUntil?.toISOString() ?? null,
                forceLogoutAt: user.security.forceLogoutAt?.toISOString() ?? null,
            }
            : null,
    });
}
/**
 * Cache session validity result (fire-and-forget)
 */
function cacheSessionValidityAsync(cacheKey, isValid) {
    cache_1.redis
        .setex(cacheKey, CACHE_TTL.session, isValid ? 'valid' : 'invalid')
        .catch((error) => logger_1.logger.debug({ error }, 'Session cache write error'));
}
/**
 * Cache user data (fire-and-forget)
 */
function cacheUserDataAsync(cacheKey, user) {
    cache_1.redis
        .setex(cacheKey, CACHE_TTL.user, serializeUserForCache(user))
        .catch((error) => logger_1.logger.debug({ error }, 'User cache write error'));
}
/**
 * Cache combined auth data (fire-and-forget)
 */
function cacheCombinedAuthAsync(sessionId, data) {
    const cacheKey = `${CACHE_PREFIX.combined}:${sessionId}`;
    const serialized = JSON.stringify({
        user: {
            ...data.user,
            id: data.user.id.toString(),
            deletedAt: data.user.deletedAt?.toISOString() ?? null,
            createdAt: data.user.createdAt.toISOString(),
            security: data.user.security
                ? {
                    ...data.user.security,
                    lockedUntil: data.user.security.lockedUntil?.toISOString() ?? null,
                    forceLogoutAt: data.user.security.forceLogoutAt?.toISOString() ?? null,
                }
                : null,
        },
        sessionValid: data.sessionValid,
    });
    cache_1.redis
        .setex(cacheKey, CACHE_TTL.combined, serialized)
        .catch((error) => logger_1.logger.debug({ error }, 'Combined cache write error'));
}
/**
 * Parse combined auth data from cache
 */
function parseCombinedFromCache(cached) {
    try {
        const parsed = JSON.parse(cached);
        const user = parseUserFromCache(JSON.stringify(parsed.user));
        if (!user)
            return null;
        return {
            user,
            sessionValid: parsed.sessionValid,
        };
    }
    catch {
        return null;
    }
}
/**
 * Combined session + user validation (SINGLE query on cache miss)
 * This is the main performance optimization
 */
async function validateAndGetUser(payload) {
    const { sessionId, sub: publicId } = payload;
    if (!sessionId) {
        return { valid: false, user: null, reason: 'No session ID in token' };
    }
    const sessionIdStr = sessionId.toString();
    const combinedCacheKey = `${CACHE_PREFIX.combined}:${sessionIdStr}`;
    const sessionCacheKey = `${CACHE_PREFIX.session}:${sessionIdStr}`;
    const userCacheKey = `${CACHE_PREFIX.user}:${publicId}`;
    // ─────────────────────────────────────────────────────────────────────────
    // Step 1: Try combined cache first (fastest path)
    // ─────────────────────────────────────────────────────────────────────────
    try {
        const combinedCached = await cache_1.redis.get(combinedCacheKey);
        if (combinedCached) {
            const combined = parseCombinedFromCache(combinedCached);
            if (combined) {
                if (!combined.sessionValid) {
                    return { valid: false, user: null, reason: 'Session invalid (cached)' };
                }
                logger_1.logger.debug({ sessionId: sessionIdStr }, 'Auth cache HIT (combined)');
                return { valid: true, user: combined.user };
            }
        }
    }
    catch (error) {
        logger_1.logger.debug({ error }, 'Combined cache read error');
    }
    // ─────────────────────────────────────────────────────────────────────────
    // Step 2: Try individual caches in parallel
    // ─────────────────────────────────────────────────────────────────────────
    try {
        const [sessionCached, userCached] = await Promise.all([
            cache_1.redis.get(sessionCacheKey),
            cache_1.redis.get(userCacheKey),
        ]);
        // Session explicitly invalid
        if (sessionCached === 'invalid') {
            return { valid: false, user: null, reason: 'Session invalid (cached)' };
        }
        // Both cached and valid
        if (sessionCached === 'valid' && userCached) {
            const user = parseUserFromCache(userCached);
            if (user && user.publicId === publicId) {
                logger_1.logger.debug({ sessionId: sessionIdStr }, 'Auth cache HIT (individual)');
                // Update combined cache for next time
                cacheCombinedAuthAsync(sessionIdStr, { user, sessionValid: true });
                return { valid: true, user };
            }
        }
    }
    catch (error) {
        logger_1.logger.debug({ error }, 'Individual cache read error');
    }
    // ─────────────────────────────────────────────────────────────────────────
    // Step 3: Cache miss - SINGLE combined database query
    // ─────────────────────────────────────────────────────────────────────────
    logger_1.logger.debug({ sessionId: sessionIdStr }, 'Auth cache MISS - querying database');
    try {
        const session = await database_1.prisma.session.findUnique({
            where: { id: BigInt(sessionId) },
            select: {
                id: true,
                isRevoked: true,
                expiresAt: true,
                user: {
                    select: AUTH_USER_SELECT,
                },
            },
        });
        // Session not found
        if (!session) {
            cacheSessionValidityAsync(sessionCacheKey, false);
            return { valid: false, user: null, reason: 'Session not found' };
        }
        // Session revoked
        if (session.isRevoked) {
            cacheSessionValidityAsync(sessionCacheKey, false);
            cacheCombinedAuthAsync(sessionIdStr, {
                user: session.user,
                sessionValid: false,
            });
            return { valid: false, user: null, reason: 'Session has been revoked' };
        }
        // Session expired
        if (session.expiresAt < new Date()) {
            cacheSessionValidityAsync(sessionCacheKey, false);
            return { valid: false, user: null, reason: 'Session has expired' };
        }
        // User not found (shouldn't happen with FK constraint)
        if (!session.user) {
            cacheSessionValidityAsync(sessionCacheKey, false);
            return { valid: false, user: null, reason: 'User not found' };
        }
        const user = session.user;
        // Verify user publicId matches token
        if (user.publicId !== publicId) {
            cacheSessionValidityAsync(sessionCacheKey, false);
            return { valid: false, user: null, reason: 'User mismatch' };
        }
        // Check force logout timestamp
        const forceLogoutAt = user.security?.forceLogoutAt;
        if (forceLogoutAt && payload.iat) {
            const tokenIssuedAt = new Date(payload.iat * 1000);
            if (forceLogoutAt > tokenIssuedAt) {
                cacheSessionValidityAsync(sessionCacheKey, false);
                return {
                    valid: false,
                    user: null,
                    reason: 'Session invalidated by security action',
                };
            }
        }
        // ─────────────────────────────────────────────────────────────────────────
        // Success! Cache everything for future requests
        // ─────────────────────────────────────────────────────────────────────────
        cacheSessionValidityAsync(sessionCacheKey, true);
        cacheUserDataAsync(userCacheKey, user);
        cacheCombinedAuthAsync(sessionIdStr, { user, sessionValid: true });
        return { valid: true, user };
    }
    catch (error) {
        logger_1.logger.error({ error, sessionId: sessionIdStr }, 'Session/user validation error');
        return { valid: false, user: null, reason: 'Validation error' };
    }
}
/**
 * Check if user can access the system
 */
function checkUserAccess(user) {
    // Check if user is deleted
    if (user.deletedAt) {
        return { allowed: false, reason: 'Account has been deleted' };
    }
    // Check status
    switch (user.status) {
        case 'SUSPENDED':
            return { allowed: false, reason: 'Account is suspended' };
        case 'BANNED':
            return { allowed: false, reason: 'Account is banned' };
        case 'DELETED':
        case 'DEACTIVATED':
            return { allowed: false, reason: 'Account is no longer active' };
    }
    // Check lock status
    if (user.security?.lockedUntil && user.security.lockedUntil > new Date()) {
        return {
            allowed: false,
            reason: `Account is temporarily locked until ${user.security.lockedUntil.toISOString()}`,
        };
    }
    return { allowed: true };
}
/**
 * Transform user to authenticated user object
 */
function toAuthenticatedUser(user) {
    return {
        id: user.id,
        publicId: user.publicId,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        status: user.status,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        profile: user.profile
            ? {
                avatarUrl: user.profile.avatarUrl,
                bio: user.profile.bio,
                locale: user.profile.locale,
                timezone: user.profile.timezone,
            }
            : null,
    };
}
// ─────────────────────────────────────────────────────────────────────────────
// Session Activity Tracking (Debounced)
// ─────────────────────────────────────────────────────────────────────────────
const activityUpdateTimestamps = new Map();
const ACTIVITY_UPDATE_INTERVAL = 60 * 1000;
const ACTIVITY_MAP_CLEANUP_THRESHOLD = 1000;
/**
 * Update session last activity timestamp (debounced, fire-and-forget)
 */
async function updateSessionActivityDebounced(sessionId) {
    const now = Date.now();
    const lastUpdate = activityUpdateTimestamps.get(sessionId) ?? 0;
    if (now - lastUpdate < ACTIVITY_UPDATE_INTERVAL) {
        return;
    }
    activityUpdateTimestamps.set(sessionId, now);
    try {
        await repositories_1.sessionRepository.updateLastActive(BigInt(sessionId));
    }
    catch (error) {
        logger_1.logger.debug({ error, sessionId }, 'Failed to update session activity');
    }
    if (activityUpdateTimestamps.size > ACTIVITY_MAP_CLEANUP_THRESHOLD) {
        const cutoff = now - ACTIVITY_UPDATE_INTERVAL * 2;
        for (const [key, timestamp] of activityUpdateTimestamps) {
            if (timestamp < cutoff) {
                activityUpdateTimestamps.delete(key);
            }
        }
    }
}
// ─────────────────────────────────────────────────────────────────────────────
// Auth Plugin Implementation
// ─────────────────────────────────────────────────────────────────────────────
const authPluginImpl = async (fastify) => {
    // Register cookie plugin for cookie-based auth
    await fastify.register(cookie_1.default, {
        secret: config_1.config.jwt.access.secret,
        parseOptions: {},
    });
    // Register JWT plugin (for compatibility)
    await fastify.register(jwt_1.default, {
        secret: config_1.config.jwt.access.secret,
        sign: {
            algorithm: 'HS256',
            expiresIn: config_1.config.jwt.access.expiresIn,
            iss: config_1.config.jwt.issuer,
            aud: config_1.config.jwt.audience,
        },
        verify: {
            algorithms: ['HS256'],
            allowedIss: config_1.config.jwt.issuer,
            allowedAud: config_1.config.jwt.audience,
        },
        cookie: {
            cookieName: config_1.config.auth.cookies.accessToken.name,
            signed: false,
        },
    });
    // ───────────────────────────────────────────────────────────────────────────
    // Authenticate Decorator - Requires Valid Token
    // ───────────────────────────────────────────────────────────────────────────
    fastify.decorate('authenticate', async function (request, _reply) {
        const token = extractToken(request);
        if (!token) {
            throw new http_errors_1.UnauthorizedError('Authentication required', error_codes_constants_1.ERROR_CODES.AUTH_REQUIRED);
        }
        try {
            // 1. Verify JWT signature and claims (sync, very fast)
            const payload = security_1.jwtService.verifyAccessToken(token);
            // 2. Validate session AND get user in ONE database operation
            const { valid, user, reason } = await validateAndGetUser(payload);
            if (!valid || !user) {
                throw new http_errors_1.UnauthorizedError(reason || 'Session is no longer valid', error_codes_constants_1.ERROR_CODES.AUTH_SESSION_INVALID);
            }
            // 3. Check user access permissions (sync, very fast)
            const accessCheck = checkUserAccess(user);
            if (!accessCheck.allowed) {
                throw new http_errors_1.ForbiddenError(accessCheck.reason ?? 'Access denied', error_codes_constants_1.ERROR_CODES.FORBIDDEN);
            }
            // 4. Attach user and payload to request
            request.user = toAuthenticatedUser(user);
            request.jwtPayload = payload;
            // 5. Update session activity (fire-and-forget, non-blocking)
            if (payload.sessionId) {
                setImmediate(() => {
                    updateSessionActivityDebounced(payload.sessionId).catch(() => {
                        // Silently ignore - non-critical
                    });
                });
            }
        }
        catch (error) {
            // Re-throw our custom errors
            if (error instanceof http_errors_1.UnauthorizedError ||
                error instanceof http_errors_1.ForbiddenError) {
                throw error;
            }
            // Log unexpected errors
            logger_1.logger.debug({ error }, 'Token verification failed');
            throw new http_errors_1.UnauthorizedError('Invalid or expired token', error_codes_constants_1.ERROR_CODES.AUTH_INVALID_TOKEN);
        }
    });
    // ───────────────────────────────────────────────────────────────────────────
    // Optional Authenticate Decorator - Doesn't fail if no token
    // ───────────────────────────────────────────────────────────────────────────
    fastify.decorate('authenticateOptional', async function (request, _reply) {
        const token = extractToken(request);
        if (!token) {
            return;
        }
        try {
            const payload = security_1.jwtService.verifyAccessToken(token);
            const { valid, user } = await validateAndGetUser(payload);
            if (!valid || !user) {
                return;
            }
            const accessCheck = checkUserAccess(user);
            if (!accessCheck.allowed) {
                return;
            }
            request.user = toAuthenticatedUser(user);
            request.jwtPayload = payload;
            if (payload.sessionId) {
                setImmediate(() => {
                    updateSessionActivityDebounced(payload.sessionId).catch(() => { });
                });
            }
        }
        catch {
            return;
        }
    });
    // ───────────────────────────────────────────────────────────────────────────
    // Helper Decorators
    // ───────────────────────────────────────────────────────────────────────────
    fastify.decorate('updateSessionActivity', updateSessionActivityDebounced);
    // ───────────────────────────────────────────────────────────────────────────
    // Cookie Helpers
    // ───────────────────────────────────────────────────────────────────────────
    fastify.decorateReply('setAuthCookies', function (accessToken, refreshToken) {
        const { cookies } = config_1.config.auth;
        this.setCookie(cookies.accessToken.name, accessToken, {
            httpOnly: cookies.accessToken.httpOnly,
            secure: cookies.accessToken.secure,
            sameSite: cookies.accessToken.sameSite,
            path: cookies.accessToken.path,
            maxAge: config_1.config.jwt.access.expiresInMs / 1000,
        });
        this.setCookie(cookies.refreshToken.name, refreshToken, {
            httpOnly: cookies.refreshToken.httpOnly,
            secure: cookies.refreshToken.secure,
            sameSite: cookies.refreshToken.sameSite,
            path: cookies.refreshToken.path,
            maxAge: config_1.config.jwt.refresh.expiresInMs / 1000,
        });
        return this;
    });
    fastify.decorateReply('clearAuthCookies', function () {
        const { cookies } = config_1.config.auth;
        this.clearCookie(cookies.accessToken.name, {
            path: cookies.accessToken.path,
        });
        this.clearCookie(cookies.refreshToken.name, {
            path: cookies.refreshToken.path,
        });
        return this;
    });
    logger_1.logger.info('Auth plugin registered');
};
exports.authPlugin = (0, fastify_plugin_1.default)(authPluginImpl, {
    name: 'auth-plugin',
    dependencies: ['prisma-plugin', 'redis-plugin'],
});
//# sourceMappingURL=auth.plugin.js.map