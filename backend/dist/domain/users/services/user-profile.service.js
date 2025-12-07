"use strict";
/**
 * User Profile Service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileService = void 0;
const logger_1 = require("../../../core/logger");
const user_profile_repository_1 = require("../repositories/user-profile.repository");
const user_mapper_1 = require("../mappers/user.mapper");
exports.userProfileService = {
    async getProfile(userId) {
        const profile = await user_profile_repository_1.userProfileRepository.ensureExists(userId);
        return user_mapper_1.profileMapper.toDTO(profile);
    },
    async updateProfile(userId, data) {
        await user_profile_repository_1.userProfileRepository.ensureExists(userId);
        const profile = await user_profile_repository_1.userProfileRepository.update(userId, data);
        logger_1.logger.info({ userId: userId.toString() }, 'User profile updated');
        return user_mapper_1.profileMapper.toDTO(profile);
    },
    async updateAvatar(userId, avatarUrl) {
        await user_profile_repository_1.userProfileRepository.ensureExists(userId);
        const profile = await user_profile_repository_1.userProfileRepository.updateAvatar(userId, avatarUrl);
        logger_1.logger.info({ userId: userId.toString() }, 'User avatar updated');
        return { avatarUrl: profile.avatarUrl };
    },
    async removeAvatar(userId) {
        await user_profile_repository_1.userProfileRepository.ensureExists(userId);
        await user_profile_repository_1.userProfileRepository.updateAvatar(userId, null);
        logger_1.logger.info({ userId: userId.toString() }, 'User avatar removed');
    },
};
//# sourceMappingURL=user-profile.service.js.map