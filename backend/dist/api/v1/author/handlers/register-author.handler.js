"use strict";
// ==== FILE: src/api/v1/author/handlers/register-author.handler.ts ====
/**
 * Register Author Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuthorHandler = registerAuthorHandler;
const services_1 = require("../../../../domain/authors/services");
const utils_1 = require("../../users/utils");
async function registerAuthorHandler(request, reply) {
    const userId = (0, utils_1.getUserId)(request);
    const account = await services_1.authorService.registerAuthor({
        userId,
        ...request.body,
    });
    (0, utils_1.sendSuccess)(reply, request, { account }, 201);
}
//# sourceMappingURL=register-author.handler.js.map