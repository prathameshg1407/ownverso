"use strict";
/**
 * Pagination Schemas
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationMetaSchema = exports.PaginationQuerySchema = exports.SortOrderSchema = void 0;
exports.createPaginatedResponseSchema = createPaginatedResponseSchema;
const typebox_1 = require("@sinclair/typebox");
const app_constants_1 = require("../../common/constants/app.constants");
/**
 * Sort order enum
 */
exports.SortOrderSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('asc'),
    typebox_1.Type.Literal('desc'),
]);
/**
 * Pagination query schema
 */
exports.PaginationQuerySchema = typebox_1.Type.Object({
    page: typebox_1.Type.Optional(typebox_1.Type.Integer({
        minimum: 1,
        default: app_constants_1.PAGINATION.DEFAULT_PAGE,
        description: 'Page number (1-indexed)',
    })),
    limit: typebox_1.Type.Optional(typebox_1.Type.Integer({
        minimum: app_constants_1.PAGINATION.MIN_LIMIT,
        maximum: app_constants_1.PAGINATION.MAX_LIMIT,
        default: app_constants_1.PAGINATION.DEFAULT_LIMIT,
        description: 'Number of items per page',
    })),
    sortBy: typebox_1.Type.Optional(typebox_1.Type.String({
        description: 'Field to sort by',
    })),
    sortOrder: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Literal('asc'), typebox_1.Type.Literal('desc')], {
        default: 'desc',
        description: 'Sort order',
    })),
});
/**
 * Pagination meta schema
 */
exports.PaginationMetaSchema = typebox_1.Type.Object({
    page: typebox_1.Type.Integer({ description: 'Current page number' }),
    limit: typebox_1.Type.Integer({ description: 'Items per page' }),
    totalItems: typebox_1.Type.Integer({ description: 'Total number of items' }),
    totalPages: typebox_1.Type.Integer({ description: 'Total number of pages' }),
    hasNextPage: typebox_1.Type.Boolean({ description: 'Whether there is a next page' }),
    hasPreviousPage: typebox_1.Type.Boolean({ description: 'Whether there is a previous page' }),
});
/**
 * Create paginated response schema
 */
function createPaginatedResponseSchema(itemSchema) {
    return typebox_1.Type.Object({
        success: typebox_1.Type.Literal(true),
        data: typebox_1.Type.Array(itemSchema),
        meta: exports.PaginationMetaSchema,
        timestamp: typebox_1.Type.String({ format: 'date-time' }),
        requestId: typebox_1.Type.Optional(typebox_1.Type.String()),
    });
}
//# sourceMappingURL=pagination.schema.js.map