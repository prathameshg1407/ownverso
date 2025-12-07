"use strict";
// ==== FILE: src/api/v1/admin/authors/handlers/list-authors.handler.ts ====
/**
 * Admin List Authors Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAuthorsHandler = listAuthorsHandler;
const repositories_1 = require("../../../../../domain/authors/repositories");
const mappers_1 = require("../../../../../domain/authors/mappers");
const pagination_dto_1 = require("../../../../../common/dto/pagination.dto");
async function listAuthorsHandler(request, reply) {
    const { page = 1, limit = 20, ...filters } = request.query;
    const { accounts, total } = await repositories_1.authorAccountRepository.findMany({
        page,
        limit,
        ...filters,
    });
    const data = accounts.map((account) => mappers_1.adminAuthorMapper.toSummaryDTO(account));
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
//# sourceMappingURL=list-authors.handler.js.map