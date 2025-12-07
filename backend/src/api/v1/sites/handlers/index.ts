// ==== FILE: src/api/v1/sites/handlers/index.ts ====
/**
 * Sites Handlers Barrel Export
 */

// Core site handlers
export * from './list-sites.handler';
export * from './create-site.handler';
export * from './get-site.handler';
export * from './update-site.handler';
export * from './delete-site.handler';
export * from './get-site-stats.handler';
export * from './get-site-overview.handler';

// Settings handlers
export * from './settings/get-settings.handler';
export * from './settings/update-general.handler';
export * from './settings/update-branding.handler';
export * from './settings/update-theme.handler';
export * from './settings/update-seo.handler';
export * from './settings/update-analytics.handler';
export * from './settings/update-comments.handler';

// Domain handlers
export * from './domain/get-domain.handler';
export * from './domain/add-domain.handler';
export * from './domain/verify-domain.handler';
export * from './domain/remove-domain.handler';
export * from './domain/provision-ssl.handler';

// Page handlers
export * from './pages/list-pages.handler';
export * from './pages/create-page.handler';
export * from './pages/get-page.handler';
export * from './pages/update-page.handler';
export * from './pages/delete-page.handler';
export * from './pages/reorder-pages.handler';

// Collaborator handlers
export * from './collaborators/list-collaborators.handler';
export * from './collaborators/invite-collaborator.handler';
export * from './collaborators/get-collaborator.handler';
export * from './collaborators/update-collaborator.handler';
export * from './collaborators/remove-collaborator.handler';