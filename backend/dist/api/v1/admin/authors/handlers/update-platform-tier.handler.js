"use strict";
// ==== FILE: src/api/v1/admin/authors/handlers/update-platform-tier.handler.ts ====
/**
 * Admin Update Platform Tier Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlatformTierHandler = updatePlatformTierHandler;
const errors_1 = require("../../../../../common/errors");
const constants_1 = require("../../../../../common/constants");
const repositories_1 = require("../../../../../domain/users/repositories");
const repositories_2 = require("../../../../../domain/authors/repositories");
const mappers_1 = require("../../../../../domain/authors/mappers");
const utils_1 = require("../../../users/utils");
const logger_1 = require("../../../../../core/logger");
async function updatePlatformTierHandler(request, reply) {
    const { userId: publicId } = request.params;
    const { tier, status, reason } = request.body;
    const user = await repositories_1.userRepository.findByPublicId(publicId);
    if (!user) {
        throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
    }
    const account = await repositories_2.authorAccountRepository.findByUserId(user.id);
    if (!account) {
        throw new errors_1.NotFoundError('Author account not found', constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
    }
    const updated = await repositories_2.authorAccountRepository.updatePlatformSubscription(user.id, {
        platformTier: tier,
        platformTierStatus: status,
    });
    logger_1.logger.info({
        adminId: request.user?.publicId,
        authorId: publicId,
        fromTier: account.platformTier,
        toTier: tier,
        reason,
    }, 'Author platform tier updated by admin');
    (0, utils_1.sendSuccess)(reply, request, {
        account: mappers_1.authorAccountMapper.toDTO(updated),
        message: `Platform tier updated to ${tier}`,
    });
}
//# sourceMappingURL=update-platform-tier.handler.js.map