"use strict";
/**
 * Get Current User Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeHandler = getMeHandler;
const services_1 = require("../../../../domain/users/services");
const utils_1 = require("../utils");
async function getMeHandler(request, reply) {
    const user = await services_1.userService.getCurrentUser((0, utils_1.getUserId)(request));
    (0, utils_1.sendSuccess)(reply, request, { user });
}
//# sourceMappingURL=get-me.handler.js.map