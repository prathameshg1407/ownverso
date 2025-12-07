// ==== FILE: src/domain/auth/repositories/auth-account.repository.ts ====
/**
 * Auth Account Repository
 * Data access layer for OAuth/social accounts
 */

import type { AuthProvider, AuthAccount } from '@prisma/client';
import { prisma } from '@/core/database';
import { logger } from '@/core/logger';
import type { CreateAuthAccountInput } from '../types/auth.types';

export const authAccountRepository = {
  async create(input: CreateAuthAccountInput): Promise<AuthAccount> {
    const account = await prisma.authAccount.create({
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

    logger.debug(
      { userId: input.userId.toString(), provider: input.provider },
      'Auth account created'
    );

    return account;
  },

  async findById(id: bigint): Promise<AuthAccount | null> {
    return prisma.authAccount.findUnique({ where: { id } });
  },

  async findByProviderAccount(
    provider: AuthProvider,
    providerAccountId: string
  ): Promise<AuthAccount | null> {
    return prisma.authAccount.findUnique({
      where: { provider_providerAccountId: { provider, providerAccountId } },
    });
  },

  async findByUserId(userId: bigint): Promise<AuthAccount[]> {
    return prisma.authAccount.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findActiveByUserId(userId: bigint): Promise<AuthAccount[]> {
    return prisma.authAccount.findMany({
      where: { userId, isRevoked: false },
      orderBy: { createdAt: 'desc' },
    });
  },

  async hasProvider(userId: bigint, provider: AuthProvider): Promise<boolean> {
    const count = await prisma.authAccount.count({
      where: { userId, provider, isRevoked: false },
    });
    return count > 0;
  },

  async revoke(id: bigint, reason = 'User disconnected'): Promise<void> {
    await prisma.authAccount.update({
      where: { id },
      data: {
        isRevoked: true,
        revokedAt: new Date(),
        revokedReason: reason,
        accessTokenRef: null,
        refreshTokenRef: null,
      },
    });

    logger.info({ authAccountId: id.toString(), reason }, 'Auth account revoked');
  },

  async countActiveProviders(userId: bigint): Promise<number> {
    return prisma.authAccount.count({
      where: { userId, isRevoked: false },
    });
  },

  async upsert(input: CreateAuthAccountInput): Promise<AuthAccount> {
    return prisma.authAccount.upsert({
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
} as const;

export type AuthAccountRepository = typeof authAccountRepository;