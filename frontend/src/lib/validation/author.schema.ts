// ==== FILE: src/lib/validation/author.schema.ts ====
/**
 * Author Validation Schemas
 */

import { z } from 'zod';

// ─────────────────────────────────────────────────────────────────────────────
// Author Account Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const registerAuthorSchema = z.object({
  penName: z.string().min(1, 'Pen name is required').max(100, 'Pen name must be less than 100 characters').optional(),
  tagline: z.string().max(200, 'Tagline must be less than 200 characters').optional(),
  fullBio: z.string().max(5000, 'Bio must be less than 5000 characters').optional(),
});

export const updateAuthorAccountSchema = z.object({
  penName: z.string().min(1, 'Pen name is required').max(100, 'Pen name must be less than 100 characters').optional(),
  tagline: z.string().max(200, 'Tagline must be less than 200 characters').optional(),
  fullBio: z.string().max(5000, 'Bio must be less than 5000 characters').optional(),
  acceptingCommissions: z.boolean().optional(),
  commissionInfo: z.string().max(2000, 'Commission info must be less than 2000 characters').optional(),
  commissionMinPrice: z.number().min(0, 'Price must be positive').optional(),
  commissionMaxPrice: z.number().min(0, 'Price must be positive').optional(),
  commissionCurrency: z.string().length(3, 'Currency must be 3 characters').optional(),
});

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type RegisterAuthorFormData = z.infer<typeof registerAuthorSchema>;
export type UpdateAuthorAccountFormData = z.infer<typeof updateAuthorAccountSchema>;