/**
 * Response Schemas
 */

import { Type, Static, TSchema } from '@sinclair/typebox';

/**
 * Timestamp schema (reusable)
 */
const TimestampSchema = Type.String({ format: 'date-time' });

/**
 * Request ID schema (reusable)
 */
const RequestIdSchema = Type.Optional(Type.String());

/**
 * Base success response schema
 */
export const SuccessResponseSchema = Type.Object({
  success: Type.Literal(true),
  timestamp: TimestampSchema,
  requestId: RequestIdSchema,
});

export type SuccessResponse = Static<typeof SuccessResponseSchema>;

/**
 * Create success response schema with data
 */
export function createSuccessResponseSchema<T extends TSchema>(dataSchema: T) {
  return Type.Object({
    success: Type.Literal(true),
    data: dataSchema,
    timestamp: TimestampSchema,
    requestId: RequestIdSchema,
  });
}

/**
 * Infer success response type with data
 */
export type SuccessResponseWithData<T> = {
  success: true;
  data: T;
  timestamp: string;
  requestId?: string;
};

/**
 * Error detail schema
 */
export const ErrorDetailSchema = Type.Object({
  code: Type.String({ description: 'Error code' }),
  message: Type.String({ description: 'Error message' }),
  statusCode: Type.Integer({ description: 'HTTP status code' }),
  details: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
});

export type ErrorDetail = Static<typeof ErrorDetailSchema>;

/**
 * Error response schema
 */
export const ErrorResponseSchema = Type.Object({
  success: Type.Literal(false),
  error: ErrorDetailSchema,
  timestamp: TimestampSchema,
  requestId: RequestIdSchema,
});

export type ErrorResponse = Static<typeof ErrorResponseSchema>;

/**
 * Validation error field schema
 */
export const ValidationErrorFieldSchema = Type.Object({
  field: Type.String({ description: 'Field name' }),
  message: Type.String({ description: 'Validation error message' }),
  value: Type.Optional(Type.Unknown({ description: 'Invalid value' })),
});

export type ValidationErrorField = Static<typeof ValidationErrorFieldSchema>;

/**
 * Validation error response schema
 */
export const ValidationErrorResponseSchema = Type.Object({
  success: Type.Literal(false),
  error: Type.Object({
    code: Type.Literal('GEN_VALIDATION_ERROR'),
    message: Type.String(),
    statusCode: Type.Literal(422),
    details: Type.Object({
      errors: Type.Array(ValidationErrorFieldSchema),
    }),
  }),
  timestamp: TimestampSchema,
  requestId: RequestIdSchema,
});

export type ValidationErrorResponse = Static<typeof ValidationErrorResponseSchema>;

/**
 * Message response schema (for simple success messages)
 */
export const MessageResponseSchema = Type.Object({
  success: Type.Literal(true),
  message: Type.String(),
  timestamp: TimestampSchema,
  requestId: RequestIdSchema,
});

export type MessageResponse = Static<typeof MessageResponseSchema>;

/**
 * Empty success response (for DELETE operations)
 */
export const EmptySuccessResponseSchema = Type.Object({
  success: Type.Literal(true),
  timestamp: TimestampSchema,
  requestId: RequestIdSchema,
});

export type EmptySuccessResponse = Static<typeof EmptySuccessResponseSchema>;