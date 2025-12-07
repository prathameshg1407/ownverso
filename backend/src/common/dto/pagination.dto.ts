/**
 * Pagination DTOs
 */

import { PAGINATION } from '@/common/constants/app.constants';

/**
 * Pagination query parameters
 */
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Validated pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

/**
 * Pagination metadata in response
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  meta: PaginationMeta;
}

/**
 * Parse and validate pagination query
 */
export function parsePaginationQuery(
  query: PaginationQuery,
  defaultSortBy: string = 'createdAt'
): PaginationParams {
  let page = Number(query.page) || PAGINATION.DEFAULT_PAGE;
  let limit = Number(query.limit) || PAGINATION.DEFAULT_LIMIT;

  // Ensure valid bounds
  page = Math.max(1, page);
  limit = Math.min(Math.max(PAGINATION.MIN_LIMIT, limit), PAGINATION.MAX_LIMIT);

  const skip = (page - 1) * limit;
  const sortBy = query.sortBy || defaultSortBy;
  const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';

  return { page, limit, skip, sortBy, sortOrder };
}

/**
 * Create pagination metadata
 */
export function createPaginationMeta(
  page: number,
  limit: number,
  totalItems: number
): PaginationMeta {
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
export function createPaginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  totalItems: number
): PaginatedResponse<T> {
  return {
    success: true,
    data,
    meta: createPaginationMeta(page, limit, totalItems),
  };
}