"use strict";
// ==== FILE: src/api/v1/author/handlers/get-stats.handler.ts ====
/**
 * Get Author Stats Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatsHandler = getStatsHandler;
const services_1 = require("../../../../domain/authors/services");
const utils_1 = require("../../users/utils");
async function getStatsHandler(request, reply) {
    const userId = (0, utils_1.getUserId)(request);
    const stats = await services_1.authorService.getStats(userId);
    (0, utils_1.sendSuccess)(reply, request, { stats });
}
//# sourceMappingURL=get-stats.handler.js.map