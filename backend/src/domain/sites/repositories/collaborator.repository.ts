// ==== FILE: src/domain/sites/repositories/collaborator.repository.ts ====
/**
 * Collaborator Repository
 */

import { Prisma } from '@prisma/client';
import { prisma } from '@/core/database';
import { logger } from '@/core/logger';
import type {
  InviteCollaboratorInput,
  UpdateCollaboratorInput,
  CollaboratorWithUser,
} from '../types/site.types';

const COLLABORATOR_WITH_USER_INCLUDE = {
  user: {
    select: {
      publicId: true,
      username: true,
      displayName: true,
      profile: {
        select: { avatarUrl: true },
      },
    },
  },
} as const;

export const collaboratorRepository = {
  /**
   * Create collaborator invitation
   */
  async createInvite(input: InviteCollaboratorInput, inviteToken: string, invitedByUserId: bigint) {
    // We need to find or create a placeholder for the invited user
    // For now, we'll create the collaborator record with the invitation details
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days to accept

    const collaborator = await prisma.collaborator.create({
      data: {
        siteId: input.siteId,
        userId: invitedByUserId, // Temporary - will be updated when accepted
        role: input.role,
        permissions: input.permissions ?? {},
        invitedByEmail: input.email.toLowerCase(),
        inviteToken,
        expiresAt,
        isActive: false, // Not active until accepted
      },
    });

    logger.debug(
      { collaboratorId: collaborator.id.toString(), email: input.email },
      'Collaborator invitation created'
    );

    return collaborator;
  },

  /**
   * Find by ID
   */
  async findById(id: bigint) {
    return prisma.collaborator.findUnique({ where: { id } });
  },

  /**
   * Find by ID with user
   */
  async findByIdWithUser(id: bigint): Promise<CollaboratorWithUser | null> {
    return prisma.collaborator.findUnique({
      where: { id },
      include: COLLABORATOR_WITH_USER_INCLUDE,
    });
  },

  /**
   * Find by invite token
   */
  async findByInviteToken(token: string) {
    return prisma.collaborator.findUnique({
      where: { inviteToken: token },
    });
  },

  /**
   * Find by site and user
   */
  async findBySiteAndUser(siteId: string, userId: bigint) {
    return prisma.collaborator.findUnique({
      where: {
        siteId_userId: { siteId, userId },
      },
    });
  },

  /**
   * Check if user is collaborator on site
   */
  async isCollaborator(siteId: string, userId: bigint): Promise<boolean> {
    const count = await prisma.collaborator.count({
      where: { siteId, userId, isActive: true },
    });
    return count > 0;
  },

  /**
   * Accept invitation
   */
  async acceptInvite(id: bigint, userId: bigint) {
    return prisma.collaborator.update({
      where: { id },
      data: {
        userId,
        acceptedAt: new Date(),
        isActive: true,
        inviteToken: null, // Clear token after use
      },
    });
  },

  /**
   * Update collaborator
   */
  async update(id: bigint, input: UpdateCollaboratorInput) {
    const data: Prisma.CollaboratorUpdateInput = {};

    if (input.role !== undefined) data.role = input.role;
    if (input.permissions !== undefined) data.permissions = input.permissions;
    if (input.isActive !== undefined) {
      data.isActive = input.isActive;
      if (!input.isActive) {
        data.deactivatedAt = new Date();
      }
    }

    return prisma.collaborator.update({ where: { id }, data });
  },

  /**
   * Remove collaborator
   */
  async remove(id: bigint) {
    return prisma.collaborator.delete({ where: { id } });
  },

  /**
   * Deactivate collaborator
   */
  async deactivate(id: bigint, reason?: string) {
    return prisma.collaborator.update({
      where: { id },
      data: {
        isActive: false,
        deactivatedAt: new Date(),
        deactivatedReason: reason,
      },
    });
  },

  /**
   * Find all collaborators for a site
   */
  async findBySite(siteId: string): Promise<CollaboratorWithUser[]> {
    return prisma.collaborator.findMany({
      where: { siteId },
      include: COLLABORATOR_WITH_USER_INCLUDE,
      orderBy: [{ role: 'desc' }, { createdAt: 'asc' }],
    });
  },

  /**
   * Find active collaborators for a site
   */
  async findActiveBySite(siteId: string): Promise<CollaboratorWithUser[]> {
    return prisma.collaborator.findMany({
      where: { siteId, isActive: true },
      include: COLLABORATOR_WITH_USER_INCLUDE,
      orderBy: [{ role: 'desc' }, { createdAt: 'asc' }],
    });
  },

  /**
   * Find sites where user is a collaborator
   */
  async findSitesByUser(userId: bigint) {
    return prisma.collaborator.findMany({
      where: { userId, isActive: true },
      include: {
        site: {
          include: {
            _count: { select: { series: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  /**
   * Count collaborators for a site
   */
  async countBySite(siteId: string): Promise<number> {
    return prisma.collaborator.count({
      where: { siteId, isActive: true },
    });
  },

  /**
   * Delete expired invitations
   */
  async deleteExpiredInvites() {
    const result = await prisma.collaborator.deleteMany({
      where: {
        acceptedAt: null,
        expiresAt: { lt: new Date() },
      },
    });

    if (result.count > 0) {
      logger.info({ count: result.count }, 'Deleted expired collaborator invitations');
    }

    return result.count;
  },
};

export type CollaboratorRepository = typeof collaboratorRepository;