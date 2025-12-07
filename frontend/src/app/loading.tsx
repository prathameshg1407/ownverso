// ==== FILE: src/app/loading.tsx ====
/**
 * Root Loading State
 */

import { SpinnerContainer } from '@/components/ui/spinner';

export default function RootLoading() {
  return <SpinnerContainer fullScreen spinnerSize="xl" label="Loading..." />;
}