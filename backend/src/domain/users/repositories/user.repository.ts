/**
 * User Repository
 */

import { Prisma } from '@prisma/client';
import { prisma } from '@/core/database';
import { logger } from '@/core/logger';
import type { User } from '@prisma/client';
import type {
  CreateUserInput,
  UpdateUserInput,
  FindUsersOptions,
  UserWithRelations,
  UserWithSecurity,
} from '../types/user.types';

const FULL_USER_INCLUDE = {
  profile: true,
  preferences: true,
  security: true,
  readerProfile: true,
  authorAccount: true,
} as const;

function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

function normalizeUsername(username: string): string {
  return username.toLowerCase().trim();
}

export const userRepository = {
  async create(input: CreateUserInput): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email: normalizeEmail(input.email),
        username: normalizeUsername(input.username),
        displayName: input.displayName.trim(),
        passwordHash: input.passwordHash,
        role: input.role ?? 'READER',
        status: input.status ?? 'PENDING_VERIFICATION',
        emailVerified: input.emailVerified ?? false,
        profile: { create: {} },
        security: { create: {} },
        preferences: { create: {} },
      },
    });

    logger.debug({ userId: user.publicId }, 'User created');
    return user;
  },

  async findById(id: bigint): Promise<User | null> {
    return prisma.user.findUnique({ where: { id, deletedAt: null } });
  },

  async findByPublicId(publicId: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { publicId, deletedAt: null } });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email: normalizeEmail(email), deletedAt: null },
    });
  },

  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username: normalizeUsername(username), deletedAt: null },
    });
  },

  async findByEmailOrUsername(identifier: string): Promise<User | null> {
    const normalized = identifier.toLowerCase().trim();
    return prisma.user.findFirst({
      where: {
        deletedAt: null,
        OR: [{ email: normalized }, { username: normalized }],
      },
    });
  },

  async findWithSecurity(id: bigint): Promise<UserWithSecurity | null> {
    return prisma.user.findUnique({
      where: { id, deletedAt: null },
      include: { security: true },
    });
  },

  async findWithSecurityByEmail(email: string): Promise<UserWithSecurity | null> {
    return prisma.user.findUnique({
      where: { email: normalizeEmail(email), deletedAt: null },
      include: { security: true },
    });
  },

  async findFull(id: bigint): Promise<UserWithRelations | null> {
    return prisma.user.findUnique({
      where: { id, deletedAt: null },
      include: FULL_USER_INCLUDE,
    });
  },

  async findFullByPublicId(publicId: string): Promise<UserWithRelations | null> {
    return prisma.user.findUnique({
      where: { publicId, deletedAt: null },
      include: FULL_USER_INCLUDE,
    });
  },

  async update(id: bigint, input: UpdateUserInput): Promise<User> {
    const data: Prisma.UserUpdateInput = {};

    if (input.email !== undefined) {
      data.email = normalizeEmail(input.email);
    }
    if (input.username !== undefined) {
      data.username = normalizeUsername(input.username);
    }
    if (input.displayName !== undefined) {
      data.displayName = input.displayName.trim();
    }
    if (input.passwordHash !== undefined) {
      data.passwordHash = input.passwordHash;
    }
    if (input.role !== undefined) {
      data.role = input.role;
    }
    if (input.status !== undefined) {
      data.status = input.status;
    }
    if (input.emailVerified !== undefined) {
      data.emailVerified = input.emailVerified;
    }

    return prisma.user.update({ where: { id }, data });
  },

  async emailExists(email: string, excludeUserId?: bigint): Promise<boolean> {
    const count = await prisma.user.count({
      where: {
        email: normalizeEmail(email),
        deletedAt: null,
        ...(excludeUserId && { id: { not: excludeUserId } }),
      },
    });
    return count > 0;
  },

  async usernameExists(username: string, excludeUserId?: bigint): Promise<boolean> {
    const count = await prisma.user.count({
      where: {
        username: normalizeUsername(username),
        deletedAt: null,
        ...(excludeUserId && { id: { not: excludeUserId } }),
      },
    });
    return count > 0;
  },

  async softDelete(id: bigint): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'DELETED' },
    });
  },

  async findMany(
    options: FindUsersOptions = {},
  ): Promise<{ users: User[]; total: number }> {
    const {
      page = 1,
      limit = 20,
      role,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = options;

    const where: Prisma.UserWhereInput = {
      deletedAt: null,
      ...(role && { role }),
      ...(status && { status }),
      ...(search && {
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { username: { contains: search, mode: 'insensitive' } },
          { displayName: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  },
};

export type UserRepository = typeof userRepository;