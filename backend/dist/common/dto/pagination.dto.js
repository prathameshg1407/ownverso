"use strict";
/**
 * Pagination DTOs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePaginationQuery = parsePaginationQuery;
exports.createPaginationMeta = createPaginationMeta;
exports.createPaginatedResponse = createPaginatedResponse;
const app_constants_1 = require("../../common/constants/app.constants");
/**
 * Parse and validate pagination query
 */
function parsePaginationQuery(query, defaultSortBy = 'createdAt') {
    let page = Number(query.page) || app_constants_1.PAGINATION.DEFAULT_PAGE;
    let limit = Number(query.limit) || app_constants_1.PAGINATION.DEFAULT_LIMIT;
    // Ensure valid bounds
    page = Math.max(1, page);
    limit = Math.min(Math.max(app_constants_1.PAGINATION.MIN_LIMIT, limit), app_constants_1.PAGINATION.MAX_LIMIT);
    const skip = (page - 1) * limit;
    const sortBy = query.sortBy || defaultSortBy;
    const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';
    return { page, limit, skip, sortBy, sortOrder };
}
/**
 * Create pagination metadata
 */
function createPaginationMeta(page, limit, totalItems) {
    const totalPages = Math.ceil(totalItems / limit);
    return {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
    };
}
/**
 * Create paginated response
 */
function createPaginatedResponse(data, page, limit, totalItems) {
    return {
        success: true,
        data,
        meta: createPaginationMeta(page, limit, totalItems),
    };
}
//# sourceMappingURL=pagination.dto.js.map