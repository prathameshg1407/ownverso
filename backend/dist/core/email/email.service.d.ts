/**
 * Email template types
 */
export type EmailTemplate = 'welcome' | 'email-verification' | 'password-reset' | 'password-changed' | 'email-change-request' | 'email-change-confirmation' | 'login-alert' | 'mfa-enabled' | 'mfa-disabled' | 'account-locked' | 'account-unlocked';
/**
 * Email send options
 */
export interface SendEmailOptions {
    to: string;
    subject: string;
    template: EmailTemplate;
    data: Record<string, unknown>;
}
/**
 * Email send result
 */
export interface SendEmailResult {
    success: boolean;
    messageId?: string;
    error?: string;
}
/**
 * Email Service
 */
export declare const emailService: {
    /**
     * Send an email
     */
    send(options: SendEmailOptions): Promise<SendEmailResult>;
    /**
     * Send welcome email with verification link
     */
    sendWelcomeEmail(to: string, displayName: string, verificationUrl: string): Promise<SendEmailResult>;
    /**
     * Send email verification email
     */
    sendVerificationEmail(to: string, verificationUrl: string): Promise<SendEmailResult>;
    /**
     * Send password reset email
     */
    sendPasswordResetEmail(to: string, resetUrl: string): Promise<SendEmailResult>;
    /**
     * Send password changed notification
     */
    sendPasswordChangedEmail(to: string): Promise<SendEmailResult>;
    /**
     * Send email change request
     */
    sendEmailChangeRequestEmail(to: string, newEmail: string, confirmationUrl: string): Promise<SendEmailResult>;
    /**
     * Send login alert
     */
    sendLoginAlertEmail(to: string, deviceInfo: {
        device: string;
        location: string;
        ipAddress: string;
    }): Promise<SendEmailResult>;
    /**
     * Send account locked notification
     */
    sendAccountLockedEmail(to: string, unlockTime: Date): Promise<SendEmailResult>;
};
export type EmailService = typeof emailService;
//# sourceMappingURL=email.service.d.ts.map