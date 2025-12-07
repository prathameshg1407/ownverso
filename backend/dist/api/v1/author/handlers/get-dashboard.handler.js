"use strict";
// ==== FILE: src/api/v1/author/handlers/get-dashboard.handler.ts ====
/**
 * Get Author Dashboard Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardHandler = getDashboardHandler;
const services_1 = require("../../../../domain/authors/services");
const utils_1 = require("../../users/utils");
async function getDashboardHandler(request, reply) {
    const userId = (0, utils_1.getUserId)(request);
    const dashboard = await services_1.authorService.getDashboard(userId);
    (0, utils_1.sendSuccess)(reply, request, { dashboard });
}
//# sourceMappingURL=get-dashboard.handler.js.map