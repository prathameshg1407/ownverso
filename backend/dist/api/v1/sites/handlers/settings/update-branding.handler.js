"use strict";
// ==== FILE: src/api/v1/sites/handlers/settings/update-branding.handler.ts ====
/**
 * Update Site Branding Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBrandingHandler = updateBrandingHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function updateBrandingHandler(request, reply) {
    const { siteId } = request.params;
    const branding = await services_1.siteSettingsService.updateBranding(siteId, request.body);
    (0, utils_1.sendSuccess)(reply, request, { branding });
}
//# sourceMappingURL=update-branding.handler.js.map