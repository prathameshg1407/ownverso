// ==== FILE: src/domain/auth/mappers/auth.mapper.ts ====
/**
 * Auth Mappers
 * Transform database entities to DTOs
 */

import type { Session, AuthAccount } from '@prisma/client';
import type { SessionDTO, AuthAccountDTO } from '../types/auth.types';
import { maskIpAddress } from '../utils/crypto.utils';

// ─────────────────────────────────────────────────────────────────────────
// Session Mapper
// ─────────────────────────────────────────────────────────────────────────

export const sessionMapper = {
  toDTO(session: Session, currentSessionId?: bigint): SessionDTO {
    return {
      id: session.id.toString(),
      deviceType: session.deviceType,
      deviceOs: session.deviceOs,
      browser: session.browser,
      country: session.country,
      city: session.city,
      ipAddress: maskIpAddress(session.ipAddress),
      authProvider: session.authProvider,
      lastActiveAt: session.lastActiveAt?.toISOString() ?? session.createdAt.toISOString(),
      createdAt: session.createdAt.toISOString(),
      isCurrent: currentSessionId !== undefined && session.id === currentSessionId,
    };
  },

  toDTOList(sessions: Session[], currentSessionId?: bigint): SessionDTO[] {
    return sessions.map(s => this.toDTO(s, currentSessionId));
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// Auth Account Mapper
// ─────────────────────────────────────────────────────────────────────────

export const authAccountMapper = {
  toDTO(account: AuthAccount): AuthAccountDTO {
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

  toDTOList(accounts: AuthAccount[]): AuthAccountDTO[] {
    return accounts.map(a => this.toDTO(a));
  },
} as const;