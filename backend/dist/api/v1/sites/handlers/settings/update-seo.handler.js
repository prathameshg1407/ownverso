"use strict";
// ==== FILE: src/api/v1/sites/handlers/settings/update-seo.handler.ts ====
/**
 * Update Site SEO Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSeoHandler = updateSeoHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function updateSeoHandler(request, reply) {
    const { siteId } = request.params;
    const seo = await services_1.siteSettingsService.updateSeo(siteId, request.body);
    (0, utils_1.sendSuccess)(reply, request, { seo });
}
//# sourceMappingURL=update-seo.handler.js.map