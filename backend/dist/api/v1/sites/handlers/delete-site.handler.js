"use strict";
// ==== FILE: src/api/v1/sites/handlers/delete-site.handler.ts ====
/**
 * Delete Site Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSiteHandler = deleteSiteHandler;
const services_1 = require("../../../../domain/sites/services");
async function deleteSiteHandler(request, reply) {
    const { siteId } = request.params;
    await services_1.siteService.deleteSite(siteId);
    reply.status(204).send();
}
//# sourceMappingURL=delete-site.handler.js.map