"use strict";
// ==== FILE: src/api/v1/author/handlers/platform-subscription/cancel.handler.ts ====
/**
 * Cancel Platform Subscription Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelHandler = cancelHandler;
const services_1 = require("../../../../../domain/authors/services");
const utils_1 = require("../../../users/utils");
async function cancelHandler(request, reply) {
    const userId = (0, utils_1.getUserId)(request);
    const subscription = await services_1.authorPlatformSubService.cancel(userId);
    (0, utils_1.sendSuccess)(reply, request, { subscription, message: 'Subscription cancelled' });
}
//# sourceMappingURL=cancel.handler.js.map