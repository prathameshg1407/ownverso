"use strict";
// ==== FILE: src/api/v1/auth/handlers/password.handlers.ts ====
/**
 * Password Handlers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordHandler = forgotPasswordHandler;
exports.resetPasswordHandler = resetPasswordHandler;
exports.changePasswordHandler = changePasswordHandler;
exports.checkPasswordStrengthHandler = checkPasswordStrengthHandler;
const services_1 = require("../../../../domain/auth/services");
const repositories_1 = require("../../../../domain/auth/repositories");
const utils_1 = require("../utils");
async function forgotPasswordHandler(request, reply) {
    await services_1.passwordDomainService.requestReset(request.body.email, request.ip);
    (0, utils_1.sendMessage)(reply, request, 'If an account exists with this email, a password reset link has been sent.');
}
async function resetPasswordHandler(request, reply) {
    await services_1.passwordDomainService.resetPassword(request.body.token, request.body.newPassword, request.ip);
    (0, utils_1.sendMessage)(reply, request, 'Password reset successfully. Please login with your new password.');
}
async function changePasswordHandler(request, reply) {
    const [userId, currentSessionId] = await Promise.all([
        Promise.resolve((0, utils_1.getUserId)(request)),
        (0, utils_1.getCurrentSessionId)(request, repositories_1.sessionRepository.findByTokenHash),
    ]);
    await services_1.passwordDomainService.changePassword(userId, request.body.currentPassword, request.body.newPassword, currentSessionId);
    (0, utils_1.sendMessage)(reply, request, 'Password changed successfully.');
}
async function checkPasswordStrengthHandler(request, reply) {
    const strength = services_1.passwordDomainService.checkStrength(request.query.password);
    (0, utils_1.sendSuccess)(reply, request, strength);
}
//# sourceMappingURL=password.handlers.js.map