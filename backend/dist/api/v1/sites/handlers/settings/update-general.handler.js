"use strict";
// ==== FILE: src/api/v1/sites/handlers/settings/update-general.handler.ts ====
/**
 * Update Site General Settings Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGeneralHandler = updateGeneralHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function updateGeneralHandler(request, reply) {
    const { siteId } = request.params;
    const general = await services_1.siteSettingsService.updateGeneral(siteId, request.body);
    (0, utils_1.sendSuccess)(reply, request, { general });
}
//# sourceMappingURL=update-general.handler.js.map