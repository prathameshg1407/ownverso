/**
 * Collaborator Service
 */
import type { CollaboratorRole } from '@prisma/client';
import type { InviteCollaboratorInput, UpdateCollaboratorInput, CollaboratorDTO, CollaboratorInviteDTO } from '../types/site.types';
export declare const collaboratorService: {
    /**
     * Invite a collaborator to a site
     */
    inviteCollaborator(input: InviteCollaboratorInput, invitedByUserId: bigint): Promise<CollaboratorInviteDTO>;
    /**
     * Accept collaboration invitation
     */
    acceptInvite(token: string, userId: bigint): Promise<CollaboratorDTO>;
    /**
     * Get collaborator by ID
     */
    getCollaborator(collaboratorId: bigint): Promise<CollaboratorDTO>;
    /**
     * List collaborators for a site
     */
    listCollaborators(siteId: string): Promise<CollaboratorDTO[]>;
    /**
     * Update collaborator
     */
    updateCollaborator(collaboratorId: bigint, input: UpdateCollaboratorInput): Promise<CollaboratorDTO>;
    /**
     * Remove collaborator
     */
    removeCollaborator(collaboratorId: bigint): Promise<void>;
    /**
     * Get sites where user is a collaborator
     */
    getUserCollaborationSites(userId: bigint): Promise<{
        siteId: string;
        siteName: string;
        siteSlug: string;
        role: import("@prisma/client").$Enums.CollaboratorRole;
        seriesCount: number;
    }[]>;
    /**
     * Check if user has minimum role on site
     */
    hasMinimumSiteRole(siteId: string, userId: bigint, minimumRole: CollaboratorRole): Promise<boolean>;
};
export type CollaboratorService = typeof collaboratorService;
//# sourceMappingURL=collaborator.service.d.ts.map