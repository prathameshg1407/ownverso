"use strict";
/**
 * Admin Get User Detail Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHandler = getUserHandler;
const services_1 = require("../../../../../domain/users/services");
const utils_1 = require("../../utils");
async function getUserHandler(request, reply) {
    const user = await services_1.adminUserService.getUserDetail(request.params.userId);
    (0, utils_1.sendSuccess)(reply, request, { user });
}
//# sourceMappingURL=get-user.handler.js.map