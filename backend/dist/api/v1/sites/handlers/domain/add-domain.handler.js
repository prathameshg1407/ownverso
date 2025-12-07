"use strict";
// ==== FILE: src/api/v1/sites/handlers/domain/add-domain.handler.ts ====
/**
 * Add Domain Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDomainHandler = addDomainHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function addDomainHandler(request, reply) {
    const { siteId } = request.params;
    const { customDomain } = request.body;
    const domain = await services_1.siteDomainService.addDomain(siteId, customDomain);
    (0, utils_1.sendSuccess)(reply, request, { domain }, 201);
}
//# sourceMappingURL=add-domain.handler.js.map