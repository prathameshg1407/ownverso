"use strict";
// ==== FILE: src/api/v1/admin/authors/handlers/get-author.handler.ts ====
/**
 * Admin Get Author Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorHandler = getAuthorHandler;
const errors_1 = require("../../../../../common/errors");
const constants_1 = require("../../../../../common/constants");
const repositories_1 = require("../../../../../domain/users/repositories");
const repositories_2 = require("../../../../../domain/authors/repositories");
const mappers_1 = require("../../../../../domain/authors/mappers");
const utils_1 = require("../../../users/utils");
async function getAuthorHandler(request, reply) {
    const { userId: publicId } = request.params;
    const user = await repositories_1.userRepository.findByPublicId(publicId);
    if (!user) {
        throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
    }
    const account = await repositories_2.authorAccountRepository.findByUserIdWithUser(user.id);
    if (!account) {
        throw new errors_1.NotFoundError('Author account not found', constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
    }
    const author = mappers_1.adminAuthorMapper.toDetailDTO(account);
    (0, utils_1.sendSuccess)(reply, request, { author });
}
//# sourceMappingURL=get-author.handler.js.map