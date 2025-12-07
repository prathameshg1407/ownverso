"use strict";
/**
 * Response Schemas
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptySuccessResponseSchema = exports.MessageResponseSchema = exports.ValidationErrorResponseSchema = exports.ValidationErrorFieldSchema = exports.ErrorResponseSchema = exports.ErrorDetailSchema = exports.SuccessResponseSchema = void 0;
exports.createSuccessResponseSchema = createSuccessResponseSchema;
const typebox_1 = require("@sinclair/typebox");
/**
 * Timestamp schema (reusable)
 */
const TimestampSchema = typebox_1.Type.String({ format: 'date-time' });
/**
 * Request ID schema (reusable)
 */
const RequestIdSchema = typebox_1.Type.Optional(typebox_1.Type.String());
/**
 * Base success response schema
 */
exports.SuccessResponseSchema = typebox_1.Type.Object({
    success: typebox_1.Type.Literal(true),
    timestamp: TimestampSchema,
    requestId: RequestIdSchema,
});
/**
 * Create success response schema with data
 */
function createSuccessResponseSchema(dataSchema) {
    return typebox_1.Type.Object({
        success: typebox_1.Type.Literal(true),
        data: dataSchema,
        timestamp: TimestampSchema,
        requestId: RequestIdSchema,
    });
}
/**
 * Error detail schema
 */
exports.ErrorDetailSchema = typebox_1.Type.Object({
    code: typebox_1.Type.String({ description: 'Error code' }),
    message: typebox_1.Type.String({ description: 'Error message' }),
    statusCode: typebox_1.Type.Integer({ description: 'HTTP status code' }),
    details: typebox_1.Type.Optional(typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Unknown())),
});
/**
 * Error response schema
 */
exports.ErrorResponseSchema = typebox_1.Type.Object({
    success: typebox_1.Type.Literal(false),
    error: exports.ErrorDetailSchema,
    timestamp: TimestampSchema,
    requestId: RequestIdSchema,
});
/**
 * Validation error field schema
 */
exports.ValidationErrorFieldSchema = typebox_1.Type.Object({
    field: typebox_1.Type.String({ description: 'Field name' }),
    message: typebox_1.Type.String({ description: 'Validation error message' }),
    value: typebox_1.Type.Optional(typebox_1.Type.Unknown({ description: 'Invalid value' })),
});
/**
 * Validation error response schema
 */
exports.ValidationErrorResponseSchema = typebox_1.Type.Object({
    success: typebox_1.Type.Literal(false),
    error: typebox_1.Type.Object({
        code: typebox_1.Type.Literal('GEN_VALIDATION_ERROR'),
        message: typebox_1.Type.String(),
        statusCode: typebox_1.Type.Literal(422),
        details: typebox_1.Type.Object({
            errors: typebox_1.Type.Array(exports.ValidationErrorFieldSchema),
        }),
    }),
    timestamp: TimestampSchema,
    requestId: RequestIdSchema,
});
/**
 * Message response schema (for simple success messages)
 */
exports.MessageResponseSchema = typebox_1.Type.Object({
    success: typebox_1.Type.Literal(true),
    message: typebox_1.Type.String(),
    timestamp: TimestampSchema,
    requestId: RequestIdSchema,
});
/**
 * Empty success response (for DELETE operations)
 */
exports.EmptySuccessResponseSchema = typebox_1.Type.Object({
    success: typebox_1.Type.Literal(true),
    timestamp: TimestampSchema,
    requestId: RequestIdSchema,
});
//# sourceMappingURL=response.schema.js.map