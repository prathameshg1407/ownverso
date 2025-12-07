"use strict";
// ==== FILE: src/domain/sites/services/site-domain.service.ts ====
/**
 * Site Domain Service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteDomainService = void 0;
const logger_1 = require("../../../core/logger");
const errors_1 = require("../../../common/errors");
const constants_1 = require("../../../common/constants");
const site_repository_1 = require("../repositories/site.repository");
const site_mapper_1 = require("../mappers/site.mapper");
const site_entity_1 = require("../entities/site.entity");
exports.siteDomainService = {
    /**
     * Get domain configuration
     */
    async getDomain(siteId) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        return site_mapper_1.siteMapper.toDomainDTO(site);
    },
    /**
     * Add custom domain
     */
    async addDomain(siteId, domain) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        // Validate domain format
        if (!(0, site_entity_1.isValidDomain)(domain)) {
            throw new errors_1.BadRequestError('Invalid domain format', constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
        // Check if domain is already in use
        const domainExists = await site_repository_1.siteRepository.domainExists(domain, siteId);
        if (domainExists) {
            throw new errors_1.ConflictError('This domain is already in use', constants_1.ERROR_CODES.DOMAIN_ALREADY_EXISTS);
        }
        // TODO: Check if author's tier allows custom domains
        const updated = await site_repository_1.siteRepository.updateCustomDomain(siteId, domain, false);
        logger_1.logger.info({ siteId, domain }, 'Custom domain added');
        return site_mapper_1.siteMapper.toDomainDTO(updated);
    },
    /**
     * Verify custom domain
     */
    async verifyDomain(siteId) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        if (!site.customDomain) {
            throw new errors_1.BadRequestError('No custom domain configured', constants_1.ERROR_CODES.BAD_REQUEST);
        }
        if (site.customDomainVerified) {
            throw new errors_1.BadRequestError('Domain is already verified', constants_1.ERROR_CODES.BAD_REQUEST);
        }
        // TODO: Implement actual DNS verification
        // 1. Check CNAME record points to sites.ownverso.com
        // 2. Check TXT record for verification token
        // For now, we'll simulate verification
        const isVerified = await this.checkDnsRecords(site.customDomain, siteId);
        if (!isVerified) {
            throw new errors_1.BadRequestError('DNS records not properly configured. Please check your DNS settings.', constants_1.ERROR_CODES.DOMAIN_VERIFICATION_FAILED);
        }
        const updated = await site_repository_1.siteRepository.verifyCustomDomain(siteId);
        logger_1.logger.info({ siteId, domain: site.customDomain }, 'Custom domain verified');
        return site_mapper_1.siteMapper.toDomainDTO(updated);
    },
    /**
     * Remove custom domain
     */
    async removeDomain(siteId) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        if (!site.customDomain) {
            throw new errors_1.BadRequestError('No custom domain configured', constants_1.ERROR_CODES.BAD_REQUEST);
        }
        await site_repository_1.siteRepository.updateCustomDomain(siteId, null);
        logger_1.logger.info({ siteId, domain: site.customDomain }, 'Custom domain removed');
    },
    /**
     * Provision SSL certificate
     */
    async provisionSsl(siteId) {
        const site = await site_repository_1.siteRepository.findById(siteId);
        if (!site) {
            throw new errors_1.NotFoundError('Site not found', constants_1.ERROR_CODES.SITE_NOT_FOUND);
        }
        if (!site.customDomain) {
            throw new errors_1.BadRequestError('No custom domain configured', constants_1.ERROR_CODES.BAD_REQUEST);
        }
        if (!site.customDomainVerified) {
            throw new errors_1.BadRequestError('Domain must be verified before provisioning SSL', constants_1.ERROR_CODES.BAD_REQUEST);
        }
        // TODO: Implement actual SSL provisioning with Let's Encrypt or Cloudflare
        // For now, simulate SSL provisioning
        const expiresAt = new Date();
        expiresAt.setFullYear(expiresAt.getFullYear() + 1); // 1 year validity
        const updated = await site_repository_1.siteRepository.updateSslStatus(siteId, true, expiresAt);
        logger_1.logger.info({ siteId, domain: site.customDomain }, 'SSL certificate provisioned');
        return site_mapper_1.siteMapper.toDomainDTO(updated);
    },
    /**
     * Check DNS records (placeholder implementation)
     */
    async checkDnsRecords(domain, siteId) {
        // TODO: Implement actual DNS lookup
        // 1. Resolve CNAME for the domain
        // 2. Check TXT record for verification token
        // For development, return true
        logger_1.logger.debug({ domain, siteId }, 'Checking DNS records');
        return true;
    },
    /**
     * Get DNS records that need to be configured
     */
    getDnsInstructions(siteId, domain) {
        return {
            cname: {
                type: 'CNAME',
                name: domain,
                value: 'sites.ownverso.com',
                ttl: 3600,
            },
            txt: {
                type: 'TXT',
                name: `_ownverso.${domain}`,
                value: `site-verify=${siteId}`,
                ttl: 3600,
            },
        };
    },
};
//# sourceMappingURL=site-domain.service.js.map