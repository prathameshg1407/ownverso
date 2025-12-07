"use strict";
/**
 * Admin Update User Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserHandler = updateUserHandler;
const services_1 = require("../../../../../domain/users/services");
const utils_1 = require("../../utils");
async function updateUserHandler(request, reply) {
    const user = await services_1.adminUserService.updateUser((0, utils_1.getUserId)(request), request.params.userId, request.body);
    (0, utils_1.sendSuccess)(reply, request, { user });
}
//# sourceMappingURL=update-user.handler.js.map