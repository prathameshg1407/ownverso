"use strict";
// ==== FILE: src/api/v1/auth/handlers/mfa.handlers.ts ====
/**
 * MFA Handlers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mfaSetupInitHandler = mfaSetupInitHandler;
exports.mfaSetupVerifyHandler = mfaSetupVerifyHandler;
exports.mfaDisableHandler = mfaDisableHandler;
exports.mfaVerifyLoginHandler = mfaVerifyLoginHandler;
exports.mfaStatusHandler = mfaStatusHandler;
exports.mfaRegenerateCodesHandler = mfaRegenerateCodesHandler;
const services_1 = require("../../../../domain/auth/services");
const utils_1 = require("../utils");
async function mfaSetupInitHandler(request, reply) {
    const setup = await services_1.mfaDomainService.initSetup((0, utils_1.getUserId)(request));
    (0, utils_1.sendSuccess)(reply, request, setup);
}
async function mfaSetupVerifyHandler(request, reply) {
    const result = await services_1.mfaDomainService.verifySetup((0, utils_1.getUserId)(request), request.body.code);
    (0, utils_1.sendSuccess)(reply, request, result);
}
async function mfaDisableHandler(request, reply) {
    await services_1.mfaDomainService.disable((0, utils_1.getUserId)(request), request.body.password, request.body.code);
    (0, utils_1.sendMessage)(reply, request, 'Two-factor authentication has been disabled.');
}
async function mfaVerifyLoginHandler(request, reply) {
    const result = await services_1.authService.verifyMfaLogin(request.body.mfaPendingToken, request.body.code);
    (0, utils_1.sendAuthResponse)(reply, request, { user: result.user, tokens: result.tokens, mfaRequired: false });
}
async function mfaStatusHandler(request, reply) {
    const status = await services_1.mfaDomainService.getStatus((0, utils_1.getUserId)(request));
    (0, utils_1.sendSuccess)(reply, request, status);
}
async function mfaRegenerateCodesHandler(request, reply) {
    const backupCodes = await services_1.mfaDomainService.regenerateBackupCodes((0, utils_1.getUserId)(request), request.body.password);
    (0, utils_1.sendSuccess)(reply, request, { backupCodes });
}
//# sourceMappingURL=mfa.handlers.js.map