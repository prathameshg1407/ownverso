/**
 * Admin User Service
 */

import { Prisma, UserRole, UserStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import { prisma } from '@/core/database';
import { logger } from '@/core/logger';
import { cacheService, jwtService } from '@/core';
import { NotFoundError, BadRequestError, ForbiddenError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { userRepository } from '../repositories/user.repository';
import { userSecurityRepository } from '../repositories/user-security.repository';
import { sessionRepository } from '@/domain/auth/repositories/session.repository';
import { adminUserMapper } from '../mappers/user.mapper';
import type {
  AdminUserQuery,
  AdminUserSummaryDTO,
  AdminUserDetailDTO,
  ImpersonationDTO,
  ImpersonationContext,
} from '../types/user.types';

const IMPERSONATION_TTL_SECONDS = 3600; // 1 hour

const ADMIN_LIST_INCLUDE = {
  security: { select: { mfaEnabled: true, lastLoginAt: true } },
  authorAccount: { select: { userId: true } },
} as const;

const ADMIN_DETAIL_INCLUDE = {
  profile: true,
  preferences: true,
  security: true,
  readerProfile: true,
  authorAccount: true,
  _count: { select: { sessions: { where: { isRevoked: false } } } },
} as const;

function buildUserListWhere(query: AdminUserQuery): Prisma.UserWhereInput {
  const { q, role, status, emailVerified, isAuthor, createdFrom, createdTo } = query;

  return {
    deletedAt: null,
    ...(role && { role }),
    ...(status && { status }),
    ...(emailVerified !== undefined && { emailVerified }),
    ...(q && {
      OR: [
        { email: { contains: q, mode: 'insensitive' as const } },
        { username: { contains: q, mode: 'insensitive' as const } },
        { displayName: { contains: q, mode: 'insensitive' as const } },
      ],
    }),
    ...(createdFrom && { createdAt: { gte: createdFrom } }),
    ...(createdTo && { createdAt: { lte: createdTo } }),
    ...(isAuthor !== undefined && {
      authorAccount: isAuthor ? { isNot: null } : { is: null },
    }),
  };
}

export const adminUserService = {
  async listUsers(
    query: AdminUserQuery,
  ): Promise<{ users: AdminUserSummaryDTO[]; total: number }> {
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      mfaEnabled,
    } = query;

    const where = buildUserListWhere(query);

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: ADMIN_LIST_INCLUDE,
      }),
      prisma.user.count({ where }),
    ]);

    // Filter by MFA status if specified (requires post-query filtering)
    const filtered =
      mfaEnabled !== undefined
        ? users.filter((u) => (u.security?.mfaEnabled ?? false) === mfaEnabled)
        : users;

    return {
      users: filtered.map(adminUserMapper.toSummaryDTO),
      total,
    };
  },

  async getUserDetail(publicId: string): Promise<AdminUserDetailDTO> {
    const user = await prisma.user.findUnique({
      where: { publicId },
      include: ADMIN_DETAIL_INCLUDE,
    });

    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    return adminUserMapper.toDetailDTO(user);
  },

  async updateUserStatus(
    adminUserId: bigint,
    targetPublicId: string,
    status: UserStatus,
    reason?: string,
  ): Promise<AdminUserDetailDTO> {
    const targetUser = await userRepository.findByPublicId(targetPublicId);
    if (!targetUser) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    if (targetUser.id === adminUserId) {
      throw new BadRequestError('Cannot change your own status', ERROR_CODES.BAD_REQUEST);
    }

    await userRepository.update(targetUser.id, { status });
    await userSecurityRepository.addStatusHistory(targetUser.id, status, reason);

    if (status === 'BANNED' || status === 'SUSPENDED') {
      await sessionRepository.revokeAllForUser(targetUser.id, `Status changed to ${status}`);
    }

    logger.info(
      {
        adminUserId: adminUserId.toString(),
        targetUserId: targetUser.publicId,
        newStatus: status,
        reason,
      },
      'Admin updated user status',
    );

    return this.getUserDetail(targetPublicId);
  },

  async updateUserRole(
    adminUserId: bigint,
    targetPublicId: string,
    role: UserRole,
  ): Promise<AdminUserDetailDTO> {
    const targetUser = await userRepository.findByPublicId(targetPublicId);
    if (!targetUser) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    if (targetUser.id === adminUserId) {
      throw new BadRequestError('Cannot change your own role', ERROR_CODES.BAD_REQUEST);
    }

    await userRepository.update(targetUser.id, { role });

    logger.info(
      {
        adminUserId: adminUserId.toString(),
        targetUserId: targetUser.publicId,
        newRole: role,
      },
      'Admin updated user role',
    );

    return this.getUserDetail(targetPublicId);
  },

  async impersonateUser(
    adminUserId: bigint,
    targetPublicId: string,
    context: ImpersonationContext,
  ): Promise<ImpersonationDTO> {
    const adminUser = await userRepository.findById(adminUserId);
    if (!adminUser || adminUser.role !== 'SUPER_ADMIN') {
      throw new ForbiddenError(
        'Only super admins can impersonate users',
        ERROR_CODES.FORBIDDEN,
      );
    }

    const targetUser = await userRepository.findByPublicId(targetPublicId);
    if (!targetUser) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    if (targetUser.role === 'ADMIN' || targetUser.role === 'SUPER_ADMIN') {
      throw new ForbiddenError('Cannot impersonate admin users', ERROR_CODES.FORBIDDEN);
    }

    const impersonationId = `imp_${randomUUID()}`;
    const expiresAt = new Date(Date.now() + IMPERSONATION_TTL_SECONDS * 1000);

    const token = jwtService.generateAccessToken({
      publicId: targetUser.publicId,
      email: targetUser.email,
      role: targetUser.role,
      sessionId: impersonationId,
    });

    await cacheService.set(
      `impersonation:${impersonationId}`,
      {
        adminUserId: adminUserId.toString(),
        adminPublicId: adminUser.publicId,
        targetUserId: targetUser.id.toString(),
        targetPublicId: targetUser.publicId,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        createdAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
      },
      IMPERSONATION_TTL_SECONDS,
    );

    logger.warn(
      {
        adminUserId: adminUser.publicId,
        targetUserId: targetUser.publicId,
        impersonationId,
      },
      'Impersonation session created',
    );

    return {
      token,
      impersonationId,
      expiresAt: expiresAt.toISOString(),
      targetUser: {
        publicId: targetUser.publicId,
        username: targetUser.username,
        displayName: targetUser.displayName,
        role: targetUser.role,
      },
    };
  },

  async revokeImpersonation(impersonationId: string): Promise<void> {
    await cacheService.del(`impersonation:${impersonationId}`);
    logger.info({ impersonationId }, 'Impersonation session revoked');
  },

  async updateUser(
    adminUserId: bigint,
    targetPublicId: string,
    data: { displayName?: string; email?: string; emailVerified?: boolean },
  ): Promise<AdminUserDetailDTO> {
    const targetUser = await userRepository.findByPublicId(targetPublicId);
    if (!targetUser) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    if (data.email && data.email !== targetUser.email) {
      const emailTaken = await userRepository.emailExists(data.email, targetUser.id);
      if (emailTaken) {
        throw new BadRequestError('Email is already in use', ERROR_CODES.USER_EMAIL_TAKEN);
      }
    }

    await userRepository.update(targetUser.id, data);

    logger.info(
      {
        adminUserId: adminUserId.toString(),
        targetUserId: targetUser.publicId,
        changes: Object.keys(data),
      },
      'Admin updated user',
    );

    return this.getUserDetail(targetPublicId);
  },
};

export type AdminUserService = typeof adminUserService;