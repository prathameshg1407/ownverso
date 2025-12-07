"use strict";
// ==== FILE: src/api/v1/collaborator/collaborator.routes.ts ====
/**
 * Collaborator Routes
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
exports.collaboratorRoutes = void 0;
const guards_1 = require("../../../api/v1/auth/guards");
const handlers = __importStar(require("./handlers"));
const schemas = __importStar(require("./collaborator.schema"));
const collaboratorRoutes = async (fastify) => {
    const app = fastify.withTypeProvider();
    // Accept invite (requires auth)
    app.post('/accept/:token', {
        schema: {
            tags: ['Collaborator'],
            summary: 'Accept collaboration invite',
            params: schemas.InviteTokenParamSchema,
            response: { 200: schemas.AcceptInviteResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireAuth,
        handler: handlers.acceptInviteHandler,
    });
    // List sites where user is collaborator
    app.get('/sites', {
        schema: {
            tags: ['Collaborator'],
            summary: 'List sites where you are a collaborator',
            response: { 200: schemas.ListCollaboratorSitesResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireAuth,
        handler: handlers.listCollaboratorSitesHandler,
    });
};
exports.collaboratorRoutes = collaboratorRoutes;
//# sourceMappingURL=index.js.map