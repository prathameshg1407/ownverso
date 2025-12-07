"use strict";
// ==== FILE: src/domain/sites/repositories/theme.repository.ts ====
/**
 * Theme Repository
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeRepository = void 0;
const database_1 = require("../../../core/database");
exports.themeRepository = {
    /**
     * Find by ID
     */
    async findById(id) {
        return database_1.prisma.theme.findUnique({ where: { id } });
    },
    /**
     * Find by slug
     */
    async findBySlug(slug) {
        return database_1.prisma.theme.findUnique({ where: { slug } });
    },
    /**
     * Find all public themes
     */
    async findPublic() {
        return database_1.prisma.theme.findMany({
            where: { isPublic: true },
            orderBy: [{ isPremium: 'asc' }, { usageCount: 'desc' }],
        });
    },
    /**
     * Find themes available for a tier
     */
    async findAvailableForTier(tier) {
        const tierLevels = {
            FREE: 0,
            STARTER: 1,
            GROWTH: 2,
            PROFESSIONAL: 3,
            ENTERPRISE: 4,
        };
        const userLevel = tierLevels[tier];
        return database_1.prisma.theme.findMany({
            where: {
                isPublic: true,
                OR: [
                    { isPremium: false },
                    { requiredTier: null },
                    {
                        requiredTier: {
                            in: Object.entries(tierLevels)
                                .filter(([_, level]) => level <= userLevel)
                                .map(([t]) => t),
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
    async findMany(options = {}) {
        const { isPublic, isPremium, requiredTier, search, page = 1, limit = 20, } = options;
        const where = {
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
            database_1.prisma.theme.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: [{ isPremium: 'asc' }, { usageCount: 'desc' }],
            }),
            database_1.prisma.theme.count({ where }),
        ]);
        return { themes, total };
    },
    /**
     * Increment usage count
     */
    async incrementUsage(id) {
        return database_1.prisma.theme.update({
            where: { id },
            data: { usageCount: { increment: 1 } },
        });
    },
    /**
     * Decrement usage count
     */
    async decrementUsage(id) {
        return database_1.prisma.theme.update({
            where: { id },
            data: { usageCount: { decrement: 1 } },
        });
    },
};
//# sourceMappingURL=theme.repository.js.map