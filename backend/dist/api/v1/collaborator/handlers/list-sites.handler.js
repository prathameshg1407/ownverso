"use strict";
// ==== FILE: src/api/v1/collaborator/handlers/list-sites.handler.ts ====
/**
 * List Collaborator Sites Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCollaboratorSitesHandler = listCollaboratorSitesHandler;
const services_1 = require("../../../../domain/sites/services");
const utils_1 = require("../../users/utils");
async function listCollaboratorSitesHandler(request, reply) {
    const userId = (0, utils_1.getUserId)(request);
    const sites = await services_1.collaboratorService.getUserCollaborationSites(userId);
    (0, utils_1.sendSuccess)(reply, request, { sites });
}
//# sourceMappingURL=list-sites.handler.js.map