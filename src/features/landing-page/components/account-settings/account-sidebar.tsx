'use client';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { usePathname } from '@/i18n/navigation';
import SideDrawer from '@/shared/components/side-drawer';
import AccountNav, { ACCOUNT_NAV_LINKS } from './account-nav';

export default function AccountSidebar() {
  // Translation
  const t = useTranslations('accountSettings.nav');

  // Navigation
  const pathname = usePathname();

  // State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Derived
  const activeLink = ACCOUNT_NAV_LINKS.find((link) => pathname.startsWith(link.href));

  return (
    <>
      {/* Drawer (below lg) */}
      <div className="lg:hidden">
        <SideDrawer
          title={t('label')}
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          triggerClassName="justify-start"
          bodyClassName="gap-2.5 p-4"
          trigger={
            <>
              <Menu className="size-4.5 shrink-0" aria-hidden="true" />
              {activeLink ? t(activeLink.label) : t('label')}
            </>
          }
        >
          <AccountNav onNavigate={() => setIsDrawerOpen(false)} />
        </SideDrawer>
      </div>

      {/* Sidebar (lg and up) */}
      <aside
        aria-label={t('label')}
        className="bg-ds-subtle border-ds-border-subtle hidden flex-col gap-2.5 rounded-4xl border p-4 lg:flex lg:min-h-100 lg:w-72 xl:min-h-180"
      >
        <AccountNav />
      </aside>
    </>
  );
}
