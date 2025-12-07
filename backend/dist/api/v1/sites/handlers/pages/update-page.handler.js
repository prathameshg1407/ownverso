"use strict";
// ==== FILE: src/api/v1/sites/handlers/pages/update-page.handler.ts ====
/**
 * Update Page Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePageHandler = updatePageHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function updatePageHandler(request, reply) {
    const { pageId } = request.params;
    const page = await services_1.pageService.updatePage(pageId, request.body);
    (0, utils_1.sendSuccess)(reply, request, { page });
}
//# sourceMappingURL=update-page.handler.js.map