"use strict";
/**
 * Get Public User by Username Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByUsernameHandler = getByUsernameHandler;
const services_1 = require("../../../../../domain/users/services");
const utils_1 = require("../../utils");
async function getByUsernameHandler(request, reply) {
    const user = await services_1.publicUserService.getByUsername(request.params.username);
    (0, utils_1.sendSuccess)(reply, request, { user });
}
//# sourceMappingURL=get-by-username.handler.js.map