/**
 * Validation Error
 *
 * Error class for request validation failures.
 */
import { BaseError, ErrorDetails } from './base.error';
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
export declare class ValidationError extends BaseError {
    readonly errors: ValidationErrorField[];
    constructor(errors: ValidationErrorField[], message?: string);
    /**
     * Create validation error from Zod error
     */
    static fromZodError(zodError: {
        issues: Array<{
            path: (string | number)[];
            message: string;
        }>;
    }): ValidationError;
    /**
     * Create validation error from AJV errors
     */
    static fromAjvErrors(ajvErrors: Array<{
        instancePath: string;
        message?: string;
        params?: Record<string, unknown>;
    }>): ValidationError;
    /**
     * Create single field validation error
     */
    static field(field: string, message: string, value?: unknown): ValidationError;
}
//# sourceMappingURL=validation.error.d.ts.map