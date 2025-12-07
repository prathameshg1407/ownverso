"use strict";
// ==== FILE: src/api/v1/sites/handlers/create-site.handler.ts ====
/**
 * Create Site Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSiteHandler = createSiteHandler;
const services_1 = require("../../../../domain/sites/services");
const utils_1 = require("../../users/utils");
async function createSiteHandler(request, reply) {
    const userId = (0, utils_1.getUserId)(request);
    const site = await services_1.siteService.createSite({
        authorId: userId,
        ...request.body,
    });
    (0, utils_1.sendSuccess)(reply, request, { site }, 201);
}
//# sourceMappingURL=create-site.handler.js.map