"use strict";
// ==== FILE: src/api/v1/sites/handlers/domain/verify-domain.handler.ts ====
/**
 * Verify Domain Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDomainHandler = verifyDomainHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function verifyDomainHandler(request, reply) {
    const { siteId } = request.params;
    const domain = await services_1.siteDomainService.verifyDomain(siteId);
    (0, utils_1.sendSuccess)(reply, request, { domain });
}
//# sourceMappingURL=verify-domain.handler.js.map