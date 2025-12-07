"use strict";
// ==== FILE: src/api/v1/author/handlers/platform-subscription/reactivate.handler.ts ====
/**
 * Reactivate Platform Subscription Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactivateHandler = reactivateHandler;
const services_1 = require("../../../../../domain/authors/services");
const utils_1 = require("../../../users/utils");
async function reactivateHandler(request, reply) {
    const userId = (0, utils_1.getUserId)(request);
    const subscription = await services_1.authorPlatformSubService.reactivate(userId);
    (0, utils_1.sendSuccess)(reply, request, { subscription, message: 'Subscription reactivated' });
}
//# sourceMappingURL=reactivate.handler.js.map