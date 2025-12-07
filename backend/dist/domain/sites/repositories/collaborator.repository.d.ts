/**
 * Collaborator Repository
 */
import { Prisma } from '@prisma/client';
import type { InviteCollaboratorInput, UpdateCollaboratorInput, CollaboratorWithUser } from '../types/site.types';
export declare const collaboratorRepository: {
    /**
     * Create collaborator invitation
     */
    createInvite(input: InviteCollaboratorInput, inviteToken: string, invitedByUserId: bigint): Promise<{
        role: import("@prisma/client").$Enums.CollaboratorRole;
        userId: bigint;
        id: bigint;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        siteId: string;
        permissions: Prisma.JsonValue;
        invitedByEmail: string | null;
        inviteToken: string | null;
        invitedAt: Date;
        acceptedAt: Date | null;
        isActive: boolean;
        deactivatedAt: Date | null;
        deactivatedReason: string | null;
    }>;
    /**
     * Find by ID
     */
    findById(id: bigint): Promise<{
        role: import("@prisma/client").$Enums.CollaboratorRole;
        userId: bigint;
        id: bigint;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        siteId: string;
        permissions: Prisma.JsonValue;
        invitedByEmail: string | null;
        inviteToken: string | null;
        invitedAt: Date;
        acceptedAt: Date | null;
        isActive: boolean;
        deactivatedAt: Date | null;
        deactivatedReason: string | null;
    } | null>;
    /**
     * Find by ID with user
     */
    findByIdWithUser(id: bigint): Promise<CollaboratorWithUser | null>;
    /**
     * Find by invite token
     */
    findByInviteToken(token: string): Promise<{
        role: import("@prisma/client").$Enums.CollaboratorRole;
        userId: bigint;
        id: bigint;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        siteId: string;
        permissions: Prisma.JsonValue;
        invitedByEmail: string | null;
        inviteToken: string | null;
        invitedAt: Date;
        acceptedAt: Date | null;
        isActive: boolean;
        deactivatedAt: Date | null;
        deactivatedReason: string | null;
    } | null>;
    /**
     * Find by site and user
     */
    findBySiteAndUser(siteId: string, userId: bigint): Promise<{
        role: import("@prisma/client").$Enums.CollaboratorRole;
        userId: bigint;
        id: bigint;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        siteId: string;
        permissions: Prisma.JsonValue;
        invitedByEmail: string | null;
        inviteToken: string | null;
        invitedAt: Date;
        acceptedAt: Date | null;
        isActive: boolean;
        deactivatedAt: Date | null;
        deactivatedReason: string | null;
    } | null>;
    /**
     * Check if user is collaborator on site
     */
    isCollaborator(siteId: string, userId: bigint): Promise<boolean>;
    /**
     * Accept invitation
     */
    acceptInvite(id: bigint, userId: bigint): Promise<{
        role: import("@prisma/client").$Enums.CollaboratorRole;
        userId: bigint;
        id: bigint;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        siteId: string;
        permissions: Prisma.JsonValue;
        invitedByEmail: string | null;
        inviteToken: string | null;
        invitedAt: Date;
        acceptedAt: Date | null;
        isActive: boolean;
        deactivatedAt: Date | null;
        deactivatedReason: string | null;
    }>;
    /**
     * Update collaborator
     */
    update(id: bigint, input: UpdateCollaboratorInput): Promise<{
        role: import("@prisma/client").$Enums.CollaboratorRole;
        userId: bigint;
        id: bigint;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        siteId: string;
        permissions: Prisma.JsonValue;
        invitedByEmail: string | null;
        inviteToken: string | null;
        invitedAt: Date;
        acceptedAt: Date | null;
        isActive: boolean;
        deactivatedAt: Date | null;
        deactivatedReason: string | null;
    }>;
    /**
     * Remove collaborator
     */
    remove(id: bigint): Promise<{
        role: import("@prisma/client").$Enums.CollaboratorRole;
        userId: bigint;
        id: bigint;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        siteId: string;
        permissions: Prisma.JsonValue;
        invitedByEmail: string | null;
        inviteToken: string | null;
        invitedAt: Date;
        acceptedAt: Date | null;
        isActive: boolean;
        deactivatedAt: Date | null;
        deactivatedReason: string | null;
    }>;
    /**
     * Deactivate collaborator
     */
    deactivate(id: bigint, reason?: string): Promise<{
        role: import("@prisma/client").$Enums.CollaboratorRole;
        userId: bigint;
        id: bigint;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        siteId: string;
        permissions: Prisma.JsonValue;
        invitedByEmail: string | null;
        inviteToken: string | null;
        invitedAt: Date;
        acceptedAt: Date | null;
        isActive: boolean;
        deactivatedAt: Date | null;
        deactivatedReason: string | null;
    }>;
    /**
     * Find all collaborators for a site
     */
    findBySite(siteId: string): Promise<CollaboratorWithUser[]>;
    /**
     * Find active collaborators for a site
     */
    findActiveBySite(siteId: string): Promise<CollaboratorWithUser[]>;
    /**
     * Find sites where user is a collaborator
     */
    findSitesByUser(userId: bigint): Promise<({
        site: {
            _count: {
                series: number;
            };
        } & {
            status: import("@prisma/client").$Enums.SiteStatus;
            name: string;
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            tagline: string | null;
            slug: string;
            customDomain: string | null;
            authorId: bigint;
            logoUrl: string | null;
            faviconUrl: string | null;
            coverImageUrl: string | null;
            themeId: string | null;
            primaryColor: string | null;
            secondaryColor: string | null;
            accentColor: string | null;
            customCss: string | null;
            customCssEnabled: boolean;
            customDomainVerified: boolean;
            customDomainVerifiedAt: Date | null;
            customDomainDnsRecords: Prisma.JsonValue | null;
            sslEnabled: boolean;
            sslExpiresAt: Date | null;
            isPublic: boolean;
            maintenanceMode: boolean;
            maintenanceMessage: string | null;
            suspensionReason: string | null;
            suspendedAt: Date | null;
            metaTitle: string | null;
            metaDescription: string | null;
            ogImageUrl: string | null;
            googleAnalyticsId: string | null;
            analyticsEnabled: boolean;
            defaultContentRating: import("@prisma/client").$Enums.ContentRating;
            commentsEnabled: boolean;
            commentsModerationMode: import("@prisma/client").$Enums.CommentModerationMode;
            lastPublishedAt: Date | null;
        };
    } & {
        role: import("@prisma/client").$Enums.CollaboratorRole;
        userId: bigint;
        id: bigint;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        siteId: string;
        permissions: Prisma.JsonValue;
        invitedByEmail: string | null;
        inviteToken: string | null;
        invitedAt: Date;
        acceptedAt: Date | null;
        isActive: boolean;
        deactivatedAt: Date | null;
        deactivatedReason: string | null;
    })[]>;
    /**
     * Count collaborators for a site
     */
    countBySite(siteId: string): Promise<number>;
    /**
     * Delete expired invitations
     */
    deleteExpiredInvites(): Promise<number>;
};
export type CollaboratorRepository = typeof collaboratorRepository;
//# sourceMappingURL=collaborator.repository.d.ts.map