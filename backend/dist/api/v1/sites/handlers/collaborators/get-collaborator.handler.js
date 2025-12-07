"use strict";
// ==== FILE: src/api/v1/sites/handlers/collaborators/get-collaborator.handler.ts ====
/**
 * Get Collaborator Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollaboratorHandler = getCollaboratorHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function getCollaboratorHandler(request, reply) {
    const { collaboratorId } = request.params;
    const collaborator = await services_1.collaboratorService.getCollaborator(BigInt(collaboratorId));
    (0, utils_1.sendSuccess)(reply, request, { collaborator });
}
//# sourceMappingURL=get-collaborator.handler.js.map