// ==== FILE: src/app/(marketing)/layout.tsx ====
/**
 * Marketing Layout
 */

import MarketingHeader from '@/components/layouts/marketing-header';
import MarketingFooter from '@/components/layouts/marketing-footer';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </>
  );
}