"use strict";
// ==== FILE: src/api/v1/sites/handlers/pages/reorder-pages.handler.ts ====
/**
 * Reorder Pages Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderPagesHandler = reorderPagesHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function reorderPagesHandler(request, reply) {
    const { siteId } = request.params;
    const pages = await services_1.pageService.reorderPages(siteId, request.body);
    (0, utils_1.sendSuccess)(reply, request, { pages });
}
//# sourceMappingURL=reorder-pages.handler.js.map