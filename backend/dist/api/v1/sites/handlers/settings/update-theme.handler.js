"use strict";
// ==== FILE: src/api/v1/sites/handlers/settings/update-theme.handler.ts ====
/**
 * Update Site Theme Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateThemeHandler = updateThemeHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function updateThemeHandler(request, reply) {
    const { siteId } = request.params;
    const theme = await services_1.siteSettingsService.updateTheme(siteId, request.body);
    (0, utils_1.sendSuccess)(reply, request, { theme });
}
//# sourceMappingURL=update-theme.handler.js.map