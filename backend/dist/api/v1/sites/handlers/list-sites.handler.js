"use strict";
// ==== FILE: src/api/v1/sites/handlers/list-sites.handler.ts ====
/**
 * List Sites Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSitesHandler = listSitesHandler;
const services_1 = require("../../../../domain/sites/services");
const utils_1 = require("../../users/utils");
async function listSitesHandler(request, reply) {
    const userId = (0, utils_1.getUserId)(request);
    const sites = await services_1.siteService.listAuthorSites(userId);
    (0, utils_1.sendSuccess)(reply, request, { sites });
}
//# sourceMappingURL=list-sites.handler.js.map