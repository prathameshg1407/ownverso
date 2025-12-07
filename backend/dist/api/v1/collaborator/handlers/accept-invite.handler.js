"use strict";
// ==== FILE: src/api/v1/collaborator/handlers/accept-invite.handler.ts ====
/**
 * Accept Collaborator Invite Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptInviteHandler = acceptInviteHandler;
const services_1 = require("../../../../domain/sites/services");
const utils_1 = require("../../users/utils");
async function acceptInviteHandler(request, reply) {
    const { token } = request.params;
    const userId = (0, utils_1.getUserId)(request);
    const collaborator = await services_1.collaboratorService.acceptInvite(token, userId);
    (0, utils_1.sendSuccess)(reply, request, { collaborator });
}
//# sourceMappingURL=accept-invite.handler.js.map