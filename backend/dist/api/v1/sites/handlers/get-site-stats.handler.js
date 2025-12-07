"use strict";
// ==== FILE: src/api/v1/sites/handlers/get-site-stats.handler.ts ====
/**
 * Get Site Stats Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteStatsHandler = getSiteStatsHandler;
const services_1 = require("../../../../domain/sites/services");
const utils_1 = require("../../users/utils");
async function getSiteStatsHandler(request, reply) {
    const { siteId } = request.params;
    const stats = await services_1.siteService.getSiteStats(siteId);
    (0, utils_1.sendSuccess)(reply, request, { stats });
}
//# sourceMappingURL=get-site-stats.handler.js.map