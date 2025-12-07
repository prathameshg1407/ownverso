/**
 * Response Utilities
 */

import type { FastifyRequest, FastifyReply } from 'fastify';

export interface SuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
  requestId: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> extends SuccessResponse<T[]> {
  meta: PaginationMeta;
}

function createSuccessResponse<T>(request: FastifyRequest, data: T): SuccessResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
    requestId: request.id,
  };
}

function createPaginationMeta(page: number, limit: number, total: number): PaginationMeta {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

/**
 * Send standard success response
 */
export function sendSuccess<T>(
  reply: FastifyReply,
  request: FastifyRequest,
  data: T,
  statusCode = 200,
): void {
  reply.status(statusCode).send(createSuccessResponse(request, data));
}

/**
 * Send message-only success response
 */
export function sendMessage(
  reply: FastifyReply,
  request: FastifyRequest,
  message: string,
  statusCode = 200,
): void {
  sendSuccess(reply, request, { message }, statusCode);
}

/**
 * Send paginated response
 */
export function sendPaginated<T>(
  reply: FastifyReply,
  request: FastifyRequest,
  data: T[],
  page: number,
  limit: number,
  total: number,
  statusCode = 200,
): void {
  const response: PaginatedResponse<T> = {
    ...createSuccessResponse(request, data),
    meta: createPaginationMeta(page, limit, total),
  };

  reply.status(statusCode).send(response);
}

/**
 * Send 204 No Content response
 */
export function sendNoContent(reply: FastifyReply): void {
  reply.status(204).send();
}