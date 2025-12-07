/**
 * Validation Error
 *
 * Error class for request validation failures.
 */

import { BaseError, ErrorDetails } from './base.error';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';
import { HTTP_STATUS } from '@/common/constants/http-status.constants';

export interface ValidationErrorField {
  field: string;
  message: string;
  value?: unknown;
  constraint?: string;
}

export interface ValidationErrorDetails extends ErrorDetails {
  errors: ValidationErrorField[];
}

/**
 * Validation error for request validation failures
 */
export class ValidationError extends BaseError {
  public readonly errors: ValidationErrorField[];

  constructor(
    errors: ValidationErrorField[],
    message: string = 'Validation failed'
  ) {
    const details: ValidationErrorDetails = { errors };
    super(
      message,
      ERROR_CODES.VALIDATION_ERROR,
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      details
    );
    this.errors = errors;
  }

  /**
   * Create validation error from Zod error
   */
  static fromZodError(zodError: { issues: Array<{ path: (string | number)[]; message: string }> }): ValidationError {
    const errors: ValidationErrorField[] = zodError.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return new ValidationError(errors);
  }

  /**
   * Create validation error from AJV errors
   */
  static fromAjvErrors(
    ajvErrors: Array<{ instancePath: string; message?: string; params?: Record<string, unknown> }>
  ): ValidationError {
    const errors: ValidationErrorField[] = ajvErrors.map((error) => ({
      field: error.instancePath.replace(/^\//, '').replace(/\//g, '.') || 'root',
      message: error.message || 'Invalid value',
      constraint: error.params ? JSON.stringify(error.params) : undefined,
    }));
    return new ValidationError(errors);
  }

  /**
   * Create single field validation error
   */
  static field(field: string, message: string, value?: unknown): ValidationError {
    return new ValidationError([{ field, message, value }]);
  }
}