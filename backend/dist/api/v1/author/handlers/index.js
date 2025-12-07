"use strict";
// ==== FILE: src/api/v1/author/handlers/index.ts ====
/**
 * Author Handlers Barrel Export
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
__exportStar(require("./register-author.handler"), exports);
__exportStar(require("./get-account.handler"), exports);
__exportStar(require("./update-account.handler"), exports);
__exportStar(require("./get-dashboard.handler"), exports);
__exportStar(require("./get-stats.handler"), exports);
// Platform Subscription
__exportStar(require("./platform-subscription/get-subscription.handler"), exports);
__exportStar(require("./platform-subscription/list-plans.handler"), exports);
__exportStar(require("./platform-subscription/subscribe.handler"), exports);
__exportStar(require("./platform-subscription/change-plan.handler"), exports);
__exportStar(require("./platform-subscription/cancel.handler"), exports);
__exportStar(require("./platform-subscription/reactivate.handler"), exports);
//# sourceMappingURL=index.js.map