/**
 * Collaborator Schemas
 */
import { Static } from '@sinclair/typebox';
export declare const InviteTokenParamSchema: import("@sinclair/typebox").TObject<{
    token: import("@sinclair/typebox").TString;
}>;
export type InviteTokenParam = Static<typeof InviteTokenParamSchema>;
export declare const AcceptInviteResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        collaborator: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            userId: import("@sinclair/typebox").TString;
            username: import("@sinclair/typebox").TString;
            displayName: import("@sinclair/typebox").TString;
            avatarUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"VIEWER">, import("@sinclair/typebox").TLiteral<"EDITOR">, import("@sinclair/typebox").TLiteral<"TRANSLATOR">, import("@sinclair/typebox").TLiteral<"ANALYST">, import("@sinclair/typebox").TLiteral<"MANAGER">, import("@sinclair/typebox").TLiteral<"OWNER">]>;
            permissions: import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean>;
            isActive: import("@sinclair/typebox").TBoolean;
            invitedAt: import("@sinclair/typebox").TString;
            acceptedAt: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        }>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type AcceptInviteResponse = Static<typeof AcceptInviteResponseSchema>;
export declare const CollaboratorSiteSchema: import("@sinclair/typebox").TObject<{
    siteId: import("@sinclair/typebox").TString;
    siteName: import("@sinclair/typebox").TString;
    siteSlug: import("@sinclair/typebox").TString;
    role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"VIEWER">, import("@sinclair/typebox").TLiteral<"EDITOR">, import("@sinclair/typebox").TLiteral<"TRANSLATOR">, import("@sinclair/typebox").TLiteral<"ANALYST">, import("@sinclair/typebox").TLiteral<"MANAGER">, import("@sinclair/typebox").TLiteral<"OWNER">]>;
    seriesCount: import("@sinclair/typebox").TInteger;
}>;
export declare const ListCollaboratorSitesResponseSchema: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TObject<{
        sites: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            siteId: import("@sinclair/typebox").TString;
            siteName: import("@sinclair/typebox").TString;
            siteSlug: import("@sinclair/typebox").TString;
            role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"VIEWER">, import("@sinclair/typebox").TLiteral<"EDITOR">, import("@sinclair/typebox").TLiteral<"TRANSLATOR">, import("@sinclair/typebox").TLiteral<"ANALYST">, import("@sinclair/typebox").TLiteral<"MANAGER">, import("@sinclair/typebox").TLiteral<"OWNER">]>;
            seriesCount: import("@sinclair/typebox").TInteger;
        }>>;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ListCollaboratorSitesResponse = Static<typeof ListCollaboratorSitesResponseSchema>;
//# sourceMappingURL=collaborator.schema.d.ts.map