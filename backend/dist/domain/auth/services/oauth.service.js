"use strict";
// ==== FILE: src/domain/auth/services/oauth.service.ts ====
/**
 * OAuth Service
 * Social login with extensible provider support
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthService = void 0;
const config_1 = require("../../../config");
const logger_1 = require("../../../core/logger");
const http_errors_1 = require("../../../common/errors/http.errors");
const error_codes_constants_1 = require("../../../common/constants/error-codes.constants");
const user_repository_1 = require("../../../domain/users/repositories/user.repository");
const auth_account_repository_1 = require("../repositories/auth-account.repository");
const auth_service_1 = require("./auth.service");
const auth_mapper_1 = require("../mappers/auth.mapper");
// ─────────────────────────────────────────────────────────────────────────
// Google Provider
// ─────────────────────────────────────────────────────────────────────────
const googleProvider = {
    getAuthorizationUrl(state) {
        const { clientId, callbackUrl, scopes } = config_1.config.auth.oauth.google;
        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: callbackUrl,
            response_type: 'code',
            scope: scopes.join(' '),
            state,
            access_type: 'offline',
            prompt: 'consent',
        });
        return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    },
    async getProfile(code) {
        const { clientId, clientSecret, callbackUrl } = config_1.config.auth.oauth.google;
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: callbackUrl,
                grant_type: 'authorization_code',
            }),
        });
        if (!tokenResponse.ok) {
            const error = await tokenResponse.text();
            logger_1.logger.error({ error }, 'Google token exchange failed');
            throw new http_errors_1.BadRequestError('Failed to authenticate with Google', error_codes_constants_1.ERROR_CODES.EXTERNAL_SERVICE_ERROR);
        }
        const tokens = (await tokenResponse.json());
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        });
        if (!userInfoResponse.ok) {
            throw new http_errors_1.BadRequestError('Failed to get Google user info', error_codes_constants_1.ERROR_CODES.EXTERNAL_SERVICE_ERROR);
        }
        const userInfo = (await userInfoResponse.json());
        return {
            provider: 'GOOGLE',
            providerAccountId: userInfo.id,
            email: userInfo.email,
            name: userInfo.name ?? null,
            avatar: userInfo.picture ?? null,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
            scopes: tokens.scope?.split(' '),
        };
    },
};
// ─────────────────────────────────────────────────────────────────────────
// Provider Registry
// ─────────────────────────────────────────────────────────────────────────
const providers = {
    GOOGLE: googleProvider,
};
function getProvider(provider) {
    const impl = providers[provider];
    if (!impl) {
        throw new http_errors_1.BadRequestError(`${provider} OAuth not implemented`, error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
    }
    return impl;
}
// ─────────────────────────────────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────────────────────────────────
exports.oauthService = {
    /**
     * Get OAuth authorization URL
     */
    getAuthorizationUrl(provider, state) {
        return getProvider(provider).getAuthorizationUrl(state);
    },
    /**
     * Handle OAuth callback
     */
    async handleCallback(provider, code, deviceInfo) {
        const profile = await getProvider(provider).getProfile(code);
        const existingAccount = await auth_account_repository_1.authAccountRepository.findByProviderAccount(provider, profile.providerAccountId);
        // ==== FILE: src/domain/auth/services/oauth.service.ts (continued) ====
        if (existingAccount) {
            return this.loginWithOAuthAccount(existingAccount.userId, provider, deviceInfo);
        }
        if (profile.email) {
            const existingUser = await user_repository_1.userRepository.findByEmail(profile.email);
            if (existingUser) {
                await auth_account_repository_1.authAccountRepository.create({
                    userId: existingUser.id,
                    provider,
                    providerAccountId: profile.providerAccountId,
                    providerEmail: profile.email,
                    providerName: profile.name,
                    providerAvatar: profile.avatar,
                });
                return this.loginWithOAuthAccount(existingUser.id, provider, deviceInfo);
            }
        }
        return this.createUserFromOAuth(profile, deviceInfo);
    },
    /**
     * Login with existing OAuth account
     */
    async loginWithOAuthAccount(userId, provider, deviceInfo) {
        const user = await user_repository_1.userRepository.findWithSecurity(userId);
        if (!user) {
            throw new http_errors_1.NotFoundError('User not found', error_codes_constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        return auth_service_1.authService.createAuthenticatedSession(user, deviceInfo, provider);
    },
    /**
     * Create new user from OAuth profile
     */
    async createUserFromOAuth(profile, deviceInfo) {
        if (!profile.email) {
            throw new http_errors_1.BadRequestError('Email required for registration', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
        }
        const baseUsername = this.generateUsername(profile.email);
        let username = baseUsername;
        let counter = 1;
        while (await user_repository_1.userRepository.usernameExists(username)) {
            username = `${baseUsername}${counter++}`;
        }
        const user = await user_repository_1.userRepository.create({
            email: profile.email,
            username,
            displayName: profile.name ?? username,
            status: 'ACTIVE',
            emailVerified: true,
        });
        await auth_account_repository_1.authAccountRepository.create({
            userId: user.id,
            provider: profile.provider,
            providerAccountId: profile.providerAccountId,
            providerEmail: profile.email,
            providerName: profile.name,
            providerAvatar: profile.avatar,
        });
        logger_1.logger.info({ userId: user.publicId, provider: profile.provider }, 'User registered via OAuth');
        return auth_service_1.authService.createAuthenticatedSession(user, deviceInfo, profile.provider);
    },
    /**
     * Link OAuth account to existing user
     */
    async linkAccount(userId, provider, code) {
        if (await auth_account_repository_1.authAccountRepository.hasProvider(userId, provider)) {
            throw new http_errors_1.ConflictError(`${provider} already linked`, error_codes_constants_1.ERROR_CODES.CONFLICT);
        }
        const profile = await getProvider(provider).getProfile(code);
        const existingAccount = await auth_account_repository_1.authAccountRepository.findByProviderAccount(provider, profile.providerAccountId);
        if (existingAccount && existingAccount.userId !== userId) {
            throw new http_errors_1.ConflictError(`${provider} account linked to another user`, error_codes_constants_1.ERROR_CODES.CONFLICT);
        }
        const account = await auth_account_repository_1.authAccountRepository.upsert({
            userId,
            provider,
            providerAccountId: profile.providerAccountId,
            providerEmail: profile.email,
            providerName: profile.name,
            providerAvatar: profile.avatar,
        });
        logger_1.logger.info({ userId: userId.toString(), provider }, 'OAuth account linked');
        return auth_mapper_1.authAccountMapper.toDTO(account);
    },
    /**
     * Unlink OAuth account from user
     */
    async unlinkAccount(userId, provider) {
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user) {
            throw new http_errors_1.NotFoundError('User not found', error_codes_constants_1.ERROR_CODES.USER_NOT_FOUND);
        }
        const providers = await auth_account_repository_1.authAccountRepository.findActiveByUserId(userId);
        const hasPassword = user.passwordHash !== null;
        if (!hasPassword && providers.length <= 1) {
            throw new http_errors_1.BadRequestError('Cannot unlink only login method', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
        }
        const account = providers.find(a => a.provider === provider);
        if (!account) {
            throw new http_errors_1.NotFoundError(`${provider} not linked`, error_codes_constants_1.ERROR_CODES.NOT_FOUND);
        }
        await auth_account_repository_1.authAccountRepository.revoke(account.id, 'User unlinked');
        logger_1.logger.info({ userId: userId.toString(), provider }, 'OAuth account unlinked');
    },
    /**
     * Get all linked OAuth accounts for a user
     */
    async getLinkedAccounts(userId) {
        const accounts = await auth_account_repository_1.authAccountRepository.findActiveByUserId(userId);
        return auth_mapper_1.authAccountMapper.toDTOList(accounts);
    },
    /**
     * Get list of available OAuth providers
     */
    getAvailableProviders() {
        const { oauth } = config_1.config.auth;
        return [
            { provider: 'GOOGLE', enabled: !!oauth.google.clientId },
            { provider: 'APPLE', enabled: !!oauth.apple.clientId },
            { provider: 'TWITTER', enabled: !!oauth.twitter.clientId },
            { provider: 'DISCORD', enabled: !!oauth.discord.clientId },
            { provider: 'FACEBOOK', enabled: !!oauth.facebook.clientId },
        ];
    },
    /**
     * Generate username from email
     */
    generateUsername(email) {
        const localPart = email.split('@')[0] ?? 'user';
        return localPart.toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 20) || 'user';
    },
};
//# sourceMappingURL=oauth.service.js.map