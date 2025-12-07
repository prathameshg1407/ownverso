"use strict";
// ==== FILE: src/api/v1/author/author.routes.ts ====
/**
 * Author Routes
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorRoutes = void 0;
const guards_1 = require("../../../api/v1/auth/guards");
const author_guard_1 = require("./guards/author.guard");
const handlers = __importStar(require("./handlers"));
const schemas = __importStar(require("./author.schema"));
const authorRoutes = async (fastify) => {
    const app = fastify.withTypeProvider();
    // ─────────────────────────────────────────────────────────────────────
    // Author Account Registration
    // ─────────────────────────────────────────────────────────────────────
    app.post('/register', {
        schema: {
            tags: ['Author'],
            summary: 'Register as an author',
            description: 'Upgrade current user account to author status',
            body: schemas.RegisterAuthorRequestSchema,
            response: { 201: schemas.RegisterAuthorResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireAuth,
        handler: handlers.registerAuthorHandler,
    });
    // ─────────────────────────────────────────────────────────────────────
    // Author Account Management
    // ─────────────────────────────────────────────────────────────────────
    app.get('/account', {
        schema: {
            tags: ['Author'],
            summary: 'Get author account',
            response: { 200: schemas.GetAuthorAccountResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, author_guard_1.requireAuthorAccount],
        handler: handlers.getAccountHandler,
    });
    app.put('/account', {
        schema: {
            tags: ['Author'],
            summary: 'Update author account',
            body: schemas.UpdateAuthorAccountRequestSchema,
            response: { 200: schemas.UpdateAuthorAccountResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, author_guard_1.requireAuthorAccount],
        handler: handlers.updateAccountHandler,
    });
    // ─────────────────────────────────────────────────────────────────────
    // Author Dashboard & Stats
    // ─────────────────────────────────────────────────────────────────────
    app.get('/dashboard', {
        schema: {
            tags: ['Author'],
            summary: 'Get author dashboard',
            response: { 200: schemas.GetAuthorDashboardResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, author_guard_1.requireAuthorAccount],
        handler: handlers.getDashboardHandler,
    });
    app.get('/stats', {
        schema: {
            tags: ['Author'],
            summary: 'Get author statistics',
            response: { 200: schemas.GetAuthorStatsResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, author_guard_1.requireAuthorAccount],
        handler: handlers.getStatsHandler,
    });
    // ─────────────────────────────────────────────────────────────────────
    // Platform Subscription
    // ─────────────────────────────────────────────────────────────────────
    app.get('/platform-subscription', {
        schema: {
            tags: ['Author', 'Platform Subscription'],
            summary: 'Get platform subscription status',
            response: { 200: schemas.GetPlatformSubscriptionResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, author_guard_1.requireAuthorAccount],
        handler: handlers.getSubscriptionHandler,
    });
    app.get('/platform-plans', {
        schema: {
            tags: ['Author', 'Platform Subscription'],
            summary: 'List available platform plans',
            response: { 200: schemas.ListPlatformPlansResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, author_guard_1.requireAuthorAccount],
        handler: handlers.listPlansHandler,
    });
    app.post('/platform-subscription/subscribe', {
        schema: {
            tags: ['Author', 'Platform Subscription'],
            summary: 'Subscribe to a platform plan',
            body: schemas.SubscribePlatformRequestSchema,
            response: { 201: schemas.GetPlatformSubscriptionResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, author_guard_1.requireAuthorAccount],
        handler: handlers.subscribeHandler,
    });
    app.put('/platform-subscription/change', {
        schema: {
            tags: ['Author', 'Platform Subscription'],
            summary: 'Change platform plan',
            body: schemas.ChangePlatformPlanRequestSchema,
            response: { 200: schemas.GetPlatformSubscriptionResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, author_guard_1.requireAuthorAccount],
        handler: handlers.changePlanHandler,
    });
    app.post('/platform-subscription/cancel', {
        schema: {
            tags: ['Author', 'Platform Subscription'],
            summary: 'Cancel platform subscription',
            response: { 200: schemas.MessageResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, author_guard_1.requireAuthorAccount],
        handler: handlers.cancelHandler,
    });
    app.post('/platform-subscription/reactivate', {
        schema: {
            tags: ['Author', 'Platform Subscription'],
            summary: 'Reactivate cancelled subscription',
            response: { 200: schemas.MessageResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, author_guard_1.requireAuthorAccount],
        handler: handlers.reactivateHandler,
    });
};
exports.authorRoutes = authorRoutes;
//# sourceMappingURL=index.js.map