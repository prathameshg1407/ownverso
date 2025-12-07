"use strict";
// ==== FILE: src/api/v1/sites/handlers/get-site-overview.handler.ts ====
/**
 * Get Site Overview Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteOverviewHandler = getSiteOverviewHandler;
const services_1 = require("../../../../domain/sites/services");
const utils_1 = require("../../users/utils");
async function getSiteOverviewHandler(request, reply) {
    const { siteId } = request.params;
    const overview = await services_1.siteService.getSiteOverview(siteId);
    (0, utils_1.sendSuccess)(reply, request, overview);
}
//# sourceMappingURL=get-site-overview.handler.js.map