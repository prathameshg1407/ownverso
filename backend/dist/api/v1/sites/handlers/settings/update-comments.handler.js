"use strict";
// ==== FILE: src/api/v1/sites/handlers/settings/update-comments.handler.ts ====
/**
 * Update Site Comments Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentsHandler = updateCommentsHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function updateCommentsHandler(request, reply) {
    const { siteId } = request.params;
    const comments = await services_1.siteSettingsService.updateComments(siteId, request.body);
    (0, utils_1.sendSuccess)(reply, request, { comments });
}
//# sourceMappingURL=update-comments.handler.js.map