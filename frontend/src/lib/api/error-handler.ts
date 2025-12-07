/**
 * API Error Handler
 */

import { ApiError } from './client';
import { getErrorMessage } from '@/lib/constants/error-messages';

export interface FormattedError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, unknown>;
}

export function formatError(error: unknown): FormattedError {
  if (error instanceof ApiError) {
    return {
      code: error.code,
      message: getErrorMessage(error.code),
      statusCode: error.statusCode,
      details: error.details,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: error instanceof Error ? error.message : 'An unexpected error occurred.',
    statusCode: 500,
  };
}

export function extractValidationErrors(error: unknown): Record<string, string> | null {
  if (!(error instanceof ApiError) || error.code !== 'GEN_VALIDATION_ERROR') {
    return null;
  }

  const details = error.details as { errors?: Array<{ field: string; message: string }> };
  if (!details?.errors) {
    return null;
  }

  return details.errors.reduce<Record<string, string>>((acc, err) => {
    acc[err.field] = err.message;
    return acc;
  }, {});
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isAuthError(error: unknown): boolean {
  return (
    isApiError(error) &&
    (error.code.startsWith('AUTH_') || [401, 403].includes(error.statusCode))
  );
}

export function isNetworkError(error: unknown): boolean {
  return isApiError(error) && error.code === 'NETWORK_ERROR';
}

export function getUserMessage(error: unknown): string {
  return isApiError(error) ? getErrorMessage(error.code) : 'An unexpected error occurred.';
}