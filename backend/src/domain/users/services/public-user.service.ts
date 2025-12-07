/**
 * Public User Service
 */

import { prisma } from '@/core/database';
import { NotFoundError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { publicUserMapper } from '../mappers/user.mapper';
import type { PublicUserDTO } from '../types/user.types';

const PUBLIC_USER_INCLUDE = {
  profile: true,
  preferences: true,
  authorAccount: true,
  _count: { select: { series: true, followers: true } },
} as const;

const VISIBLE_STATUSES = ['ACTIVE', 'PENDING_VERIFICATION'] as const;

export const publicUserService = {
  async getByUsername(username: string): Promise<PublicUserDTO> {
    const user = await prisma.user.findUnique({
      where: {
        username: username.toLowerCase(),
        deletedAt: null,
        status: { in: [...VISIBLE_STATUSES] },
      },
      include: PUBLIC_USER_INCLUDE,
    });

    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    return publicUserMapper.toDTO(user);
  },

  async getByPublicId(publicId: string): Promise<PublicUserDTO> {
    const user = await prisma.user.findUnique({
      where: {
        publicId,
        deletedAt: null,
        status: { in: [...VISIBLE_STATUSES] },
      },
      include: PUBLIC_USER_INCLUDE,
    });

    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    return publicUserMapper.toDTO(user);
  },
};

export type PublicUserService = typeof publicUserService;