"use strict";
/**
 * Get Security Info Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecurityHandler = getSecurityHandler;
const services_1 = require("../../../../../domain/users/services");
const utils_1 = require("../../utils");
async function getSecurityHandler(request, reply) {
    const security = await services_1.userSecurityService.getSecurityInfo((0, utils_1.getUserId)(request));
    (0, utils_1.sendSuccess)(reply, request, { security });
}
//# sourceMappingURL=get-security.handler.js.map