"use strict";
// ==== FILE: src/api/v1/author/handlers/platform-subscription/list-plans.handler.ts ====
/**
 * List Platform Plans Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPlansHandler = listPlansHandler;
const services_1 = require("../../../../../domain/authors/services");
const utils_1 = require("../../../users/utils");
async function listPlansHandler(request, reply) {
    const plans = await services_1.authorPlatformSubService.listPlans();
    (0, utils_1.sendSuccess)(reply, request, { plans });
}
//# sourceMappingURL=list-plans.handler.js.map