"use strict";
/**
 * Validation Error
 *
 * Error class for request validation failures.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const base_error_1 = require("./base.error");
const error_codes_constants_1 = require("../../common/constants/error-codes.constants");
const http_status_constants_1 = require("../../common/constants/http-status.constants");
/**
 * Validation error for request validation failures
 */
class ValidationError extends base_error_1.BaseError {
    errors;
    constructor(errors, message = 'Validation failed') {
        const details = { errors };
        super(message, error_codes_constants_1.ERROR_CODES.VALIDATION_ERROR, http_status_constants_1.HTTP_STATUS.UNPROCESSABLE_ENTITY, details);
        this.errors = errors;
    }
    /**
     * Create validation error from Zod error
     */
    static fromZodError(zodError) {
        const errors = zodError.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
        }));
        return new ValidationError(errors);
    }
    /**
     * Create validation error from AJV errors
     */
    static fromAjvErrors(ajvErrors) {
        const errors = ajvErrors.map((error) => ({
            field: error.instancePath.replace(/^\//, '').replace(/\//g, '.') || 'root',
            message: error.message || 'Invalid value',
            constraint: error.params ? JSON.stringify(error.params) : undefined,
        }));
        return new ValidationError(errors);
    }
    /**
     * Create single field validation error
     */
    static field(field, message, value) {
        return new ValidationError([{ field, message, value }]);
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=validation.error.js.map