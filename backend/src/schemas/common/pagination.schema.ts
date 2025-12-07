/**
 * Pagination Schemas
 */

import { Type, Static, TSchema } from '@sinclair/typebox';
import { PAGINATION } from '@/common/constants/app.constants';

/**
 * Sort order enum
 */
export const SortOrderSchema = Type.Union([
  Type.Literal('asc'),
  Type.Literal('desc'),
]);

export type SortOrder = Static<typeof SortOrderSchema>;

/**
 * Pagination query schema
 */
export const PaginationQuerySchema = Type.Object({
  page: Type.Optional(
    Type.Integer({
      minimum: 1,
      default: PAGINATION.DEFAULT_PAGE,
      description: 'Page number (1-indexed)',
    })
  ),
  limit: Type.Optional(
    Type.Integer({
      minimum: PAGINATION.MIN_LIMIT,
      maximum: PAGINATION.MAX_LIMIT,
      default: PAGINATION.DEFAULT_LIMIT,
      description: 'Number of items per page',
    })
  ),
  sortBy: Type.Optional(
    Type.String({
      description: 'Field to sort by',
    })
  ),
  sortOrder: Type.Optional(
    Type.Union([Type.Literal('asc'), Type.Literal('desc')], {
      default: 'desc',
      description: 'Sort order',
    })
  ),
});

export type PaginationQuery = Static<typeof PaginationQuerySchema>;

/**
 * Pagination meta schema
 */
export const PaginationMetaSchema = Type.Object({
  page: Type.Integer({ description: 'Current page number' }),
  limit: Type.Integer({ description: 'Items per page' }),
  totalItems: Type.Integer({ description: 'Total number of items' }),
  totalPages: Type.Integer({ description: 'Total number of pages' }),
  hasNextPage: Type.Boolean({ description: 'Whether there is a next page' }),
  hasPreviousPage: Type.Boolean({ description: 'Whether there is a previous page' }),
});

export type PaginationMeta = Static<typeof PaginationMetaSchema>;

/**
 * Create paginated response schema
 */
export function createPaginatedResponseSchema<T extends TSchema>(itemSchema: T) {
  return Type.Object({
    success: Type.Literal(true),
    data: Type.Array(itemSchema),
    meta: PaginationMetaSchema,
    timestamp: Type.String({ format: 'date-time' }),
    requestId: Type.Optional(Type.String()),
  });
}

/**
 * Infer paginated response type
 */
export type PaginatedResponse<T> = {
  success: true;
  data: T[];
  meta: PaginationMeta;
  timestamp: string;
  requestId?: string;
};