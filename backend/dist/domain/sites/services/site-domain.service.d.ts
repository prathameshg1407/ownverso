/**
 * Site Domain Service
 */
import type { SiteDomainDTO } from '../types/site.types';
export declare const siteDomainService: {
    /**
     * Get domain configuration
     */
    getDomain(siteId: string): Promise<SiteDomainDTO>;
    /**
     * Add custom domain
     */
    addDomain(siteId: string, domain: string): Promise<SiteDomainDTO>;
    /**
     * Verify custom domain
     */
    verifyDomain(siteId: string): Promise<SiteDomainDTO>;
    /**
     * Remove custom domain
     */
    removeDomain(siteId: string): Promise<void>;
    /**
     * Provision SSL certificate
     */
    provisionSsl(siteId: string): Promise<SiteDomainDTO>;
    /**
     * Check DNS records (placeholder implementation)
     */
    checkDnsRecords(domain: string, siteId: string): Promise<boolean>;
    /**
     * Get DNS records that need to be configured
     */
    getDnsInstructions(siteId: string, domain: string): {
        cname: {
            type: string;
            name: string;
            value: string;
            ttl: number;
        };
        txt: {
            type: string;
            name: string;
            value: string;
            ttl: number;
        };
    };
};
export type SiteDomainService = typeof siteDomainService;
//# sourceMappingURL=site-domain.service.d.ts.map