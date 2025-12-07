"use strict";
/**
 * Delete Avatar Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAvatarHandler = deleteAvatarHandler;
const services_1 = require("../../../../../domain/users/services");
const utils_1 = require("../../utils");
async function deleteAvatarHandler(request, reply) {
    await services_1.userProfileService.removeAvatar((0, utils_1.getUserId)(request));
    (0, utils_1.sendNoContent)(reply);
}
//# sourceMappingURL=delete-avatar.handler.js.map