"use strict";
// ==== FILE: src/domain/auth/services/session.service.ts ====
/**
 * Session Domain Service
 * Session management operations with caching
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionDomainService = void 0;
const logger_1 = require("../../../core/logger");
const cache_1 = require("../../../core/cache");
const http_errors_1 = require("../../../common/errors/http.errors");
const error_codes_constants_1 = require("../../../common/constants/error-codes.constants");
const session_repository_1 = require("../repositories/session.repository");
const auth_mapper_1 = require("../mappers/auth.mapper");
const auth_plugin_1 = require("../../../plugins/auth.plugin");
// ─────────────────────────────────────────────────────────────────────────
// Cache Configuration
// ─────────────────────────────────────────────────────────────────────────
const CACHE = {
    PREFIX: {
        activeSessions: 'sessions:active',
        sessionCount: 'sessions:count',
    },
    TTL: {
        activeSessions: 30,
        sessionCount: 60,
    },
};
function serializeSession(session) {
    return {
        id: session.id.toString(),
        userId: session.userId.toString(),
        tokenHash: session.tokenHash,
        refreshTokenHash: session.refreshTokenHash,
        userAgent: session.userAgent,
        ipAddress: session.ipAddress,
        deviceType: session.deviceType,
        deviceOs: session.deviceOs,
        browser: session.browser,
        country: session.country,
        city: session.city,
        isRevoked: session.isRevoked,
        revokedAt: session.revokedAt?.toISOString() ?? null,
        revokedReason: session.revokedReason,
        authProvider: session.authProvider,
        expiresAt: session.expiresAt.toISOString(),
        lastActiveAt: session.lastActiveAt?.toISOString() ?? null,
        createdAt: session.createdAt.toISOString(),
        updatedAt: session.updatedAt.toISOString(),
    };
}
function deserializeSession(data) {
    return {
        id: BigInt(data.id),
        userId: BigInt(data.userId),
        tokenHash: data.tokenHash,
        refreshTokenHash: data.refreshTokenHash,
        userAgent: data.userAgent,
        ipAddress: data.ipAddress,
        deviceType: data.deviceType,
        deviceOs: data.deviceOs,
        browser: data.browser,
        country: data.country,
        city: data.city,
        isRevoked: data.isRevoked,
        revokedAt: data.revokedAt ? new Date(data.revokedAt) : null,
        revokedReason: data.revokedReason,
        authProvider: data.authProvider,
        expiresAt: new Date(data.expiresAt),
        lastActiveAt: data.lastActiveAt ? new Date(data.lastActiveAt) : null,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
    };
}
function serializeSessions(sessions) {
    return JSON.stringify(sessions.map(serializeSession));
}
function deserializeSessions(cached) {
    try {
        const parsed = JSON.parse(cached);
        return parsed.map(deserializeSession);
    }
    catch {
        return [];
    }
}
function getCacheKey(type, userId) {
    return `${CACHE.PREFIX[type]}:${userId.toString()}`;
}
// ─────────────────────────────────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────────────────────────────────
exports.sessionDomainService = {
    /**
     * Get all active sessions for a user (cached)
     */
    async getActiveSessions(userId, currentSessionId) {
        const cacheKey = getCacheKey('activeSessions', userId);
        try {
            const cached = await cache_1.redis.get(cacheKey);
            if (cached) {
                logger_1.logger.debug({ userId: userId.toString() }, 'Active sessions cache HIT');
                const sessions = deserializeSessions(cached);
                if (sessions.length > 0) {
                    return auth_mapper_1.sessionMapper.toDTOList(sessions, currentSessionId);
                }
            }
        }
        catch (error) {
            logger_1.logger.debug({ error }, 'Sessions cache read error');
        }
        logger_1.logger.debug({ userId: userId.toString() }, 'Active sessions cache MISS');
        const sessions = await session_repository_1.sessionRepository.findActiveByUserId(userId);
        cache_1.redis
            .setex(cacheKey, CACHE.TTL.activeSessions, serializeSessions(sessions))
            .catch(error => logger_1.logger.debug({ error }, 'Sessions cache write error'));
        return auth_mapper_1.sessionMapper.toDTOList(sessions, currentSessionId);
    },
    /**
     * Get a specific session
     */
    async getSession(userId, sessionId, currentSessionId) {
        const session = await session_repository_1.sessionRepository.findById(sessionId);
        if (!session) {
            throw new http_errors_1.NotFoundError('Session not found', error_codes_constants_1.ERROR_CODES.NOT_FOUND);
        }
        if (session.userId !== userId) {
            throw new http_errors_1.ForbiddenError('Access denied', error_codes_constants_1.ERROR_CODES.FORBIDDEN);
        }
        return auth_mapper_1.sessionMapper.toDTO(session, currentSessionId);
    },
    /**
     * Revoke a specific session
     */
    async revokeSession(userId, sessionId, currentSessionId) {
        const session = await session_repository_1.sessionRepository.findById(sessionId);
        if (!session) {
            throw new http_errors_1.NotFoundError('Session not found', error_codes_constants_1.ERROR_CODES.NOT_FOUND);
        }
        if (session.userId !== userId) {
            throw new http_errors_1.ForbiddenError('Access denied', error_codes_constants_1.ERROR_CODES.FORBIDDEN);
        }
        if (currentSessionId && session.id === currentSessionId) {
            throw new http_errors_1.BadRequestError('Cannot revoke current session. Use logout instead.', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
        }
        await session_repository_1.sessionRepository.revoke(sessionId, 'User revoked session');
        await Promise.all([
            (0, auth_plugin_1.invalidateSessionCache)(sessionId),
            this.invalidateUserSessionCaches(userId),
        ]);
        logger_1.logger.info({ userId: userId.toString(), sessionId: sessionId.toString() }, 'Session revoked');
    },
    /**
     * Revoke all sessions except the current one
     */
    async revokeOtherSessions(userId, currentSessionId) {
        const sessions = await session_repository_1.sessionRepository.findActiveByUserId(userId);
        const sessionsToInvalidate = sessions.filter(s => s.id !== currentSessionId);
        const count = await session_repository_1.sessionRepository.revokeAllExcept(userId, currentSessionId, 'User revoked other sessions');
        const invalidationPromises = [this.invalidateUserSessionCaches(userId)];
        for (const session of sessionsToInvalidate) {
            invalidationPromises.push((0, auth_plugin_1.invalidateSessionCache)(session.id));
        }
        await Promise.all(invalidationPromises);
        logger_1.logger.info({ userId: userId.toString(), count }, 'Other sessions revoked');
        return count;
    },
    /**
     * Get active session count for a user (cached)
     */
    async getSessionCount(userId) {
        const cacheKey = getCacheKey('sessionCount', userId);
        try {
            const cached = await cache_1.redis.get(cacheKey);
            if (cached !== null) {
                return parseInt(cached, 10);
            }
        }
        catch (error) {
            logger_1.logger.debug({ error }, 'Session count cache read error');
        }
        const count = await session_repository_1.sessionRepository.countActiveForUser(userId);
        cache_1.redis
            .setex(cacheKey, CACHE.TTL.sessionCount, count.toString())
            .catch(error => logger_1.logger.debug({ error }, 'Session count cache write error'));
        return count;
    },
    /**
     * Update session last activity timestamp
     */
    async updateActivity(sessionId) {
        await session_repository_1.sessionRepository.updateLastActive(sessionId);
    },
    /**
     * Cleanup expired sessions
     */
    async cleanupExpired() {
        const count = await session_repository_1.sessionRepository.cleanupExpired();
        if (count > 0) {
            logger_1.logger.info({ count }, 'Cleaned up expired sessions');
        }
        return count;
    },
    /**
     * Invalidate all session-related caches for a user
     */
    async invalidateUserSessionCaches(userId) {
        const keys = [
            getCacheKey('activeSessions', userId),
            getCacheKey('sessionCount', userId),
        ];
        try {
            await cache_1.redis.del(...keys);
            logger_1.logger.debug({ userId: userId.toString() }, 'User session caches invalidated');
        }
        catch (error) {
            logger_1.logger.debug({ error }, 'Session caches invalidation error');
        }
    },
    /**
     * Revoke all sessions for a user
     */
    async revokeAllSessions(userId, reason) {
        const sessions = await session_repository_1.sessionRepository.findActiveByUserId(userId);
        const count = await session_repository_1.sessionRepository.revokeAllForUser(userId, reason);
        const invalidationPromises = [this.invalidateUserSessionCaches(userId)];
        for (const session of sessions) {
            invalidationPromises.push((0, auth_plugin_1.invalidateSessionCache)(session.id));
        }
        await Promise.all(invalidationPromises);
        logger_1.logger.info({ userId: userId.toString(), count, reason }, 'All sessions revoked');
        return count;
    },
};
//# sourceMappingURL=session.service.js.map