"use strict";
/**
 * User Repositories Index
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.readerProfileRepository = exports.userSecurityRepository = exports.userPreferencesRepository = exports.userProfileRepository = exports.userRepository = void 0;
var user_repository_1 = require("./user.repository");
Object.defineProperty(exports, "userRepository", { enumerable: true, get: function () { return user_repository_1.userRepository; } });
var user_profile_repository_1 = require("./user-profile.repository");
Object.defineProperty(exports, "userProfileRepository", { enumerable: true, get: function () { return user_profile_repository_1.userProfileRepository; } });
var user_preferences_repository_1 = require("./user-preferences.repository");
Object.defineProperty(exports, "userPreferencesRepository", { enumerable: true, get: function () { return user_preferences_repository_1.userPreferencesRepository; } });
var user_security_repository_1 = require("./user-security.repository");
Object.defineProperty(exports, "userSecurityRepository", { enumerable: true, get: function () { return user_security_repository_1.userSecurityRepository; } });
var reader_profile_repository_1 = require("./reader-profile.repository");
Object.defineProperty(exports, "readerProfileRepository", { enumerable: true, get: function () { return reader_profile_repository_1.readerProfileRepository; } });
//# sourceMappingURL=index.js.map