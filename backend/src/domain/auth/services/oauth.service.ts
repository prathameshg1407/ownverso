// ==== FILE: src/domain/auth/services/oauth.service.ts ====
/**
 * OAuth Service
 * Social login with extensible provider support
 */

import type { AuthProvider } from '@prisma/client';

import { config } from '@/config';
import { logger } from '@/core/logger';
import { BadRequestError, ConflictError, NotFoundError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';
import { userRepository } from '@/domain/users/repositories/user.repository';

import { authAccountRepository } from '../repositories/auth-account.repository';
import { authService } from './auth.service';
import { authAccountMapper } from '../mappers/auth.mapper';
import type { OAuthProfile, AuthAccountDTO, DeviceInfo, LoginResult, UserWithSecurity } from '../types/auth.types';

// ─────────────────────────────────────────────────────────────────────────
// Provider Interface
// ─────────────────────────────────────────────────────────────────────────

interface OAuthProvider {
  getAuthorizationUrl(state: string): string;
  getProfile(code: string): Promise<OAuthProfile>;
}

// ─────────────────────────────────────────────────────────────────────────
// Google Provider
// ─────────────────────────────────────────────────────────────────────────

const googleProvider: OAuthProvider = {
  getAuthorizationUrl(state: string): string {
    const { clientId, callbackUrl, scopes } = config.auth.oauth.google;

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

  async getProfile(code: string): Promise<OAuthProfile> {
    const { clientId, clientSecret, callbackUrl } = config.auth.oauth.google;

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
      logger.error({ error }, 'Google token exchange failed');
      throw new BadRequestError('Failed to authenticate with Google', ERROR_CODES.EXTERNAL_SERVICE_ERROR);
    }

    const tokens = (await tokenResponse.json()) as {
      access_token: string;
      refresh_token?: string;
      expires_in: number;
      scope?: string;
    };

    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!userInfoResponse.ok) {
      throw new BadRequestError('Failed to get Google user info', ERROR_CODES.EXTERNAL_SERVICE_ERROR);
    }

    const userInfo = (await userInfoResponse.json()) as {
      id: string;
      email: string;
      name?: string;
      picture?: string;
    };

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

const providers: Partial<Record<AuthProvider, OAuthProvider>> = {
  GOOGLE: googleProvider,
};

function getProvider(provider: AuthProvider): OAuthProvider {
  const impl = providers[provider];
  if (!impl) {
    throw new BadRequestError(`${provider} OAuth not implemented`, ERROR_CODES.BAD_REQUEST);
  }
  return impl;
}

// ─────────────────────────────────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────────────────────────────────

export const oauthService = {
  /**
   * Get OAuth authorization URL
   */
  getAuthorizationUrl(provider: AuthProvider, state: string): string {
    return getProvider(provider).getAuthorizationUrl(state);
  },

  /**
   * Handle OAuth callback
   */
  async handleCallback(provider: AuthProvider, code: string, deviceInfo: DeviceInfo): Promise<LoginResult> {
    const profile = await getProvider(provider).getProfile(code);

    const existingAccount = await authAccountRepository.findByProviderAccount(provider, profile.providerAccountId);

 // ==== FILE: src/domain/auth/services/oauth.service.ts (continued) ====

    if (existingAccount) {
      return this.loginWithOAuthAccount(existingAccount.userId, provider, deviceInfo);
    }

    if (profile.email) {
      const existingUser = await userRepository.findByEmail(profile.email);
      if (existingUser) {
        await authAccountRepository.create({
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
  async loginWithOAuthAccount(
    userId: bigint,
    provider: AuthProvider,
    deviceInfo: DeviceInfo
  ): Promise<LoginResult> {
    const user = await userRepository.findWithSecurity(userId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    return authService.createAuthenticatedSession(user as UserWithSecurity, deviceInfo, provider);
  },

  /**
   * Create new user from OAuth profile
   */
  async createUserFromOAuth(profile: OAuthProfile, deviceInfo: DeviceInfo): Promise<LoginResult> {
    if (!profile.email) {
      throw new BadRequestError('Email required for registration', ERROR_CODES.BAD_REQUEST);
    }

    const baseUsername = this.generateUsername(profile.email);
    let username = baseUsername;
    let counter = 1;

    while (await userRepository.usernameExists(username)) {
      username = `${baseUsername}${counter++}`;
    }

    const user = await userRepository.create({
      email: profile.email,
      username,
      displayName: profile.name ?? username,
      status: 'ACTIVE',
      emailVerified: true,
    });

    await authAccountRepository.create({
      userId: user.id,
      provider: profile.provider,
      providerAccountId: profile.providerAccountId,
      providerEmail: profile.email,
      providerName: profile.name,
      providerAvatar: profile.avatar,
    });

    logger.info({ userId: user.publicId, provider: profile.provider }, 'User registered via OAuth');

    return authService.createAuthenticatedSession(user as unknown as UserWithSecurity, deviceInfo, profile.provider);
  },

  /**
   * Link OAuth account to existing user
   */
  async linkAccount(userId: bigint, provider: AuthProvider, code: string): Promise<AuthAccountDTO> {
    if (await authAccountRepository.hasProvider(userId, provider)) {
      throw new ConflictError(`${provider} already linked`, ERROR_CODES.CONFLICT);
    }

    const profile = await getProvider(provider).getProfile(code);

    const existingAccount = await authAccountRepository.findByProviderAccount(provider, profile.providerAccountId);

    if (existingAccount && existingAccount.userId !== userId) {
      throw new ConflictError(`${provider} account linked to another user`, ERROR_CODES.CONFLICT);
    }

    const account = await authAccountRepository.upsert({
      userId,
      provider,
      providerAccountId: profile.providerAccountId,
      providerEmail: profile.email,
      providerName: profile.name,
      providerAvatar: profile.avatar,
    });

    logger.info({ userId: userId.toString(), provider }, 'OAuth account linked');

    return authAccountMapper.toDTO(account);
  },

  /**
   * Unlink OAuth account from user
   */
  async unlinkAccount(userId: bigint, provider: AuthProvider): Promise<void> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    const providers = await authAccountRepository.findActiveByUserId(userId);
    const hasPassword = user.passwordHash !== null;

    if (!hasPassword && providers.length <= 1) {
      throw new BadRequestError('Cannot unlink only login method', ERROR_CODES.BAD_REQUEST);
    }

    const account = providers.find(a => a.provider === provider);
    if (!account) {
      throw new NotFoundError(`${provider} not linked`, ERROR_CODES.NOT_FOUND);
    }

    await authAccountRepository.revoke(account.id, 'User unlinked');

    logger.info({ userId: userId.toString(), provider }, 'OAuth account unlinked');
  },

  /**
   * Get all linked OAuth accounts for a user
   */
  async getLinkedAccounts(userId: bigint): Promise<AuthAccountDTO[]> {
    const accounts = await authAccountRepository.findActiveByUserId(userId);
    return authAccountMapper.toDTOList(accounts);
  },

  /**
   * Get list of available OAuth providers
   */
  getAvailableProviders(): Array<{ provider: AuthProvider; enabled: boolean }> {
    const { oauth } = config.auth;

    return [
      { provider: 'GOOGLE' as AuthProvider, enabled: !!oauth.google.clientId },
      { provider: 'APPLE' as AuthProvider, enabled: !!oauth.apple.clientId },
      { provider: 'TWITTER' as AuthProvider, enabled: !!oauth.twitter.clientId },
      { provider: 'DISCORD' as AuthProvider, enabled: !!oauth.discord.clientId },
      { provider: 'FACEBOOK' as AuthProvider, enabled: !!oauth.facebook.clientId },
    ];
  },

  /**
   * Generate username from email
   */
  generateUsername(email: string): string {
    const localPart = email.split('@')[0] ?? 'user';
    return localPart.toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 20) || 'user';
  },
} as const;

export type OAuthService = typeof oauthService;