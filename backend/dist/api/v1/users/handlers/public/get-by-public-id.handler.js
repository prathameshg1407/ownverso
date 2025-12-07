"use strict";
/**
 * Get Public User by Public ID Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByPublicIdHandler = getByPublicIdHandler;
const services_1 = require("../../../../../domain/users/services");
const utils_1 = require("../../utils");
async function getByPublicIdHandler(request, reply) {
    const user = await services_1.publicUserService.getByPublicId(request.params.publicId);
    (0, utils_1.sendSuccess)(reply, request, { user });
}
//# sourceMappingURL=get-by-public-id.handler.js.map