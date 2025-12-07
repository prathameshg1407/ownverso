"use strict";
// ==== FILE: src/api/v1/author/handlers/update-account.handler.ts ====
/**
 * Update Author Account Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccountHandler = updateAccountHandler;
const services_1 = require("../../../../domain/authors/services");
const utils_1 = require("../../users/utils");
async function updateAccountHandler(request, reply) {
    const userId = (0, utils_1.getUserId)(request);
    const account = await services_1.authorService.updateAccount(userId, request.body);
    (0, utils_1.sendSuccess)(reply, request, { account });
}
//# sourceMappingURL=update-account.handler.js.map