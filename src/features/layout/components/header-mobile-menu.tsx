'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

import HeaderAuth from './header-auth';
import NotificationsDropdown from './notifications/notifications-dropdown';
import {
  HEADER_NAV_LINKS,
  isHeaderNavLinkActive,
} from '@/features/landing-page/lib/constants/header-nav-links';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcherComponent from '@/shared/components/language-switcher';
import ThemeToggle from '@/shared/components/theme-toggle';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Separator } from '@/shared/ui/separator';

export default function HeaderMobileMenu({ isAuthenticated }: { isAuthenticated: boolean }) {
  const t = useTranslations('header');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-ds-text-default lg:hidden"
            aria-label={t('menu.open')}
          />
        }
      >
        <Menu className="size-5" />
      </DialogTrigger>

      <DialogContent
        showCloseButton
        finalFocus={false}
        className={cn(
          'bg-ds-plain data-open:slide-in-from-end data-closed:slide-out-to-end',
          'data-open:zoom-in-100 data-closed:zoom-out-100',
          'inset-y-0! inset-s-auto! inset-e-0! top-0! h-dvh max-h-dvh w-[min(100%,20rem)] max-w-none!',
          'translate-x-0! translate-y-0! gap-0 overflow-y-auto rounded-none p-0 ring-0',
        )}
      >
        <DialogHeader className="border-ds-border-muted flex flex-row items-center justify-between border-b py-3 ps-4 pe-12">
          <DialogTitle className="text-ds-text-plain text-base font-semibold">
            {t('menu.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-4 py-4">
          <HeaderAuth alwaysShowLabel isAuthenticated={isAuthenticated} />

          <Separator className="bg-ds-border-soft" />

          <nav aria-label={t('nav.label')} className="flex flex-col gap-1">
            {HEADER_NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = isHeaderNavLinkActive(pathname, link.href);

              return (
                <DialogClose
                  key={link.href}
                  nativeButton={false}
                  render={
                    <Link
                      href={link.href}
                      className={cn(
                        'text-ds-text-default inline-flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
                        isActive && 'bg-ds-primary-fade text-ds-primary',
                      )}
                    />
                  }
                >
                  <Icon className="size-4 shrink-0" />
                  {t(`nav.${link.label}`)}
                </DialogClose>
              );
            })}
          </nav>

          <Separator className="bg-ds-border-soft" />

          {isAuthenticated && <NotificationsDropdown showLabel />}

          <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <LanguageSwitcherComponent className="text-sm" />
            <ThemeToggle />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
