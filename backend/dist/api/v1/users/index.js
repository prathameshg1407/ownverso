"use strict";
/**
 * User Management Routes
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUsersRoutes = exports.usersRoutes = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const multipart_1 = __importDefault(require("@fastify/multipart"));
const guards_1 = require("../../../api/v1/auth/guards");
const guards_2 = require("./guards");
const handlers = __importStar(require("./handlers"));
const schemas = __importStar(require("./schemas"));
const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB
const UserIdParamSchema = type_provider_typebox_1.Type.Object({
    userId: type_provider_typebox_1.Type.String({ description: 'User public ID' }),
});
const UsernameParamSchema = type_provider_typebox_1.Type.Object({
    username: type_provider_typebox_1.Type.String({ minLength: 3, maxLength: 30, description: 'Username' }),
});
const PublicIdParamSchema = type_provider_typebox_1.Type.Object({
    publicId: type_provider_typebox_1.Type.String({ description: 'User public ID' }),
});
const usersRoutes = async (fastify) => {
    const app = fastify.withTypeProvider();
    await app.register(multipart_1.default, { limits: { fileSize: MAX_AVATAR_SIZE } });
    // Current User Routes
    app.get('/me', {
        schema: {
            tags: ['Users'],
            summary: 'Get current user profile',
            response: { 200: schemas.GetMeResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireAuth,
        handler: handlers.getMeHandler,
    });
    app.put('/me', {
        schema: {
            tags: ['Users'],
            summary: 'Update current user',
            body: schemas.UpdateUserRequestSchema,
            response: { 200: schemas.UpdateUserResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, guards_2.userRateLimitGuards.profileUpdate],
        handler: handlers.updateMeHandler,
    });
    app.delete('/me', {
        schema: {
            tags: ['Users'],
            summary: 'Delete current user account',
            response: { 204: type_provider_typebox_1.Type.Null() },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, guards_2.userRateLimitGuards.accountDeletion],
        handler: handlers.deleteMeHandler,
    });
    // Profile Routes
    app.patch('/me/profile', {
        schema: {
            tags: ['Users', 'Profile'],
            summary: 'Update user profile',
            body: schemas.UpdateProfileRequestSchema,
            response: { 200: schemas.UpdateProfileResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, guards_2.userRateLimitGuards.profileUpdate],
        handler: handlers.updateProfileHandler,
    });
    app.post('/me/avatar', {
        schema: {
            tags: ['Users', 'Profile'],
            summary: 'Upload avatar',
            consumes: ['multipart/form-data'],
            response: { 200: schemas.AvatarUploadResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, guards_2.userRateLimitGuards.avatarUpload],
        handler: handlers.uploadAvatarHandler,
    });
    app.delete('/me/avatar', {
        schema: {
            tags: ['Users', 'Profile'],
            summary: 'Remove avatar',
            response: { 204: type_provider_typebox_1.Type.Null() },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireAuth,
        handler: handlers.deleteAvatarHandler,
    });
    // Preferences Routes
    app.get('/me/preferences', {
        schema: {
            tags: ['Users', 'Preferences'],
            summary: 'Get user preferences',
            response: { 200: schemas.GetPreferencesResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireAuth,
        handler: handlers.getPreferencesHandler,
    });
    app.patch('/me/preferences', {
        schema: {
            tags: ['Users', 'Preferences'],
            summary: 'Update user preferences',
            body: schemas.UpdatePreferencesRequestSchema,
            response: { 200: schemas.UpdatePreferencesResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireAuth,
        handler: handlers.updatePreferencesHandler,
    });
    // Security Routes
    app.get('/me/security', {
        schema: {
            tags: ['Users', 'Security'],
            summary: 'Get security info',
            response: { 200: schemas.GetSecurityResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireAuth,
        handler: handlers.getSecurityHandler,
    });
    app.put('/me/security', {
        schema: {
            tags: ['Users', 'Security'],
            summary: 'Update security settings',
            body: schemas.UpdateSecurityRequestSchema,
            response: { 200: schemas.UpdateSecurityResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireAuth,
        handler: handlers.updateSecurityHandler,
    });
    app.get('/me/security/login-history', {
        schema: {
            tags: ['Users', 'Security'],
            summary: 'Get login history',
            response: { 200: schemas.LoginHistoryResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireAuth,
        handler: handlers.loginHistoryHandler,
    });
    app.post('/me/security/force-logout', {
        schema: {
            tags: ['Users', 'Security'],
            summary: 'Force logout all devices',
            response: { 200: schemas.MessageResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireAuth, guards_2.userRateLimitGuards.forceLogout],
        handler: handlers.forceLogoutHandler,
    });
    // Public User Routes
    app.get('/:username', {
        schema: {
            tags: ['Users', 'Public'],
            summary: 'Get public user by username',
            params: UsernameParamSchema,
            response: { 200: schemas.GetPublicUserResponseSchema },
        },
        handler: handlers.getByUsernameHandler,
    });
    app.get('/id/:publicId', {
        schema: {
            tags: ['Users', 'Public'],
            summary: 'Get public user by ID',
            params: PublicIdParamSchema,
            response: { 200: schemas.GetPublicUserResponseSchema },
        },
        handler: handlers.getByPublicIdHandler,
    });
};
exports.usersRoutes = usersRoutes;
const adminUsersRoutes = async (fastify) => {
    const app = fastify.withTypeProvider();
    app.addHook('preHandler', guards_1.requireAuth);
    // User Management
    app.get('/', {
        schema: {
            tags: ['Admin', 'Users'],
            summary: 'List users',
            querystring: schemas.AdminUserQuerySchema,
            response: { 200: schemas.AdminUserListResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireAdmin,
        handler: handlers.listUsersHandler,
    });
    app.get('/:userId', {
        schema: {
            tags: ['Admin', 'Users'],
            summary: 'Get user details',
            params: UserIdParamSchema,
            response: { 200: schemas.GetAdminUserResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireAdmin,
        handler: handlers.getUserHandler,
    });
    app.put('/:userId', {
        schema: {
            tags: ['Admin', 'Users'],
            summary: 'Update user',
            params: UserIdParamSchema,
            body: schemas.AdminUpdateUserRequestSchema,
            response: { 200: schemas.GetAdminUserResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireAdmin,
        handler: handlers.updateUserHandler,
    });
    app.put('/:userId/status', {
        schema: {
            tags: ['Admin', 'Users'],
            summary: 'Update user status',
            params: UserIdParamSchema,
            body: schemas.AdminUpdateStatusRequestSchema,
            response: { 200: schemas.GetAdminUserResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireAdmin,
        handler: handlers.updateStatusHandler,
    });
    // Super Admin Only
    app.put('/:userId/role', {
        schema: {
            tags: ['Admin', 'Users'],
            summary: 'Update user role (super admin only)',
            params: UserIdParamSchema,
            body: schemas.AdminUpdateRoleRequestSchema,
            response: { 200: schemas.GetAdminUserResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: guards_1.requireSuperAdmin,
        handler: handlers.updateRoleHandler,
    });
    app.post('/:userId/impersonate', {
        schema: {
            tags: ['Admin', 'Users'],
            summary: 'Impersonate user (super admin only)',
            params: UserIdParamSchema,
            response: { 200: schemas.ImpersonateResponseSchema },
            security: [{ bearerAuth: [] }],
        },
        preHandler: [guards_1.requireSuperAdmin, guards_2.userRateLimitGuards.impersonate],
        handler: handlers.impersonateHandler,
    });
};
exports.adminUsersRoutes = adminUsersRoutes;
//# sourceMappingURL=index.js.map