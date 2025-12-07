"use strict";
/**
 * User Preferences Repository
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPreferencesRepository = void 0;
const database_1 = require("../../../core/database");
exports.userPreferencesRepository = {
    async findByUserId(userId) {
        return database_1.prisma.userPreferences.findUnique({ where: { userId } });
    },
    async update(userId, input) {
        return database_1.prisma.userPreferences.update({ where: { userId }, data: input });
    },
    async ensureExists(userId) {
        return database_1.prisma.userPreferences.upsert({
            where: { userId },
            create: { userId },
            update: {},
        });
    },
};
//# sourceMappingURL=user-preferences.repository.js.map