"use strict";
// ==== FILE: src/api/v1/sites/handlers/settings/get-settings.handler.ts ====
/**
 * Get Site Settings Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettingsHandler = getSettingsHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function getSettingsHandler(request, reply) {
    const { siteId } = request.params;
    const settings = await services_1.siteSettingsService.getSettings(siteId);
    (0, utils_1.sendSuccess)(reply, request, { settings });
}
//# sourceMappingURL=get-settings.handler.js.map