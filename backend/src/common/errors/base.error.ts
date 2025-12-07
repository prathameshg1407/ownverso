/**
 * Base Error Class
 *
 * Foundation for all custom application errors.
 */

import { ERROR_CODES, ErrorCode } from '@/common/constants/error-codes.constants';
import { HTTP_STATUS } from '@/common/constants/http-status.constants';

export interface ErrorDetails {
  [key: string]: unknown;
}

export interface SerializedError {
  success: false;
  error: {
    code: string;
    message: string;
    statusCode: number;
    details?: ErrorDetails;
    stack?: string;
  };
  timestamp: string;
  requestId?: string;
}

/**
 * Base error class for all application errors
 */
export class BaseError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: ErrorDetails;
  public readonly isOperational: boolean;
  public readonly timestamp: Date;

  constructor(
    message: string,
    code: ErrorCode = ERROR_CODES.INTERNAL_ERROR,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    details?: ErrorDetails,
    isOperational: boolean = true
  ) {
    super(message);

    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = isOperational;
    this.timestamp = new Date();

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Serialize error for API response
   */
  serialize(requestId?: string, includeStack: boolean = false): SerializedError {
    return {
      success: false,
      error: {
        code: this.code,
        message: this.message,
        statusCode: this.statusCode,
        details: this.details,
        ...(includeStack && { stack: this.stack }),
      },
      timestamp: this.timestamp.toISOString(),
      ...(requestId && { requestId }),
    };
  }

  /**
   * Convert error to JSON
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
      timestamp: this.timestamp.toISOString(),
    };
  }
}