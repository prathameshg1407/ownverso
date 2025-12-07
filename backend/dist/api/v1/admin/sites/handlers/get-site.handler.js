"use strict";
// ==== FILE: src/api/v1/admin/sites/handlers/get-site.handler.ts ====
/**
 * Admin Get Site Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminGetSiteHandler = adminGetSiteHandler;
const errors_1 = require("../../../../../common/errors");
const constants_1 = require("../../../../../common/constants");
const repositories_1 = require("../../../../../domain/sites/repositories");
const mappers_1 = require("../../../../../domain/sites/mappers");
const utils_1 = require("../../../users/utils");
async function adminGetSiteHandler(request, reply) {
    const { siteId } = request.params;
    const site = await repositories_1.siteRepository.findByIdFull(siteId);
    if (!site) {
        throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
    }
    (0, utils_1.sendSuccess)(reply, request, { site: mappers_1.adminSiteMapper.toDetailDTO(site) });
}
//# sourceMappingURL=get-site.handler.js.map