"use strict";
// ==== FILE: src/config/index.ts (UPDATED) ====
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = exports.jwtConfig = exports.redisConfig = exports.databaseConfig = exports.appConfig = exports.assertConfigValid = exports.validateConfig = exports.config = void 0;
/**
 * Configuration Module
 *
 * Central configuration management with validation.
 */
var configuration_1 = require("./configuration");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return configuration_1.config; } });
var validation_1 = require("./validation");
Object.defineProperty(exports, "validateConfig", { enumerable: true, get: function () { return validation_1.validateConfig; } });
Object.defineProperty(exports, "assertConfigValid", { enumerable: true, get: function () { return validation_1.assertConfigValid; } });
var app_config_1 = require("./app.config");
Object.defineProperty(exports, "appConfig", { enumerable: true, get: function () { return app_config_1.appConfig; } });
var database_config_1 = require("./database.config");
Object.defineProperty(exports, "databaseConfig", { enumerable: true, get: function () { return database_config_1.databaseConfig; } });
var redis_config_1 = require("./redis.config");
Object.defineProperty(exports, "redisConfig", { enumerable: true, get: function () { return redis_config_1.redisConfig; } });
var jwt_config_1 = require("./jwt.config");
Object.defineProperty(exports, "jwtConfig", { enumerable: true, get: function () { return jwt_config_1.jwtConfig; } });
var auth_config_1 = require("./auth.config");
Object.defineProperty(exports, "authConfig", { enumerable: true, get: function () { return auth_config_1.authConfig; } });
//# sourceMappingURL=index.js.map