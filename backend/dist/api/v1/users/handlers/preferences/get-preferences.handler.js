"use strict";
/**
 * Get Preferences Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreferencesHandler = getPreferencesHandler;
const services_1 = require("../../../../../domain/users/services");
const utils_1 = require("../../utils");
async function getPreferencesHandler(request, reply) {
    const preferences = await services_1.userPreferencesService.getPreferences((0, utils_1.getUserId)(request));
    (0, utils_1.sendSuccess)(reply, request, { preferences });
}
//# sourceMappingURL=get-preferences.handler.js.map