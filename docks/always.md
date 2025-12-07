# Ownverso Backend - Import Reference

## Path Aliases

```
@/config      → src/config
@/core        → src/core
@/common      → src/common
@/api         → src/api
@/schemas     → src/schemas
@/plugins     → src/plugins
```

---

## What To Import From Where

### Database & Cache

```typescript
import { prisma } from '@/core/database';
import { cacheService } from '@/core/cache';
import { logger } from '@/core/logger';
```

### Configuration

```typescript
import { config } from '@/config';

// Access: config.app, config.database, config.redis, config.jwt, config.cors, config.swagger
```

### Errors

```typescript
import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
  InternalServerError,
} from '@/common/errors';
```

### Error Codes

```typescript
import { ERROR_CODES } from '@/common/constants/error-codes.constants';

// Usage: ERROR_CODES.NOT_FOUND, ERROR_CODES.USER_NOT_FOUND, ERROR_CODES.AUTH_REQUIRED, etc.
```

### HTTP Status

```typescript
import { HTTP_STATUS } from '@/common/constants/http-status.constants';

// Usage: HTTP_STATUS.OK, HTTP_STATUS.CREATED, HTTP_STATUS.NOT_FOUND, etc.
```

### App Constants

```typescript
import { PAGINATION, CACHE_TTL, REGEX } from '@/common/constants/app.constants';

// PAGINATION.DEFAULT_PAGE, PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT
// CACHE_TTL.SHORT (60), CACHE_TTL.MEDIUM (300), CACHE_TTL.LONG (3600)
```

### Pagination

```typescript
import {
  parsePaginationQuery,
  createPaginationMeta,
} from '@/common/dto/pagination.dto';
```

### Response Helpers

```typescript
import { createSuccessResponse } from '@/common/interfaces/response.interface';
```

### Schemas (TypeBox)

```typescript
import { Type, Static } from '@sinclair/typebox';
import { CuidSchema, SlugSchema, IdParamSchema } from '@/schemas/common/id.schema';
import { PaginationQuerySchema, PaginationMetaSchema } from '@/schemas/common/pagination.schema';
```

### Utilities

```typescript
// String
import { slugify, truncate, maskEmail } from '@/common/utils/string.utils';

// Date
import { formatDate, timeAgo, isExpired } from '@/common/utils/date.utils';

// Crypto
import { hashPassword, verifyPassword, generateToken } from '@/common/utils/crypto.utils';

// Validation
import { isValidEmail, isValidSlug, checkPasswordStrength } from '@/common/utils/validation.utils';
```

### Fastify Types

```typescript
import { FastifyRequest, FastifyReply, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
```

### Prisma Types

```typescript
import type { User, Series, Chapter, Prisma } from '@prisma/client';
```

---

## Import Order

```typescript
// 1. Node built-ins
import { randomUUID } from 'crypto';

// 2. External packages
import { FastifyRequest, FastifyReply } from 'fastify';
import { Type, Static } from '@sinclair/typebox';

// 3. Aliases (@/)
import { prisma } from '@/core/database';
import { logger } from '@/core/logger';
import { NotFoundError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';

// 4. Relative (same module)
import { userService } from './users.service';

// 5. Type-only
import type { User } from '@prisma/client';
```

---

## cacheService Methods

```typescript
cacheService.get<T>(key)           // Returns T | null
cacheService.set(key, value, ttl?) // ttl in seconds
cacheService.del(key)
cacheService.exists(key)           // Returns boolean
```

---

## Error Usage

```typescript
throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
throw new ConflictError('Email taken', ERROR_CODES.USER_EMAIL_TAKEN);
throw new ForbiddenError('No access', ERROR_CODES.FORBIDDEN);
throw new BadRequestError('Invalid', ERROR_CODES.BAD_REQUEST);
throw new ValidationError([{ field: 'email', message: 'Invalid' }]);
```

---

## Response Format

```typescript
// Single item
reply.send(createSuccessResponse(data, request.id));

// Created
reply.status(HTTP_STATUS.CREATED).send(createSuccessResponse(data, request.id));

// List with pagination
reply.send({
  success: true,
  data: items,
  meta: createPaginationMeta(page, limit, total),
  timestamp: new Date().toISOString(),
  requestId: request.id,
});
```

---

## Handler Typing

```typescript
FastifyRequest<{ Body: CreateDto }>
FastifyRequest<{ Params: IdParams }>
FastifyRequest<{ Querystring: ListQuery }>
FastifyRequest<{ Params: IdParams; Body: UpdateDto }>
```

---

## Request Properties

```typescript
request.id          // string - request ID
request.user        // authenticated user (when auth applied)
request.user!.id    // bigint
request.user!.publicId  // string
request.user!.role  // UserRole
```

---

## Fastify Instance Decorators

```typescript
fastify.prisma      // PrismaClient
fastify.redis       // Redis client
fastify.authenticate // Auth preHandler
```