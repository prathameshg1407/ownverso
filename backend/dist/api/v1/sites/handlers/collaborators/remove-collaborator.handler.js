"use strict";
// ==== FILE: src/api/v1/sites/handlers/collaborators/remove-collaborator.handler.ts ====
/**
 * Remove Collaborator Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCollaboratorHandler = removeCollaboratorHandler;
const services_1 = require("../../../../../domain/sites/services");
async function removeCollaboratorHandler(request, reply) {
    const { collaboratorId } = request.params;
    await services_1.collaboratorService.removeCollaborator(BigInt(collaboratorId));
    reply.status(204).send();
}
//# sourceMappingURL=remove-collaborator.handler.js.map