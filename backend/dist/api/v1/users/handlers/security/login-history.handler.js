"use strict";
/**
 * Login History Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHistoryHandler = loginHistoryHandler;
const services_1 = require("../../../../../domain/users/services");
const utils_1 = require("../../utils");
const request_utils_1 = require("../../utils/request.utils");
async function loginHistoryHandler(request, reply) {
    const currentSessionId = (0, request_utils_1.getSessionId)(request);
    const sessions = await services_1.userSecurityService.getLoginHistory((0, utils_1.getUserId)(request), currentSessionId);
    (0, utils_1.sendSuccess)(reply, request, { sessions });
}
//# sourceMappingURL=login-history.handler.js.map