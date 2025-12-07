"use strict";
// ==== FILE: src/api/v1/sites/handlers/collaborators/invite-collaborator.handler.ts ====
/**
 * Invite Collaborator Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteCollaboratorHandler = inviteCollaboratorHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function inviteCollaboratorHandler(request, reply) {
    const { siteId } = request.params;
    const userId = (0, utils_1.getUserId)(request);
    const invite = await services_1.collaboratorService.inviteCollaborator({
        siteId,
        ...request.body,
    }, userId);
    (0, utils_1.sendSuccess)(reply, request, { invite }, 201);
}
//# sourceMappingURL=invite-collaborator.handler.js.map