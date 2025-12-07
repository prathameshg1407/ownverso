"use strict";
// ==== FILE: src/domain/authors/repositories/author-account.repository.ts ====
/**
 * Author Account Repository
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorAccountRepository = void 0;
const database_1 = require("../../../core/database");
const logger_1 = require("../../../core/logger");
const AUTHOR_WITH_USER_INCLUDE = {
    user: {
        select: {
            publicId: true,
            email: true,
            username: true,
            displayName: true,
        },
    },
};
exports.authorAccountRepository = {
    /**
     * Create a new author account
     */
    async create(input) {
        const account = await database_1.prisma.authorAccount.create({
            data: {
                userId: input.userId,
                penName: input.penName?.trim(),
                tagline: input.tagline?.trim(),
                fullBio: input.fullBio?.trim(),
            },
        });
        logger_1.logger.debug({ userId: input.userId.toString() }, 'Author account created');
        return account;
    },
    /**
     * Find by user ID
     */
    async findByUserId(userId) {
        return database_1.prisma.authorAccount.findUnique({
            where: { userId },
        });
    },
    /**
     * Find by user ID with user data
     */
    async findByUserIdWithUser(userId) {
        return database_1.prisma.authorAccount.findUnique({
            where: { userId },
            include: AUTHOR_WITH_USER_INCLUDE,
        });
    },
    /**
     * Find by user public ID
     */
    async findByUserPublicId(publicId) {
        const user = await database_1.prisma.user.findUnique({
            where: { publicId, deletedAt: null },
            select: { id: true },
        });
        if (!user)
            return null;
        return database_1.prisma.authorAccount.findUnique({
            where: { userId: user.id },
        });
    },
    /**
     * Find by user public ID with user data
     */
    async findByUserPublicIdWithUser(publicId) {
        const user = await database_1.prisma.user.findUnique({
            where: { publicId, deletedAt: null },
            select: { id: true },
        });
        if (!user)
            return null;
        return database_1.prisma.authorAccount.findUnique({
            where: { userId: user.id },
            include: AUTHOR_WITH_USER_INCLUDE,
        });
    },
    /**
     * Check if user is an author
     */
    async exists(userId) {
        const count = await database_1.prisma.authorAccount.count({
            where: { userId },
        });
        return count > 0;
    },
    /**
     * Update author account
     */
    async update(userId, input) {
        const data = {};
        if (input.penName !== undefined)
            data.penName = input.penName?.trim() || null;
        if (input.tagline !== undefined)
            data.tagline = input.tagline?.trim() || null;
        if (input.fullBio !== undefined)
            data.fullBio = input.fullBio?.trim() || null;
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
        return database_1.prisma.authorAccount.update({
            where: { userId },
            data,
        });
    },
    /**
     * Update platform subscription
     */
    async updatePlatformSubscription(userId, input) {
        return database_1.prisma.authorAccount.update({
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
    async updateVerification(userId, isVerified, note) {
        return database_1.prisma.authorAccount.update({
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
    async incrementSeriesCount(userId, delta = 1) {
        return database_1.prisma.authorAccount.update({
            where: { userId },
            data: {
                seriesCount: { increment: delta },
            },
        });
    },
    /**
     * Increment chapter count
     */
    async incrementChapterCount(userId, delta = 1) {
        return database_1.prisma.authorAccount.update({
            where: { userId },
            data: {
                totalChapterCount: { increment: delta },
            },
        });
    },
    /**
     * Update subscriber count
     */
    async updateSubscriberCount(userId, count) {
        return database_1.prisma.authorAccount.update({
            where: { userId },
            data: {
                activeSubscriberCount: count,
            },
        });
    },
    /**
     * Find many authors with pagination
     */
    async findMany(options = {}) {
        const { page = 1, limit = 20, search, platformTier, platformTierStatus, isVerified, sortBy = 'createdAt', sortOrder = 'desc', } = options;
        const where = {
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
            database_1.prisma.authorAccount.findMany({
                where,
                include: AUTHOR_WITH_USER_INCLUDE,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            database_1.prisma.authorAccount.count({ where }),
        ]);
        return { accounts, total };
    },
    /**
     * Find by referral code
     */
    async findByReferralCode(code) {
        return database_1.prisma.authorAccount.findUnique({
            where: { referralCode: code },
        });
    },
    /**
     * Generate unique referral code
     */
    async generateReferralCode(userId) {
        const { nanoid } = await Promise.resolve().then(() => __importStar(require('nanoid')));
        let code;
        let exists = true;
        // Generate unique code
        while (exists) {
            code = nanoid(8).toUpperCase();
            const existing = await this.findByReferralCode(code);
            exists = existing !== null;
        }
        await database_1.prisma.authorAccount.update({
            where: { userId },
            data: { referralCode: code },
        });
        return code;
    },
};
//# sourceMappingURL=author-account.repository.js.map