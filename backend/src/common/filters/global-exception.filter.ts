/**
 * Global Exception Filter
 *
 * Handles all uncaught errors and formats consistent error responses.
 */

import { FastifyError, FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

import { BaseError, SerializedError } from '@/common/errors/base.error';
import { ValidationError } from '@/common/errors/validation.error';
import { InternalServerError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';
import { HTTP_STATUS } from '@/common/constants/http-status.constants';
import { logger } from '@/core/logger';
import { appConfig } from '@/config/app.config';

/**
 * Interface for Prisma known request errors (duck typing)
 */
interface PrismaKnownRequestError extends Error {
  code: string;
  meta?: Record<string, unknown>;
  clientVersion?: string;
}

/**
 * Global exception handler for Fastify
 */
export function globalExceptionFilter(
   this: FastifyInstance, 
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
): void {
  const requestId = request.id;
  const includeStack = appConfig.isDevelopment;

  // Log the error
  logError(error, request);

  // Handle different error types
  let response: SerializedError;

  if (error instanceof BaseError) {
    // Custom application error
    response = error.serialize(requestId, includeStack);
  } else if (isValidationError(error)) {
    // Fastify/AJV validation error
    const validationError = handleValidationError(error);
    response = validationError.serialize(requestId, includeStack);
  } else if (isPrismaError(error)) {
    // Prisma database error
    const prismaError = handlePrismaError(error);
    response = prismaError.serialize(requestId, includeStack);
  } else if (isFastifyError(error)) {
    // Fastify framework error
    const fastifyError = handleFastifyError(error);
    response = fastifyError.serialize(requestId, includeStack);
  } else {
    // Unknown error - wrap in InternalServerError
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    const internalError = new InternalServerError(
      appConfig.isProduction ? 'An unexpected error occurred' : errorMessage
    );
    response = internalError.serialize(requestId, includeStack);
  }

  // Send response
  reply.status(response.error.statusCode).send(response);
}

/**
 * Log error with context
 */
function logError(error: Error, request: FastifyRequest): void {
  const errorContext = {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    request: {
      id: request.id,
      method: request.method,
      url: request.url,
      ip: request.ip,
      userAgent: request.headers['user-agent'],
    },
  };

  if (error instanceof BaseError && error.isOperational) {
    logger.warn(errorContext, `Operational error: ${error.message}`);
  } else {
    logger.error(errorContext, `Unexpected error: ${error.message}`);
  }
}

/**
 * Check if error is a validation error
 */
function isValidationError(error: unknown): error is FastifyError & { validation: unknown[] } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'validation' in error &&
    Array.isArray((error as Record<string, unknown>).validation)
  );
}

/**
 * Handle validation errors
 */
function handleValidationError(error: FastifyError & { validation: unknown[] }): ValidationError {
  const errors = (error.validation || []).map((err: unknown) => {
    const validationErr = err as { instancePath?: string; message?: string; params?: unknown };
    return {
      field: validationErr.instancePath?.replace(/^\//, '').replace(/\//g, '.') || 'unknown',
      message: validationErr.message || 'Invalid value',
    };
  });
  return new ValidationError(errors, 'Validation failed');
}

/**
 * Check if error is a Prisma error using duck typing
 * This avoids issues with Prisma namespace exports
 */
function isPrismaError(error: unknown): error is PrismaKnownRequestError {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const prismaError = error as Record<string, unknown>;
  
  return (
    typeof prismaError.code === 'string' &&
    prismaError.code.startsWith('P') &&
    'clientVersion' in prismaError
  );
}

/**
 * Handle Prisma errors
 */
function handlePrismaError(error: PrismaKnownRequestError): BaseError {
  switch (error.code) {
    case 'P2002': {
      // Unique constraint violation
      const target = Array.isArray(error.meta?.target)
        ? (error.meta.target as string[]).join(', ')
        : 'field';
      return new BaseError(
        `A record with this ${target} already exists`,
        ERROR_CODES.CONFLICT,
        HTTP_STATUS.CONFLICT,
        { target }
      );
    }
    case 'P2025':
      // Record not found
      return new BaseError(
        'Record not found',
        ERROR_CODES.NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    case 'P2003':
      // Foreign key constraint failed
      return new BaseError(
        'Related record not found',
        ERROR_CODES.BAD_REQUEST,
        HTTP_STATUS.BAD_REQUEST
      );
    case 'P2014':
      // Required relation violation
      return new BaseError(
        'Required relation violation',
        ERROR_CODES.BAD_REQUEST,
        HTTP_STATUS.BAD_REQUEST
      );
    default:
      logger.error({ code: error.code, meta: error.meta }, 'Unhandled Prisma error');
      return new InternalServerError('Database error occurred');
  }
}

/**
 * Check if error is a Fastify error
 */
function isFastifyError(error: unknown): error is FastifyError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    typeof (error as Record<string, unknown>).statusCode === 'number'
  );
}

/**
 * Handle Fastify errors
 */
function handleFastifyError(error: FastifyError): BaseError {
  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  // Map status codes to error codes
  const codeMap: Record<number, string> = {
    400: ERROR_CODES.BAD_REQUEST,
    401: ERROR_CODES.AUTH_REQUIRED,
    403: ERROR_CODES.FORBIDDEN,
    404: ERROR_CODES.NOT_FOUND,
    429: ERROR_CODES.RATE_LIMITED,
  };

  const code = codeMap[statusCode] || ERROR_CODES.INTERNAL_ERROR;

  return new BaseError(
    error.message,
    code as (typeof ERROR_CODES)[keyof typeof ERROR_CODES],
    statusCode
  );
}