"use strict";
// ==== FILE: src/api/v1/admin/sites/handlers/update-site-status.handler.ts ====
/**
 * Admin Update Site Status Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSiteStatusHandler = updateSiteStatusHandler;
const errors_1 = require("../../../../../common/errors");
const constants_1 = require("../../../../../common/constants");
const repositories_1 = require("../../../../../domain/sites/repositories");
const mappers_1 = require("../../../../../domain/sites/mappers");
const utils_1 = require("../../../users/utils");
const logger_1 = require("../../../../../core/logger");
async function updateSiteStatusHandler(request, reply) {
    const { siteId } = request.params;
    const { status, reason } = request.body;
    const site = await repositories_1.siteRepository.findById(siteId);
    if (!site) {
        throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
    }
    const updated = await repositories_1.siteRepository.updateStatus(siteId, status, reason);
    logger_1.logger.info({
        adminId: request.user?.publicId,
        siteId,
        fromStatus: site.status,
        toStatus: status,
        reason,
    }, 'Site status updated by admin');
    (0, utils_1.sendSuccess)(reply, request, {
        site: mappers_1.siteMapper.toDTO(updated),
        message: `Site status updated to ${status}`,
    });
}
//# sourceMappingURL=update-site-status.handler.js.map