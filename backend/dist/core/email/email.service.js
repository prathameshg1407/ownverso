"use strict";
// ==== FILE: src/core/email/email.service.ts ====
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
/**
 * Email Service
 *
 * Handles sending emails with template support.
 * Uses console logging in development, SendGrid in production.
 */
const config_1 = require("../../config");
const logger_1 = require("../../core/logger");
/**
 * Email templates configuration
 */
const EMAIL_TEMPLATES = {
    'welcome': {
        subject: 'Welcome to Ownverso!',
        getHtml: (data) => `
      <h1>Welcome to Ownverso, ${data.displayName}!</h1>
      <p>We're excited to have you on board.</p>
      <p>Please verify your email address by clicking the link below:</p>
      <p><a href="${data.verificationUrl}">Verify Email</a></p>
      <p>This link will expire in 24 hours.</p>
    `,
    },
    'email-verification': {
        subject: 'Verify your email address',
        getHtml: (data) => `
      <h1>Email Verification</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <p><a href="${data.verificationUrl}">Verify Email</a></p>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
    },
    'password-reset': {
        subject: 'Reset your password',
        getHtml: (data) => `
      <h1>Password Reset Request</h1>
      <p>You requested to reset your password. Click the link below to proceed:</p>
      <p><a href="${data.resetUrl}">Reset Password</a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
    `,
    },
    'password-changed': {
        subject: 'Your password has been changed',
        getHtml: (data) => `
      <h1>Password Changed</h1>
      <p>Your password was successfully changed on ${data.timestamp}.</p>
      <p>If you didn't make this change, please contact support immediately.</p>
    `,
    },
    'email-change-request': {
        subject: 'Confirm your new email address',
        getHtml: (data) => `
      <h1>Email Change Request</h1>
      <p>You requested to change your email address to ${data.newEmail}.</p>
      <p>Please click the link below to confirm:</p>
      <p><a href="${data.confirmationUrl}">Confirm Email Change</a></p>
      <p>This link will expire in 24 hours.</p>
    `,
    },
    'email-change-confirmation': {
        subject: 'Your email address has been changed',
        getHtml: (data) => `
      <h1>Email Changed</h1>
      <p>Your email address has been changed from ${data.oldEmail} to ${data.newEmail}.</p>
      <p>If you didn't make this change, please contact support immediately.</p>
    `,
    },
    'login-alert': {
        subject: 'New login to your account',
        getHtml: (data) => `
      <h1>New Login Detected</h1>
      <p>We detected a new login to your account:</p>
      <ul>
        <li>Time: ${data.timestamp}</li>
        <li>Device: ${data.device}</li>
        <li>Location: ${data.location}</li>
        <li>IP Address: ${data.ipAddress}</li>
      </ul>
      <p>If this wasn't you, please secure your account immediately.</p>
    `,
    },
    'mfa-enabled': {
        subject: 'Two-factor authentication enabled',
        getHtml: () => `
      <h1>MFA Enabled</h1>
      <p>Two-factor authentication has been enabled on your account.</p>
      <p>Your account is now more secure!</p>
    `,
    },
    'mfa-disabled': {
        subject: 'Two-factor authentication disabled',
        getHtml: () => `
      <h1>MFA Disabled</h1>
      <p>Two-factor authentication has been disabled on your account.</p>
      <p>We recommend keeping MFA enabled for better security.</p>
    `,
    },
    'account-locked': {
        subject: 'Your account has been locked',
        getHtml: (data) => `
      <h1>Account Locked</h1>
      <p>Your account has been temporarily locked due to too many failed login attempts.</p>
      <p>You can try again after ${data.unlockTime}.</p>
      <p>If you didn't attempt to log in, please reset your password.</p>
    `,
    },
    'account-unlocked': {
        subject: 'Your account has been unlocked',
        getHtml: () => `
      <h1>Account Unlocked</h1>
      <p>Your account has been unlocked. You can now log in.</p>
    `,
    },
};
/**
 * Build email HTML with wrapper
 */
function buildEmailHtml(template, data) {
    const templateConfig = EMAIL_TEMPLATES[template];
    const content = templateConfig.getHtml(data);
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${templateConfig.subject}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #1a1a1a; font-size: 24px; margin-bottom: 20px; }
          a { color: #6366f1; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        ${content}
        <div class="footer">
          <p>This email was sent by Ownverso. If you have questions, please contact support.</p>
          <p>&copy; ${new Date().getFullYear()} Ownverso. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;
}
/**
 * Email Service
 */
exports.emailService = {
    /**
     * Send an email
     */
    async send(options) {
        const { to, template, data } = options;
        const templateConfig = EMAIL_TEMPLATES[template];
        const subject = templateConfig.subject;
        const html = buildEmailHtml(template, data);
        // In development or if email is disabled, log to console
        if (!config_1.config.email.enabled || !config_1.config.email.sendgridApiKey) {
            logger_1.logger.info({
                to,
                subject,
                template,
                data,
            }, '📧 Email would be sent (dev mode)');
            // Log the important parts for testing
            if (data.verificationUrl) {
                logger_1.logger.info(`🔗 Verification URL: ${data.verificationUrl}`);
            }
            if (data.resetUrl) {
                logger_1.logger.info(`🔗 Reset URL: ${data.resetUrl}`);
            }
            if (data.confirmationUrl) {
                logger_1.logger.info(`🔗 Confirmation URL: ${data.confirmationUrl}`);
            }
            return {
                success: true,
                messageId: `dev-${Date.now()}`,
            };
        }
        // Production: Send via SendGrid
        try {
            const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config_1.config.email.sendgridApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    personalizations: [{ to: [{ email: to }] }],
                    from: {
                        email: config_1.config.email.from,
                        name: config_1.config.email.fromName,
                    },
                    subject,
                    content: [
                        { type: 'text/html', value: html },
                    ],
                }),
            });
            if (!response.ok) {
                const error = await response.text();
                logger_1.logger.error({ error, statusCode: response.status }, 'SendGrid API error');
                return {
                    success: false,
                    error: `SendGrid error: ${response.status}`,
                };
            }
            const messageId = response.headers.get('x-message-id') || `sg-${Date.now()}`;
            logger_1.logger.info({ to, template, messageId }, 'Email sent successfully');
            return {
                success: true,
                messageId,
            };
        }
        catch (error) {
            logger_1.logger.error({ error, to, template }, 'Failed to send email');
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    },
    /**
     * Send welcome email with verification link
     */
    async sendWelcomeEmail(to, displayName, verificationUrl) {
        return this.send({
            to,
            subject: 'Welcome to Ownverso!',
            template: 'welcome',
            data: { displayName, verificationUrl },
        });
    },
    /**
     * Send email verification email
     */
    async sendVerificationEmail(to, verificationUrl) {
        return this.send({
            to,
            subject: 'Verify your email address',
            template: 'email-verification',
            data: { verificationUrl },
        });
    },
    /**
     * Send password reset email
     */
    async sendPasswordResetEmail(to, resetUrl) {
        return this.send({
            to,
            subject: 'Reset your password',
            template: 'password-reset',
            data: { resetUrl },
        });
    },
    /**
     * Send password changed notification
     */
    async sendPasswordChangedEmail(to) {
        return this.send({
            to,
            subject: 'Your password has been changed',
            template: 'password-changed',
            data: { timestamp: new Date().toISOString() },
        });
    },
    /**
     * Send email change request
     */
    async sendEmailChangeRequestEmail(to, newEmail, confirmationUrl) {
        return this.send({
            to,
            subject: 'Confirm your new email address',
            template: 'email-change-request',
            data: { newEmail, confirmationUrl },
        });
    },
    /**
     * Send login alert
     */
    async sendLoginAlertEmail(to, deviceInfo) {
        return this.send({
            to,
            subject: 'New login to your account',
            template: 'login-alert',
            data: {
                ...deviceInfo,
                timestamp: new Date().toLocaleString(),
            },
        });
    },
    /**
     * Send account locked notification
     */
    async sendAccountLockedEmail(to, unlockTime) {
        return this.send({
            to,
            subject: 'Your account has been locked',
            template: 'account-locked',
            data: { unlockTime: unlockTime.toLocaleString() },
        });
    },
};
//# sourceMappingURL=email.service.js.map