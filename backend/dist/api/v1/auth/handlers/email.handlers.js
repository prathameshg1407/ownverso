"use strict";
// ==== FILE: src/api/v1/auth/handlers/email.handlers.ts ====
/**
 * Email Handlers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailHandler = verifyEmailHandler;
exports.resendVerificationHandler = resendVerificationHandler;
exports.requestEmailChangeHandler = requestEmailChangeHandler;
exports.confirmEmailChangeHandler = confirmEmailChangeHandler;
const services_1 = require("../../../../domain/auth/services");
const utils_1 = require("../utils");
async function verifyEmailHandler(request, reply) {
    await services_1.emailVerificationService.verifyEmail(request.body.token, request.ip);
    (0, utils_1.sendMessage)(reply, request, 'Email verified successfully.');
}
async function resendVerificationHandler(request, reply) {
    await services_1.emailVerificationService.resendVerification((0, utils_1.getUserId)(request), request.ip);
    (0, utils_1.sendMessage)(reply, request, 'Verification email has been sent.');
}
async function requestEmailChangeHandler(request, reply) {
    await services_1.emailVerificationService.requestEmailChange((0, utils_1.getUserId)(request), request.body.newEmail, request.ip);
    (0, utils_1.sendMessage)(reply, request, 'Email change verification has been sent to the new email address.');
}
async function confirmEmailChangeHandler(request, reply) {
    const result = await services_1.emailVerificationService.confirmEmailChange(request.body.token, request.ip);
    (0, utils_1.sendSuccess)(reply, request, result);
}
//# sourceMappingURL=email.handlers.js.map