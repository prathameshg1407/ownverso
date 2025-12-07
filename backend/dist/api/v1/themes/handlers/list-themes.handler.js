"use strict";
// ==== FILE: src/api/v1/themes/handlers/list-themes.handler.ts ====
/**
 * List Themes Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.listThemesHandler = listThemesHandler;
const services_1 = require("../../../../domain/sites/services");
const utils_1 = require("../../users/utils");
async function listThemesHandler(request, reply) {
    const userId = (0, utils_1.getUserId)(request);
    const themes = await services_1.themeService.listThemes(userId);
    (0, utils_1.sendSuccess)(reply, request, { themes });
}
//# sourceMappingURL=list-themes.handler.js.map