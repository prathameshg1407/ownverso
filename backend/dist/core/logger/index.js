"use strict";
// src/core/logger/index.ts
/**
 * Logger Module Exports
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChildLogger = exports.createLogger = exports.fastifyLogger = exports.logger = void 0;
var logger_service_1 = require("./logger.service");
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return logger_service_1.logger; } });
Object.defineProperty(exports, "fastifyLogger", { enumerable: true, get: function () { return logger_service_1.fastifyLogger; } });
Object.defineProperty(exports, "createLogger", { enumerable: true, get: function () { return logger_service_1.createLogger; } });
Object.defineProperty(exports, "createChildLogger", { enumerable: true, get: function () { return logger_service_1.createChildLogger; } });
//# sourceMappingURL=index.js.map