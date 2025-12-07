"use strict";
/**
 * Update Security Settings Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSecurityHandler = updateSecurityHandler;
const services_1 = require("../../../../../domain/users/services");
const utils_1 = require("../../utils");
async function updateSecurityHandler(request, reply) {
    const security = await services_1.userSecurityService.updateSecuritySettings((0, utils_1.getUserId)(request), request.body);
    (0, utils_1.sendSuccess)(reply, request, { security });
}
//# sourceMappingURL=update-security.handler.js.map