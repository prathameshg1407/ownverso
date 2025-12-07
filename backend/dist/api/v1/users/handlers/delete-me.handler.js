"use strict";
/**
 * Delete Current User Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeHandler = deleteMeHandler;
const services_1 = require("../../../../domain/users/services");
const utils_1 = require("../utils");
async function deleteMeHandler(request, reply) {
    await services_1.userService.initiateAccountDeletion((0, utils_1.getUserId)(request));
    (0, utils_1.sendNoContent)(reply);
}
//# sourceMappingURL=delete-me.handler.js.map