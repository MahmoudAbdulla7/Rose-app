'use client';

import { EllipsisVertical, LogOut, UserRound } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

type Props = {
  showDetails?: boolean;
};

// ponytail: static user until the session exposes name/email/image
const USER = {
  fullName: 'Jonathan Adrian',
  email: 'jonathan.adrian@gmail.com',
  color: 'bg-sky-100',
};

export default function DashboardUserMenu({ showDetails = true }: Props) {
  const t = useTranslations('dashboard.userMenu');

  const handleLogout = () => {
    void signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2.5">
      {/* Avatar */}
      <div
        aria-hidden
        className={cn('shrink-0 rounded-full', showDetails ? 'size-13' : 'size-10', USER.color)}
      />

      {/* Info */}
      {showDetails && (
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-ds-text-plain truncate text-sm font-bold">{USER.fullName}</span>
          <span className="text-ds-text-soft truncate text-xs font-semibold">{USER.email}</span>
        </div>
      )}

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              aria-label={t('label')}
              className="border-ds-border-muted text-ds-text-soft hover:bg-ds-subtle hover:text-ds-text-plain focus-visible:ring-ds-ring shrink-0 cursor-pointer rounded-lg border p-1.5 transition-colors outline-none focus-visible:ring-2"
            />
          }
        >
          <EllipsisVertical className="size-5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          side={showDetails ? 'top' : 'bottom'}
          sideOffset={10}
          className="bg-ds-plain w-44 p-2"
        >
          <DropdownMenuItem
            render={
              <Link
                href="/profile"
                className="text-ds-text-plain flex w-full cursor-pointer items-center gap-2.5 px-2 py-2 font-semibold"
              />
            }
          >
            <UserRound className="size-5" strokeWidth={1.75} />
            <span>{t('profile')}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            nativeButton
            render={
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-2.5 px-2 py-2 font-semibold"
              />
            }
          >
            <LogOut className="size-5" strokeWidth={1.75} />
            <span>{t('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
