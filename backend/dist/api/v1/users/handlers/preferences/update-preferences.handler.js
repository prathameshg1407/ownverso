"use strict";
/**
 * Update Preferences Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePreferencesHandler = updatePreferencesHandler;
const services_1 = require("../../../../../domain/users/services");
const utils_1 = require("../../utils");
async function updatePreferencesHandler(request, reply) {
    const preferences = await services_1.userPreferencesService.updatePreferences((0, utils_1.getUserId)(request), request.body);
    (0, utils_1.sendSuccess)(reply, request, { preferences });
}
//# sourceMappingURL=update-preferences.handler.js.map