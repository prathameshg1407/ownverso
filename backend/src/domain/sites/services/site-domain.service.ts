// ==== FILE: src/domain/sites/services/site-domain.service.ts ====
/**
 * Site Domain Service
 */

import { logger } from '@/core/logger';
import { NotFoundError, BadRequestError, ConflictError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { siteRepository } from '../repositories/site.repository';
import { siteMapper } from '../mappers/site.mapper';
import { isValidDomain } from '../entities/site.entity';
import type { SiteDomainDTO } from '../types/site.types';

export const siteDomainService = {
  /**
   * Get domain configuration
   */
  async getDomain(siteId: string): Promise<SiteDomainDTO> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }
    return siteMapper.toDomainDTO(site);
  },

  /**
   * Add custom domain
   */
  async addDomain(siteId: string, domain: string): Promise<SiteDomainDTO> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    // Validate domain format
    if (!isValidDomain(domain)) {
      throw new BadRequestError(
        'Invalid domain format',
        ERROR_CODES.VALIDATION_ERROR
      );
    }

    // Check if domain is already in use
    const domainExists = await siteRepository.domainExists(domain, siteId);
    if (domainExists) {
      throw new ConflictError(
        'This domain is already in use',
        ERROR_CODES.DOMAIN_ALREADY_EXISTS
      );
    }

    // TODO: Check if author's tier allows custom domains

    const updated = await siteRepository.updateCustomDomain(siteId, domain, false);

    logger.info({ siteId, domain }, 'Custom domain added');

    return siteMapper.toDomainDTO(updated);
  },

  /**
   * Verify custom domain
   */
  async verifyDomain(siteId: string): Promise<SiteDomainDTO> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    if (!site.customDomain) {
      throw new BadRequestError(
        'No custom domain configured',
        ERROR_CODES.BAD_REQUEST
      );
    }

    if (site.customDomainVerified) {
      throw new BadRequestError(
        'Domain is already verified',
        ERROR_CODES.BAD_REQUEST
      );
    }

    // TODO: Implement actual DNS verification
    // 1. Check CNAME record points to sites.ownverso.com
    // 2. Check TXT record for verification token
    // For now, we'll simulate verification

    const isVerified = await this.checkDnsRecords(site.customDomain, siteId);

    if (!isVerified) {
      throw new BadRequestError(
        'DNS records not properly configured. Please check your DNS settings.',
        ERROR_CODES.DOMAIN_VERIFICATION_FAILED
      );
    }

    const updated = await siteRepository.verifyCustomDomain(siteId);

    logger.info({ siteId, domain: site.customDomain }, 'Custom domain verified');

    return siteMapper.toDomainDTO(updated);
  },

  /**
   * Remove custom domain
   */
  async removeDomain(siteId: string): Promise<void> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    if (!site.customDomain) {
      throw new BadRequestError(
        'No custom domain configured',
        ERROR_CODES.BAD_REQUEST
      );
    }

    await siteRepository.updateCustomDomain(siteId, null);

    logger.info({ siteId, domain: site.customDomain }, 'Custom domain removed');
  },

  /**
   * Provision SSL certificate
   */
  async provisionSsl(siteId: string): Promise<SiteDomainDTO> {
    const site = await siteRepository.findById(siteId);
    if (!site) {
      throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
    }

    if (!site.customDomain) {
      throw new BadRequestError(
        'No custom domain configured',
        ERROR_CODES.BAD_REQUEST
      );
    }

    if (!site.customDomainVerified) {
      throw new BadRequestError(
        'Domain must be verified before provisioning SSL',
        ERROR_CODES.BAD_REQUEST
      );
    }

    // TODO: Implement actual SSL provisioning with Let's Encrypt or Cloudflare
    // For now, simulate SSL provisioning

    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1); // 1 year validity

    const updated = await siteRepository.updateSslStatus(siteId, true, expiresAt);

    logger.info({ siteId, domain: site.customDomain }, 'SSL certificate provisioned');

    return siteMapper.toDomainDTO(updated);
  },

  /**
   * Check DNS records (placeholder implementation)
   */
  async checkDnsRecords(domain: string, siteId: string): Promise<boolean> {
    // TODO: Implement actual DNS lookup
    // 1. Resolve CNAME for the domain
    // 2. Check TXT record for verification token

    // For development, return true
    logger.debug({ domain, siteId }, 'Checking DNS records');
    return true;
  },

  /**
   * Get DNS records that need to be configured
   */
  getDnsInstructions(siteId: string, domain: string) {
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

export type SiteDomainService = typeof siteDomainService;