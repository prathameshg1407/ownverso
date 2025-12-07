"use strict";
/**
 * User Security Service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSecurityService = void 0;
const logger_1 = require("../../../core/logger");
const cache_1 = require("../../../core/cache");
const user_security_repository_1 = require("../repositories/user-security.repository");
const session_repository_1 = require("../../../domain/auth/repositories/session.repository");
const user_mapper_1 = require("../mappers/user.mapper");
const auth_plugin_1 = require("../../../plugins/auth.plugin");
const CACHE_KEYS = {
    security: (userId) => `user:security:${userId}`,
    sessions: (userId) => `user:sessions:${userId}`,
};
const CACHE_TTL = {
    security: 60,
    sessions: 30,
};
const DEFAULT_SECURITY = {
    mfaEnabled: false,
    emailVerifiedAt: null,
    lastLoginAt: null,
    lastLoginIp: null,
    lastLoginUserAgent: null,
    passwordChangedAt: null,
    failedLoginCount: 0,
    lockedUntil: null,
};
async function getFromCache(key) {
    try {
        const cached = await cache_1.redis.get(key);
        return cached ? JSON.parse(cached) : null;
    }
    catch (error) {
        logger_1.logger.debug({ error, key }, 'Cache read error');
        return null;
    }
}
async function setCache(key, data, ttl) {
    try {
        await cache_1.redis.setex(key, ttl, JSON.stringify(data));
    }
    catch (error) {
        logger_1.logger.debug({ error, key }, 'Cache write error');
    }
}
async function deleteCache(key) {
    try {
        await cache_1.redis.del(key);
    }
    catch (error) {
        logger_1.logger.debug({ error, key }, 'Cache delete error');
    }
}
exports.userSecurityService = {
    async getSecurityInfo(userId) {
        const cacheKey = CACHE_KEYS.security(userId);
        const cached = await getFromCache(cacheKey);
        if (cached) {
            logger_1.logger.debug({ userId: userId.toString() }, 'Security cache hit');
            return cached;
        }
        const security = await user_security_repository_1.userSecurityRepository.findByUserId(userId);
        if (!security) {
            return DEFAULT_SECURITY;
        }
        const dto = user_mapper_1.securityMapper.toDTO(security);
        await setCache(cacheKey, dto, CACHE_TTL.security);
        return dto;
    },
    async getLoginHistory(userId, currentSessionId) {
        const cacheKey = CACHE_KEYS.sessions(userId);
        const cached = await getFromCache(cacheKey);
        if (cached) {
            logger_1.logger.debug({ userId: userId.toString() }, 'Sessions cache hit');
            // Re-apply current session flag since it might differ per request
            return cached.map((session) => ({
                ...session,
                isCurrent: currentSessionId === session.id,
            }));
        }
        const sessions = await session_repository_1.sessionRepository.findActiveByUserId(userId);
        const dtos = sessions.map((s) => user_mapper_1.sessionMapper.toLoginHistoryDTO(s, currentSessionId));
        await setCache(cacheKey, dtos, CACHE_TTL.sessions);
        return dtos;
    },
    async updateSecuritySettings(userId, input) {
        logger_1.logger.info({ userId: userId.toString(), settings: Object.keys(input) }, 'Security settings update requested');
        await this.invalidateSecurityCache(userId);
        return this.getSecurityInfo(userId);
    },
    async forceLogoutAll(userId) {
        await user_security_repository_1.userSecurityRepository.setForceLogout(userId);
        const sessions = await session_repository_1.sessionRepository.findActiveByUserId(userId);
        const revokedCount = await session_repository_1.sessionRepository.revokeAllForUser(userId, 'Force logout all');
        // Invalidate all related caches
        await Promise.all([
            this.invalidateSecurityCache(userId),
            this.invalidateSessionsCache(userId),
            ...sessions.map((s) => (0, auth_plugin_1.invalidateSessionCache)(s.id)),
        ]);
        logger_1.logger.info({ userId: userId.toString(), revokedCount }, 'Force logout all devices');
        return revokedCount;
    },
    async invalidateSecurityCache(userId) {
        await deleteCache(CACHE_KEYS.security(userId));
    },
    async invalidateSessionsCache(userId) {
        await deleteCache(CACHE_KEYS.sessions(userId));
    },
};
//# sourceMappingURL=user-security.service.js.map