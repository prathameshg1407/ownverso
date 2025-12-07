"use strict";
/**
 * User Handlers Index
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeHandler = exports.updateMeHandler = exports.getMeHandler = void 0;
// Current user
var get_me_handler_1 = require("./get-me.handler");
Object.defineProperty(exports, "getMeHandler", { enumerable: true, get: function () { return get_me_handler_1.getMeHandler; } });
var update_me_handler_1 = require("./update-me.handler");
Object.defineProperty(exports, "updateMeHandler", { enumerable: true, get: function () { return update_me_handler_1.updateMeHandler; } });
var delete_me_handler_1 = require("./delete-me.handler");
Object.defineProperty(exports, "deleteMeHandler", { enumerable: true, get: function () { return delete_me_handler_1.deleteMeHandler; } });
// Profile
__exportStar(require("./profile"), exports);
// Preferences
__exportStar(require("./preferences"), exports);
// Security
__exportStar(require("./security"), exports);
// Public
__exportStar(require("./public"), exports);
// Admin
__exportStar(require("./admin"), exports);
//# sourceMappingURL=index.js.map