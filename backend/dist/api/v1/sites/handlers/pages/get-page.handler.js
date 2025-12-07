"use strict";
// ==== FILE: src/api/v1/sites/handlers/pages/get-page.handler.ts ====
/**
 * Get Page Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageHandler = getPageHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function getPageHandler(request, reply) {
    const { pageId } = request.params;
    const page = await services_1.pageService.getPage(pageId);
    (0, utils_1.sendSuccess)(reply, request, { page });
}
//# sourceMappingURL=get-page.handler.js.map