"use strict";
/**
 * User Profile Repository
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileRepository = void 0;
const database_1 = require("../../../core/database");
exports.userProfileRepository = {
    async findByUserId(userId) {
        return database_1.prisma.userProfile.findUnique({ where: { userId } });
    },
    async update(userId, input) {
        return database_1.prisma.userProfile.update({ where: { userId }, data: input });
    },
    async updateAvatar(userId, avatarUrl) {
        return database_1.prisma.userProfile.update({ where: { userId }, data: { avatarUrl } });
    },
    async ensureExists(userId) {
        return database_1.prisma.userProfile.upsert({
            where: { userId },
            create: { userId },
            update: {},
        });
    },
};
//# sourceMappingURL=user-profile.repository.js.map