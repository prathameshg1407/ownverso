"use strict";
// ==== FILE: src/api/v1/auth/guards/email-verified.guard.ts ====
/**
 * Email Verification Guard
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireEmailVerified = void 0;
const http_errors_1 = require("../../../../common/errors/http.errors");
const error_codes_constants_1 = require("../../../../common/constants/error-codes.constants");
const requireEmailVerified = async (request) => {
    if (!request.user) {
        throw new http_errors_1.ForbiddenError('Authentication required', error_codes_constants_1.ERROR_CODES.AUTH_REQUIRED);
    }
    if (!request.user.emailVerified) {
        throw new http_errors_1.ForbiddenError('Email verification required', error_codes_constants_1.ERROR_CODES.AUTH_EMAIL_NOT_VERIFIED, { email: request.user.email });
    }
};
exports.requireEmailVerified = requireEmailVerified;
//# sourceMappingURL=email-verified.guard.js.map