"use strict";
// ==== FILE: src/api/v1/sites/handlers/pages/create-page.handler.ts ====
/**
 * Create Page Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPageHandler = createPageHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function createPageHandler(request, reply) {
    const { siteId } = request.params;
    const page = await services_1.pageService.createPage({
        siteId,
        ...request.body,
    });
    (0, utils_1.sendSuccess)(reply, request, { page }, 201);
}
//# sourceMappingURL=create-page.handler.js.map