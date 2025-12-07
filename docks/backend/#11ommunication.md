Below is the **Communication** documentation (Category: ~26 endpoints), in the same style as previous sections.

Treat this as: `docs/backend/communication.md`.

---

# Communication – Technical Documentation

## 1. Purpose & Scope

The **Communication** module covers:

- **In-app notifications**:
  - Per-user notifications about events (new chapters, comments, payments, system notices)
  - Read/unread state, grouping, expiration

- **Email delivery logging**:
  - Logs for all transactional and marketing emails
  - Status transitions (QUEUED → SENT → DELIVERED / OPENED / CLICKED / BOUNCED / FAILED)
  - Provider integration metadata (SendGrid/Postmark/etc.)

- **Push notifications**:
  - Browser/device push subscriptions
  - Basic health counters per subscription

- **Email broadcasts/campaigns (author-facing)**:
  - Triggering broadcasts to site subscribers (e.g., new chapter announcement)
  - Implemented using `EmailLog` + subscription lists + JobQueue (no separate Prisma model)

It integrates with:

- **Social Features & Content** (notifications about comments, reviews, follows, announcements)
- **Payments & Subscriptions** (payment success/failure reminders)
- **Support & Moderation** (alerts to admins/moderators)
- **Analytics** (email engagement metrics)

---

## 2. Prisma Schema (Models & Enums)

### 2.1 Enums

From the main schema; repeated for clarity.

```prisma
/// Email template types
enum EmailType {
  // Transactional
  WELCOME
  EMAIL_VERIFICATION
  PASSWORD_RESET
  MFA_CODE
  NEW_CHAPTER
  RENEWAL_REMINDER
  PAYMENT_SUCCESS
  PAYMENT_FAILED
  PAYMENT_RETRY
  SUBSCRIPTION_CANCELLED
  SUBSCRIPTION_EXPIRED
  SUBSCRIPTION_PAUSED
  SECURITY_ALERT
  ACCOUNT_LOCKED
  // Marketing
  BROADCAST
  NEWSLETTER
  ANNOUNCEMENT
  WIN_BACK
  CHURN_PREVENTION
  REFERRAL_INVITE
  MILESTONE_ACHIEVED
}

/// Email delivery states
enum EmailStatus {
  QUEUED
  SENDING
  SENT
  DELIVERED
  OPENED
  CLICKED
  BOUNCED
  SOFT_BOUNCED
  FAILED
  SPAM_REPORTED
  UNSUBSCRIBED
  SUPPRESSED
}

/// In-app notification types
enum NotificationType {
  NEW_CHAPTER
  NEW_SERIES
  NEW_SUBSCRIBER
  SUBSCRIBER_CANCELLED
  SUBSCRIBER_RENEWED
  COMMENT
  COMMENT_REPLY
  MENTION
  REVIEW
  SUBSCRIPTION_RENEWAL
  PAYMENT_RECEIVED
  PAYMENT_FAILED
  PAYOUT_COMPLETED
  MILESTONE
  ACHIEVEMENT
  ANNOUNCEMENT
  SYSTEM
  SECURITY
}

/// Email digest frequency preferences
enum EmailDigestFrequency {
  INSTANT
  HOURLY
  DAILY
  WEEKLY
  NEVER
}
```

### 2.2 Models

#### 2.2.1 `Notification`

```prisma
model Notification {
  id     BigInt @id @default(autoincrement())
  userId BigInt

  type    NotificationType
  title   String           @db.VarChar(100)
  message String           @db.Text

  referenceType String?
  referenceId   String?
  actionUrl     String? @db.VarChar(2048)

  isRead Boolean   @default(false)
  readAt DateTime?

  emailSent   Boolean   @default(false)
  emailSentAt DateTime?
  pushSent    Boolean   @default(false)
  pushSentAt  DateTime?

  groupKey String?

  createdAt DateTime  @default(now())
  expiresAt DateTime?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, isRead, createdAt(sort: Desc)])
  @@index([userId, type])

  @@map("notifications")
}
```

#### 2.2.2 `EmailLog`

```prisma
model EmailLog {
  id     BigInt  @id @default(autoincrement())
  userId BigInt?

  type      EmailType
  toEmail   String
  fromEmail String
  fromName  String?
  replyTo   String?
  subject   String    @db.VarChar(998)

  templateId   String?
  templateData Json?

  status EmailStatus @default(QUEUED)

  queuedAt    DateTime  @default(now())
  sentAt      DateTime?
  deliveredAt DateTime?
  openedAt    DateTime?
  clickedAt   DateTime?
  bouncedAt   DateTime?
  failedAt    DateTime?

  openCount  Int @default(0) @db.SmallInt
  clickCount Int @default(0) @db.SmallInt

  errorMessage String?
  errorCode    String?
  bounceType   String?

  provider   String?
  externalId String?

  // For download/unsubscribe links and CS enforcement
  unsubscribeToken String? @unique

  createdAt DateTime @default(now())

  user User? @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([userId])
  @@index([type, status])
  @@index([toEmail])

  @@map("email_logs")
}
```

#### 2.2.3 `PushSubscription`

```prisma
model PushSubscription {
  id     BigInt @id @default(autoincrement())
  userId BigInt

  endpoint String @unique @db.Text
  p256dh   String @db.Text
  auth     String @db.Text

  userAgent  String?    @db.Text
  deviceType DeviceType @default(UNKNOWN)
  deviceName String?

  isActive Boolean @default(true)

  lastUsedAt    DateTime?
  deliveryCount Int       @default(0)
  failureCount  Int       @default(0) @db.SmallInt
  lastFailureAt DateTime?
  lastError     String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, isActive])

  @@map("push_subscriptions")
}
```

No separate Prisma model is required for “broadcast campaigns”; those are implemented as:

- Queries over subscribers/readers
- Followed by bulk insertion of `EmailLog` rows
- Scheduled/sent via `JobQueue` and email infrastructure

---

## 3. Backend Implementation

### 3.1 Route & Handler Structure

We divide endpoints into:

- Notifications
- Push subscriptions
- Email logs & email events
- Broadcasts (author campaigns, built on EmailLog + other modules)

#### 3.1.1 Notifications – `src/api/v1/notifications/`

```text
src/api/v1/notifications/
  index.ts
  notifications.controller.ts
  notifications.service.ts
  notifications.schema.ts
  notifications.test.ts

  handlers/
    list-notifications.handler.ts        # GET /notifications
    get-notification.handler.ts          # GET /notifications/{id}
    mark-read.handler.ts                 # PUT /notifications/{id}/read
    mark-all-read.handler.ts             # PUT /notifications/read-all
    delete-notification.handler.ts       # DELETE /notifications/{id}
    clear-all.handler.ts                 # DELETE /notifications
    get-unread-count.handler.ts          # GET /notifications/unread-count
    get-settings.handler.ts              # GET /notifications/settings (proxy to preferences/settings)
    update-settings.handler.ts           # PUT /notifications/settings
```

> Note: Notification “settings” are usually backed by `UserPreferences` and `ReaderSettings` (e.g., `chapterNotifications`, `emailDigest`), so these endpoints orchestrate other modules rather than new tables.

#### 3.1.2 Push Subscriptions – `src/api/v1/push/`

```text
src/api/v1/push/
  index.ts
  push.controller.ts
  push.service.ts
  push.schema.ts
  push.test.ts

  handlers/
    list-subscriptions.handler.ts        # GET /push/subscriptions
    add-subscription.handler.ts          # POST /push/subscriptions
    remove-subscription.handler.ts       # DELETE /push/subscriptions/{id}
    send-test.handler.ts                 # POST /push/test
```

#### 3.1.3 Email Logs – `src/api/v1/email-logs/`

```text
src/api/v1/email-logs/
  index.ts
  email-logs.controller.ts
  email-logs.service.ts
  email-logs.schema.ts
  email-logs.test.ts

  handlers/
    list-my-email-logs.handler.ts        # GET /email/logs (optional, user-level)
    get-my-email-log.handler.ts          # GET /email/logs/{id}

    admin-list-email-logs.handler.ts     # GET /admin/email/logs
    admin-get-email-log.handler.ts       # GET /admin/email/logs/{id}
```

Additionally, there may be a public-facing:

```text
    unsubscribe.handler.ts               # POST /email/unsubscribe/{token}
```

for one-click unsubscribe.

#### 3.1.4 Broadcasts / Campaigns – `src/api/v1/email-broadcasts/`

Even though there is no `Broadcast` model, we expose high-level endpoints that operate over subscribers and create EmailLog entries. They are often triggered from author UI.

```text
src/api/v1/email-broadcasts/
  index.ts
  email-broadcasts.controller.ts
  email-broadcasts.service.ts
  email-broadcasts.schema.ts
  email-broadcasts.test.ts

  handlers/
    list-broadcast-templates.handler.ts   # GET /sites/{siteId}/broadcasts/templates (optional)
    preview-broadcast.handler.ts          # POST /sites/{siteId}/broadcasts/preview

    send-broadcast.handler.ts             # POST /sites/{siteId}/broadcasts
       # Eg. ad-hoc campaign to subscribers/readers; creates many EmailLog rows via job.

    test-broadcast.handler.ts             # POST /sites/{siteId}/broadcasts/test

    // Reporting (computed from EmailLog)
    list-broadcasts.handler.ts            # GET /sites/{siteId}/broadcasts (virtual, aggregated from logs)
    get-broadcast-stats.handler.ts        # GET /sites/{siteId}/broadcasts/{campaignId}/stats
```

Implementation detail:

- `campaignId` can be a synthetic grouping key stored in `EmailLog.metadata.campaignId` or in `groupKey`. No extra table is necessary.

### 3.2 Domain Layer

**Module:** `src/domain/communication/`

```text
src/domain/communication/
  entities/
    notification.entity.ts
    email-log.entity.ts
    push-subscription.entity.ts

  repositories/
    notification.repository.ts
    email-log.repository.ts
    push-subscription.repository.ts

  services/
    notification.service.ts        # create + list + mark read; central event handler
    email-log.service.ts           # query logs; not responsible for sending
    push-subscription.service.ts   # manage push subscriptions
    broadcast.service.ts           # high-level interface for author broadcasts
```

**Email sending infrastructure** lives under `src/infrastructure/email/`:

```text
src/infrastructure/email/
  email.service.ts                 # uses provider-specific implementations
  templates/                       # HTML/text templates
  providers/
    ses.provider.ts
    sendgrid.provider.ts
    postmark.provider.ts
    nodemailer.provider.ts
```

`notification.service` integrates with email + push to optionally send multi-channel notifications.

---

## 4. Frontend Implementation (Next.js)

### 4.1 Notifications UI

Reader & author dashboards commonly have:

- Notification bell icon in header
- Dropdown list of recent notifications
- Full notifications page

#### 4.1.1 Components

```text
src/components/common/
  notification-bell.tsx            # bell icon with unread badge
  notification-dropdown.tsx        # dropdown list of recent notifications

src/app/(reader-dashboard)/notifications/
  page.tsx                         # /notifications – full list
  _components/
    notification-list.tsx
    notification-item.tsx
    notification-filter.tsx
    mark-all-read-button.tsx
```

The same components are reused in author dashboard header (`src/app/(author)/layout.tsx`).

### 4.2 Email Preferences (Frontend)

Email preferences (digest frequency, marketing opt-in) are primarily stored in:

- `UserPreferences` (overall emailNotifications, marketingEmails)
- `ReaderSettings.emailDigest` (for chapter notifications)

They are surfaced via:

```text
src/app/(reader-dashboard)/settings/notifications/
  page.tsx                          # /settings/notifications
  _components/
    email-preferences-form.tsx
    push-preferences-form.tsx
    digest-frequency-select.tsx
```

And reused (with different defaults) in author settings.

### 4.3 Push Subscriptions

Components:

```text
src/components/notifications/
  push-permission-banner.tsx       # prompts user to enable push
  push-subscription-toggle.tsx     # per-device push toggle
```

Routes:

```text
src/app/(reader-dashboard)/settings/notifications/
  // same page as above, with toggles for push
```

The browser’s Service Worker handles subscription to `PushSubscription` endpoints.

### 4.4 Broadcast UI (Author)

Author broadcast campaign UI may live under:

```text
src/app/(author)/broadcasts/
  page.tsx                          # /broadcasts – previous campaigns (virtual, aggregated)
  create/
    page.tsx                        # /broadcasts/create
  [campaignId]/
    page.tsx                        # /broadcasts/{campaignId} – stats view

  _components/
    broadcast-form.tsx
    broadcast-recipient-segment.tsx
    broadcast-preview.tsx
    broadcast-stats.tsx
    send-broadcast-button.tsx
```

Internally, `campaignId` is used only to query `EmailLog` with the same `metadata.campaignId` (or `groupKey`).

---

## 5. Hooks & Frontend API Clients

### 5.1 Hooks

```text
src/hooks/
  // Notifications
  use-notifications.ts               # list notifications
  use-unread-count.ts                # get unread count
  use-mark-notification-read.ts
  use-mark-all-notifications-read.ts
  use-delete-notification.ts
  use-clear-notifications.ts
  use-notification-settings.ts       # wraps /notifications/settings

  // Push
  use-push-subscriptions.ts
  use-add-push-subscription.ts
  use-remove-push-subscription.ts
  use-send-test-push.ts

  // Email logs (optional for user)
  use-my-email-logs.ts
  use-my-email-log-detail.ts

  // Admin email logs
  use-admin-email-logs.ts
  use-admin-email-log-detail.ts

  // Broadcasts (author)
  use-broadcast-templates.ts         # if implemented
  use-send-broadcast.ts
  use-test-broadcast.ts
  use-broadcasts-summary.ts
  use-broadcast-stats.ts
```

### 5.2 Frontend API Endpoints

```text
src/lib/api/endpoints/notifications.ts

export const notificationsApi = {
  list: (params?: NotificationQueryParams) =>
    api.get<Paginated<NotificationDto>>('/notifications', params),

  get: (id: number | string) =>
    api.get<NotificationDto>(`/notifications/${id}`),

  markRead: (id: number | string) =>
    api.put<void>(`/notifications/${id}/read`, {}),

  markAllRead: () =>
    api.put<void>('/notifications/read-all', {}),

  remove: (id: number | string) =>
    api.delete<void>(`/notifications/${id}`),

  clear: () =>
    api.delete<void>('/notifications'),

  getUnreadCount: () =>
    api.get<{ unreadCount: number }>('/notifications/unread-count'),

  getSettings: () =>
    api.get<NotificationSettingsDto>('/notifications/settings'),

  updateSettings: (data: UpdateNotificationSettingsDto) =>
    api.put<NotificationSettingsDto>('/notifications/settings', data),
};
```

```text
src/lib/api/endpoints/push.ts

export const pushApi = {
  listSubscriptions: () =>
    api.get<PushSubscriptionDto[]>('/push/subscriptions'),

  addSubscription: (data: AddPushSubscriptionDto) =>
    api.post<PushSubscriptionDto>('/push/subscriptions', data),

  removeSubscription: (id: number | string) =>
    api.delete<void>(`/push/subscriptions/${id}`),

  sendTest: (data?: TestPushDto) =>
    api.post<void>('/push/test', data || {}),
};
```

```text
src/lib/api/endpoints/email-logs.ts

export const emailLogsApi = {
  listMine: (params?: EmailLogQueryParams) =>
    api.get<Paginated<EmailLogDto>>('/email/logs', params),

  getMine: (id: number | string) =>
    api.get<EmailLogDto>(`/email/logs/${id}`),

  // Admin
  adminList: (params?: AdminEmailLogQueryParams) =>
    api.get<Paginated<EmailLogDto>>('/admin/email/logs', params),

  adminGet: (id: number | string) =>
    api.get<EmailLogDto>(`/admin/email/logs/${id}`),

  // Public unsubscribe
  unsubscribe: (token: string) =>
    api.post<void>(`/email/unsubscribe/${token}`, {}),
};
```

```text
src/lib/api/endpoints/broadcasts.ts

export const broadcastsApi = {
  // Optional: template listing
  listTemplates: (siteId: string) =>
    api.get<BroadcastTemplateDto[]>(`/sites/${siteId}/broadcasts/templates`),

  preview: (siteId: string, data: BroadcastPreviewDto) =>
    api.post<BroadcastPreviewResultDto>(`/sites/${siteId}/broadcasts/preview`, data),

  send: (siteId: string, data: SendBroadcastDto) =>
    api.post<void>(`/sites/${siteId}/broadcasts`, data),

  test: (siteId: string, data: TestBroadcastDto) =>
    api.post<void>(`/sites/${siteId}/broadcasts/test`, data),

  listCampaigns: (siteId: string, params?: BroadcastQueryParams) =>
    api.get<BroadcastSummaryDto[]>(`/sites/${siteId}/broadcasts`, params),

  getStats: (siteId: string, campaignId: string) =>
    api.get<BroadcastStatsDto>(`/sites/${siteId}/broadcasts/${campaignId}/stats`),
};
```

> Note: `campaignId` is logical (e.g., stored in `EmailLog.metadata.campaignId`); there is no separate `Broadcast` table.

---

## 6. API Reference – Communication (~26 Endpoints)

Base URL: `https://api.ownverso.com/v1`

### 6.1 Notifications (10 endpoints)

1. **GET `/notifications`**  
   List notifications for current user (paginated, filter by type/isRead).

2. **GET `/notifications/{id}`**  
   Get single notification detail.

3. **PUT `/notifications/{id}/read`**  
   Mark notification as read.

4. **PUT `/notifications/read-all`**  
   Mark all notifications as read.

5. **DELETE `/notifications/{id}`**  
   Delete a single notification for current user.

6. **DELETE `/notifications`**  
   Clear all notifications for current user.

7. **GET `/notifications/unread-count`**  
   Get count of unread notifications.

8. **GET `/notifications/settings`**  
   Get notification preferences (wrapped view of `UserPreferences` & `ReaderSettings` parts).

9. **PUT `/notifications/settings`**  
   Update notification preferences (email/push/in-app toggles).

10. **(Optional)** `GET /notifications/groups`  
    If grouping is implemented, list notification groups; or consider this folded into `GET /notifications` with `groupKey`.

### 6.2 Push Subscriptions (4 endpoints)

11. **GET `/push/subscriptions`**  
    List push subscriptions for current user.

12. **POST `/push/subscriptions`**  
    Add device/browser push subscription.  
    - Body: `endpoint`, `p256dh`, `auth`, `userAgent?`, `deviceType?`, `deviceName?`.

13. **DELETE `/push/subscriptions/{id}`**  
    Remove a push subscription (unsubscribe).

14. **POST `/push/test`**  
    Send a test push notification to current device(s).

### 6.3 Email Logs (5–6 endpoints)

15. **GET `/email/logs`** (optional)  
    List email logs for current user (security/visibility).  
    - Auth: User

16. **GET `/email/logs/{id}`**  
    Get email log detail for current user (owner-only).

17. **POST `/email/unsubscribe/{token}`**  
    Public unsubscribe endpoint.  
    - Uses `EmailLog.unsubscribeToken` to determine which list/email type to unsubscribe from.

**Admin:**

18. **GET `/admin/email/logs`**  
    Admin list of logs (filter by `type`, `status`, `toEmail`, date range).

19. **GET `/admin/email/logs/{id}`**  
    Admin detail view (for debugging deliverability).

(If user-level email logs are considered optional, we still fit within 26 endpoints.)

### 6.4 Broadcasts / Campaigns (~6–7 endpoints)

20. **GET `/sites/{siteId}/broadcasts/templates`** (optional)  
    List predefined templates on which authors can base their broadcasts.

21. **POST `/sites/{siteId}/broadcasts/preview`**  
    Preview email content for a broadcast.  
    - Body: subject + body + substitution variables.

22. **POST `/sites/{siteId}/broadcasts`**  
    Send broadcast to selected audience segment (e.g., all active subscribers, all followers).  
    - Body:
      - `subject`, `templateId?`, `htmlBody?`, `segment` (e.g., `subscribers`, `all_readers`, `custom_filter`).
    - Behavior:
      - Creates many `EmailLog` rows, scheduled via JobQueue.

23. **POST `/sites/{siteId}/broadcasts/test`**  
    Send test email broadcast to current author email.

24. **GET `/sites/{siteId}/broadcasts`**  
    List broadcast “campaigns” (aggregated from `EmailLog` by `campaignId`/`groupKey`).

25. **GET `/sites/{siteId}/broadcasts/{campaignId}/stats`**  
    Get stats (sent, delivered, opened, clicked, bounced) for a given broadcast.

### 6.5 Email Preferences / Digest (1–2 endpoints, often in User or Reader Settings)

26. **(Usually overlapped)**  
    - `GET /email/preferences`  
    - `PUT /email/preferences`  

But these may be combined into `/notifications/settings` or `/reader/settings`, already counted in other categories. For this module’s 26 endpoints, the majority are:

- 10 (notifications)
- 4 (push)
- 5 (email logs)
- 6 (broadcasts)
- 1–2 (unsubscribe/preference)

---

## 7. Integration With Other Modules

- **Social Features & Content:**
  - Comment, reply, mention, review, follow, announcement creation trigger `Notification` + optional `EmailLog` + optional `Push`.

- **Payments & Subscriptions:**
  - Payment success/failure, renewal reminders, subscription cancellations trigger transactional emails (logged in `EmailLog`) and notifications.

- **Reader Engagement:**
  - Email digest frequency ties into scheduled jobs that aggregate new chapters/updates into daily/weekly digest emails.

- **Support & Moderation:**
  - New support ticket updates, moderation actions, or system incidents can notify users or admins via notifications and email.

- **Analytics:**
  - Email opens/clicks come from ESP webhooks (mapped back into `EmailLog.openedAt`, `clickCount` etc.).

- **Webhooks:**
  - ESP webhooks for delivery, opens, clicks, bounces, spam reports update `EmailLog.status` and counters.
