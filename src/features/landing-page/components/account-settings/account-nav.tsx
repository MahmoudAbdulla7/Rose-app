'use client';

import { Lock, LogOut, UserRoundPen } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';

export const ACCOUNT_NAV_LINKS = [
  { href: '/account-settings/profile', label: 'profile', icon: UserRoundPen },
  { href: '/account-settings/change-password', label: 'changePassword', icon: Lock },
] as const;

export type AccountNavProps = {
  /** Called when a link is picked, so the drawer can close itself. */
  onNavigate?: () => void;
};

export default function AccountNav({ onNavigate }: AccountNavProps) {
  // Translation
  const t = useTranslations('accountSettings.nav');

  // Navigation
  const pathname = usePathname();

  // Functions
  const handleLogout = () => signOut({ callbackUrl: '/' });

  return (
    <>
      {/* Modifications */}
      <nav className="flex flex-1 flex-col gap-2.5">
        {ACCOUNT_NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-4 py-3 text-base font-medium',
                isActive
                  ? 'bg-ds-inverse text-ds-text-inverse'
                  : 'text-ds-text-plain hover:bg-ds-muted',
              )}
            >
              <Icon className="size-6" strokeWidth={1.5} />
              {t(link.label)}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="bg-ds-muted text-ds-primary hover:bg-ds-soft flex cursor-pointer items-center gap-2.5 rounded-lg px-4 py-3 text-base font-medium"
      >
        <LogOut className="size-5 -scale-y-100 rotate-180" strokeWidth={1.5} />
        {t('logout')}
      </button>
    </>
  );
}
