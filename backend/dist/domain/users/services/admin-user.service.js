"use strict";
/**
 * Admin User Service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUserService = void 0;
const crypto_1 = require("crypto");
const database_1 = require("../../../core/database");
const logger_1 = require("../../../core/logger");
const core_1 = require("../../../core");
const errors_1 = require("../../../common/errors");
const constants_1 = require("../../../common/constants");
const user_repository_1 = require("../repositories/user.repository");
const user_security_repository_1 = require("../repositories/user-security.repository");
const session_repository_1 = require("../../../domain/auth/repositories/session.repository");
const user_mapper_1 = require("../mappers/user.mapper");
const IMPERSONATION_TTL_SECONDS = 3600; // 1 hour
const ADMIN_LIST_INCLUDE = {
    security: { select: { mfaEnabled: true, lastLoginAt: true } },
    authorAccount: { select: { userId: true } },
};
const ADMIN_DETAIL_INCLUDE = {
    profile: true,
    preferences: true,
    security: true,
    readerProfile: true,
    authorAccount: true,
    _count: { select: { sessions: { where: { isRevoked: false } } } },
};
function buildUserListWhere(query) {
    const { q, role, status, emailVerified, isAuthor, createdFrom, createdTo } = query;
    return {
        deletedAt: null,
        ...(role && { role }),
        ...(status && { status }),
        ...(emailVerified !== undefined && { emailVerified }),
        ...(q && {
            OR: [
                { email: { contains: q, mode: 'insensitive' } },
                { username: { contains: q, mode: 'insensitive' } },
                { displayName: { contains: q, mode: 'insensitive' } },
            ],
        }),
        ...(createdFrom && { createdAt: { gte: createdFrom } }),
        ...(createdTo && { createdAt: { lte: createdTo } }),
        ...(isAuthor !== undefined && {
            authorAccount: isAuthor ? { isNot: null } : { is: null },
        }),
    };
}
exports.adminUserService = {
    async listUsers(query) {
        const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc', mfaEnabled, } = query;
        const where = buildUserListWhere(query);
        const [users, total] = await Promise.all([
            database_1.prisma.user.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: ADMIN_LIST_INCLUDE,
            }),
            database_1.prisma.user.count({ where }),
        ]);
        // Filter by MFA status if specified (requires post-query filtering)
        const filtered = mfaEnabled !== undefined
            ? users.filter((u) => (u.security?.mfaEnabled ?? false) === mfaEnabled)
            : users;
        return {
            users: filtered.map(user_mapper_1.adminUserMapper.toSummaryDTO),
            total,
        };
    },
    async getUserDetail(publicId) {
        const user = await database_1.prisma.user.findUnique({
            where: { publicId },
            include: ADMIN_DETAIL_INCLUDE,
        });
        if (!user) {
            throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        return user_mapper_1.adminUserMapper.toDetailDTO(user);
    },
    async updateUserStatus(adminUserId, targetPublicId, status, reason) {
        const targetUser = await user_repository_1.userRepository.findByPublicId(targetPublicId);
        if (!targetUser) {
            throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        if (targetUser.id === adminUserId) {
            throw new errors_1.BadRequestError('Cannot change your own status', constants_1.ERROR_CODES.BAD_REQUEST);
        }
        await user_repository_1.userRepository.update(targetUser.id, { status });
        await user_security_repository_1.userSecurityRepository.addStatusHistory(targetUser.id, status, reason);
        if (status === 'BANNED' || status === 'SUSPENDED') {
            await session_repository_1.sessionRepository.revokeAllForUser(targetUser.id, `Status changed to ${status}`);
        }
        logger_1.logger.info({
            adminUserId: adminUserId.toString(),
            targetUserId: targetUser.publicId,
            newStatus: status,
            reason,
        }, 'Admin updated user status');
        return this.getUserDetail(targetPublicId);
    },
    async updateUserRole(adminUserId, targetPublicId, role) {
        const targetUser = await user_repository_1.userRepository.findByPublicId(targetPublicId);
        if (!targetUser) {
            throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        if (targetUser.id === adminUserId) {
            throw new errors_1.BadRequestError('Cannot change your own role', constants_1.ERROR_CODES.BAD_REQUEST);
        }
        await user_repository_1.userRepository.update(targetUser.id, { role });
        logger_1.logger.info({
            adminUserId: adminUserId.toString(),
            targetUserId: targetUser.publicId,
            newRole: role,
        }, 'Admin updated user role');
        return this.getUserDetail(targetPublicId);
    },
    async impersonateUser(adminUserId, targetPublicId, context) {
        const adminUser = await user_repository_1.userRepository.findById(adminUserId);
        if (!adminUser || adminUser.role !== 'SUPER_ADMIN') {
            throw new errors_1.ForbiddenError('Only super admins can impersonate users', constants_1.ERROR_CODES.FORBIDDEN);
        }
        const targetUser = await user_repository_1.userRepository.findByPublicId(targetPublicId);
        if (!targetUser) {
            throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        if (targetUser.role === 'ADMIN' || targetUser.role === 'SUPER_ADMIN') {
            throw new errors_1.ForbiddenError('Cannot impersonate admin users', constants_1.ERROR_CODES.FORBIDDEN);
        }
        const impersonationId = `imp_${(0, crypto_1.randomUUID)()}`;
        const expiresAt = new Date(Date.now() + IMPERSONATION_TTL_SECONDS * 1000);
        const token = core_1.jwtService.generateAccessToken({
            publicId: targetUser.publicId,
            email: targetUser.email,
            role: targetUser.role,
            sessionId: impersonationId,
        });
        await core_1.cacheService.set(`impersonation:${impersonationId}`, {
            adminUserId: adminUserId.toString(),
            adminPublicId: adminUser.publicId,
            targetUserId: targetUser.id.toString(),
            targetPublicId: targetUser.publicId,
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
            createdAt: new Date().toISOString(),
            expiresAt: expiresAt.toISOString(),
        }, IMPERSONATION_TTL_SECONDS);
        logger_1.logger.warn({
            adminUserId: adminUser.publicId,
            targetUserId: targetUser.publicId,
            impersonationId,
        }, 'Impersonation session created');
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
    async revokeImpersonation(impersonationId) {
        await core_1.cacheService.del(`impersonation:${impersonationId}`);
        logger_1.logger.info({ impersonationId }, 'Impersonation session revoked');
    },
    async updateUser(adminUserId, targetPublicId, data) {
        const targetUser = await user_repository_1.userRepository.findByPublicId(targetPublicId);
        if (!targetUser) {
            throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        if (data.email && data.email !== targetUser.email) {
            const emailTaken = await user_repository_1.userRepository.emailExists(data.email, targetUser.id);
            if (emailTaken) {
                throw new errors_1.BadRequestError('Email is already in use', constants_1.ERROR_CODES.USER_EMAIL_TAKEN);
            }
        }
        await user_repository_1.userRepository.update(targetUser.id, data);
        logger_1.logger.info({
            adminUserId: adminUserId.toString(),
            targetUserId: targetUser.publicId,
            changes: Object.keys(data),
        }, 'Admin updated user');
        return this.getUserDetail(targetPublicId);
    },
};
//# sourceMappingURL=admin-user.service.js.map