"use strict";
/**
 * User Repository
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const database_1 = require("../../../core/database");
const logger_1 = require("../../../core/logger");
const FULL_USER_INCLUDE = {
    profile: true,
    preferences: true,
    security: true,
    readerProfile: true,
    authorAccount: true,
};
function normalizeEmail(email) {
    return email.toLowerCase().trim();
}
function normalizeUsername(username) {
    return username.toLowerCase().trim();
}
exports.userRepository = {
    async create(input) {
        const user = await database_1.prisma.user.create({
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
        logger_1.logger.debug({ userId: user.publicId }, 'User created');
        return user;
    },
    async findById(id) {
        return database_1.prisma.user.findUnique({ where: { id, deletedAt: null } });
    },
    async findByPublicId(publicId) {
        return database_1.prisma.user.findUnique({ where: { publicId, deletedAt: null } });
    },
    async findByEmail(email) {
        return database_1.prisma.user.findUnique({
            where: { email: normalizeEmail(email), deletedAt: null },
        });
    },
    async findByUsername(username) {
        return database_1.prisma.user.findUnique({
            where: { username: normalizeUsername(username), deletedAt: null },
        });
    },
    async findByEmailOrUsername(identifier) {
        const normalized = identifier.toLowerCase().trim();
        return database_1.prisma.user.findFirst({
            where: {
                deletedAt: null,
                OR: [{ email: normalized }, { username: normalized }],
            },
        });
    },
    async findWithSecurity(id) {
        return database_1.prisma.user.findUnique({
            where: { id, deletedAt: null },
            include: { security: true },
        });
    },
    async findWithSecurityByEmail(email) {
        return database_1.prisma.user.findUnique({
            where: { email: normalizeEmail(email), deletedAt: null },
            include: { security: true },
        });
    },
    async findFull(id) {
        return database_1.prisma.user.findUnique({
            where: { id, deletedAt: null },
            include: FULL_USER_INCLUDE,
        });
    },
    async findFullByPublicId(publicId) {
        return database_1.prisma.user.findUnique({
            where: { publicId, deletedAt: null },
            include: FULL_USER_INCLUDE,
        });
    },
    async update(id, input) {
        const data = {};
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
        return database_1.prisma.user.update({ where: { id }, data });
    },
    async emailExists(email, excludeUserId) {
        const count = await database_1.prisma.user.count({
            where: {
                email: normalizeEmail(email),
                deletedAt: null,
                ...(excludeUserId && { id: { not: excludeUserId } }),
            },
        });
        return count > 0;
    },
    async usernameExists(username, excludeUserId) {
        const count = await database_1.prisma.user.count({
            where: {
                username: normalizeUsername(username),
                deletedAt: null,
                ...(excludeUserId && { id: { not: excludeUserId } }),
            },
        });
        return count > 0;
    },
    async softDelete(id) {
        await database_1.prisma.user.update({
            where: { id },
            data: { deletedAt: new Date(), status: 'DELETED' },
        });
    },
    async findMany(options = {}) {
        const { page = 1, limit = 20, role, status, search, sortBy = 'createdAt', sortOrder = 'desc', } = options;
        const where = {
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
            database_1.prisma.user.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            database_1.prisma.user.count({ where }),
        ]);
        return { users, total };
    },
};
//# sourceMappingURL=user.repository.js.map