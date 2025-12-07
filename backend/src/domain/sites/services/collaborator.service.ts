// ==== FILE: src/domain/sites/services/collaborator.service.ts ====
/**
 * Collaborator Service
 */

import { logger } from '@/core/logger';
import { NotFoundError, ConflictError, BadRequestError, ForbiddenError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { collaboratorRepository } from '../repositories/collaborator.repository';
import { siteRepository } from '../repositories/site.repository';
import { userRepository } from '@/domain/users/repositories/user.repository';
import { collaboratorMapper } from '../mappers/site.mapper';
import { hasMinimumRole } from '../entities/site.entity';
import type { CollaboratorRole } from '@prisma/client';
import type {
  InviteCollaboratorInput,
  UpdateCollaboratorInput,
  CollaboratorDTO,
  CollaboratorInviteDTO,
} from '../types/site.types';

export const collaboratorService = {
  /**
   * Invite a collaborator to a site
   */
  async inviteCollaborator(
    input: InviteCollaboratorInput,
    invitedByUserId: bigint
  ): Promise<CollaboratorInviteDTO> {
    // Validate site exists
    const site = await siteRepository.findById(input.siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    // Check if email is already a collaborator
    const existingUser = await userRepository.findByEmail(input.email);
    if (existingUser) {
      const existingCollab = await collaboratorRepository.findBySiteAndUser(
        input.siteId,
        existingUser.id
      );
      if (existingCollab) {
        throw new ConflictError(
          'This user is already a collaborator',
          ERROR_CODES.COLLABORATOR_ALREADY_EXISTS
        );
      }
    }

    // Generate invite token
    const { nanoid } = await import('nanoid');
    const inviteToken = nanoid(32);

    const collaborator = await collaboratorRepository.createInvite(
      input,
      inviteToken,
      invitedByUserId
    );

    // TODO: Send invitation email

    logger.info(
      { siteId: input.siteId, email: input.email },
      'Collaborator invitation sent'
    );

    return {
      id: collaborator.id.toString(),
      email: input.email,
      role: collaborator.role,
      inviteToken,
      invitedAt: collaborator.invitedAt.toISOString(),
      expiresAt: collaborator.expiresAt?.toISOString() ?? null,
    };
  },

  /**
   * Accept collaboration invitation
   */
  async acceptInvite(token: string, userId: bigint): Promise<CollaboratorDTO> {
    const invitation = await collaboratorRepository.findByInviteToken(token);
    if (!invitation) {
      throw new NotFoundError(
        'Invitation not found or expired',
        ERROR_CODES.INVITE_NOT_FOUND
      );
    }

    // Check if expired
    if (invitation.expiresAt && invitation.expiresAt < new Date()) {
      throw new BadRequestError(
        'Invitation has expired',
        ERROR_CODES.INVITE_EXPIRED
      );
    }

    // Check if user email matches invitation
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    if (
      invitation.invitedByEmail &&
      user.email.toLowerCase() !== invitation.invitedByEmail.toLowerCase()
    ) {
      throw new ForbiddenError(
        'This invitation is for a different email address',
        ERROR_CODES.FORBIDDEN
      );
    }

    // Accept the invitation
    const updated = await collaboratorRepository.acceptInvite(invitation.id, userId);
    const withUser = await collaboratorRepository.findByIdWithUser(updated.id);

    if (!withUser) {
      throw new NotFoundError('Collaborator not found', ERROR_CODES.NOT_FOUND);
    }

    logger.info(
      { siteId: invitation.siteId, userId: userId.toString() },
      'Collaboration invitation accepted'
    );

    return collaboratorMapper.toDTO(withUser);
  },

  /**
   * Get collaborator by ID
   */
  async getCollaborator(collaboratorId: bigint): Promise<CollaboratorDTO> {
    const collaborator = await collaboratorRepository.findByIdWithUser(collaboratorId);
    if (!collaborator) {
      throw new NotFoundError(
        'Collaborator not found',
        ERROR_CODES.COLLABORATOR_NOT_FOUND
      );
    }
    return collaboratorMapper.toDTO(collaborator);
  },

  /**
   * List collaborators for a site
   */
  async listCollaborators(siteId: string): Promise<CollaboratorDTO[]> {
    const collaborators = await collaboratorRepository.findBySite(siteId);
    return collaborators.map((c) => collaboratorMapper.toDTO(c));
  },

  /**
   * Update collaborator
   */
  async updateCollaborator(
    collaboratorId: bigint,
    input: UpdateCollaboratorInput
  ): Promise<CollaboratorDTO> {
    const collaborator = await collaboratorRepository.findById(collaboratorId);
    if (!collaborator) {
      throw new NotFoundError(
        'Collaborator not found',
        ERROR_CODES.COLLABORATOR_NOT_FOUND
      );
    }

    // Cannot change OWNER role
    if (collaborator.role === 'OWNER') {
      throw new ForbiddenError(
        'Cannot modify owner permissions',
        ERROR_CODES.FORBIDDEN
      );
    }

    const updated = await collaboratorRepository.update(collaboratorId, input);
    const withUser = await collaboratorRepository.findByIdWithUser(updated.id);

    if (!withUser) {
      throw new NotFoundError('Collaborator not found', ERROR_CODES.NOT_FOUND);
    }

    logger.info({ collaboratorId: collaboratorId.toString() }, 'Collaborator updated');

    return collaboratorMapper.toDTO(withUser);
  },

  /**
   * Remove collaborator
   */
  async removeCollaborator(collaboratorId: bigint): Promise<void> {
    const collaborator = await collaboratorRepository.findById(collaboratorId);
    if (!collaborator) {
      throw new NotFoundError(
        'Collaborator not found',
        ERROR_CODES.COLLABORATOR_NOT_FOUND
      );
    }

    // Cannot remove OWNER
    if (collaborator.role === 'OWNER') {
      throw new ForbiddenError(
        'Cannot remove owner from site',
        ERROR_CODES.FORBIDDEN
      );
    }

    await collaboratorRepository.remove(collaboratorId);

    logger.info({ collaboratorId: collaboratorId.toString() }, 'Collaborator removed');
  },

  /**
   * Get sites where user is a collaborator
   */
  async getUserCollaborationSites(userId: bigint) {
    const collaborations = await collaboratorRepository.findSitesByUser(userId);
    return collaborations.map((c) => ({
      siteId: c.site.id,
      siteName: c.site.name,
      siteSlug: c.site.slug,
      role: c.role,
      seriesCount: c.site._count.series,
    }));
  },

  /**
   * Check if user has minimum role on site
   */
  async hasMinimumSiteRole(
    siteId: string,
    userId: bigint,
    minimumRole: CollaboratorRole
  ): Promise<boolean> {
    // Check if user is site owner first
    const site = await siteRepository.findById(siteId);
    if (site?.authorId === userId) {
      return true; // Owner has all permissions
    }

    const collaborator = await collaboratorRepository.findBySiteAndUser(siteId, userId);
    if (!collaborator || !collaborator.isActive) {
      return false;
    }

    return hasMinimumRole(collaborator.role, minimumRole);
  },
};

export type CollaboratorService = typeof collaboratorService;