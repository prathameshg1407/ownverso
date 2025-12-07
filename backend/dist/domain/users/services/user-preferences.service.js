"use strict";
/**
 * User Preferences Service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPreferencesService = void 0;
const logger_1 = require("../../../core/logger");
const user_preferences_repository_1 = require("../repositories/user-preferences.repository");
const user_mapper_1 = require("../mappers/user.mapper");
exports.userPreferencesService = {
    async getPreferences(userId) {
        const prefs = await user_preferences_repository_1.userPreferencesRepository.ensureExists(userId);
        return user_mapper_1.preferencesMapper.toDTO(prefs);
    },
    async updatePreferences(userId, data) {
        await user_preferences_repository_1.userPreferencesRepository.ensureExists(userId);
        const prefs = await user_preferences_repository_1.userPreferencesRepository.update(userId, data);
        logger_1.logger.info({ userId: userId.toString() }, 'User preferences updated');
        return user_mapper_1.preferencesMapper.toDTO(prefs);
    },
};
//# sourceMappingURL=user-preferences.service.js.map