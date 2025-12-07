"use strict";
// ==== FILE: src/api/v1/collaborator/collaborator.schema.ts ====
/**
 * Collaborator Schemas
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCollaboratorSitesResponseSchema = exports.CollaboratorSiteSchema = exports.AcceptInviteResponseSchema = exports.InviteTokenParamSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const response_schema_1 = require("../../../schemas/common/response.schema");
const sites_schema_1 = require("../sites/sites.schema");
exports.InviteTokenParamSchema = typebox_1.Type.Object({
    token: typebox_1.Type.String({ minLength: 1 }),
});
exports.AcceptInviteResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ collaborator: sites_schema_1.CollaboratorSchema }));
exports.CollaboratorSiteSchema = typebox_1.Type.Object({
    siteId: typebox_1.Type.String(),
    siteName: typebox_1.Type.String(),
    siteSlug: typebox_1.Type.String(),
    role: sites_schema_1.CollaboratorRoleSchema,
    seriesCount: typebox_1.Type.Integer(),
});
exports.ListCollaboratorSitesResponseSchema = (0, response_schema_1.createSuccessResponseSchema)(typebox_1.Type.Object({ sites: typebox_1.Type.Array(exports.CollaboratorSiteSchema) }));
//# sourceMappingURL=collaborator.schema.js.map