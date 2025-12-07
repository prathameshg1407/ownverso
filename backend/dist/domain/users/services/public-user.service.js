"use strict";
/**
 * Public User Service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicUserService = void 0;
const database_1 = require("../../../core/database");
const errors_1 = require("../../../common/errors");
const constants_1 = require("../../../common/constants");
const user_mapper_1 = require("../mappers/user.mapper");
const PUBLIC_USER_INCLUDE = {
    profile: true,
    preferences: true,
    authorAccount: true,
    _count: { select: { series: true, followers: true } },
};
const VISIBLE_STATUSES = ['ACTIVE', 'PENDING_VERIFICATION'];
exports.publicUserService = {
    async getByUsername(username) {
        const user = await database_1.prisma.user.findUnique({
            where: {
                username: username.toLowerCase(),
                deletedAt: null,
                status: { in: [...VISIBLE_STATUSES] },
            },
            include: PUBLIC_USER_INCLUDE,
        });
        if (!user) {
            throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        return user_mapper_1.publicUserMapper.toDTO(user);
    },
    async getByPublicId(publicId) {
        const user = await database_1.prisma.user.findUnique({
            where: {
                publicId,
                deletedAt: null,
                status: { in: [...VISIBLE_STATUSES] },
            },
            include: PUBLIC_USER_INCLUDE,
        });
        if (!user) {
            throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        return user_mapper_1.publicUserMapper.toDTO(user);
    },
};
//# sourceMappingURL=public-user.service.js.map