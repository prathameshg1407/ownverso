'use client';

/**
 * Combined Providers
 *
 * Wraps all providers for the application.
 */

import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';
import { ToastProvider } from './toast-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider>
        {children}
        <ToastProvider />
      </ThemeProvider>
    </QueryProvider>
  );
}

export { QueryProvider } from './query-provider';
export { ThemeProvider } from './theme-provider';
export { ToastProvider } from './toast-provider';