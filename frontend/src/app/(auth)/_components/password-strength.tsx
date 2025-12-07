// ==== FILE: src/app/(auth)/_components/password-strength.tsx ====
/**
 * Password Strength Indicator
 */

import { useMemo } from 'react';
import { Check, X } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Config
// ─────────────────────────────────────────────────────────────────────────────

interface PasswordCheck {
  label: string;
  passed: boolean;
}

const PASSWORD_REQUIREMENTS = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'Contains uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Contains lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'Contains number', test: (p: string) => /[0-9]/.test(p) },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const checks = useMemo<PasswordCheck[]>(
    () => PASSWORD_REQUIREMENTS.map((req) => ({ label: req.label, passed: req.test(password) })),
    [password]
  );

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      {checks.map((check) => (
        <div key={check.label} className="flex items-center gap-1 text-xs">
          {check.passed ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <X className="h-3 w-3 text-muted-foreground" />
          )}
          <span className={cn(check.passed && 'text-green-500')}>{check.label}</span>
        </div>
      ))}
    </div>
  );
}