"use strict";
// ==== FILE: src/api/v1/sites/handlers/pages/delete-page.handler.ts ====
/**
 * Delete Page Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePageHandler = deletePageHandler;
const services_1 = require("../../../../../domain/sites/services");
async function deletePageHandler(request, reply) {
    const { pageId } = request.params;
    await services_1.pageService.deletePage(pageId);
    reply.status(204).send();
}
//# sourceMappingURL=delete-page.handler.js.map