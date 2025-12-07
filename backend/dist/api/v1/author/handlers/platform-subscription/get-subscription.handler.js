"use strict";
// ==== FILE: src/api/v1/author/handlers/platform-subscription/get-subscription.handler.ts ====
/**
 * Get Platform Subscription Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscriptionHandler = getSubscriptionHandler;
const services_1 = require("../../../../../domain/authors/services");
const utils_1 = require("../../../users/utils");
async function getSubscriptionHandler(request, reply) {
    const userId = (0, utils_1.getUserId)(request);
    const subscription = await services_1.authorPlatformSubService.getSubscription(userId);
    (0, utils_1.sendSuccess)(reply, request, { subscription });
}
//# sourceMappingURL=get-subscription.handler.js.map