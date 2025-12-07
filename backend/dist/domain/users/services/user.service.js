"use strict";
/**
 * User Service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const logger_1 = require("../../../core/logger");
const cache_1 = require("../../../core/cache");
const errors_1 = require("../../../common/errors");
const constants_1 = require("../../../common/constants");
const user_repository_1 = require("../repositories/user.repository");
const user_security_repository_1 = require("../repositories/user-security.repository");
const user_mapper_1 = require("../mappers/user.mapper");
const auth_plugin_1 = require("../../../plugins/auth.plugin");
const CACHE_PREFIX = 'user:full';
const CACHE_TTL = 300; // 5 minutes
function getCacheKey(userId) {
    return `${CACHE_PREFIX}:${userId}`;
}
async function getCachedUser(userId) {
    const cacheKey = getCacheKey(userId);
    try {
        const cached = await cache_1.redis.get(cacheKey);
        if (cached) {
            logger_1.logger.debug({ userId: userId.toString() }, 'User cache hit');
            return JSON.parse(cached);
        }
    }
    catch (error) {
        logger_1.logger.debug({ error }, 'User cache read error');
    }
    return null;
}
async function cacheUser(userId, user) {
    const cacheKey = getCacheKey(userId);
    try {
        await cache_1.redis.setex(cacheKey, CACHE_TTL, JSON.stringify(user));
    }
    catch (error) {
        logger_1.logger.debug({ error }, 'User cache write error');
    }
}
async function invalidateUserCache(userId, publicId) {
    const cacheKey = getCacheKey(userId);
    try {
        await cache_1.redis.del(cacheKey);
        if (publicId) {
            await (0, auth_plugin_1.invalidateUserAuthCache)(publicId);
        }
        logger_1.logger.debug({ userId: userId.toString() }, 'User cache invalidated');
    }
    catch (error) {
        logger_1.logger.debug({ error }, 'User cache invalidation error');
    }
}
exports.userService = {
    async getCurrentUser(userId) {
        const cached = await getCachedUser(userId);
        if (cached) {
            return cached;
        }
        const user = await user_repository_1.userRepository.findFull(userId);
        if (!user) {
            throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        const dto = user_mapper_1.fullUserMapper.toDTO(user);
        // Cache async, don't block response
        cacheUser(userId, dto).catch(() => { });
        return dto;
    },
    async updateUser(userId, data) {
        if (data.username) {
            const exists = await user_repository_1.userRepository.usernameExists(data.username, userId);
            if (exists) {
                throw new errors_1.ConflictError('Username is already taken', constants_1.ERROR_CODES.USER_USERNAME_TAKEN);
            }
        }
        const user = await user_repository_1.userRepository.findById(userId);
        await user_repository_1.userRepository.update(userId, data);
        await invalidateUserCache(userId, user?.publicId);
        logger_1.logger.info({ userId: userId.toString() }, 'User updated');
        return this.getCurrentUser(userId);
    },
    async initiateAccountDeletion(userId) {
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user) {
            throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        await user_repository_1.userRepository.update(userId, { status: 'DEACTIVATED' });
        await user_security_repository_1.userSecurityRepository.addStatusHistory(userId, 'DEACTIVATED', 'User initiated account deletion');
        await invalidateUserCache(userId, user.publicId);
        logger_1.logger.info({ userId: userId.toString() }, 'Account deletion initiated');
    },
    async getByPublicId(publicId) {
        const user = await user_repository_1.userRepository.findFullByPublicId(publicId);
        if (!user) {
            throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        return user_mapper_1.fullUserMapper.toDTO(user);
    },
    async getUserIdFromPublicId(publicId) {
        const user = await user_repository_1.userRepository.findByPublicId(publicId);
        if (!user) {
            throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        return user.id;
    },
};
//# sourceMappingURL=user.service.js.map