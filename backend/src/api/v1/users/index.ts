/**
 * User Management Routes
 */

import type { FastifyPluginAsync } from 'fastify';
import { Type, type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import multipart from '@fastify/multipart';

import { requireAuth, requireAdmin, requireSuperAdmin } from '@/api/v1/auth/guards';
import { userRateLimitGuards } from './guards';
import * as handlers from './handlers';
import * as schemas from './schemas';

const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB

const UserIdParamSchema = Type.Object({
  userId: Type.String({ description: 'User public ID' }),
});

const UsernameParamSchema = Type.Object({
  username: Type.String({ minLength: 3, maxLength: 30, description: 'Username' }),
});

const PublicIdParamSchema = Type.Object({
  publicId: Type.String({ description: 'User public ID' }),
});

export const usersRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

  await app.register(multipart, { limits: { fileSize: MAX_AVATAR_SIZE } });

  // Current User Routes
  app.get('/me', {
    schema: {
      tags: ['Users'],
      summary: 'Get current user profile',
      response: { 200: schemas.GetMeResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAuth,
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
    preHandler: [requireAuth, userRateLimitGuards.profileUpdate],
    handler: handlers.updateMeHandler,
  });

  app.delete('/me', {
    schema: {
      tags: ['Users'],
      summary: 'Delete current user account',
      response: { 204: Type.Null() },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [requireAuth, userRateLimitGuards.accountDeletion],
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
    preHandler: [requireAuth, userRateLimitGuards.profileUpdate],
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
    preHandler: [requireAuth, userRateLimitGuards.avatarUpload],
    handler: handlers.uploadAvatarHandler,
  });

  app.delete('/me/avatar', {
    schema: {
      tags: ['Users', 'Profile'],
      summary: 'Remove avatar',
      response: { 204: Type.Null() },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAuth,
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
    preHandler: requireAuth,
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
    preHandler: requireAuth,
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
    preHandler: requireAuth,
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
    preHandler: requireAuth,
    handler: handlers.updateSecurityHandler,
  });

  app.get('/me/security/login-history', {
    schema: {
      tags: ['Users', 'Security'],
      summary: 'Get login history',
      response: { 200: schemas.LoginHistoryResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAuth,
    handler: handlers.loginHistoryHandler,
  });

  app.post('/me/security/force-logout', {
    schema: {
      tags: ['Users', 'Security'],
      summary: 'Force logout all devices',
      response: { 200: schemas.MessageResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [requireAuth, userRateLimitGuards.forceLogout],
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

export const adminUsersRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

  app.addHook('preHandler', requireAuth);

  // User Management
  app.get('/', {
    schema: {
      tags: ['Admin', 'Users'],
      summary: 'List users',
      querystring: schemas.AdminUserQuerySchema,
      response: { 200: schemas.AdminUserListResponseSchema },
      security: [{ bearerAuth: [] }],
    },
    preHandler: requireAdmin,
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
    preHandler: requireAdmin,
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
    preHandler: requireAdmin,
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
    preHandler: requireAdmin,
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
    preHandler: requireSuperAdmin,
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
    preHandler: [requireSuperAdmin, userRateLimitGuards.impersonate],
    handler: handlers.impersonateHandler,
  });
};