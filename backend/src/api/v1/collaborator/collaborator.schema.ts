// ==== FILE: src/api/v1/collaborator/collaborator.schema.ts ====
/**
 * Collaborator Schemas
 */

import { Type, Static } from '@sinclair/typebox';
import { createSuccessResponseSchema } from '@/schemas/common/response.schema';
import { CollaboratorSchema, CollaboratorRoleSchema } from '../sites/sites.schema';

export const InviteTokenParamSchema = Type.Object({
  token: Type.String({ minLength: 1 }),
});
export type InviteTokenParam = Static<typeof InviteTokenParamSchema>;

export const AcceptInviteResponseSchema = createSuccessResponseSchema(
  Type.Object({ collaborator: CollaboratorSchema })
);
export type AcceptInviteResponse = Static<typeof AcceptInviteResponseSchema>;

export const CollaboratorSiteSchema = Type.Object({
  siteId: Type.String(),
  siteName: Type.String(),
  siteSlug: Type.String(),
  role: CollaboratorRoleSchema,
  seriesCount: Type.Integer(),
});

export const ListCollaboratorSitesResponseSchema = createSuccessResponseSchema(
  Type.Object({ sites: Type.Array(CollaboratorSiteSchema) })
);
export type ListCollaboratorSitesResponse = Static<typeof ListCollaboratorSitesResponseSchema>;