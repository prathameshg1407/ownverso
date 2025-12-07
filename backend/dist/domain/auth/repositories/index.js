"use strict";
// ==== FILE: src/domain/auth/repositories/index.ts ====
/**
 * Auth Repositories Index
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAccountRepository = exports.sessionRepository = void 0;
var session_repository_1 = require("./session.repository");
Object.defineProperty(exports, "sessionRepository", { enumerable: true, get: function () { return session_repository_1.sessionRepository; } });
var auth_account_repository_1 = require("./auth-account.repository");
Object.defineProperty(exports, "authAccountRepository", { enumerable: true, get: function () { return auth_account_repository_1.authAccountRepository; } });
//# sourceMappingURL=index.js.map