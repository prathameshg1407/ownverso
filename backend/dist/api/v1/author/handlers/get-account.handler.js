"use strict";
// ==== FILE: src/api/v1/author/handlers/get-account.handler.ts ====
/**
 * Get Author Account Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountHandler = getAccountHandler;
const services_1 = require("../../../../domain/authors/services");
const utils_1 = require("../../users/utils");
async function getAccountHandler(request, reply) {
    const userId = (0, utils_1.getUserId)(request);
    const account = await services_1.authorService.getAccount(userId);
    (0, utils_1.sendSuccess)(reply, request, { account });
}
//# sourceMappingURL=get-account.handler.js.map