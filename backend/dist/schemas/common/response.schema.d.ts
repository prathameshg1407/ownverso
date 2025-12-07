/**
 * Response Schemas
 */
import { Static, TSchema } from '@sinclair/typebox';
/**
 * Base success response schema
 */
export declare const SuccessResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type SuccessResponse = Static<typeof SuccessResponseSchema>;
/**
 * Create success response schema with data
 */
export declare function createSuccessResponseSchema<T extends TSchema>(dataSchema: T): import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: T;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
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
export declare const ErrorDetailSchema: import("@sinclair/typebox").TObject<{
    code: import("@sinclair/typebox").TString;
    message: import("@sinclair/typebox").TString;
    statusCode: import("@sinclair/typebox").TInteger;
    details: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TUnknown>>;
}>;
export type ErrorDetail = Static<typeof ErrorDetailSchema>;
/**
 * Error response schema
 */
export declare const ErrorResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<false>;
    error: import("@sinclair/typebox").TObject<{
        code: import("@sinclair/typebox").TString;
        message: import("@sinclair/typebox").TString;
        statusCode: import("@sinclair/typebox").TInteger;
        details: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TUnknown>>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ErrorResponse = Static<typeof ErrorResponseSchema>;
/**
 * Validation error field schema
 */
export declare const ValidationErrorFieldSchema: import("@sinclair/typebox").TObject<{
    field: import("@sinclair/typebox").TString;
    message: import("@sinclair/typebox").TString;
    value: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnknown>;
}>;
export type ValidationErrorField = Static<typeof ValidationErrorFieldSchema>;
/**
 * Validation error response schema
 */
export declare const ValidationErrorResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<false>;
    error: import("@sinclair/typebox").TObject<{
        code: import("@sinclair/typebox").TLiteral<"GEN_VALIDATION_ERROR">;
        message: import("@sinclair/typebox").TString;
        statusCode: import("@sinclair/typebox").TLiteral<422>;
        details: import("@sinclair/typebox").TObject<{
            errors: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                field: import("@sinclair/typebox").TString;
                message: import("@sinclair/typebox").TString;
                value: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnknown>;
            }>>;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ValidationErrorResponse = Static<typeof ValidationErrorResponseSchema>;
/**
 * Message response schema (for simple success messages)
 */
export declare const MessageResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    message: import("@sinclair/typebox").TString;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type MessageResponse = Static<typeof MessageResponseSchema>;
/**
 * Empty success response (for DELETE operations)
 */
export declare const EmptySuccessResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type EmptySuccessResponse = Static<typeof EmptySuccessResponseSchema>;
//# sourceMappingURL=response.schema.d.ts.map