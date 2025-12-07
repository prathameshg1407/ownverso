"use strict";
// ==== FILE: src/api/v1/sites/handlers/domain/provision-ssl.handler.ts ====
/**
 * Provision SSL Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.provisionSslHandler = provisionSslHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function provisionSslHandler(request, reply) {
    const { siteId } = request.params;
    const domain = await services_1.siteDomainService.provisionSsl(siteId);
    (0, utils_1.sendSuccess)(reply, request, { domain });
}
//# sourceMappingURL=provision-ssl.handler.js.map