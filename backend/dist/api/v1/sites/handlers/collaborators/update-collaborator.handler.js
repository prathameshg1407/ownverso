"use strict";
// ==== FILE: src/api/v1/sites/handlers/collaborators/update-collaborator.handler.ts ====
/**
 * Update Collaborator Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCollaboratorHandler = updateCollaboratorHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function updateCollaboratorHandler(request, reply) {
    const { collaboratorId } = request.params;
    const collaborator = await services_1.collaboratorService.updateCollaborator(BigInt(collaboratorId), request.body);
    (0, utils_1.sendSuccess)(reply, request, { collaborator });
}
//# sourceMappingURL=update-collaborator.handler.js.map