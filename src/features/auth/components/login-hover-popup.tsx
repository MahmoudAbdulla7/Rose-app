'use client';

import { useCallback, useState } from 'react';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';

import LoginForm from '@/features/auth/components/login-form';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

type LoginHoverPopupProps = {
  className?: string;
  /** Show label even on the smallest screens */
  alwaysShowLabel?: boolean;
};

/**
 * Navbar hover login panel — matches Figma node 102:589
 * (393px wide, Login/Register tabs, compact form).
 */
export default function LoginHoverPopup({
  className,
  alwaysShowLabel = false,
}: LoginHoverPopupProps) {
  const tHeader = useTranslations('header');
  const tLogin = useTranslations('auth.login');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback((o: boolean) => {
    setOpen(o);
  }, []);

  const handleSuccess = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Popover open={open} onOpenChange={handleOpenChange} modal={false}>
      <PopoverTrigger
        openOnHover
        delay={0}
        closeDelay={150}
        nativeButton={false}
        render={
          <Link
            href="/login"
            className={cn(
              'text-ds-text-default flex cursor-pointer items-center gap-1.5 px-2 py-1.5 text-sm',
              className,
            )}
          />
        }
      >
        <User className="size-4" />
        <span className={cn(!alwaysShowLabel && 'hidden sm:inline')}>{tHeader('login')}</span>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={8}
        className={cn(
          'bg-ds-plain text-ds-text-plain gap-0 overflow-hidden p-0',
          'shadow-ds-subtle-lg w-98 max-w-[calc(100vw-2rem)] rounded-4xl',
          'ring-ds-border-muted ring-1',
        )}
        initialFocus={false}
        finalFocus={false}
      >
        {/* Tabs: Login (active) | Register */}
        <div className="flex w-full" role="tablist" aria-label={tLogin('pageTitle')}>
          <div
            role="tab"
            aria-selected="true"
            className="bg-ds-primary text-ds-text-inverse font-primary flex flex-1 items-center justify-center px-4 py-3.5 text-base font-medium"
          >
            {tLogin('tabs.login')}
          </div>
          <Link
            role="tab"
            aria-selected="false"
            href="/register"
            className={cn(
              'bg-ds-subtle text-ds-text-plain border-ds-border-soft font-primary',
              'flex flex-1 items-center justify-center border-t border-r border-b px-4 py-3.5',
              'hover:bg-ds-muted text-base font-medium transition-colors',
            )}
          >
            {tLogin('tabs.register')}
          </Link>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <LoginForm callbackUrl={pathname} onSuccess={handleSuccess} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
