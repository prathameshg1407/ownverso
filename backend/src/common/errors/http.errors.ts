/**
 * HTTP Errors
 *
 * Standard HTTP error classes for API responses.
 */

import { BaseError, ErrorDetails } from './base.error';
import { ERROR_CODES, ErrorCode } from '@/common/constants/error-codes.constants';
import { HTTP_STATUS } from '@/common/constants/http-status.constants';

/**
 * Generic HTTP Error
 */
export class HttpError extends BaseError {
  constructor(
    message: string,
    statusCode: number,
    code?: ErrorCode,
    details?: ErrorDetails
  ) {
    super(message, code || ERROR_CODES.INTERNAL_ERROR, statusCode, details);
  }
}

/**
 * 400 Bad Request
 */
export class BadRequestError extends BaseError {
  constructor(
    message: string = 'Bad Request',
    code: ErrorCode = ERROR_CODES.BAD_REQUEST,
    details?: ErrorDetails
  ) {
    super(message, code, HTTP_STATUS.BAD_REQUEST, details);
  }
}

/**
 * 401 Unauthorized
 */
export class UnauthorizedError extends BaseError {
  constructor(
    message: string = 'Unauthorized',
    code: ErrorCode = ERROR_CODES.AUTH_REQUIRED,
    details?: ErrorDetails
  ) {
    super(message, code, HTTP_STATUS.UNAUTHORIZED, details);
  }
}

/**
 * 403 Forbidden
 */
export class ForbiddenError extends BaseError {
  constructor(
    message: string = 'Forbidden',
    code: ErrorCode = ERROR_CODES.FORBIDDEN,
    details?: ErrorDetails
  ) {
    super(message, code, HTTP_STATUS.FORBIDDEN, details);
  }
}

/**
 * 404 Not Found
 */
export class NotFoundError extends BaseError {
  constructor(
    message: string = 'Resource not found',
    code: ErrorCode = ERROR_CODES.NOT_FOUND,
    details?: ErrorDetails
  ) {
    super(message, code, HTTP_STATUS.NOT_FOUND, details);
  }
}

/**
 * 409 Conflict
 */
export class ConflictError extends BaseError {
  constructor(
    message: string = 'Conflict',
    code: ErrorCode = ERROR_CODES.CONFLICT,
    details?: ErrorDetails
  ) {
    super(message, code, HTTP_STATUS.CONFLICT, details);
  }
}

/**
 * 422 Unprocessable Entity
 */
export class UnprocessableEntityError extends BaseError {
  constructor(
    message: string = 'Unprocessable Entity',
    code: ErrorCode = ERROR_CODES.VALIDATION_ERROR,
    details?: ErrorDetails
  ) {
    super(message, code, HTTP_STATUS.UNPROCESSABLE_ENTITY, details);
  }
}

/**
 * 429 Too Many Requests
 */
export class TooManyRequestsError extends BaseError {
  public readonly retryAfter?: number;

  constructor(
    message: string = 'Too many requests',
    retryAfter?: number,
    details?: ErrorDetails
  ) {
    super(message, ERROR_CODES.RATE_LIMITED, HTTP_STATUS.TOO_MANY_REQUESTS, details);
    this.retryAfter = retryAfter;
  }
}

/**
 * 500 Internal Server Error
 */
export class InternalServerError extends BaseError {
  constructor(
    message: string = 'Internal Server Error',
    code: ErrorCode = ERROR_CODES.INTERNAL_ERROR,
    details?: ErrorDetails
  ) {
    super(message, code, HTTP_STATUS.INTERNAL_SERVER_ERROR, details, false);
  }
}

/**
 * 503 Service Unavailable
 */
export class ServiceUnavailableError extends BaseError {
  constructor(
    message: string = 'Service Unavailable',
    code: ErrorCode = ERROR_CODES.SERVICE_UNAVAILABLE,
    details?: ErrorDetails
  ) {
    super(message, code, HTTP_STATUS.SERVICE_UNAVAILABLE, details);
  }
}