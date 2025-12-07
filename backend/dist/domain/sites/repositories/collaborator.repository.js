"use strict";
// ==== FILE: src/domain/sites/repositories/collaborator.repository.ts ====
/**
 * Collaborator Repository
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.collaboratorRepository = void 0;
const database_1 = require("../../../core/database");
const logger_1 = require("../../../core/logger");
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
};
exports.collaboratorRepository = {
    /**
     * Create collaborator invitation
     */
    async createInvite(input, inviteToken, invitedByUserId) {
        // We need to find or create a placeholder for the invited user
        // For now, we'll create the collaborator record with the invitation details
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days to accept
        const collaborator = await database_1.prisma.collaborator.create({
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
        logger_1.logger.debug({ collaboratorId: collaborator.id.toString(), email: input.email }, 'Collaborator invitation created');
        return collaborator;
    },
    /**
     * Find by ID
     */
    async findById(id) {
        return database_1.prisma.collaborator.findUnique({ where: { id } });
    },
    /**
     * Find by ID with user
     */
    async findByIdWithUser(id) {
        return database_1.prisma.collaborator.findUnique({
            where: { id },
            include: COLLABORATOR_WITH_USER_INCLUDE,
        });
    },
    /**
     * Find by invite token
     */
    async findByInviteToken(token) {
        return database_1.prisma.collaborator.findUnique({
            where: { inviteToken: token },
        });
    },
    /**
     * Find by site and user
     */
    async findBySiteAndUser(siteId, userId) {
        return database_1.prisma.collaborator.findUnique({
            where: {
                siteId_userId: { siteId, userId },
            },
        });
    },
    /**
     * Check if user is collaborator on site
     */
    async isCollaborator(siteId, userId) {
        const count = await database_1.prisma.collaborator.count({
            where: { siteId, userId, isActive: true },
        });
        return count > 0;
    },
    /**
     * Accept invitation
     */
    async acceptInvite(id, userId) {
        return database_1.prisma.collaborator.update({
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
    async update(id, input) {
        const data = {};
        if (input.role !== undefined)
            data.role = input.role;
        if (input.permissions !== undefined)
            data.permissions = input.permissions;
        if (input.isActive !== undefined) {
            data.isActive = input.isActive;
            if (!input.isActive) {
                data.deactivatedAt = new Date();
            }
        }
        return database_1.prisma.collaborator.update({ where: { id }, data });
    },
    /**
     * Remove collaborator
     */
    async remove(id) {
        return database_1.prisma.collaborator.delete({ where: { id } });
    },
    /**
     * Deactivate collaborator
     */
    async deactivate(id, reason) {
        return database_1.prisma.collaborator.update({
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
    async findBySite(siteId) {
        return database_1.prisma.collaborator.findMany({
            where: { siteId },
            include: COLLABORATOR_WITH_USER_INCLUDE,
            orderBy: [{ role: 'desc' }, { createdAt: 'asc' }],
        });
    },
    /**
     * Find active collaborators for a site
     */
    async findActiveBySite(siteId) {
        return database_1.prisma.collaborator.findMany({
            where: { siteId, isActive: true },
            include: COLLABORATOR_WITH_USER_INCLUDE,
            orderBy: [{ role: 'desc' }, { createdAt: 'asc' }],
        });
    },
    /**
     * Find sites where user is a collaborator
     */
    async findSitesByUser(userId) {
        return database_1.prisma.collaborator.findMany({
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
    async countBySite(siteId) {
        return database_1.prisma.collaborator.count({
            where: { siteId, isActive: true },
        });
    },
    /**
     * Delete expired invitations
     */
    async deleteExpiredInvites() {
        const result = await database_1.prisma.collaborator.deleteMany({
            where: {
                acceptedAt: null,
                expiresAt: { lt: new Date() },
            },
        });
        if (result.count > 0) {
            logger_1.logger.info({ count: result.count }, 'Deleted expired collaborator invitations');
        }
        return result.count;
    },
};
//# sourceMappingURL=collaborator.repository.js.map