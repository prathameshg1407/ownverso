"use strict";
/**
 * Admin Update User Status Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusHandler = updateStatusHandler;
const services_1 = require("../../../../../domain/users/services");
const utils_1 = require("../../utils");
async function updateStatusHandler(request, reply) {
    const user = await services_1.adminUserService.updateUserStatus((0, utils_1.getUserId)(request), request.params.userId, request.body.status, request.body.reason);
    (0, utils_1.sendSuccess)(reply, request, { user });
}
//# sourceMappingURL=update-status.handler.js.map