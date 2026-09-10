'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import DashboardUserMenu from './dashboard-user-menu';
import { DASHBOARD_NAV_LINKS } from '@/features/dashboard/lib/constants/dashboard-nav-links';
import { Link, usePathname } from '@/i18n/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

export default function DashboardHeader() {
  // Translation
  const t = useTranslations('dashboard');

  // Navigation
  const pathname = usePathname();

  // Variables
  const section = DASHBOARD_NAV_LINKS.find(
    (link) => link.href !== '/dashboard' && pathname.startsWith(link.href),
  );
  const sectionLabel =
    pathname === '/profile' ? t('userMenu.profile') : section && t(`nav.${section.label}`);

  return (
    <header className="border-ds-border-muted bg-ds-plain sticky top-0 z-30 flex h-17.5 shrink-0 items-center justify-between gap-4 border-b px-4">
      <div className="flex min-w-0 items-center gap-3">
        {/* Logo — sidebar is hidden on small screens */}
        <Image
          src="/assets/images/logo.png"
          alt={t('logoAlt')}
          width={120}
          height={112}
          priority
          className="h-9 w-auto object-contain lg:hidden"
        />

        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {sectionLabel ? (
                <BreadcrumbLink render={<Link href="/dashboard" />}>{t('title')}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{t('title')}</BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {sectionLabel && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{sectionLabel}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* User */}
      <div className="lg:hidden">
        <DashboardUserMenu showDetails={false} />
      </div>
    </header>
  );
}
