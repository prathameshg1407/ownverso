"use strict";
/**
 * Force Logout All Devices Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceLogoutHandler = forceLogoutHandler;
const services_1 = require("../../../../../domain/users/services");
const utils_1 = require("../../utils");
async function forceLogoutHandler(request, reply) {
    const revokedCount = await services_1.userSecurityService.forceLogoutAll((0, utils_1.getUserId)(request));
    (0, utils_1.sendSuccess)(reply, request, {
        message: `Successfully logged out from ${revokedCount} device(s)`,
        sessionsRevoked: revokedCount,
    });
}
//# sourceMappingURL=force-logout.handler.js.map