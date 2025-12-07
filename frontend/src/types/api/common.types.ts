/**
 * Common API Types
 */

// ─────────────────────────────────────────────────────────────────────────────
// Response Types
// ─────────────────────────────────────────────────────────────────────────────

export interface SuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
  requestId: string;
}

export interface ErrorDetail {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, unknown>;
}

export interface ErrorResponse {
  success: false;
  error: ErrorDetail;
  timestamp: string;
  requestId: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// ─────────────────────────────────────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────────────────────────────────────

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  meta: PaginationMeta;
  timestamp: string;
  requestId: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ─────────────────────────────────────────────────────────────────────────────
// Common Data Types
// ─────────────────────────────────────────────────────────────────────────────

export interface MessageData {
  message: string;
}

export type MessageResponse = SuccessResponse<MessageData>;

export interface ValidationErrorField {
  field: string;
  message: string;
  value?: unknown;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  checks?: Record<string, { status: 'up' | 'down'; latency?: number; message?: string }>;
}