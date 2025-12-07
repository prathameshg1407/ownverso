"use strict";
// ==== FILE: src/api/v1/author/guards/author.guard.ts ====
/**
 * Author Guards
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthorAccount = void 0;
const http_errors_1 = require("../../../../common/errors/http.errors");
const error_codes_constants_1 = require("../../../../common/constants/error-codes.constants");
const services_1 = require("../../../../domain/authors/services");
/**
 * Require user to be an author
 */
const requireAuthorAccount = async (request) => {
    if (!request.user) {
        throw new http_errors_1.ForbiddenError('Authentication required', error_codes_constants_1.ERROR_CODES.AUTH_REQUIRED);
    }
    const isAuthor = await services_1.authorService.isAuthor(request.user.id);
    if (!isAuthor) {
        throw new http_errors_1.ForbiddenError('Author account required. Please register as an author first.', error_codes_constants_1.ERROR_CODES.AUTHOR_NOT_FOUND);
    }
};
exports.requireAuthorAccount = requireAuthorAccount;
//# sourceMappingURL=author.guard.js.map