// ==== FILE: src/domain/authors/repositories/author-account.repository.ts ====
/**
 * Author Account Repository
 */

import { Prisma } from '@prisma/client';
import { prisma } from '@/core/database';
import { logger } from '@/core/logger';
import type {
  RegisterAuthorInput,
  UpdateAuthorAccountInput,
  UpdatePlatformSubscriptionInput,
  FindAuthorsOptions,
  AuthorAccountWithUser,
} from '../types/author.types';

const AUTHOR_WITH_USER_INCLUDE = {
  user: {
    select: {
      publicId: true,
      email: true,
      username: true,
      displayName: true,
    },
  },
} as const;

export const authorAccountRepository = {
  /**
   * Create a new author account
   */
  async create(input: RegisterAuthorInput) {
    const account = await prisma.authorAccount.create({
      data: {
        userId: input.userId,
        penName: input.penName?.trim(),
        tagline: input.tagline?.trim(),
        fullBio: input.fullBio?.trim(),
      },
    });

    logger.debug({ userId: input.userId.toString() }, 'Author account created');
    return account;
  },

  /**
   * Find by user ID
   */
  async findByUserId(userId: bigint) {
    return prisma.authorAccount.findUnique({
      where: { userId },
    });
  },

  /**
   * Find by user ID with user data
   */
  async findByUserIdWithUser(userId: bigint): Promise<AuthorAccountWithUser | null> {
    return prisma.authorAccount.findUnique({
      where: { userId },
      include: AUTHOR_WITH_USER_INCLUDE,
    });
  },

  /**
   * Find by user public ID
   */
  async findByUserPublicId(publicId: string) {
    const user = await prisma.user.findUnique({
      where: { publicId, deletedAt: null },
      select: { id: true },
    });

    if (!user) return null;

    return prisma.authorAccount.findUnique({
      where: { userId: user.id },
    });
  },

  /**
   * Find by user public ID with user data
   */
  async findByUserPublicIdWithUser(
    publicId: string
  ): Promise<AuthorAccountWithUser | null> {
    const user = await prisma.user.findUnique({
      where: { publicId, deletedAt: null },
      select: { id: true },
    });

    if (!user) return null;

    return prisma.authorAccount.findUnique({
      where: { userId: user.id },
      include: AUTHOR_WITH_USER_INCLUDE,
    });
  },

  /**
   * Check if user is an author
   */
  async exists(userId: bigint): Promise<boolean> {
    const count = await prisma.authorAccount.count({
      where: { userId },
    });
    return count > 0;
  },

  /**
   * Update author account
   */
  async update(userId: bigint, input: UpdateAuthorAccountInput) {
    const data: Prisma.AuthorAccountUpdateInput = {};

    if (input.penName !== undefined) data.penName = input.penName?.trim() || null;
    if (input.tagline !== undefined) data.tagline = input.tagline?.trim() || null;
    if (input.fullBio !== undefined) data.fullBio = input.fullBio?.trim() || null;
    if (input.acceptingCommissions !== undefined)
      data.acceptingCommissions = input.acceptingCommissions;
    if (input.commissionInfo !== undefined)
      data.commissionInfo = input.commissionInfo?.trim() || null;
    if (input.commissionMinPrice !== undefined)
      data.commissionMinPrice = input.commissionMinPrice;
    if (input.commissionMaxPrice !== undefined)
      data.commissionMaxPrice = input.commissionMaxPrice;
    if (input.commissionCurrency !== undefined)
      data.commissionCurrency = input.commissionCurrency;

    return prisma.authorAccount.update({
      where: { userId },
      data,
    });
  },

  /**
   * Update platform subscription
   */
  async updatePlatformSubscription(
    userId: bigint,
    input: UpdatePlatformSubscriptionInput
  ) {
    return prisma.authorAccount.update({
      where: { userId },
      data: {
        platformTier: input.platformTier,
        platformTierStatus: input.platformTierStatus,
        platformBillingCycle: input.platformBillingCycle,
        platformTierStartedAt: input.platformTierStartedAt,
        platformTierExpiresAt: input.platformTierExpiresAt,
        platformTrialEndsAt: input.platformTrialEndsAt,
      },
    });
  },

  /**
   * Update verification status
   */
  async updateVerification(
    userId: bigint,
    isVerified: boolean,
    note?: string
  ) {
    return prisma.authorAccount.update({
      where: { userId },
      data: {
        isVerified,
        verifiedAt: isVerified ? new Date() : null,
        verificationNote: note || null,
      },
    });
  },

  /**
   * Increment series count
   */
  async incrementSeriesCount(userId: bigint, delta: number = 1) {
    return prisma.authorAccount.update({
      where: { userId },
      data: {
        seriesCount: { increment: delta },
      },
    });
  },

  /**
   * Increment chapter count
   */
  async incrementChapterCount(userId: bigint, delta: number = 1) {
    return prisma.authorAccount.update({
      where: { userId },
      data: {
        totalChapterCount: { increment: delta },
      },
    });
  },

  /**
   * Update subscriber count
   */
  async updateSubscriberCount(userId: bigint, count: number) {
    return prisma.authorAccount.update({
      where: { userId },
      data: {
        activeSubscriberCount: count,
      },
    });
  },

  /**
   * Find many authors with pagination
   */
  async findMany(options: FindAuthorsOptions = {}) {
    const {
      page = 1,
      limit = 20,
      search,
      platformTier,
      platformTierStatus,
      isVerified,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = options;

    const where: Prisma.AuthorAccountWhereInput = {
      ...(platformTier && { platformTier }),
      ...(platformTierStatus && { platformTierStatus }),
      ...(isVerified !== undefined && { isVerified }),
      ...(search && {
        OR: [
          { penName: { contains: search, mode: 'insensitive' } },
          { user: { email: { contains: search, mode: 'insensitive' } } },
          { user: { username: { contains: search, mode: 'insensitive' } } },
        ],
      }),
    };

    const [accounts, total] = await Promise.all([
      prisma.authorAccount.findMany({
        where,
        include: AUTHOR_WITH_USER_INCLUDE,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.authorAccount.count({ where }),
    ]);

    return { accounts, total };
  },

  /**
   * Find by referral code
   */
  async findByReferralCode(code: string) {
    return prisma.authorAccount.findUnique({
      where: { referralCode: code },
    });
  },

  /**
   * Generate unique referral code
   */
  async generateReferralCode(userId: bigint): Promise<string> {
    const { nanoid } = await import('nanoid');
    let code: string;
    let exists = true;

    // Generate unique code
    while (exists) {
      code = nanoid(8).toUpperCase();
      const existing = await this.findByReferralCode(code);
      exists = existing !== null;
    }

    await prisma.authorAccount.update({
      where: { userId },
      data: { referralCode: code! },
    });

    return code!;
  },
};

export type AuthorAccountRepository = typeof authorAccountRepository;