"use strict";
// ==== FILE: src/api/v1/sites/handlers/domain/get-domain.handler.ts ====
/**
 * Get Site Domain Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDomainHandler = getDomainHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function getDomainHandler(request, reply) {
    const { siteId } = request.params;
    const domain = await services_1.siteDomainService.getDomain(siteId);
    (0, utils_1.sendSuccess)(reply, request, { domain });
}
//# sourceMappingURL=get-domain.handler.js.map