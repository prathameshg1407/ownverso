"use strict";
// ==== FILE: src/api/v1/sites/handlers/collaborators/list-collaborators.handler.ts (CONTINUED) ====
/**
 * List Collaborators Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCollaboratorsHandler = listCollaboratorsHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function listCollaboratorsHandler(request, reply) {
    const { siteId } = request.params;
    const collaborators = await services_1.collaboratorService.listCollaborators(siteId);
    (0, utils_1.sendSuccess)(reply, request, { collaborators });
}
//# sourceMappingURL=list-collaborators.handler.js.map