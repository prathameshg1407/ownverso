"use strict";
// ==== FILE: src/api/v1/author/handlers/platform-subscription/change-plan.handler.ts ====
/**
 * Change Platform Plan Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePlanHandler = changePlanHandler;
const services_1 = require("../../../../../domain/authors/services");
const utils_1 = require("../../../users/utils");
async function changePlanHandler(request, reply) {
    const userId = (0, utils_1.getUserId)(request);
    const { tier } = request.body;
    const subscription = await services_1.authorPlatformSubService.changePlan(userId, tier);
    (0, utils_1.sendSuccess)(reply, request, { subscription });
}
//# sourceMappingURL=change-plan.handler.js.map