'use client';

import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import UserDropdown from './user-dropdown';

type HeaderAuthProps = {
  isAuthenticated: boolean;
  className?: string;
  /** Show username / login label even on the smallest screens */
  alwaysShowLabel?: boolean;
};

export default function HeaderAuth({ isAuthenticated, className, alwaysShowLabel = false }: HeaderAuthProps) {
  const t = useTranslations('header');

  if (isAuthenticated) {
    return <UserDropdown />;
  }

  return (
    <Link
      href="/login"
      className={cn(
        'text-ds-text-default flex items-center gap-1.5 px-2 py-1.5 text-sm',
        className,
      )}
    >
      <User className="size-4" />
      <span className={cn(!alwaysShowLabel && 'hidden sm:inline')}>{t('login')}</span>
    </Link>
  );
}
