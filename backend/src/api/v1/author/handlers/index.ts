// ==== FILE: src/api/v1/author/handlers/index.ts ====
/**
 * Author Handlers Barrel Export
 */

export * from './register-author.handler';
export * from './get-account.handler';
export * from './update-account.handler';
export * from './get-dashboard.handler';
export * from './get-stats.handler';

// Platform Subscription
export * from './platform-subscription/get-subscription.handler';
export * from './platform-subscription/list-plans.handler';
export * from './platform-subscription/subscribe.handler';
export * from './platform-subscription/change-plan.handler';
export * from './platform-subscription/cancel.handler';
export * from './platform-subscription/reactivate.handler';