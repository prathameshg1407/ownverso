"use strict";
// ==== FILE: src/domain/auth/repositories/auth-account.repository.ts ====
/**
 * Auth Account Repository
 * Data access layer for OAuth/social accounts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAccountRepository = void 0;
const database_1 = require("../../../core/database");
const logger_1 = require("../../../core/logger");
exports.authAccountRepository = {
    async create(input) {
        const account = await database_1.prisma.authAccount.create({
            data: {
                userId: input.userId,
                provider: input.provider,
                providerAccountId: input.providerAccountId,
                providerEmail: input.providerEmail,
                providerName: input.providerName,
                providerAvatar: input.providerAvatar,
                accessTokenRef: input.accessTokenRef,
                refreshTokenRef: input.refreshTokenRef,
                tokenExpiresAt: input.tokenExpiresAt,
                tokenScopes: input.tokenScopes ?? [],
            },
        });
        logger_1.logger.debug({ userId: input.userId.toString(), provider: input.provider }, 'Auth account created');
        return account;
    },
    async findById(id) {
        return database_1.prisma.authAccount.findUnique({ where: { id } });
    },
    async findByProviderAccount(provider, providerAccountId) {
        return database_1.prisma.authAccount.findUnique({
            where: { provider_providerAccountId: { provider, providerAccountId } },
        });
    },
    async findByUserId(userId) {
        return database_1.prisma.authAccount.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    },
    async findActiveByUserId(userId) {
        return database_1.prisma.authAccount.findMany({
            where: { userId, isRevoked: false },
            orderBy: { createdAt: 'desc' },
        });
    },
    async hasProvider(userId, provider) {
        const count = await database_1.prisma.authAccount.count({
            where: { userId, provider, isRevoked: false },
        });
        return count > 0;
    },
    async revoke(id, reason = 'User disconnected') {
        await database_1.prisma.authAccount.update({
            where: { id },
            data: {
                isRevoked: true,
                revokedAt: new Date(),
                revokedReason: reason,
                accessTokenRef: null,
                refreshTokenRef: null,
            },
        });
        logger_1.logger.info({ authAccountId: id.toString(), reason }, 'Auth account revoked');
    },
    async countActiveProviders(userId) {
        return database_1.prisma.authAccount.count({
            where: { userId, isRevoked: false },
        });
    },
    async upsert(input) {
        return database_1.prisma.authAccount.upsert({
            where: {
                provider_providerAccountId: {
                    provider: input.provider,
                    providerAccountId: input.providerAccountId,
                },
            },
            create: {
                userId: input.userId,
                provider: input.provider,
                providerAccountId: input.providerAccountId,
                providerEmail: input.providerEmail,
                providerName: input.providerName,
                providerAvatar: input.providerAvatar,
                accessTokenRef: input.accessTokenRef,
                refreshTokenRef: input.refreshTokenRef,
                tokenExpiresAt: input.tokenExpiresAt,
                tokenScopes: input.tokenScopes ?? [],
            },
            update: {
                providerEmail: input.providerEmail,
                providerName: input.providerName,
                providerAvatar: input.providerAvatar,
                accessTokenRef: input.accessTokenRef,
                refreshTokenRef: input.refreshTokenRef,
                tokenExpiresAt: input.tokenExpiresAt,
                tokenScopes: input.tokenScopes ?? [],
                isRevoked: false,
                revokedAt: null,
                revokedReason: null,
                lastSyncedAt: new Date(),
            },
        });
    },
};
//# sourceMappingURL=auth-account.repository.js.map