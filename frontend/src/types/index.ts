/**
 * Global Type Declarations & Utilities
 */

// ─────────────────────────────────────────────────────────────────────────────
// Global Declarations
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }

  interface BigInt {
    toJSON(): string;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility Types
// ─────────────────────────────────────────────────────────────────────────────

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type AsyncReturnType<T extends (...args: unknown[]) => Promise<unknown>> =
  T extends (...args: unknown[]) => Promise<infer R> ? R : never;

export type PropsWithClassName<P = unknown> = P & { className?: string };
export type PropsWithChildren<P = unknown> = P & { children?: React.ReactNode };

// ─────────────────────────────────────────────────────────────────────────────
// Re-exports
// ─────────────────────────────────────────────────────────────────────────────

export * from './api';