# Complete API Reference for Ownverso Platform

This document provides a comprehensive list of all APIs needed to support the Ownverso platform based on the Prisma schema.

---

## Table of Contents

1. [Authentication & Authorization](#1-authentication--authorization)
2. [User Management](#2-user-management)
3. [Author & Site Management](#3-author--site-management)
4. [Content Management](#4-content-management)
5. [Translations](#5-translations)
6. [Monetization - Subscriptions](#6-monetization---subscriptions)
7. [Monetization - Payments](#7-monetization---payments)
8. [Monetization - Products & Purchases](#8-monetization---products--purchases)
9. [Reader Engagement](#9-reader-engagement)
10. [Social Features](#10-social-features)
11. [Communication](#11-communication)
12. [Moderation](#12-moderation)
13. [Support](#13-support)
14. [AI Features](#14-ai-features)
15. [Media & Files](#15-media--files)
16. [Social Connections](#16-social-connections)
17. [Scheduling & Calendar](#17-scheduling--calendar)
18. [Writing Tools](#18-writing-tools)
19. [Import/Export](#19-importexport)
20. [Analytics](#20-analytics)
21. [A/B Testing](#21-ab-testing)
22. [Webhooks](#22-webhooks)
23. [GDPR & Data Management](#23-gdpr--data-management)
24. [Platform Administration](#24-platform-administration)
25. [Public/Discovery APIs](#25-publicdiscovery-apis)

---

## API Design Conventions

```
Base URL: https://api.ownverso.com/v1

Authentication:
- Bearer Token: Authorization: Bearer <access_token>
- API Key: X-API-Key: <api_key>

Response Format:
{
  "success": boolean,
  "data": object | array | null,
  "error": {
    "code": string,
    "message": string,
    "details": object
  } | null,
  "meta": {
    "page": number,
    "perPage": number,
    "total": number,
    "totalPages": number
  } | null
}

HTTP Status Codes:
- 200: Success
- 201: Created
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 422: Unprocessable Entity
- 429: Rate Limited
- 500: Internal Server Error
```

---

## 1. Authentication & Authorization

### 1.1 Registration & Login

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/register` | Register new user | Public |
| `POST` | `/auth/login` | Login with email/password | Public |
| `POST` | `/auth/logout` | Logout current session | User |
| `POST` | `/auth/logout-all` | Logout all sessions | User |
| `POST` | `/auth/refresh` | Refresh access token | Refresh Token |
| `GET` | `/auth/me` | Get current user | User |

### 1.2 OAuth/SSO

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/auth/oauth/{provider}` | Initiate OAuth flow | Public |
| `GET` | `/auth/oauth/{provider}/callback` | OAuth callback | Public |
| `POST` | `/auth/oauth/{provider}/link` | Link OAuth to existing account | User |
| `DELETE` | `/auth/oauth/{provider}/unlink` | Unlink OAuth provider | User |
| `GET` | `/auth/oauth/accounts` | List linked OAuth accounts | User |

### 1.3 Email Verification

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/email/verify` | Verify email with token | Public |
| `POST` | `/auth/email/resend-verification` | Resend verification email | User |
| `POST` | `/auth/email/change` | Request email change | User |
| `POST` | `/auth/email/confirm-change` | Confirm email change | Public |

### 1.4 Password Management

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/password/forgot` | Request password reset | Public |
| `POST` | `/auth/password/reset` | Reset password with token | Public |
| `PUT` | `/auth/password/change` | Change password (logged in) | User |
| `GET` | `/auth/password/strength` | Check password strength | Public |

### 1.5 Multi-Factor Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/mfa/setup` | Initialize MFA setup | User |
| `POST` | `/auth/mfa/verify-setup` | Complete MFA setup | User |
| `POST` | `/auth/mfa/verify` | Verify MFA code during login | Partial |
| `DELETE` | `/auth/mfa/disable` | Disable MFA | User |
| `GET` | `/auth/mfa/backup-codes` | Get backup codes | User |
| `POST` | `/auth/mfa/backup-codes/regenerate` | Regenerate backup codes | User |
| `POST` | `/auth/mfa/recover` | Recover with backup code | Public |

### 1.6 Session Management

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/auth/sessions` | List active sessions | User |
| `GET` | `/auth/sessions/{id}` | Get session details | User |
| `DELETE` | `/auth/sessions/{id}` | Revoke specific session | User |
| `DELETE` | `/auth/sessions` | Revoke all other sessions | User |

---

## 2. User Management

### 2.1 User Profile

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/users/me` | Get current user full profile | User |
| `PUT` | `/users/me` | Update current user | User |
| `PATCH` | `/users/me/profile` | Update profile info | User |
| `PATCH` | `/users/me/preferences` | Update preferences | User |
| `DELETE` | `/users/me` | Delete account (initiate) | User |
| `GET` | `/users/{username}` | Get public user profile | Public |
| `GET` | `/users/id/{publicId}` | Get user by public ID | Public |

### 2.2 User Security

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/users/me/security` | Get security settings | User |
| `PUT` | `/users/me/security` | Update security settings | User |
| `GET` | `/users/me/security/login-history` | Get login history | User |
| `POST` | `/users/me/security/force-logout` | Force logout everywhere | User |

### 2.3 Avatar & Media

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/users/me/avatar` | Upload avatar | User |
| `DELETE` | `/users/me/avatar` | Remove avatar | User |

### 2.4 User Search (Admin)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/admin/users` | List/search users | Admin |
| `GET` | `/admin/users/{id}` | Get user details | Admin |
| `PUT` | `/admin/users/{id}` | Update user | Admin |
| `PUT` | `/admin/users/{id}/status` | Change user status | Admin |
| `PUT` | `/admin/users/{id}/role` | Change user role | Admin |
| `POST` | `/admin/users/{id}/impersonate` | Impersonate user | SuperAdmin |

---

## 3. Author & Site Management

### 3.1 Author Account

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/author/register` | Register as author | User |
| `GET` | `/author/account` | Get author account | Author |
| `PUT` | `/author/account` | Update author account | Author |
| `GET` | `/author/dashboard` | Get dashboard summary | Author |
| `GET` | `/author/stats` | Get author statistics | Author |

### 3.2 Platform Subscription (Author Tiers)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/author/subscription` | Get current subscription | Author |
| `GET` | `/author/subscription/plans` | List available plans | Author |
| `POST` | `/author/subscription/subscribe` | Subscribe to plan | Author |
| `PUT` | `/author/subscription/change` | Change plan | Author |
| `POST` | `/author/subscription/cancel` | Cancel subscription | Author |
| `POST` | `/author/subscription/reactivate` | Reactivate subscription | Author |
| `GET` | `/author/subscription/usage` | Get usage statistics | Author |
| `GET` | `/author/subscription/invoices` | List platform invoices | Author |
| `GET` | `/author/subscription/invoices/{id}` | Get invoice details | Author |

### 3.3 Sites

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites` | List author's sites | Author |
| `POST` | `/sites` | Create new site | Author |
| `GET` | `/sites/{siteId}` | Get site details | Author |
| `PUT` | `/sites/{siteId}` | Update site | Author |
| `DELETE` | `/sites/{siteId}` | Delete site | Author |
| `GET` | `/sites/{siteId}/stats` | Get site statistics | Author |

### 3.4 Site Settings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/settings` | Get all settings | Author |
| `PUT` | `/sites/{siteId}/settings/branding` | Update branding | Author |
| `PUT` | `/sites/{siteId}/settings/theme` | Update theme | Author |
| `PUT` | `/sites/{siteId}/settings/seo` | Update SEO | Author |
| `PUT` | `/sites/{siteId}/settings/analytics` | Update analytics | Author |
| `PUT` | `/sites/{siteId}/settings/comments` | Update comment settings | Author |

### 3.5 Custom Domains

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/domain` | Get domain settings | Author |
| `POST` | `/sites/{siteId}/domain` | Add custom domain | Author |
| `POST` | `/sites/{siteId}/domain/verify` | Verify domain DNS | Author |
| `DELETE` | `/sites/{siteId}/domain` | Remove custom domain | Author |
| `GET` | `/sites/{siteId}/domain/dns-records` | Get required DNS records | Author |
| `POST` | `/sites/{siteId}/domain/ssl/provision` | Provision SSL | Author |

### 3.6 Pages

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/pages` | List pages | Author |
| `POST` | `/sites/{siteId}/pages` | Create page | Author |
| `GET` | `/sites/{siteId}/pages/{pageId}` | Get page | Author |
| `PUT` | `/sites/{siteId}/pages/{pageId}` | Update page | Author |
| `DELETE` | `/sites/{siteId}/pages/{pageId}` | Delete page | Author |
| `PUT` | `/sites/{siteId}/pages/reorder` | Reorder pages | Author |

### 3.7 Themes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/themes` | List available themes | Author |
| `GET` | `/themes/{themeId}` | Get theme details | Author |
| `GET` | `/themes/{themeId}/preview` | Preview theme | Author |
| `POST` | `/sites/{siteId}/theme/apply` | Apply theme to site | Author |
| `PUT` | `/sites/{siteId}/theme/customize` | Customize theme | Author |

### 3.8 Collaborators

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/collaborators` | List collaborators | Author |
| `POST` | `/sites/{siteId}/collaborators/invite` | Invite collaborator | Author |
| `GET` | `/sites/{siteId}/collaborators/{id}` | Get collaborator | Author |
| `PUT` | `/sites/{siteId}/collaborators/{id}` | Update collaborator role | Author |
| `DELETE` | `/sites/{siteId}/collaborators/{id}` | Remove collaborator | Author |
| `POST` | `/collaborator/accept/{token}` | Accept invitation | User |
| `GET` | `/collaborator/sites` | List sites I collaborate on | User |

---

## 4. Content Management

### 4.1 Series

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/series` | List series | Author |
| `POST` | `/sites/{siteId}/series` | Create series | Author |
| `GET` | `/sites/{siteId}/series/{seriesId}` | Get series | Author |
| `PUT` | `/sites/{siteId}/series/{seriesId}` | Update series | Author |
| `DELETE` | `/sites/{siteId}/series/{seriesId}` | Delete series | Author |
| `PUT` | `/sites/{siteId}/series/{seriesId}/status` | Change status | Author |
| `GET` | `/sites/{siteId}/series/{seriesId}/stats` | Get series stats | Author |
| `POST` | `/sites/{siteId}/series/{seriesId}/cover` | Upload cover | Author |
| `DELETE` | `/sites/{siteId}/series/{seriesId}/cover` | Remove cover | Author |

### 4.2 Series Metadata

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/series/{seriesId}/genres` | Get genres | Author |
| `PUT` | `/sites/{siteId}/series/{seriesId}/genres` | Update genres | Author |
| `GET` | `/sites/{siteId}/series/{seriesId}/tags` | Get tags | Author |
| `PUT` | `/sites/{siteId}/series/{seriesId}/tags` | Update tags | Author |
| `GET` | `/sites/{siteId}/series/{seriesId}/warnings` | Get content warnings | Author |
| `PUT` | `/sites/{siteId}/series/{seriesId}/warnings` | Update warnings | Author |

### 4.3 Chapters

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/series/{seriesId}/chapters` | List chapters | Author |
| `POST` | `/sites/{siteId}/series/{seriesId}/chapters` | Create chapter | Author |
| `GET` | `/sites/{siteId}/series/{seriesId}/chapters/{chapterId}` | Get chapter | Author |
| `PUT` | `/sites/{siteId}/series/{seriesId}/chapters/{chapterId}` | Update chapter | Author |
| `DELETE` | `/sites/{siteId}/series/{seriesId}/chapters/{chapterId}` | Delete chapter | Author |
| `PUT` | `/sites/{siteId}/series/{seriesId}/chapters/reorder` | Reorder chapters | Author |
| `POST` | `/sites/{siteId}/series/{seriesId}/chapters/{chapterId}/publish` | Publish chapter | Author |
| `POST` | `/sites/{siteId}/series/{seriesId}/chapters/{chapterId}/unpublish` | Unpublish chapter | Author |
| `POST` | `/sites/{siteId}/series/{seriesId}/chapters/{chapterId}/schedule` | Schedule publication | Author |

### 4.4 Chapter Versions

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/chapters/{chapterId}/versions` | List versions | Author |
| `GET` | `/chapters/{chapterId}/versions/{versionId}` | Get version | Author |
| `POST` | `/chapters/{chapterId}/versions/{versionId}/restore` | Restore version | Author |
| `GET` | `/chapters/{chapterId}/versions/{v1}/diff/{v2}` | Compare versions | Author |

### 4.5 Chapter Images (Comics/Webtoons)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/chapters/{chapterId}/images` | List images | Author |
| `POST` | `/chapters/{chapterId}/images` | Upload image(s) | Author |
| `PUT` | `/chapters/{chapterId}/images/reorder` | Reorder images | Author |
| `DELETE` | `/chapters/{chapterId}/images/{imageId}` | Delete image | Author |
| `PUT` | `/chapters/{chapterId}/images/{imageId}` | Update image metadata | Author |

### 4.6 Chapter Access Control

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/chapters/{chapterId}/access` | Get access settings | Author |
| `PUT` | `/chapters/{chapterId}/access` | Update access settings | Author |
| `POST` | `/chapters/{chapterId}/schedule-unlock` | Schedule free unlock | Author |
| `DELETE` | `/chapters/{chapterId}/schedule-unlock` | Cancel scheduled unlock | Author |

### 4.7 Genres & Tags (Platform)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/genres` | List all genres | Public |
| `GET` | `/genres/{genreId}` | Get genre details | Public |
| `GET` | `/tags` | List popular tags | Public |
| `GET` | `/tags/search` | Search tags | Public |
| `GET` | `/content-warnings` | List content warnings | Public |

### 4.8 Announcements

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/announcements` | List announcements | Author |
| `POST` | `/sites/{siteId}/announcements` | Create announcement | Author |
| `GET` | `/sites/{siteId}/announcements/{id}` | Get announcement | Author |
| `PUT` | `/sites/{siteId}/announcements/{id}` | Update announcement | Author |
| `DELETE` | `/sites/{siteId}/announcements/{id}` | Delete announcement | Author |
| `POST` | `/sites/{siteId}/announcements/{id}/publish` | Publish announcement | Author |

---

## 5. Translations

### 5.1 Series Translations

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/series/{seriesId}/translations` | List translations | Author |
| `POST` | `/series/{seriesId}/translations` | Create/request translation | Author |
| `GET` | `/series/{seriesId}/translations/{lang}` | Get translation | Author |
| `PUT` | `/series/{seriesId}/translations/{lang}` | Update translation | Author |
| `DELETE` | `/series/{seriesId}/translations/{lang}` | Delete translation | Author |
| `POST` | `/series/{seriesId}/translations/{lang}/publish` | Publish translation | Author |
| `POST` | `/series/{seriesId}/translations/{lang}/ai-generate` | Generate with AI | Author |

### 5.2 Chapter Translations

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/chapters/{chapterId}/translations` | List translations | Author |
| `POST` | `/chapters/{chapterId}/translations` | Create translation | Author |
| `GET` | `/chapters/{chapterId}/translations/{lang}` | Get translation | Author |
| `PUT` | `/chapters/{chapterId}/translations/{lang}` | Update translation | Author |
| `DELETE` | `/chapters/{chapterId}/translations/{lang}` | Delete translation | Author |
| `POST` | `/chapters/{chapterId}/translations/{lang}/ai-generate` | Generate with AI | Author |
| `POST` | `/chapters/{chapterId}/translations/{lang}/review` | Mark as reviewed | Author |

### 5.3 Translation Glossary

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/series/{seriesId}/glossary` | List glossary terms | Author |
| `POST` | `/series/{seriesId}/glossary` | Add glossary term | Author |
| `PUT` | `/series/{seriesId}/glossary/{id}` | Update term | Author |
| `DELETE` | `/series/{seriesId}/glossary/{id}` | Delete term | Author |
| `POST` | `/series/{seriesId}/glossary/import` | Import glossary | Author |
| `GET` | `/series/{seriesId}/glossary/export` | Export glossary | Author |

---

## 6. Monetization - Subscriptions

### 6.1 Subscription Tiers (Author-created)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/tiers` | List subscription tiers | Author |
| `POST` | `/sites/{siteId}/tiers` | Create tier | Author |
| `GET` | `/sites/{siteId}/tiers/{tierId}` | Get tier details | Author |
| `PUT` | `/sites/{siteId}/tiers/{tierId}` | Update tier | Author |
| `DELETE` | `/sites/{siteId}/tiers/{tierId}` | Delete/archive tier | Author |
| `PUT` | `/sites/{siteId}/tiers/reorder` | Reorder tiers | Author |
| `GET` | `/sites/{siteId}/tiers/{tierId}/subscribers` | List tier subscribers | Author |

### 6.2 Reader Subscriptions

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/subscriptions` | List my subscriptions | User |
| `POST` | `/subscriptions` | Subscribe to tier | User |
| `GET` | `/subscriptions/{id}` | Get subscription details | User |
| `PUT` | `/subscriptions/{id}/tier` | Change tier | User |
| `PUT` | `/subscriptions/{id}/billing-cycle` | Change billing cycle | User |
| `POST` | `/subscriptions/{id}/cancel` | Cancel subscription | User |
| `POST` | `/subscriptions/{id}/reactivate` | Reactivate subscription | User |
| `POST` | `/subscriptions/{id}/pause` | Pause subscription | User |
| `POST` | `/subscriptions/{id}/resume` | Resume subscription | User |
| `GET` | `/subscriptions/{id}/invoices` | Get subscription invoices | User |

### 6.3 Author Subscriber Management

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/subscribers` | List all subscribers | Author |
| `GET` | `/sites/{siteId}/subscribers/{id}` | Get subscriber details | Author |
| `GET` | `/sites/{siteId}/subscribers/export` | Export subscriber list | Author |
| `GET` | `/sites/{siteId}/subscribers/stats` | Get subscriber stats | Author |
| `GET` | `/sites/{siteId}/subscribers/churn` | Get churn analytics | Author |

### 6.4 Gift Subscriptions

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/subscriptions/gift` | Purchase gift subscription | User |
| `GET` | `/subscriptions/gifts/sent` | List sent gifts | User |
| `GET` | `/subscriptions/gifts/received` | List received gifts | User |
| `POST` | `/subscriptions/gifts/{claimCode}/claim` | Claim gift | User |
| `GET` | `/subscriptions/gifts/{id}` | Get gift details | User |
| `POST` | `/subscriptions/gifts/{id}/cancel` | Cancel/refund gift | User |

---

## 7. Monetization - Payments

### 7.1 Payment Gateway Configuration

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/author/payment-config` | Get payment config | Author |
| `POST` | `/author/payment-config/razorpay/connect` | Connect Razorpay | Author |
| `POST` | `/author/payment-config/stripe/connect` | Connect Stripe | Author |
| `POST` | `/author/payment-config/xendit/connect` | Connect Xendit | Author |
| `DELETE` | `/author/payment-config/{gateway}/disconnect` | Disconnect gateway | Author |
| `GET` | `/author/payment-config/{gateway}/status` | Check gateway status | Author |
| `PUT` | `/author/payment-config/default` | Set default gateway | Author |

### 7.2 Payments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/payments` | List my payments | User |
| `GET` | `/payments/{id}` | Get payment details | User |
| `GET` | `/payments/{id}/receipt` | Get payment receipt | User |
| `POST` | `/payments/{id}/retry` | Retry failed payment | User |

### 7.3 Payment Methods

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/payment-methods` | List saved payment methods | User |
| `POST` | `/payment-methods` | Add payment method | User |
| `DELETE` | `/payment-methods/{id}` | Remove payment method | User |
| `PUT` | `/payment-methods/{id}/default` | Set as default | User |

### 7.4 Author Payments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/author/payments` | List received payments | Author |
| `GET` | `/author/payments/{id}` | Get payment details | Author |
| `GET` | `/author/payments/stats` | Get payment statistics | Author |
| `GET` | `/author/payments/export` | Export payment history | Author |

### 7.5 Payouts

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/author/payouts` | List payouts | Author |
| `GET` | `/author/payouts/{id}` | Get payout details | Author |
| `GET` | `/author/payouts/pending` | Get pending earnings | Author |
| `GET` | `/author/payouts/schedule` | Get payout schedule | Author |
| `PUT` | `/author/payouts/bank-details` | Update bank details | Author |

### 7.6 Discount Codes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/discount-codes` | List discount codes | Author |
| `POST` | `/sites/{siteId}/discount-codes` | Create discount code | Author |
| `GET` | `/sites/{siteId}/discount-codes/{id}` | Get code details | Author |
| `PUT` | `/sites/{siteId}/discount-codes/{id}` | Update code | Author |
| `DELETE` | `/sites/{siteId}/discount-codes/{id}` | Delete code | Author |
| `GET` | `/sites/{siteId}/discount-codes/{id}/usage` | Get usage stats | Author |
| `POST` | `/discount-codes/validate` | Validate code (reader) | User |

---

## 8. Monetization - Products & Purchases

### 8.1 Products

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/products` | List products | Author |
| `POST` | `/sites/{siteId}/products` | Create product | Author |
| `GET` | `/sites/{siteId}/products/{id}` | Get product | Author |
| `PUT` | `/sites/{siteId}/products/{id}` | Update product | Author |
| `DELETE` | `/sites/{siteId}/products/{id}` | Delete product | Author |
| `POST` | `/sites/{siteId}/products/{id}/cover` | Upload cover | Author |

### 8.2 Purchases

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/purchases` | List my purchases | User |
| `POST` | `/purchases` | Make purchase | User |
| `GET` | `/purchases/{id}` | Get purchase details | User |
| `GET` | `/purchases/{id}/download` | Download product | User |
| `POST` | `/purchases/{id}/refund` | Request refund | User |

### 8.3 Chapter Purchases (One-time)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/chapters/{chapterId}/purchase` | Purchase chapter | User |
| `GET` | `/chapters/{chapterId}/access-check` | Check chapter access | User |

### 8.4 Author Sales

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/author/sales` | List all sales | Author |
| `GET` | `/author/sales/stats` | Get sales statistics | Author |
| `GET` | `/author/sales/products/{id}` | Get product sales | Author |

---

## 9. Reader Engagement

### 9.1 Reading Progress

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/reading-progress` | List all progress | User |
| `GET` | `/reading-progress/{seriesId}` | Get series progress | User |
| `PUT` | `/reading-progress/{seriesId}` | Update progress | User |
| `DELETE` | `/reading-progress/{seriesId}` | Clear progress | User |
| `POST` | `/reading-progress/sync` | Sync progress (batch) | User |
| `GET` | `/reading-progress/continue` | Get "continue reading" list | User |

### 9.2 Bookmarks

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/bookmarks` | List all bookmarks | User |
| `GET` | `/bookmarks/series/{seriesId}` | Get series bookmarks | User |
| `POST` | `/bookmarks` | Create bookmark | User |
| `PUT` | `/bookmarks/{id}` | Update bookmark | User |
| `DELETE` | `/bookmarks/{id}` | Delete bookmark | User |

### 9.3 Reading Lists

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/reading-lists` | List my reading lists | User |
| `POST` | `/reading-lists` | Create reading list | User |
| `GET` | `/reading-lists/{id}` | Get reading list | User |
| `PUT` | `/reading-lists/{id}` | Update reading list | User |
| `DELETE` | `/reading-lists/{id}` | Delete reading list | User |
| `POST` | `/reading-lists/{id}/items` | Add series to list | User |
| `DELETE` | `/reading-lists/{id}/items/{seriesId}` | Remove from list | User |
| `PUT` | `/reading-lists/{id}/items/reorder` | Reorder items | User |
| `POST` | `/reading-lists/{id}/follow` | Follow list | User |
| `DELETE` | `/reading-lists/{id}/follow` | Unfollow list | User |
| `GET` | `/reading-lists/{id}/followers` | List followers | User |

### 9.4 Reader Settings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/reader/settings` | Get reader settings | User |
| `PUT` | `/reader/settings` | Update settings | User |
| `PUT` | `/reader/settings/typography` | Update typography | User |
| `PUT` | `/reader/settings/theme` | Update theme | User |
| `PUT` | `/reader/settings/behavior` | Update behavior | User |
| `PUT` | `/reader/settings/comic` | Update comic settings | User |
| `POST` | `/reader/settings/reset` | Reset to defaults | User |

### 9.5 Reading History

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/reading-history` | Get reading history | User |
| `DELETE` | `/reading-history` | Clear history | User |
| `DELETE` | `/reading-history/{seriesId}` | Remove from history | User |

---

## 10. Social Features

### 10.1 Following

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/following` | List authors I follow | User |
| `POST` | `/following/{authorId}` | Follow author | User |
| `DELETE` | `/following/{authorId}` | Unfollow author | User |
| `PUT` | `/following/{authorId}/notifications` | Update notification prefs | User |
| `GET` | `/followers` | List my followers (author) | Author |
| `GET` | `/followers/stats` | Get follower stats | Author |

### 10.2 Comments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/chapters/{chapterId}/comments` | List comments | Public |
| `POST` | `/chapters/{chapterId}/comments` | Add comment | User |
| `GET` | `/comments/{id}` | Get comment | Public |
| `PUT` | `/comments/{id}` | Edit comment | User |
| `DELETE` | `/comments/{id}` | Delete comment | User |
| `GET` | `/comments/{id}/replies` | Get replies | Public |
| `POST` | `/comments/{id}/replies` | Reply to comment | User |
| `POST` | `/comments/{id}/pin` | Pin comment (author) | Author |
| `POST` | `/comments/{id}/hide` | Hide comment (author) | Author |
| `GET` | `/author/comments` | List comments on my content | Author |

### 10.3 Reactions

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/chapters/{chapterId}/reactions` | Add reaction to chapter | User |
| `DELETE` | `/chapters/{chapterId}/reactions/{type}` | Remove reaction | User |
| `GET` | `/chapters/{chapterId}/reactions` | Get chapter reactions | Public |
| `POST` | `/comments/{commentId}/reactions` | React to comment | User |
| `DELETE` | `/comments/{commentId}/reactions/{type}` | Remove reaction | User |

### 10.4 Reviews

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/series/{seriesId}/reviews` | List reviews | Public |
| `POST` | `/series/{seriesId}/reviews` | Write review | User |
| `GET` | `/reviews/{id}` | Get review | Public |
| `PUT` | `/reviews/{id}` | Edit review | User |
| `DELETE` | `/reviews/{id}` | Delete review | User |
| `POST` | `/reviews/{id}/vote` | Vote helpful/unhelpful | User |
| `POST` | `/reviews/{id}/respond` | Author response | Author |
| `GET` | `/reviews/mine` | List my reviews | User |
| `GET` | `/author/reviews` | Reviews on my series | Author |

### 10.5 Forum

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/forum/categories` | List categories | Public |
| `GET` | `/forum/categories/{id}` | Get category | Public |
| `GET` | `/forum/categories/{id}/posts` | List posts in category | Public |
| `POST` | `/forum/posts` | Create post | User |
| `GET` | `/forum/posts/{id}` | Get post | Public |
| `PUT` | `/forum/posts/{id}` | Edit post | User |
| `DELETE` | `/forum/posts/{id}` | Delete post | User |
| `POST` | `/forum/posts/{id}/reply` | Reply to post | User |
| `POST` | `/forum/posts/{id}/like` | Like post | User |
| `DELETE` | `/forum/posts/{id}/like` | Unlike post | User |
| `POST` | `/forum/posts/{id}/pin` | Pin post (mod) | Moderator |
| `POST` | `/forum/posts/{id}/lock` | Lock post (mod) | Moderator |
| `GET` | `/forum/search` | Search forum | Public |

---

## 11. Communication

### 11.1 Notifications

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/notifications` | List notifications | User |
| `GET` | `/notifications/unread-count` | Get unread count | User |
| `PUT` | `/notifications/{id}/read` | Mark as read | User |
| `PUT` | `/notifications/read-all` | Mark all as read | User |
| `DELETE` | `/notifications/{id}` | Delete notification | User |
| `DELETE` | `/notifications` | Clear all notifications | User |
| `GET` | `/notifications/settings` | Get notification settings | User |
| `PUT` | `/notifications/settings` | Update settings | User |

### 11.2 Push Subscriptions

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/push/subscriptions` | List subscriptions | User |
| `POST` | `/push/subscriptions` | Subscribe to push | User |
| `DELETE` | `/push/subscriptions/{id}` | Unsubscribe | User |
| `POST` | `/push/test` | Send test notification | User |

### 11.3 Email Broadcasts (Author)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/broadcasts` | List broadcasts | Author |
| `POST` | `/sites/{siteId}/broadcasts` | Create broadcast | Author |
| `GET` | `/sites/{siteId}/broadcasts/{id}` | Get broadcast | Author |
| `PUT` | `/sites/{siteId}/broadcasts/{id}` | Update broadcast | Author |
| `DELETE` | `/sites/{siteId}/broadcasts/{id}` | Delete broadcast | Author |
| `POST` | `/sites/{siteId}/broadcasts/{id}/send` | Send broadcast | Author |
| `POST` | `/sites/{siteId}/broadcasts/{id}/schedule` | Schedule broadcast | Author |
| `GET` | `/sites/{siteId}/broadcasts/{id}/stats` | Get broadcast stats | Author |
| `POST` | `/sites/{siteId}/broadcasts/preview` | Preview email | Author |

### 11.4 Email Preferences (Reader)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/email/preferences` | Get email preferences | User |
| `PUT` | `/email/preferences` | Update preferences | User |
| `POST` | `/email/unsubscribe/{token}` | Unsubscribe via token | Public |
| `GET` | `/email/subscriptions` | List email subscriptions | User |
| `PUT` | `/email/subscriptions/{siteId}` | Update site subscription | User |

---

## 12. Moderation

### 12.1 Reports

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/reports` | Submit report | User |
| `GET` | `/reports/mine` | List my reports | User |
| `GET` | `/reports/{id}` | Get report status | User |
| `POST` | `/reports/{id}/appeal` | Appeal decision | User |

### 12.2 Moderation (Admin/Mod)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/admin/reports` | List reports | Moderator |
| `GET` | `/admin/reports/{id}` | Get report details | Moderator |
| `PUT` | `/admin/reports/{id}/assign` | Assign report | Moderator |
| `PUT` | `/admin/reports/{id}/resolve` | Resolve report | Moderator |
| `PUT` | `/admin/reports/{id}/escalate` | Escalate report | Moderator |
| `GET` | `/admin/moderation/logs` | Get moderation logs | Admin |
| `GET` | `/admin/moderation/queue` | Get moderation queue | Moderator |

### 12.3 Content Moderation

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/admin/content/{type}/{id}/hide` | Hide content | Moderator |
| `POST` | `/admin/content/{type}/{id}/unhide` | Unhide content | Moderator |
| `POST` | `/admin/content/{type}/{id}/remove` | Remove content | Moderator |
| `POST` | `/admin/content/{type}/{id}/restore` | Restore content | Admin |

### 12.4 User Moderation

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/admin/users/{id}/warn` | Warn user | Moderator |
| `POST` | `/admin/users/{id}/mute` | Mute user | Moderator |
| `POST` | `/admin/users/{id}/suspend` | Suspend user | Moderator |
| `POST` | `/admin/users/{id}/ban` | Ban user | Admin |
| `POST` | `/admin/users/{id}/unsuspend` | Unsuspend user | Admin |
| `POST` | `/admin/users/{id}/unban` | Unban user | SuperAdmin |

---

## 13. Support

### 13.1 Support Tickets

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/support/tickets` | List my tickets | User |
| `POST` | `/support/tickets` | Create ticket | User |
| `GET` | `/support/tickets/{id}` | Get ticket | User |
| `PUT` | `/support/tickets/{id}` | Update ticket | User |
| `POST` | `/support/tickets/{id}/close` | Close ticket | User |
| `POST` | `/support/tickets/{id}/reopen` | Reopen ticket | User |

### 13.2 Ticket Messages

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/support/tickets/{id}/messages` | List messages | User |
| `POST` | `/support/tickets/{id}/messages` | Add message | User |
| `POST` | `/support/tickets/{id}/messages/{msgId}/attachments` | Add attachment | User |

### 13.3 Support Admin

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/admin/support/tickets` | List all tickets | Support |
| `GET` | `/admin/support/tickets/{id}` | Get ticket details | Support |
| `PUT` | `/admin/support/tickets/{id}/assign` | Assign ticket | Support |
| `PUT` | `/admin/support/tickets/{id}/priority` | Change priority | Support |
| `PUT` | `/admin/support/tickets/{id}/status` | Change status | Support |
| `POST` | `/admin/support/tickets/{id}/messages` | Add staff message | Support |
| `GET` | `/admin/support/stats` | Get support stats | Support |

### 13.4 Help Center

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/help/articles` | List help articles | Public |
| `GET` | `/help/articles/{id}` | Get article | Public |
| `GET` | `/help/search` | Search help | Public |
| `GET` | `/help/categories` | List categories | Public |

---

## 14. AI Features

### 14.1 AI Writing Assistant

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/ai/writing/brainstorm` | Brainstorm ideas | Author |
| `POST` | `/ai/writing/outline` | Generate outline | Author |
| `POST` | `/ai/writing/expand` | Expand content | Author |
| `POST` | `/ai/writing/dialogue` | Generate dialogue | Author |
| `POST` | `/ai/writing/describe` | Generate description | Author |
| `POST` | `/ai/writing/edit` | Edit/improve text | Author |
| `POST` | `/ai/writing/proofread` | Proofread text | Author |
| `POST` | `/ai/writing/summarize` | Summarize content | Author |
| `POST` | `/ai/writing/title` | Generate titles | Author |
| `POST` | `/ai/writing/blurb` | Generate blurb | Author |
| `GET` | `/ai/writing/sessions` | List AI sessions | Author |
| `GET` | `/ai/writing/sessions/{id}` | Get session | Author |
| `POST` | `/ai/writing/sessions/{id}/feedback` | Submit feedback | Author |

### 14.2 AI Translation

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/ai/translate` | Translate text | Author |
| `POST` | `/ai/translate/chapter` | Translate chapter | Author |
| `POST` | `/ai/translate/detect` | Detect language | Author |
| `GET` | `/ai/translate/languages` | List supported languages | Author |

### 14.3 AI Cover Generation

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/ai/cover/generate` | Generate cover | Author |
| `GET` | `/ai/cover/styles` | List available styles | Author |
| `POST` | `/ai/cover/variations` | Generate variations | Author |

### 14.4 TikTok/Video Previews

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/chapters/{chapterId}/tiktok-preview` | Get preview | Author |
| `POST` | `/chapters/{chapterId}/tiktok-preview` | Generate preview | Author |
| `PUT` | `/chapters/{chapterId}/tiktok-preview` | Update preview | Author |
| `DELETE` | `/chapters/{chapterId}/tiktok-preview` | Delete preview | Author |
| `POST` | `/chapters/{chapterId}/tiktok-preview/publish` | Publish to TikTok | Author |
| `GET` | `/ai/tiktok/templates` | List templates | Author |

### 14.5 AI Usage

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/ai/usage` | Get current usage | Author |
| `GET` | `/ai/usage/history` | Get usage history | Author |
| `GET` | `/ai/limits` | Get AI limits (by tier) | Author |

### 14.6 OCR (Comics)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/ai/ocr/extract` | Extract text from image | Author |
| `GET` | `/ai/ocr/jobs/{id}` | Get OCR job status | Author |
| `POST` | `/ai/ocr/translate` | Translate extracted text | Author |
| `POST` | `/ai/ocr/replace` | Create text replacement | Author |
| `GET` | `/chapters/{chapterId}/text-replacements` | List replacements | Author |
| `PUT` | `/chapters/{chapterId}/text-replacements/{id}` | Update replacement | Author |

---

## 15. Media & Files

### 15.1 File Upload

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/media/upload` | Upload file | Author |
| `POST` | `/media/upload/presigned` | Get presigned upload URL | Author |
| `POST` | `/media/upload/confirm` | Confirm upload | Author |
| `POST` | `/media/upload/multipart/initiate` | Start multipart upload | Author |
| `POST` | `/media/upload/multipart/part` | Upload part | Author |
| `POST` | `/media/upload/multipart/complete` | Complete multipart | Author |

### 15.2 Media Library

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/media` | List media files | Author |
| `GET` | `/media/{id}` | Get file details | Author |
| `PUT` | `/media/{id}` | Update file metadata | Author |
| `DELETE` | `/media/{id}` | Delete file | Author |
| `POST` | `/media/{id}/move` | Move to folder | Author |
| `GET` | `/media/folders` | List folders | Author |
| `POST` | `/media/folders` | Create folder | Author |
| `DELETE` | `/media/folders/{id}` | Delete folder | Author |

### 15.3 Storage Usage

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/media/usage` | Get storage usage | Author |
| `GET` | `/media/usage/breakdown` | Get usage breakdown | Author |

### 15.4 Image Processing

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/media/{id}/optimize` | Optimize image | Author |
| `POST` | `/media/{id}/resize` | Resize image | Author |
| `POST` | `/media/{id}/crop` | Crop image | Author |
| `GET` | `/media/{id}/variants` | Get image variants | Author |

---

## 16. Social Connections

### 16.1 Social Account Connections

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/social/connections` | List connections | Author |
| `POST` | `/social/connections/{platform}/connect` | Connect platform | Author |
| `DELETE` | `/social/connections/{platform}` | Disconnect platform | Author |
| `GET` | `/social/connections/{platform}/status` | Check connection | Author |
| `POST` | `/social/connections/{platform}/refresh` | Refresh token | Author |

### 16.2 Social Posting

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/social/posts` | List social posts | Author |
| `POST` | `/social/posts` | Create post | Author |
| `GET` | `/social/posts/{id}` | Get post | Author |
| `PUT` | `/social/posts/{id}` | Update post | Author |
| `DELETE` | `/social/posts/{id}` | Delete post | Author |
| `POST` | `/social/posts/{id}/publish` | Publish now | Author |
| `POST` | `/social/posts/{id}/schedule` | Schedule post | Author |
| `GET` | `/social/posts/{id}/stats` | Get post stats | Author |

### 16.3 Auto-posting Settings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/social/settings` | Get settings | Author |
| `PUT` | `/sites/{siteId}/social/settings` | Update settings | Author |
| `PUT` | `/sites/{siteId}/social/templates` | Update templates | Author |

---

## 17. Scheduling & Calendar

### 17.1 Scheduled Publications

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/schedules/publications` | List scheduled | Author |
| `POST` | `/schedules/publications` | Schedule chapter | Author |
| `GET` | `/schedules/publications/{id}` | Get scheduled | Author |
| `PUT` | `/schedules/publications/{id}` | Update schedule | Author |
| `DELETE` | `/schedules/publications/{id}` | Cancel schedule | Author |

### 17.2 Scheduled Unlocks

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/schedules/unlocks` | List scheduled unlocks | Author |
| `POST` | `/schedules/unlocks` | Schedule unlock | Author |
| `PUT` | `/schedules/unlocks/{id}` | Update unlock | Author |
| `DELETE` | `/schedules/unlocks/{id}` | Cancel unlock | Author |

### 17.3 Content Calendar

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/calendar` | Get calendar entries | Author |
| `POST` | `/calendar` | Create entry | Author |
| `GET` | `/calendar/{id}` | Get entry | Author |
| `PUT` | `/calendar/{id}` | Update entry | Author |
| `DELETE` | `/calendar/{id}` | Delete entry | Author |
| `PUT` | `/calendar/{id}/complete` | Mark complete | Author |
| `GET` | `/calendar/upcoming` | Get upcoming items | Author |
| `GET` | `/calendar/export` | Export calendar (iCal) | Author |

---

## 18. Writing Tools

### 18.1 Writing Goals

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/writing/goals` | List goals | Author |
| `POST` | `/writing/goals` | Create goal | Author |
| `GET` | `/writing/goals/{id}` | Get goal | Author |
| `PUT` | `/writing/goals/{id}` | Update goal | Author |
| `DELETE` | `/writing/goals/{id}` | Delete goal | Author |
| `POST` | `/writing/goals/{id}/progress` | Log progress | Author |
| `GET` | `/writing/goals/{id}/progress` | Get progress history | Author |
| `POST` | `/writing/goals/{id}/pause` | Pause goal | Author |
| `POST` | `/writing/goals/{id}/resume` | Resume goal | Author |

### 18.2 Writing Streaks

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/writing/streak` | Get current streak | Author |
| `POST` | `/writing/streak/activity` | Log activity | Author |
| `POST` | `/writing/streak/freeze` | Use freeze day | Author |
| `GET` | `/writing/streak/history` | Get streak history | Author |
| `GET` | `/writing/streak/milestones` | Get milestones | Author |

### 18.3 Writing Statistics

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/writing/stats` | Get writing stats | Author |
| `GET` | `/writing/stats/daily` | Get daily stats | Author |
| `GET` | `/writing/stats/weekly` | Get weekly stats | Author |
| `GET` | `/writing/stats/monthly` | Get monthly stats | Author |

---

## 19. Import/Export

### 19.1 Content Import

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/import/sources` | List supported sources | Author |
| `POST` | `/import/jobs` | Create import job | Author |
| `GET` | `/import/jobs` | List import jobs | Author |
| `GET` | `/import/jobs/{id}` | Get job status | Author |
| `POST` | `/import/jobs/{id}/cancel` | Cancel job | Author |
| `POST` | `/import/preview` | Preview import | Author |

### 19.2 Content Export

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/export/formats` | List export formats | Author |
| `POST` | `/export/jobs` | Create export job | Author |
| `GET` | `/export/jobs` | List export jobs | Author |
| `GET` | `/export/jobs/{id}` | Get job status | Author |
| `GET` | `/export/jobs/{id}/download` | Download export | Author |

### 19.3 Backup

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/backup/create` | Create full backup | Author |
| `GET` | `/backup/list` | List backups | Author |
| `GET` | `/backup/{id}/download` | Download backup | Author |

---

## 20. Analytics

### 20.1 Site Analytics

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/analytics` | Get site analytics | Author |
| `GET` | `/sites/{siteId}/analytics/overview` | Get overview | Author |
| `GET` | `/sites/{siteId}/analytics/traffic` | Get traffic stats | Author |
| `GET` | `/sites/{siteId}/analytics/geography` | Get geo stats | Author |
| `GET` | `/sites/{siteId}/analytics/devices` | Get device stats | Author |
| `GET` | `/sites/{siteId}/analytics/referrers` | Get referrer stats | Author |

### 20.2 Series Analytics

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/series/{seriesId}/analytics` | Get series analytics | Author |
| `GET` | `/series/{seriesId}/analytics/readers` | Get reader stats | Author |
| `GET` | `/series/{seriesId}/analytics/engagement` | Get engagement | Author |
| `GET` | `/series/{seriesId}/analytics/chapters` | Get chapter stats | Author |
| `GET` | `/series/{seriesId}/analytics/retention` | Get retention | Author |

### 20.3 Chapter Analytics

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/chapters/{chapterId}/analytics` | Get chapter analytics | Author |
| `GET` | `/chapters/{chapterId}/analytics/reading` | Reading patterns | Author |
| `GET` | `/chapters/{chapterId}/analytics/dropoff` | Dropoff analysis | Author |

### 20.4 Revenue Analytics

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/author/analytics/revenue` | Get revenue analytics | Author |
| `GET` | `/author/analytics/revenue/breakdown` | Revenue breakdown | Author |
| `GET` | `/author/analytics/revenue/forecast` | Revenue forecast | Author |
| `GET` | `/author/analytics/subscribers` | Subscriber analytics | Author |
| `GET` | `/author/analytics/churn` | Churn analytics | Author |

### 20.5 Reader Analytics

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/reader/analytics` | Get my reading analytics | User |
| `GET` | `/reader/analytics/genres` | Genre preferences | User |
| `GET` | `/reader/analytics/time` | Reading time stats | User |

### 20.6 Real-time Analytics

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/analytics/realtime` | Real-time visitors | Author |
| `WS` | `/sites/{siteId}/analytics/live` | Live analytics stream | Author |

---

## 21. A/B Testing

### 21.1 Tests

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/ab-tests` | List A/B tests | Author |
| `POST` | `/sites/{siteId}/ab-tests` | Create test | Author |
| `GET` | `/sites/{siteId}/ab-tests/{id}` | Get test | Author |
| `PUT` | `/sites/{siteId}/ab-tests/{id}` | Update test | Author |
| `DELETE` | `/sites/{siteId}/ab-tests/{id}` | Delete test | Author |
| `POST` | `/sites/{siteId}/ab-tests/{id}/start` | Start test | Author |
| `POST` | `/sites/{siteId}/ab-tests/{id}/pause` | Pause test | Author |
| `POST` | `/sites/{siteId}/ab-tests/{id}/stop` | Stop test | Author |
| `GET` | `/sites/{siteId}/ab-tests/{id}/results` | Get results | Author |

### 21.2 Test Assignment (Internal)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/ab-tests/assignment` | Get variant assignment | Public |
| `POST` | `/ab-tests/conversion` | Track conversion | Public |

---

## 22. Webhooks

### 22.1 Outgoing Webhooks

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/webhooks` | List webhooks | Author |
| `POST` | `/sites/{siteId}/webhooks` | Create webhook | Author |
| `GET` | `/sites/{siteId}/webhooks/{id}` | Get webhook | Author |
| `PUT` | `/sites/{siteId}/webhooks/{id}` | Update webhook | Author |
| `DELETE` | `/sites/{siteId}/webhooks/{id}` | Delete webhook | Author |
| `POST` | `/sites/{siteId}/webhooks/{id}/test` | Test webhook | Author |
| `GET` | `/sites/{siteId}/webhooks/{id}/deliveries` | List deliveries | Author |
| `POST` | `/sites/{siteId}/webhooks/{id}/deliveries/{deliveryId}/retry` | Retry delivery | Author |

### 22.2 Webhook Events

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/webhooks/events` | List available events | Author |
| `GET` | `/webhooks/events/{event}/schema` | Get event schema | Author |

### 22.3 Incoming Webhooks (Payment Gateways)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/webhooks/razorpay` | Razorpay webhook | Signature |
| `POST` | `/webhooks/stripe` | Stripe webhook | Signature |
| `POST` | `/webhooks/xendit` | Xendit webhook | Signature |

---

## 23. GDPR & Data Management

### 23.1 Data Export

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/gdpr/export` | List export requests | User |
| `POST` | `/gdpr/export` | Request data export | User |
| `GET` | `/gdpr/export/{id}` | Get export status | User |
| `GET` | `/gdpr/export/{id}/download` | Download export | User |

### 23.2 Account Deletion

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/gdpr/delete-request` | Request deletion | User |
| `GET` | `/gdpr/delete-request` | Get deletion status | User |
| `POST` | `/gdpr/delete-request/verify` | Verify deletion | User |
| `POST` | `/gdpr/delete-request/cancel` | Cancel deletion | User |

### 23.3 Privacy Settings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/privacy/settings` | Get privacy settings | User |
| `PUT` | `/privacy/settings` | Update settings | User |
| `GET` | `/privacy/consents` | Get consent history | User |
| `PUT` | `/privacy/consents` | Update consents | User |

---

## 24. Platform Administration

### 24.1 Dashboard

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/admin/dashboard` | Get admin dashboard | Admin |
| `GET` | `/admin/stats` | Get platform stats | Admin |
| `GET` | `/admin/health` | Get system health | Admin |

### 24.2 User Management

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/admin/users` | List users | Admin |
| `GET` | `/admin/users/{id}` | Get user details | Admin |
| `PUT` | `/admin/users/{id}` | Update user | Admin |
| `DELETE` | `/admin/users/{id}` | Delete user | SuperAdmin |

### 24.3 Content Management

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/admin/sites` | List all sites | Admin |
| `GET` | `/admin/series` | List all series | Admin |
| `GET` | `/admin/chapters` | List all chapters | Admin |
| `PUT` | `/admin/sites/{id}/status` | Update site status | Admin |
| `PUT` | `/admin/series/{id}/status` | Update series status | Admin |

### 24.4 Genre & Tag Management

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/admin/genres` | Create genre | Admin |
| `PUT` | `/admin/genres/{id}` | Update genre | Admin |
| `DELETE` | `/admin/genres/{id}` | Delete genre | Admin |
| `POST` | `/admin/tags` | Create tag | Admin |
| `PUT` | `/admin/tags/{id}` | Update tag | Admin |
| `DELETE` | `/admin/tags/{id}` | Delete tag | Admin |
| `POST` | `/admin/tags/{id}/merge` | Merge tags | Admin |

### 24.5 Theme Management

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/admin/themes` | Create theme | Admin |
| `PUT` | `/admin/themes/{id}` | Update theme | Admin |
| `DELETE` | `/admin/themes/{id}` | Delete theme | Admin |

### 24.6 Feature Flags

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/admin/feature-flags` | List feature flags | Admin |
| `POST` | `/admin/feature-flags` | Create flag | Admin |
| `PUT` | `/admin/feature-flags/{id}` | Update flag | Admin |
| `DELETE` | `/admin/feature-flags/{id}` | Delete flag | Admin |

### 24.7 Platform Configuration

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/admin/config` | Get configuration | Admin |
| `PUT` | `/admin/config/{key}` | Update config | SuperAdmin |
| `GET` | `/admin/tier-limits` | Get tier limits | Admin |
| `PUT` | `/admin/tier-limits/{tier}` | Update tier limits | SuperAdmin |

### 24.8 Audit Logs

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/admin/audit-logs` | List audit logs | Admin |
| `GET` | `/admin/audit-logs/{id}` | Get log details | Admin |
| `GET` | `/admin/audit-logs/export` | Export logs | Admin |

### 24.9 Job Queue

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/admin/jobs` | List jobs | Admin |
| `GET` | `/admin/jobs/{id}` | Get job details | Admin |
| `POST` | `/admin/jobs/{id}/retry` | Retry job | Admin |
| `POST` | `/admin/jobs/{id}/cancel` | Cancel job | Admin |
| `GET` | `/admin/jobs/stats` | Get job stats | Admin |

### 24.10 Incidents

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/admin/incidents` | List incidents | Admin |
| `POST` | `/admin/incidents` | Create incident | Admin |
| `GET` | `/admin/incidents/{id}` | Get incident | Admin |
| `PUT` | `/admin/incidents/{id}` | Update incident | Admin |
| `POST` | `/admin/incidents/{id}/updates` | Add update | Admin |
| `PUT` | `/admin/incidents/{id}/resolve` | Resolve incident | Admin |

### 24.11 System Health

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/admin/health/checks` | List health checks | Admin |
| `GET` | `/admin/health/services` | Get service status | Admin |
| `POST` | `/admin/health/services/{service}/restart` | Restart service | SuperAdmin |
| `GET` | `/admin/health/metrics` | Get system metrics | Admin |

---

## 25. Public/Discovery APIs

### 25.1 Site Public Access

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/s/{siteSlug}` | Get public site | Public |
| `GET` | `/s/{siteSlug}/series` | List public series | Public |
| `GET` | `/s/{siteSlug}/pages/{pageSlug}` | Get public page | Public |
| `GET` | `/s/{siteSlug}/announcements` | List announcements | Public |
| `GET` | `/s/{siteSlug}/tiers` | List subscription tiers | Public |

### 25.2 Series Public Access

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/series/{seriesSlug}` | Get public series | Public |
| `GET` | `/series/{seriesSlug}/chapters` | List public chapters | Public |
| `GET` | `/series/{seriesSlug}/chapters/{chapterSlug}` | Get chapter | Varies |
| `GET` | `/series/{seriesSlug}/reviews` | Get reviews | Public |

### 25.3 Discovery

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/discover` | Get discovery feed | Public |
| `GET` | `/discover/trending` | Get trending series | Public |
| `GET` | `/discover/popular` | Get popular series | Public |
| `GET` | `/discover/new` | Get new releases | Public |
| `GET` | `/discover/updated` | Get recently updated | Public |
| `GET` | `/discover/genres/{genreSlug}` | Browse by genre | Public |
| `GET` | `/discover/tags/{tagSlug}` | Browse by tag | Public |
| `GET` | `/discover/featured` | Get featured content | Public |
| `GET` | `/discover/recommendations` | Get recommendations | User |

### 25.4 Search

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/search` | Global search | Public |
| `GET` | `/search/series` | Search series | Public |
| `GET` | `/search/authors` | Search authors | Public |
| `GET` | `/search/suggestions` | Get suggestions | Public |
| `GET` | `/search/advanced` | Advanced search | Public |

### 25.5 Rankings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/rankings` | Get rankings | Public |
| `GET` | `/rankings/daily` | Daily rankings | Public |
| `GET` | `/rankings/weekly` | Weekly rankings | Public |
| `GET` | `/rankings/monthly` | Monthly rankings | Public |
| `GET` | `/rankings/all-time` | All-time rankings | Public |
| `GET` | `/rankings/{contentType}` | Rankings by type | Public |

### 25.6 Author Public Profile

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/authors/{username}` | Get author profile | Public |
| `GET` | `/authors/{username}/series` | Get author's series | Public |
| `GET` | `/authors/{username}/sites` | Get author's sites | Public |

---

## 26. API Keys & External Integration

### 26.1 API Key Management

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api-keys` | List API keys | Author |
| `POST` | `/api-keys` | Create API key | Author |
| `GET` | `/api-keys/{id}` | Get API key details | Author |
| `PUT` | `/api-keys/{id}` | Update API key | Author |
| `DELETE` | `/api-keys/{id}` | Revoke API key | Author |
| `POST` | `/api-keys/{id}/regenerate` | Regenerate key | Author |
| `GET` | `/api-keys/{id}/logs` | Get usage logs | Author |

### 26.2 External API (for integrations)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/external/v1/site` | Get site info | APIKey |
| `GET` | `/external/v1/series` | List series | APIKey |
| `GET` | `/external/v1/series/{id}` | Get series | APIKey |
| `GET` | `/external/v1/series/{id}/chapters` | List chapters | APIKey |
| `GET` | `/external/v1/subscribers` | List subscribers | APIKey |
| `GET` | `/external/v1/payments` | List payments | APIKey |
| `POST` | `/external/v1/chapters` | Create chapter | APIKey |
| `PUT` | `/external/v1/chapters/{id}` | Update chapter | APIKey |

---

## 27. Referral Program

### 27.1 Referrals

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/referrals` | Get my referrals | User |
| `GET` | `/referrals/code` | Get referral code | User |
| `POST` | `/referrals/code/regenerate` | Regenerate code | User |
| `GET` | `/referrals/stats` | Get referral stats | User |
| `GET` | `/referrals/rewards` | Get rewards history | User |
| `POST` | `/referrals/invite` | Send invite email | User |

---

## 28. Churn Prevention (Author)

### 28.1 Churn Analytics

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/churn/predictions` | Get churn predictions | Author |
| `GET` | `/sites/{siteId}/churn/at-risk` | List at-risk subscribers | Author |
| `GET` | `/sites/{siteId}/churn/analysis` | Get churn analysis | Author |

### 28.2 Churn Prevention Actions

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/sites/{siteId}/churn/actions` | List actions | Author |
| `POST` | `/sites/{siteId}/churn/actions` | Create action | Author |
| `GET` | `/sites/{siteId}/churn/actions/{id}` | Get action | Author |
| `PUT` | `/sites/{siteId}/churn/actions/{id}` | Update action | Author |
| `DELETE` | `/sites/{siteId}/churn/actions/{id}` | Cancel action | Author |
| `GET` | `/sites/{siteId}/churn/actions/templates` | Get templates | Author |

---

## Summary Statistics

| Category | Endpoints Count |
|----------|----------------|
| Authentication & Authorization | 32 |
| User Management | 18 |
| Author & Site Management | 58 |
| Content Management | 72 |
| Translations | 24 |
| Monetization - Subscriptions | 32 |
| Monetization - Payments | 34 |
| Monetization - Products | 20 |
| Reader Engagement | 42 |
| Social Features | 48 |
| Communication | 26 |
| Moderation | 24 |
| Support | 20 |
| AI Features | 38 |
| Media & Files | 22 |
| Social Connections | 16 |
| Scheduling & Calendar | 18 |
| Writing Tools | 20 |
| Import/Export | 14 |
| Analytics | 32 |
| A/B Testing | 12 |
| Webhooks | 14 |
| GDPR & Data Management | 12 |
| Platform Administration | 52 |
| Public/Discovery APIs | 32 |
| API Keys & External | 16 |
| Referral Program | 6 |
| Churn Prevention | 8 |
| **TOTAL** | **~758 endpoints** |

---

This comprehensive API list covers all functionality needed to support the Ownverso platform schema. Each endpoint should be implemented with:

1. **Request validation** using Zod schemas
2. **Authentication/Authorization** middleware
3. **Rate limiting** based on tier
4. **Audit logging** for sensitive operations
5. **Error handling** with consistent response format
6. **Pagination** for list endpoints
7. **Caching** where appropriate