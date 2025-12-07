"use strict";
/**
 * Update Current User Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMeHandler = updateMeHandler;
const services_1 = require("../../../../domain/users/services");
const utils_1 = require("../utils");
async function updateMeHandler(request, reply) {
    const user = await services_1.userService.updateUser((0, utils_1.getUserId)(request), request.body);
    (0, utils_1.sendSuccess)(reply, request, { user });
}
//# sourceMappingURL=update-me.handler.js.map