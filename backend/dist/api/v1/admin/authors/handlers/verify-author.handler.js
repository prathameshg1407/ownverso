"use strict";
// ==== FILE: src/api/v1/admin/authors/handlers/verify-author.handler.ts ====
/**
 * Admin Verify Author Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthorHandler = verifyAuthorHandler;
const errors_1 = require("../../../../../common/errors");
const constants_1 = require("../../../../../common/constants");
const repositories_1 = require("../../../../../domain/users/repositories");
const repositories_2 = require("../../../../../domain/authors/repositories");
const mappers_1 = require("../../../../../domain/authors/mappers");
const utils_1 = require("../../../users/utils");
const logger_1 = require("../../../../../core/logger");
async function verifyAuthorHandler(request, reply) {
    const { userId: publicId } = request.params;
    const { isVerified, note } = request.body;
    const user = await repositories_1.userRepository.findByPublicId(publicId);
    if (!user) {
        throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
    }
    const exists = await repositories_2.authorAccountRepository.exists(user.id);
    if (!exists) {
        throw new errors_1.NotFoundError('Author account not found', constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
    }
    const updated = await repositories_2.authorAccountRepository.updateVerification(user.id, isVerified, note);
    logger_1.logger.info({
        adminId: request.user?.publicId,
        authorId: publicId,
        isVerified,
    }, 'Author verification status updated');
    (0, utils_1.sendSuccess)(reply, request, {
        account: mappers_1.authorAccountMapper.toDTO(updated),
        message: isVerified ? 'Author verified successfully' : 'Author verification removed',
    });
}
//# sourceMappingURL=verify-author.handler.js.map