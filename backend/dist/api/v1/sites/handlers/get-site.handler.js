"use strict";
// ==== FILE: src/api/v1/sites/handlers/get-site.handler.ts ====
/**
 * Get Site Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteHandler = getSiteHandler;
const services_1 = require("../../../../domain/sites/services");
const utils_1 = require("../../users/utils");
async function getSiteHandler(request, reply) {
    const { siteId } = request.params;
    const site = await services_1.siteService.getSite(siteId);
    (0, utils_1.sendSuccess)(reply, request, { site });
}
//# sourceMappingURL=get-site.handler.js.map