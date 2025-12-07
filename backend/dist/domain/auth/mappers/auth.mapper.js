"use strict";
// ==== FILE: src/domain/auth/mappers/auth.mapper.ts ====
/**
 * Auth Mappers
 * Transform database entities to DTOs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAccountMapper = exports.sessionMapper = void 0;
const crypto_utils_1 = require("../utils/crypto.utils");
// ─────────────────────────────────────────────────────────────────────────
// Session Mapper
// ─────────────────────────────────────────────────────────────────────────
exports.sessionMapper = {
    toDTO(session, currentSessionId) {
        return {
            id: session.id.toString(),
            deviceType: session.deviceType,
            deviceOs: session.deviceOs,
            browser: session.browser,
            country: session.country,
            city: session.city,
            ipAddress: (0, crypto_utils_1.maskIpAddress)(session.ipAddress),
            authProvider: session.authProvider,
            lastActiveAt: session.lastActiveAt?.toISOString() ?? session.createdAt.toISOString(),
            createdAt: session.createdAt.toISOString(),
            isCurrent: currentSessionId !== undefined && session.id === currentSessionId,
        };
    },
    toDTOList(sessions, currentSessionId) {
        return sessions.map(s => this.toDTO(s, currentSessionId));
    },
};
// ─────────────────────────────────────────────────────────────────────────
// Auth Account Mapper
// ─────────────────────────────────────────────────────────────────────────
exports.authAccountMapper = {
    toDTO(account) {
        return {
            id: account.id.toString(),
            provider: account.provider,
            providerEmail: account.providerEmail,
            providerName: account.providerName,
            providerAvatar: account.providerAvatar,
            isConnected: !account.isRevoked,
            connectedAt: account.createdAt.toISOString(),
            lastSyncedAt: account.lastSyncedAt?.toISOString() ?? null,
        };
    },
    toDTOList(accounts) {
        return accounts.map(a => this.toDTO(a));
    },
};
//# sourceMappingURL=auth.mapper.js.map