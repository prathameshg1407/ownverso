"use strict";
/**
 * Users Domain - Public API
 *
 * Single entry point for the users domain.
 * All external imports should come through this file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toReaderProfileEntity = exports.toUserPreferencesEntity = exports.toUserProfileEntity = exports.toJwtUser = exports.toSafeUser = exports.USER_LIMITS = exports.USER_DEFAULTS = exports.VALID_LOCALES = exports.RESERVED_USERNAMES = exports.maskIpAddress = exports.maskEmail = exports.isActiveUser = exports.hasMfaEnabled = exports.needsEmailVerification = exports.hasPassword = exports.canUserLogin = exports.profileValidator = exports.userValidator = exports.adminUserService = exports.publicUserService = exports.userSecurityService = exports.userPreferencesService = exports.userProfileService = exports.userService = exports.readerProfileRepository = exports.userPreferencesRepository = exports.userProfileRepository = exports.userSecurityRepository = exports.userRepository = exports.adminUserMapper = exports.publicUserMapper = exports.fullUserMapper = exports.sessionMapper = exports.authorAccountMapper = exports.readerProfileMapper = exports.securityMapper = exports.preferencesMapper = exports.profileMapper = exports.userMapper = void 0;
// Mappers
var mappers_1 = require("./mappers");
Object.defineProperty(exports, "userMapper", { enumerable: true, get: function () { return mappers_1.userMapper; } });
Object.defineProperty(exports, "profileMapper", { enumerable: true, get: function () { return mappers_1.profileMapper; } });
Object.defineProperty(exports, "preferencesMapper", { enumerable: true, get: function () { return mappers_1.preferencesMapper; } });
Object.defineProperty(exports, "securityMapper", { enumerable: true, get: function () { return mappers_1.securityMapper; } });
Object.defineProperty(exports, "readerProfileMapper", { enumerable: true, get: function () { return mappers_1.readerProfileMapper; } });
Object.defineProperty(exports, "authorAccountMapper", { enumerable: true, get: function () { return mappers_1.authorAccountMapper; } });
Object.defineProperty(exports, "sessionMapper", { enumerable: true, get: function () { return mappers_1.sessionMapper; } });
Object.defineProperty(exports, "fullUserMapper", { enumerable: true, get: function () { return mappers_1.fullUserMapper; } });
Object.defineProperty(exports, "publicUserMapper", { enumerable: true, get: function () { return mappers_1.publicUserMapper; } });
Object.defineProperty(exports, "adminUserMapper", { enumerable: true, get: function () { return mappers_1.adminUserMapper; } });
// Repositories
var repositories_1 = require("./repositories");
Object.defineProperty(exports, "userRepository", { enumerable: true, get: function () { return repositories_1.userRepository; } });
Object.defineProperty(exports, "userSecurityRepository", { enumerable: true, get: function () { return repositories_1.userSecurityRepository; } });
Object.defineProperty(exports, "userProfileRepository", { enumerable: true, get: function () { return repositories_1.userProfileRepository; } });
Object.defineProperty(exports, "userPreferencesRepository", { enumerable: true, get: function () { return repositories_1.userPreferencesRepository; } });
Object.defineProperty(exports, "readerProfileRepository", { enumerable: true, get: function () { return repositories_1.readerProfileRepository; } });
// Services
var services_1 = require("./services");
Object.defineProperty(exports, "userService", { enumerable: true, get: function () { return services_1.userService; } });
Object.defineProperty(exports, "userProfileService", { enumerable: true, get: function () { return services_1.userProfileService; } });
Object.defineProperty(exports, "userPreferencesService", { enumerable: true, get: function () { return services_1.userPreferencesService; } });
Object.defineProperty(exports, "userSecurityService", { enumerable: true, get: function () { return services_1.userSecurityService; } });
Object.defineProperty(exports, "publicUserService", { enumerable: true, get: function () { return services_1.publicUserService; } });
Object.defineProperty(exports, "adminUserService", { enumerable: true, get: function () { return services_1.adminUserService; } });
// Validators
var validators_1 = require("./validators");
Object.defineProperty(exports, "userValidator", { enumerable: true, get: function () { return validators_1.userValidator; } });
Object.defineProperty(exports, "profileValidator", { enumerable: true, get: function () { return validators_1.profileValidator; } });
// Utilities
var utils_1 = require("./utils");
Object.defineProperty(exports, "canUserLogin", { enumerable: true, get: function () { return utils_1.canUserLogin; } });
Object.defineProperty(exports, "hasPassword", { enumerable: true, get: function () { return utils_1.hasPassword; } });
Object.defineProperty(exports, "needsEmailVerification", { enumerable: true, get: function () { return utils_1.needsEmailVerification; } });
Object.defineProperty(exports, "hasMfaEnabled", { enumerable: true, get: function () { return utils_1.hasMfaEnabled; } });
Object.defineProperty(exports, "isActiveUser", { enumerable: true, get: function () { return utils_1.isActiveUser; } });
Object.defineProperty(exports, "maskEmail", { enumerable: true, get: function () { return utils_1.maskEmail; } });
Object.defineProperty(exports, "maskIpAddress", { enumerable: true, get: function () { return utils_1.maskIpAddress; } });
// Constants
var constants_1 = require("./constants");
Object.defineProperty(exports, "RESERVED_USERNAMES", { enumerable: true, get: function () { return constants_1.RESERVED_USERNAMES; } });
Object.defineProperty(exports, "VALID_LOCALES", { enumerable: true, get: function () { return constants_1.VALID_LOCALES; } });
Object.defineProperty(exports, "USER_DEFAULTS", { enumerable: true, get: function () { return constants_1.USER_DEFAULTS; } });
Object.defineProperty(exports, "USER_LIMITS", { enumerable: true, get: function () { return constants_1.USER_LIMITS; } });
var entities_1 = require("./entities");
Object.defineProperty(exports, "toSafeUser", { enumerable: true, get: function () { return entities_1.toSafeUser; } });
Object.defineProperty(exports, "toJwtUser", { enumerable: true, get: function () { return entities_1.toJwtUser; } });
var entities_2 = require("./entities");
Object.defineProperty(exports, "toUserProfileEntity", { enumerable: true, get: function () { return entities_2.toUserProfileEntity; } });
var entities_3 = require("./entities");
Object.defineProperty(exports, "toUserPreferencesEntity", { enumerable: true, get: function () { return entities_3.toUserPreferencesEntity; } });
var entities_4 = require("./entities");
Object.defineProperty(exports, "toReaderProfileEntity", { enumerable: true, get: function () { return entities_4.toReaderProfileEntity; } });
//# sourceMappingURL=index.js.map