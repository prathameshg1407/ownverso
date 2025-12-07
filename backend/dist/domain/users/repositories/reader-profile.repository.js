"use strict";
/**
 * Reader Profile Repository
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.readerProfileRepository = void 0;
const database_1 = require("../../../core/database");
exports.readerProfileRepository = {
    async findByUserId(userId) {
        return database_1.prisma.readerProfile.findUnique({ where: { userId } });
    },
    async ensureExists(userId) {
        return database_1.prisma.readerProfile.upsert({
            where: { userId },
            create: { userId },
            update: {},
        });
    },
    async incrementStats(userId, stats) {
        const updates = {};
        if (stats.chaptersRead) {
            updates.totalChaptersRead = { increment: stats.chaptersRead };
        }
        if (stats.readTimeHours) {
            updates.totalReadTimeHours = { increment: stats.readTimeHours };
        }
        if (stats.wordsRead) {
            updates.totalWordsRead = { increment: stats.wordsRead };
        }
        if (Object.keys(updates).length > 0) {
            await database_1.prisma.readerProfile.update({ where: { userId }, data: updates });
        }
    },
};
//# sourceMappingURL=reader-profile.repository.js.map