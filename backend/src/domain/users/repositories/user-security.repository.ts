/**
 * User Security Repository
 */

import { Prisma } from '@prisma/client';
import { prisma } from '@/core/database';
import { logger } from '@/core/logger';
import { config } from '@/config';
import type { UserSecurity } from '@prisma/client';
import type { UpdateLoginInfoInput, StatusHistoryEntry } from '../types/user.types';
import { USER_LIMITS } from '../constants';

interface LockoutResult {
  failedCount: number;
  lockedUntil: Date | null;
}

interface AccountLockStatus {
  locked: boolean;
  until: Date | null;
}

export const userSecurityRepository = {
  async findByUserId(userId: bigint): Promise<UserSecurity | null> {
    return prisma.userSecurity.findUnique({ where: { userId } });
  },

  async create(userId: bigint): Promise<UserSecurity> {
    return prisma.userSecurity.create({ data: { userId } });
  },

  async ensureExists(userId: bigint): Promise<UserSecurity> {
    return prisma.userSecurity.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
  },

  async setEmailVerified(userId: bigint): Promise<void> {
    await prisma.$transaction([
      prisma.userSecurity.update({
        where: { userId },
        data: { emailVerifiedAt: new Date() },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { emailVerified: true, status: 'ACTIVE' },
      }),
    ]);
  },

  async updateLoginInfo(userId: bigint, input: UpdateLoginInfoInput): Promise<void> {
    await prisma.userSecurity.update({
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

  async incrementFailedLoginCount(userId: bigint): Promise<LockoutResult> {
    const security = await prisma.userSecurity.findUniqueOrThrow({ where: { userId } });
    const newFailedCount = security.failedLoginCount + 1;
    let lockedUntil: Date | null = null;

    const sortedThresholds = [...config.auth.lockout.thresholds].sort(
      (a, b) => b.attempts - a.attempts,
    );

    for (const threshold of sortedThresholds) {
      if (newFailedCount >= threshold.attempts) {
        lockedUntil = new Date(Date.now() + threshold.lockoutMinutes * 60 * 1000);
        break;
      }
    }

    await prisma.userSecurity.update({
      where: { userId },
      data: { failedLoginCount: newFailedCount, lockedUntil },
    });

    if (lockedUntil) {
      logger.warn(
        { userId: userId.toString(), failedCount: newFailedCount, lockedUntil },
        'Account locked due to failed login attempts',
      );
    }

    return { failedCount: newFailedCount, lockedUntil };
  },

  async unlockAccount(userId: bigint): Promise<void> {
    await prisma.userSecurity.update({
      where: { userId },
      data: { lockedUntil: null, failedLoginCount: 0 },
    });
  },

  async setMfaSecret(userId: bigint, secret: string, backupCodes: string[]): Promise<void> {
    await prisma.userSecurity.update({
      where: { userId },
      data: { mfaSecret: secret, mfaBackupCodes: backupCodes, mfaEnabled: false },
    });
  },

  async enableMfa(userId: bigint): Promise<void> {
    await prisma.userSecurity.update({ where: { userId }, data: { mfaEnabled: true } });
  },

  async disableMfa(userId: bigint): Promise<void> {
    await prisma.userSecurity.update({
      where: { userId },
      data: { mfaEnabled: false, mfaSecret: null, mfaBackupCodes: [] },
    });
  },

  async updateBackupCodes(userId: bigint, backupCodes: string[]): Promise<void> {
    await prisma.userSecurity.update({ where: { userId }, data: { mfaBackupCodes: backupCodes } });
  },

  async setPasswordChanged(userId: bigint): Promise<void> {
    await prisma.userSecurity.update({
      where: { userId },
      data: { passwordChangedAt: new Date() },
    });
  },

  async setForceLogout(userId: bigint): Promise<void> {
    await prisma.userSecurity.update({
      where: { userId },
      data: { forceLogoutAt: new Date() },
    });
  },

  async addStatusHistory(userId: bigint, status: string, reason?: string): Promise<void> {
    const security = await prisma.userSecurity.findUnique({ where: { userId } });
    if (!security) return;

    const history = Array.isArray(security.statusHistory)
      ? (security.statusHistory as unknown as StatusHistoryEntry[])
      : [];

    const newEntry: StatusHistoryEntry = {
      status,
      timestamp: new Date().toISOString(),
      reason,
    };

    history.push(newEntry);

    // Keep only the most recent entries
    const trimmedHistory = history.slice(-USER_LIMITS.STATUS_HISTORY_MAX_ENTRIES);

    await prisma.userSecurity.update({
      where: { userId },
      data: { statusHistory: trimmedHistory as unknown as Prisma.InputJsonValue },
    });
  },

  async isAccountLocked(userId: bigint): Promise<AccountLockStatus> {
    const security = await prisma.userSecurity.findUnique({
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

  async decayFailedCounts(): Promise<number> {
    const decayThreshold = new Date(Date.now() - config.auth.lockout.decayMinutes * 60 * 1000);

    const result = await prisma.userSecurity.updateMany({
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

export type UserSecurityRepository = typeof userSecurityRepository;