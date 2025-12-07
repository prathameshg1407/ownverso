"use strict";
/**
 * Errors Module Exports
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.ServiceUnavailableError = exports.InternalServerError = exports.TooManyRequestsError = exports.UnprocessableEntityError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.HttpError = exports.BaseError = void 0;
var base_error_1 = require("./base.error");
Object.defineProperty(exports, "BaseError", { enumerable: true, get: function () { return base_error_1.BaseError; } });
var http_errors_1 = require("./http.errors");
Object.defineProperty(exports, "HttpError", { enumerable: true, get: function () { return http_errors_1.HttpError; } });
Object.defineProperty(exports, "BadRequestError", { enumerable: true, get: function () { return http_errors_1.BadRequestError; } });
Object.defineProperty(exports, "UnauthorizedError", { enumerable: true, get: function () { return http_errors_1.UnauthorizedError; } });
Object.defineProperty(exports, "ForbiddenError", { enumerable: true, get: function () { return http_errors_1.ForbiddenError; } });
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return http_errors_1.NotFoundError; } });
Object.defineProperty(exports, "ConflictError", { enumerable: true, get: function () { return http_errors_1.ConflictError; } });
Object.defineProperty(exports, "UnprocessableEntityError", { enumerable: true, get: function () { return http_errors_1.UnprocessableEntityError; } });
Object.defineProperty(exports, "TooManyRequestsError", { enumerable: true, get: function () { return http_errors_1.TooManyRequestsError; } });
Object.defineProperty(exports, "InternalServerError", { enumerable: true, get: function () { return http_errors_1.InternalServerError; } });
Object.defineProperty(exports, "ServiceUnavailableError", { enumerable: true, get: function () { return http_errors_1.ServiceUnavailableError; } });
var validation_error_1 = require("./validation.error");
Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function () { return validation_error_1.ValidationError; } });
//# sourceMappingURL=index.js.map