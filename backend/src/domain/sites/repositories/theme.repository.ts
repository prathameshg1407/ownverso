// ==== FILE: src/domain/sites/repositories/theme.repository.ts ====
/**
 * Theme Repository
 */

import { Prisma, PlatformTier } from '@prisma/client';
import { prisma } from '@/core/database';

export interface FindThemesOptions {
  isPublic?: boolean;
  isPremium?: boolean;
  requiredTier?: PlatformTier;
  search?: string;
  page?: number;
  limit?: number;
}

export const themeRepository = {
  /**
   * Find by ID
   */
  async findById(id: string) {
    return prisma.theme.findUnique({ where: { id } });
  },

  /**
   * Find by slug
   */
  async findBySlug(slug: string) {
    return prisma.theme.findUnique({ where: { slug } });
  },

  /**
   * Find all public themes
   */
  async findPublic() {
    return prisma.theme.findMany({
      where: { isPublic: true },
      orderBy: [{ isPremium: 'asc' }, { usageCount: 'desc' }],
    });
  },

  /**
   * Find themes available for a tier
   */
  async findAvailableForTier(tier: PlatformTier) {
    const tierLevels: Record<PlatformTier, number> = {
      FREE: 0,
      STARTER: 1,
      GROWTH: 2,
      PROFESSIONAL: 3,
      ENTERPRISE: 4,
    };

    const userLevel = tierLevels[tier];

    return prisma.theme.findMany({
      where: {
        isPublic: true,
        OR: [
          { isPremium: false },
          { requiredTier: null },
          {
            requiredTier: {
              in: Object.entries(tierLevels)
                .filter(([_, level]) => level <= userLevel)
                .map(([t]) => t as PlatformTier),
            },
          },
        ],
      },
      orderBy: [{ isPremium: 'asc' }, { usageCount: 'desc' }],
    });
  },

  /**
   * Find themes with pagination
   */
  async findMany(options: FindThemesOptions = {}) {
    const {
      isPublic,
      isPremium,
      requiredTier,
      search,
      page = 1,
      limit = 20,
    } = options;

    const where: Prisma.ThemeWhereInput = {
      ...(isPublic !== undefined && { isPublic }),
      ...(isPremium !== undefined && { isPremium }),
      ...(requiredTier && { requiredTier }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [themes, total] = await Promise.all([
      prisma.theme.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ isPremium: 'asc' }, { usageCount: 'desc' }],
      }),
      prisma.theme.count({ where }),
    ]);

    return { themes, total };
  },

  /**
   * Increment usage count
   */
  async incrementUsage(id: string) {
    return prisma.theme.update({
      where: { id },
      data: { usageCount: { increment: 1 } },
    });
  },

  /**
   * Decrement usage count
   */
  async decrementUsage(id: string) {
    return prisma.theme.update({
      where: { id },
      data: { usageCount: { decrement: 1 } },
    });
  },
};

export type ThemeRepository = typeof themeRepository;