"use strict";
// ==== FILE: src/api/v1/sites/handlers/settings/update-analytics.handler.ts ====
/**
 * Update Site Analytics Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAnalyticsHandler = updateAnalyticsHandler;
const services_1 = require("../../../../../domain/sites/services");
const utils_1 = require("../../../users/utils");
async function updateAnalyticsHandler(request, reply) {
    const { siteId } = request.params;
    const analytics = await services_1.siteSettingsService.updateAnalytics(siteId, request.body);
    (0, utils_1.sendSuccess)(reply, request, { analytics });
}
//# sourceMappingURL=update-analytics.handler.js.map