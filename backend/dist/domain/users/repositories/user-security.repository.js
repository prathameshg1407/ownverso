"use strict";
/**
 * User Security Repository
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSecurityRepository = void 0;
const database_1 = require("../../../core/database");
const logger_1 = require("../../../core/logger");
const config_1 = require("../../../config");
const constants_1 = require("../constants");
exports.userSecurityRepository = {
    async findByUserId(userId) {
        return database_1.prisma.userSecurity.findUnique({ where: { userId } });
    },
    async create(userId) {
        return database_1.prisma.userSecurity.create({ data: { userId } });
    },
    async ensureExists(userId) {
        return database_1.prisma.userSecurity.upsert({
            where: { userId },
            create: { userId },
            update: {},
        });
    },
    async setEmailVerified(userId) {
        await database_1.prisma.$transaction([
            database_1.prisma.userSecurity.update({
                where: { userId },
                data: { emailVerifiedAt: new Date() },
            }),
            database_1.prisma.user.update({
                where: { id: userId },
                data: { emailVerified: true, status: 'ACTIVE' },
            }),
        ]);
    },
    async updateLoginInfo(userId, input) {
        await database_1.prisma.userSecurity.update({
            where: { userId },
            data: {
                lastLoginAt: input.lastLoginAt,
                lastLoginIp: input.lastLoginIp,
                lastLoginUserAgent: input.lastLoginUserAgent,
                lastLoginDeviceId: input.lastLoginDeviceId,
                failedLoginCount: 0,
                lockedUntil: null,
            },
        });
    },
    async incrementFailedLoginCount(userId) {
        const security = await database_1.prisma.userSecurity.findUniqueOrThrow({ where: { userId } });
        const newFailedCount = security.failedLoginCount + 1;
        let lockedUntil = null;
        const sortedThresholds = [...config_1.config.auth.lockout.thresholds].sort((a, b) => b.attempts - a.attempts);
        for (const threshold of sortedThresholds) {
            if (newFailedCount >= threshold.attempts) {
                lockedUntil = new Date(Date.now() + threshold.lockoutMinutes * 60 * 1000);
                break;
            }
        }
        await database_1.prisma.userSecurity.update({
            where: { userId },
            data: { failedLoginCount: newFailedCount, lockedUntil },
        });
        if (lockedUntil) {
            logger_1.logger.warn({ userId: userId.toString(), failedCount: newFailedCount, lockedUntil }, 'Account locked due to failed login attempts');
        }
        return { failedCount: newFailedCount, lockedUntil };
    },
    async unlockAccount(userId) {
        await database_1.prisma.userSecurity.update({
            where: { userId },
            data: { lockedUntil: null, failedLoginCount: 0 },
        });
    },
    async setMfaSecret(userId, secret, backupCodes) {
        await database_1.prisma.userSecurity.update({
            where: { userId },
            data: { mfaSecret: secret, mfaBackupCodes: backupCodes, mfaEnabled: false },
        });
    },
    async enableMfa(userId) {
        await database_1.prisma.userSecurity.update({ where: { userId }, data: { mfaEnabled: true } });
    },
    async disableMfa(userId) {
        await database_1.prisma.userSecurity.update({
            where: { userId },
            data: { mfaEnabled: false, mfaSecret: null, mfaBackupCodes: [] },
        });
    },
    async updateBackupCodes(userId, backupCodes) {
        await database_1.prisma.userSecurity.update({ where: { userId }, data: { mfaBackupCodes: backupCodes } });
    },
    async setPasswordChanged(userId) {
        await database_1.prisma.userSecurity.update({
            where: { userId },
            data: { passwordChangedAt: new Date() },
        });
    },
    async setForceLogout(userId) {
        await database_1.prisma.userSecurity.update({
            where: { userId },
            data: { forceLogoutAt: new Date() },
        });
    },
    async addStatusHistory(userId, status, reason) {
        const security = await database_1.prisma.userSecurity.findUnique({ where: { userId } });
        if (!security)
            return;
        const history = Array.isArray(security.statusHistory)
            ? security.statusHistory
            : [];
        const newEntry = {
            status,
            timestamp: new Date().toISOString(),
            reason,
        };
        history.push(newEntry);
        // Keep only the most recent entries
        const trimmedHistory = history.slice(-constants_1.USER_LIMITS.STATUS_HISTORY_MAX_ENTRIES);
        await database_1.prisma.userSecurity.update({
            where: { userId },
            data: { statusHistory: trimmedHistory },
        });
    },
    async isAccountLocked(userId) {
        const security = await database_1.prisma.userSecurity.findUnique({
            where: { userId },
            select: { lockedUntil: true },
        });
        if (!security?.lockedUntil) {
            return { locked: false, until: null };
        }
        if (security.lockedUntil > new Date()) {
            return { locked: true, until: security.lockedUntil };
        }
        // Lock has expired, clear it
        await this.unlockAccount(userId);
        return { locked: false, until: null };
    },
    async decayFailedCounts() {
        const decayThreshold = new Date(Date.now() - config_1.config.auth.lockout.decayMinutes * 60 * 1000);
        const result = await database_1.prisma.userSecurity.updateMany({
            where: {
                failedLoginCount: { gt: 0 },
                updatedAt: { lt: decayThreshold },
                lockedUntil: null,
            },
            data: { failedLoginCount: { decrement: 1 } },
        });
        return result.count;
    },
};
//# sourceMappingURL=user-security.repository.js.map