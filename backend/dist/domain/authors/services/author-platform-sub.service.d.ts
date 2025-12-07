/**
 * Author Platform Subscription Service
 */
import type { PlatformTier, BillingCycle } from '@prisma/client';
import type { PlatformSubscriptionDTO, PlatformPlanDTO } from '../types/author.types';
export declare const authorPlatformSubService: {
    /**
     * Get all available platform plans
     */
    listPlans(): Promise<PlatformPlanDTO[]>;
    /**
     * Get specific plan by tier
     */
    getPlan(tier: PlatformTier): Promise<PlatformPlanDTO>;
    /**
     * Get current subscription
     */
    getSubscription(userId: bigint): Promise<PlatformSubscriptionDTO>;
    /**
     * Subscribe to a plan
     */
    subscribe(userId: bigint, tier: PlatformTier, billingCycle: BillingCycle): Promise<PlatformSubscriptionDTO>;
    /**
     * Change subscription plan
     */
    changePlan(userId: bigint, newTier: PlatformTier): Promise<PlatformSubscriptionDTO>;
    /**
     * Cancel subscription
     */
    cancel(userId: bigint): Promise<PlatformSubscriptionDTO>;
    /**
     * Reactivate cancelled subscription
     */
    reactivate(userId: bigint): Promise<PlatformSubscriptionDTO>;
};
export type AuthorPlatformSubService = typeof authorPlatformSubService;
//# sourceMappingURL=author-platform-sub.service.d.ts.map