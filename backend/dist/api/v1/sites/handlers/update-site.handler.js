"use strict";
// ==== FILE: src/api/v1/sites/handlers/update-site.handler.ts ====
/**
 * Update Site Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSiteHandler = updateSiteHandler;
const services_1 = require("../../../../domain/sites/services");
const utils_1 = require("../../users/utils");
async function updateSiteHandler(request, reply) {
    const { siteId } = request.params;
    const site = await services_1.siteService.updateSite(siteId, request.body);
    (0, utils_1.sendSuccess)(reply, request, { site });
}
//# sourceMappingURL=update-site.handler.js.map