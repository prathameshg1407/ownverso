// ==== FILE: src/lib/validation/index.ts ====
/**
 * Validation Schemas Barrel Export
 */

// Auth schemas
export {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  mfaCodeSchema,
  mfaBackupCodeSchema,
  mfaDisableSchema,
  emailChangeSchema,
  type LoginFormData,
  type RegisterFormData,
  type ForgotPasswordFormData,
  type ResetPasswordFormData,
  type ChangePasswordFormData,
  type MfaCodeFormData,
  type MfaBackupCodeFormData,
  type MfaDisableFormData,
  type EmailChangeFormData,
} from './auth.schema';

// User schemas
export {
  dataRegionSchema,
  emailDigestFrequencySchema,
  contentRatingSchema,
  updateUserSchema,
  updateProfileSchema,
  notificationPreferencesSchema,
  privacyPreferencesSchema,
  contentPreferencesSchema,
  updatePreferencesSchema,
  deleteAccountSchema,
  type UpdateUserFormData,
  type UpdateProfileFormData,
  type NotificationPreferencesFormData,
  type PrivacyPreferencesFormData,
  type ContentPreferencesFormData,
  type UpdatePreferencesFormData,
  type DeleteAccountFormData,
} from './user.schema';

// Author schemas
export {
  registerAuthorSchema,
  updateAuthorAccountSchema,
  type RegisterAuthorFormData,
  type UpdateAuthorAccountFormData,
} from './author.schema';

// Site schemas
export {
  createSiteSchema,
  updateSiteGeneralSchema,
  updateSiteBrandingSchema,
  updateSiteThemeSchema,
  updateSiteSeoSchema,
  updateSiteAnalyticsSchema,
  updateSiteCommentsSchema,
  addDomainSchema,
  createPageSchema,
  updatePageSchema,
  inviteCollaboratorSchema,
  updateCollaboratorSchema,
  type CreateSiteFormData,
  type UpdateSiteGeneralFormData,
  type UpdateSiteBrandingFormData,
  type UpdateSiteThemeFormData,
  type UpdateSiteSeoFormData,
  type UpdateSiteAnalyticsFormData,
  type UpdateSiteCommentsFormData,
  type AddDomainFormData,
  type CreatePageFormData,
  type UpdatePageFormData,
  type InviteCollaboratorFormData,
  type UpdateCollaboratorFormData,
} from './site.schema';