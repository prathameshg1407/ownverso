"use strict";
// ==== FILE: src/domain/auth/repositories/session.repository.ts ====
/**
 * Session Repository
 * Data access layer for user sessions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRepository = void 0;
const database_1 = require("../../../core/database");
const logger_1 = require("../../../core/logger");
const config_1 = require("../../../config");
const crypto_utils_1 = require("../utils/crypto.utils");
// ─────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────
const CLEANUP_RETENTION_DAYS = 7;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const SESSION_LIST_SELECT = {
    id: true,
    userId: true,
    userAgent: true,
    ipAddress: true,
    deviceType: true,
    deviceOs: true,
    browser: true,
    country: true,
    city: true,
    isRevoked: true,
    revokedAt: true,
    revokedReason: true,
    authProvider: true,
    expiresAt: true,
    lastActiveAt: true,
    createdAt: true,
    updatedAt: true,
};
// ─────────────────────────────────────────────────────────────────────────
// Repository
// ─────────────────────────────────────────────────────────────────────────
exports.sessionRepository = {
    async create(input) {
        await this.enforceSessionLimit(input.userId);
        const session = await database_1.prisma.session.create({
            data: {
                userId: input.userId,
                tokenHash: input.tokenHash ?? `pending_${Date.now()}`,
                refreshTokenHash: input.refreshTokenHash ?? `pending_${Date.now()}`,
                userAgent: input.userAgent,
                ipAddress: input.ipAddress,
                deviceType: input.deviceType,
                deviceOs: input.deviceOs,
                browser: input.browser,
                country: input.country,
                city: input.city,
                authProvider: input.authProvider,
                expiresAt: input.expiresAt,
                lastActiveAt: new Date(),
            },
        });
        logger_1.logger.debug({ sessionId: session.id.toString() }, 'Session created');
        return session;
    },
    async findById(id) {
        return database_1.prisma.session.findUnique({ where: { id } });
    },
    async findByIdMinimal(id) {
        return database_1.prisma.session.findUnique({
            where: { id },
            select: { id: true, isRevoked: true, expiresAt: true },
        });
    },
    async findByTokenHash(tokenHash) {
        return database_1.prisma.session.findUnique({ where: { tokenHash } });
    },
    async findByRefreshTokenHash(refreshTokenHash) {
        return database_1.prisma.session.findUnique({ where: { refreshTokenHash } });
    },
    async findByAccessToken(accessToken) {
        return this.findByTokenHash((0, crypto_utils_1.hashToken)(accessToken));
    },
    async findByRefreshToken(refreshToken) {
        return this.findByRefreshTokenHash((0, crypto_utils_1.hashToken)(refreshToken));
    },
    async findActiveByUserId(userId) {
        return database_1.prisma.session.findMany({
            where: {
                userId,
                isRevoked: false,
                expiresAt: { gt: new Date() },
            },
            orderBy: { lastActiveAt: 'desc' },
        });
    },
    async findActiveByUserIdMinimal(userId) {
        return database_1.prisma.session.findMany({
            where: {
                userId,
                isRevoked: false,
                expiresAt: { gt: new Date() },
            },
            select: SESSION_LIST_SELECT,
            orderBy: { lastActiveAt: 'desc' },
        });
    },
    async updateLastActive(id) {
        await database_1.prisma.session.update({
            where: { id },
            data: { lastActiveAt: new Date() },
        });
    },
    async updateTokens(id, tokenHash, refreshTokenHash, expiresAt) {
        await database_1.prisma.session.update({
            where: { id },
            data: {
                tokenHash,
                refreshTokenHash,
                expiresAt,
                lastActiveAt: new Date(),
            },
        });
    },
    async revoke(id, reason = 'User logout') {
        await database_1.prisma.session.update({
            where: { id },
            data: {
                isRevoked: true,
                revokedAt: new Date(),
                revokedReason: reason,
            },
        });
        logger_1.logger.debug({ sessionId: id.toString(), reason }, 'Session revoked');
    },
    async revokeByTokenHash(tokenHash, reason = 'User logout') {
        await database_1.prisma.session.updateMany({
            where: { tokenHash },
            data: {
                isRevoked: true,
                revokedAt: new Date(),
                revokedReason: reason,
            },
        });
    },
    async revokeAllForUser(userId, reason = 'Logout all') {
        const result = await database_1.prisma.session.updateMany({
            where: { userId, isRevoked: false },
            data: {
                isRevoked: true,
                revokedAt: new Date(),
                revokedReason: reason,
            },
        });
        logger_1.logger.info({ userId: userId.toString(), count: result.count }, 'All sessions revoked');
        return result.count;
    },
    async revokeAllExcept(userId, exceptSessionId, reason = 'Logout other devices') {
        const result = await database_1.prisma.session.updateMany({
            where: {
                userId,
                isRevoked: false,
                id: { not: exceptSessionId },
            },
            data: {
                isRevoked: true,
                revokedAt: new Date(),
                revokedReason: reason,
            },
        });
        logger_1.logger.info({ userId: userId.toString(), count: result.count }, 'Other sessions revoked');
        return result.count;
    },
    async countActiveForUser(userId) {
        return database_1.prisma.session.count({
            where: {
                userId,
                isRevoked: false,
                expiresAt: { gt: new Date() },
            },
        });
    },
    async cleanupExpired() {
        const retentionDate = new Date(Date.now() - CLEANUP_RETENTION_DAYS * MS_PER_DAY);
        const result = await database_1.prisma.session.deleteMany({
            where: {
                OR: [
                    { expiresAt: { lt: new Date() } },
                    { isRevoked: true, revokedAt: { lt: retentionDate } },
                ],
            },
        });
        if (result.count > 0) {
            logger_1.logger.info({ count: result.count }, 'Cleaned up expired sessions');
        }
        return result.count;
    },
    async enforceSessionLimit(userId) {
        const maxSessions = config_1.config.auth.session.maxSessionsPerUser;
        const sessionCount = await this.countActiveForUser(userId);
        if (sessionCount < maxSessions)
            return;
        const sessionsToRevoke = sessionCount - maxSessions + 1;
        const oldestSessions = await database_1.prisma.session.findMany({
            where: {
                userId,
                isRevoked: false,
                expiresAt: { gt: new Date() },
            },
            orderBy: { lastActiveAt: 'asc' },
            take: sessionsToRevoke,
            select: { id: true },
        });
        if (oldestSessions.length === 0)
            return;
        await database_1.prisma.session.updateMany({
            where: { id: { in: oldestSessions.map(s => s.id) } },
            data: {
                isRevoked: true,
                revokedAt: new Date(),
                revokedReason: 'Session limit exceeded',
            },
        });
        logger_1.logger.info({ userId: userId.toString(), revokedCount: oldestSessions.length }, 'Revoked old sessions due to limit');
    },
    async getActiveSessionIds(userId) {
        const sessions = await database_1.prisma.session.findMany({
            where: {
                userId,
                isRevoked: false,
                expiresAt: { gt: new Date() },
            },
            select: { id: true },
        });
        return sessions.map(s => s.id);
    },
};
//# sourceMappingURL=session.repository.js.map