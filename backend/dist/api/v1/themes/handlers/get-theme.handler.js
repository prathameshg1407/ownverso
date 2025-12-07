"use strict";
// ==== FILE: src/api/v1/themes/handlers/get-theme.handler.ts ====
/**
 * Get Theme Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThemeHandler = getThemeHandler;
const services_1 = require("../../../../domain/sites/services");
const utils_1 = require("../../users/utils");
async function getThemeHandler(request, reply) {
    const { themeId } = request.params;
    const theme = await services_1.themeService.getTheme(themeId);
    (0, utils_1.sendSuccess)(reply, request, { theme });
}
//# sourceMappingURL=get-theme.handler.js.map