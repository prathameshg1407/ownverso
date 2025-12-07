// ==== FILE: src/app/global-error.tsx ====
/**
 * Global Error Boundary
 * Catches errors at the root level, including errors in the root layout.
 */

'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles (inline for global error - no CSS available)
// ─────────────────────────────────────────────────────────────────────────────

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#fafafa',
  },
  card: {
    maxWidth: '28rem',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '2rem',
    textAlign: 'center' as const,
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  iconCircle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
    backgroundColor: '#fef2f2',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '1.5rem',
  },
  errorBox: {
    backgroundColor: '#f3f4f6',
    borderRadius: '0.375rem',
    padding: '1rem',
    marginBottom: '1.5rem',
    textAlign: 'left' as const,
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#ffffff',
    backgroundColor: '#111827',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.iconWrapper}>
              <div style={styles.iconCircle}>
                <AlertTriangle style={{ width: '2rem', height: '2rem', color: '#ef4444' }} />
              </div>
            </div>

            <h1 style={styles.title}>Critical Error</h1>
            <p style={styles.description}>
              A critical error occurred. Please refresh the page or try again later.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div style={styles.errorBox}>
                <p style={{ fontSize: '0.75rem', fontWeight: 500, color: '#6b7280', marginBottom: '0.25rem' }}>
                  Error details:
                </p>
                <p style={{ fontSize: '0.75rem', color: '#ef4444', wordBreak: 'break-word' }}>
                  {error.message}
                </p>
                {error.digest && (
                  <p style={{ fontSize: '0.625rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            <button onClick={reset} style={styles.button}>
              <RefreshCw style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}