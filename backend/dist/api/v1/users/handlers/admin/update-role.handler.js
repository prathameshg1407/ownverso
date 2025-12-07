"use strict";
/**
 * Admin Update User Role Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleHandler = updateRoleHandler;
const services_1 = require("../../../../../domain/users/services");
const utils_1 = require("../../utils");
async function updateRoleHandler(request, reply) {
    const user = await services_1.adminUserService.updateUserRole((0, utils_1.getUserId)(request), request.params.userId, request.body.role);
    (0, utils_1.sendSuccess)(reply, request, { user });
}
//# sourceMappingURL=update-role.handler.js.map