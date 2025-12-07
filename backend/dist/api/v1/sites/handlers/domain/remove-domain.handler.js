"use strict";
// ==== FILE: src/api/v1/sites/handlers/domain/remove-domain.handler.ts ====
/**
 * Remove Domain Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDomainHandler = removeDomainHandler;
const services_1 = require("../../../../../domain/sites/services");
async function removeDomainHandler(request, reply) {
    const { siteId } = request.params;
    await services_1.siteDomainService.removeDomain(siteId);
    reply.status(204).send();
}
//# sourceMappingURL=remove-domain.handler.js.map