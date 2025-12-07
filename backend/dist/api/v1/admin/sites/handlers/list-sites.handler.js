"use strict";
// ==== FILE: src/api/v1/admin/sites/handlers/list-sites.handler.ts ====
/**
 * Admin List Sites Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminListSitesHandler = adminListSitesHandler;
const repositories_1 = require("../../../../../domain/sites/repositories");
const mappers_1 = require("../../../../../domain/sites/mappers");
const pagination_dto_1 = require("../../../../../common/dto/pagination.dto");
async function adminListSitesHandler(request, reply) {
    const { page = 1, limit = 20, authorId, ...filters } = request.query;
    const { sites, total } = await repositories_1.siteRepository.findMany({
        page,
        limit,
        authorId: authorId ? BigInt(authorId) : undefined,
        ...filters,
    });
    const data = sites.map((site) => mappers_1.adminSiteMapper.toSummaryDTO(site));
    const meta = (0, pagination_dto_1.createPaginationMeta)(page, limit, total);
    reply.send({
        success: true,
        data,
        meta: {
            ...meta,
            hasNext: meta.hasNextPage,
            hasPrev: meta.hasPreviousPage,
        },
        timestamp: new Date().toISOString(),
        requestId: request.id,
    });
}
//# sourceMappingURL=list-sites.handler.js.map