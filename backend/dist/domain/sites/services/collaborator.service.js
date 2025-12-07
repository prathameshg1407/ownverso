"use strict";
// ==== FILE: src/domain/sites/services/collaborator.service.ts ====
/**
 * Collaborator Service
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
exports.collaboratorService = void 0;
const logger_1 = require("../../../core/logger");
const errors_1 = require("../../../common/errors");
const constants_1 = require("../../../common/constants");
const collaborator_repository_1 = require("../repositories/collaborator.repository");
const site_repository_1 = require("../repositories/site.repository");
const user_repository_1 = require("../../../domain/users/repositories/user.repository");
const site_mapper_1 = require("../mappers/site.mapper");
const site_entity_1 = require("../entities/site.entity");
exports.collaboratorService = {
    /**
     * Invite a collaborator to a site
     */
    async inviteCollaborator(input, invitedByUserId) {
        // Validate site exists
        const site = await site_repository_1.siteRepository.findById(input.siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        // Check if email is already a collaborator
        const existingUser = await user_repository_1.userRepository.findByEmail(input.email);
        if (existingUser) {
            const existingCollab = await collaborator_repository_1.collaboratorRepository.findBySiteAndUser(input.siteId, existingUser.id);
            if (existingCollab) {
                throw new errors_1.ConflictError('This user is already a collaborator', constants_1.ERROR_CODES.COLLABORATOR_ALREADY_EXISTS);
            }
        }
        // Generate invite token
        const { nanoid } = await Promise.resolve().then(() => __importStar(require('nanoid')));
        const inviteToken = nanoid(32);
        const collaborator = await collaborator_repository_1.collaboratorRepository.createInvite(input, inviteToken, invitedByUserId);
        // TODO: Send invitation email
        logger_1.logger.info({ siteId: input.siteId, email: input.email }, 'Collaborator invitation sent');
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
    async acceptInvite(token, userId) {
        const invitation = await collaborator_repository_1.collaboratorRepository.findByInviteToken(token);
        if (!invitation) {
            throw new errors_1.NotFoundError('Invitation not found or expired', constants_1.ERROR_CODES.INVITE_NOT_FOUND);
        }
        // Check if expired
        if (invitation.expiresAt && invitation.expiresAt < new Date()) {
            throw new errors_1.BadRequestError('Invitation has expired', constants_1.ERROR_CODES.INVITE_EXPIRED);
        }
        // Check if user email matches invitation
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user) {
            throw new errors_1.NotFoundError('User not found', constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        if (invitation.invitedByEmail &&
            user.email.toLowerCase() !== invitation.invitedByEmail.toLowerCase()) {
            throw new errors_1.ForbiddenError('This invitation is for a different email address', constants_1.ERROR_CODES.FORBIDDEN);
        }
        // Accept the invitation
        const updated = await collaborator_repository_1.collaboratorRepository.acceptInvite(invitation.id, userId);
        const withUser = await collaborator_repository_1.collaboratorRepository.findByIdWithUser(updated.id);
        if (!withUser) {
            throw new errors_1.NotFoundError('Collaborator not found', constants_1.ERROR_CODES.NOT_FOUND);
        }
        logger_1.logger.info({ siteId: invitation.siteId, userId: userId.toString() }, 'Collaboration invitation accepted');
        return site_mapper_1.collaboratorMapper.toDTO(withUser);
    },
    /**
     * Get collaborator by ID
     */
    async getCollaborator(collaboratorId) {
        const collaborator = await collaborator_repository_1.collaboratorRepository.findByIdWithUser(collaboratorId);
        if (!collaborator) {
            throw new errors_1.NotFoundError('Collaborator not found', constants_1.ERROR_CODES.COLLABORATOR_NOT_FOUND);
        }
        return site_mapper_1.collaboratorMapper.toDTO(collaborator);
    },
    /**
     * List collaborators for a site
     */
    async listCollaborators(siteId) {
        const collaborators = await collaborator_repository_1.collaboratorRepository.findBySite(siteId);
        return collaborators.map((c) => site_mapper_1.collaboratorMapper.toDTO(c));
    },
    /**
     * Update collaborator
     */
    async updateCollaborator(collaboratorId, input) {
        const collaborator = await collaborator_repository_1.collaboratorRepository.findById(collaboratorId);
        if (!collaborator) {
            throw new errors_1.NotFoundError('Collaborator not found', constants_1.ERROR_CODES.COLLABORATOR_NOT_FOUND);
        }
        // Cannot change OWNER role
        if (collaborator.role === 'OWNER') {
            throw new errors_1.ForbiddenError('Cannot modify owner permissions', constants_1.ERROR_CODES.FORBIDDEN);
        }
        const updated = await collaborator_repository_1.collaboratorRepository.update(collaboratorId, input);
        const withUser = await collaborator_repository_1.collaboratorRepository.findByIdWithUser(updated.id);
        if (!withUser) {
            throw new errors_1.NotFoundError('Collaborator not found', constants_1.ERROR_CODES.NOT_FOUND);
        }
        logger_1.logger.info({ collaboratorId: collaboratorId.toString() }, 'Collaborator updated');
        return site_mapper_1.collaboratorMapper.toDTO(withUser);
    },
    /**
     * Remove collaborator
     */
    async removeCollaborator(collaboratorId) {
        const collaborator = await collaborator_repository_1.collaboratorRepository.findById(collaboratorId);
        if (!collaborator) {
            throw new errors_1.NotFoundError('Collaborator not found', constants_1.ERROR_CODES.COLLABORATOR_NOT_FOUND);
        }
        // Cannot remove OWNER
        if (collaborator.role === 'OWNER') {
            throw new errors_1.ForbiddenError('Cannot remove owner from site', constants_1.ERROR_CODES.FORBIDDEN);
        }
        await collaborator_repository_1.collaboratorRepository.remove(collaboratorId);
        logger_1.logger.info({ collaboratorId: collaboratorId.toString() }, 'Collaborator removed');
    },
    /**
     * Get sites where user is a collaborator
     */
    async getUserCollaborationSites(userId) {
        const collaborations = await collaborator_repository_1.collaboratorRepository.findSitesByUser(userId);
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
    async hasMinimumSiteRole(siteId, userId, minimumRole) {
        // Check if user is site owner first
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (site?.authorId === userId) {
            return true; // Owner has all permissions
        }
        const collaborator = await collaborator_repository_1.collaboratorRepository.findBySiteAndUser(siteId, userId);
        if (!collaborator || !collaborator.isActive) {
            return false;
        }
        return (0, site_entity_1.hasMinimumRole)(collaborator.role, minimumRole);
    },
};
//# sourceMappingURL=collaborator.service.js.map