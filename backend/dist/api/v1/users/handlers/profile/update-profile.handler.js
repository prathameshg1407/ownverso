"use strict";
/**
 * Update Profile Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileHandler = updateProfileHandler;
const services_1 = require("../../../../../domain/users/services");
const utils_1 = require("../../utils");
async function updateProfileHandler(request, reply) {
    const profile = await services_1.userProfileService.updateProfile((0, utils_1.getUserId)(request), request.body);
    (0, utils_1.sendSuccess)(reply, request, { profile });
}
//# sourceMappingURL=update-profile.handler.js.map