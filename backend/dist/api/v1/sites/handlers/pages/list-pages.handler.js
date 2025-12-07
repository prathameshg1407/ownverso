"use strict";
// ==== FILE: src/api/v1/sites/handlers/pages/list-pages.handler.ts ====
/**
 * List Pages Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPagesHandler = listPagesHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function listPagesHandler(request, reply) {
    const { siteId } = request.params;
    const pages = await services_1.pageService.listPages(siteId);
    (0, utils_1.sendSuccess)(reply, request, { pages });
}
//# sourceMappingURL=list-pages.handler.js.map