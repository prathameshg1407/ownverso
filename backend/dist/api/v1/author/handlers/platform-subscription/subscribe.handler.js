"use strict";
// ==== FILE: src/api/v1/author/handlers/platform-subscription/subscribe.handler.ts ====
/**
 * Subscribe to Platform Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeHandler = subscribeHandler;
const services_1 = require("../../../../../domain/authors/services");
const utils_1 = require("../../../users/utils");
// Map schema billing cycle to Prisma BillingCycle enum
function mapBillingCycle(cycle) {
    return cycle === 'YEARLY' ? 'ANNUAL' : 'MONTHLY';
}
async function subscribeHandler(request, reply) {
    const userId = (0, utils_1.getUserId)(request);
    const { tier, billingCycle } = request.body;
    const subscription = await services_1.authorPlatformSubService.subscribe(userId, tier, mapBillingCycle(billingCycle));
    (0, utils_1.sendSuccess)(reply, request, { subscription }, 201);
}
//# sourceMappingURL=subscribe.handler.js.map