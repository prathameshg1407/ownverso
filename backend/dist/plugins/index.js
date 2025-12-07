"use strict";
// ==== FILE: src/plugins/index.ts (UPDATED) ====
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPlugin = exports.authRateLimits = exports.createRouteRateLimit = exports.rateLimitPlugin = exports.gracefulShutdownPlugin = exports.redisPlugin = exports.prismaPlugin = exports.swaggerPlugin = exports.compressPlugin = exports.helmetPlugin = exports.corsPlugin = void 0;
/**
 * Plugins Module Exports
 */
var cors_plugin_1 = require("./cors.plugin");
Object.defineProperty(exports, "corsPlugin", { enumerable: true, get: function () { return cors_plugin_1.corsPlugin; } });
var helmet_plugin_1 = require("./helmet.plugin");
Object.defineProperty(exports, "helmetPlugin", { enumerable: true, get: function () { return helmet_plugin_1.helmetPlugin; } });
var compress_plugin_1 = require("./compress.plugin");
Object.defineProperty(exports, "compressPlugin", { enumerable: true, get: function () { return compress_plugin_1.compressPlugin; } });
var swagger_plugin_1 = require("./swagger.plugin");
Object.defineProperty(exports, "swaggerPlugin", { enumerable: true, get: function () { return swagger_plugin_1.swaggerPlugin; } });
var prisma_plugin_1 = require("./prisma.plugin");
Object.defineProperty(exports, "prismaPlugin", { enumerable: true, get: function () { return prisma_plugin_1.prismaPlugin; } });
var redis_plugin_1 = require("./redis.plugin");
Object.defineProperty(exports, "redisPlugin", { enumerable: true, get: function () { return redis_plugin_1.redisPlugin; } });
var graceful_shutdown_plugin_1 = require("./graceful-shutdown.plugin");
Object.defineProperty(exports, "gracefulShutdownPlugin", { enumerable: true, get: function () { return graceful_shutdown_plugin_1.gracefulShutdownPlugin; } });
var rate_limit_plugin_1 = require("./rate-limit.plugin");
Object.defineProperty(exports, "rateLimitPlugin", { enumerable: true, get: function () { return rate_limit_plugin_1.rateLimitPlugin; } });
Object.defineProperty(exports, "createRouteRateLimit", { enumerable: true, get: function () { return rate_limit_plugin_1.createRouteRateLimit; } });
Object.defineProperty(exports, "authRateLimits", { enumerable: true, get: function () { return rate_limit_plugin_1.authRateLimits; } });
var auth_plugin_1 = require("./auth.plugin");
Object.defineProperty(exports, "authPlugin", { enumerable: true, get: function () { return auth_plugin_1.authPlugin; } });
//# sourceMappingURL=index.js.map