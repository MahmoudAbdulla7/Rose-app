'use client';

import { signOut } from 'next-auth/react';
import { User, Settings, LogOut, ChevronDown, MapPinHouse, ScrollText } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/shared/ui/dropdown-menu';
import { useAuth } from '@/shared/hooks';
import { deletePushSubscription } from '../lib/utils/push-notifications.utils';

export default function UserDropdown() {
  // Translation
  const t = useTranslations('header.userMenu');
  const tGreeting = useTranslations('header.greeting');

  // Custom hooks
  const { user } = useAuth();

  // Variables
  const menuItemClasses =
    'text-ds-text-plain flex w-full items-center gap-2 font-medium cursor-pointer';

  // Functions
  const handleLogout = async () => {
    try {
      await deletePushSubscription();
    } finally {
      await signOut({
        callbackUrl: '/',
      });
    }
  };

  return (
    <div className="flex px-4">
      <div className="flex flex-col">
        {/* Greeting */}
        <span className="text-ds-text-soft text-xs"> {tGreeting('hello')}</span>
        <span className="text-ds-primary-saturated font-medium">{user?.firstName}</span>
      </div>

      <DropdownMenu>
        {/* Trigger */}
        <DropdownMenuTrigger
          render={
            <button className="group text-muted-foreground hover:text-foreground cursor-pointer items-center p-1" />
          }
        >
          <ChevronDown
            size={18}
            strokeWidth={1.5}
            className="transition-transform duration-300 ease-in-out group-data-popup-open:rotate-180"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="dark:bg-ds-default w-56">
          {/* Name */}
          <div className="text-ds-primary-saturated hover:text-ds-primary-saturated dark:hover:text-ds-primary-saturated px-2 py-1.5 font-semibold hover:bg-transparent dark:hover:bg-transparent">
            {user?.firstName ?? ''} {user?.lastName ?? ''}
          </div>

          <DropdownMenuSeparator />

          {/* Account */}
          <DropdownMenuItem
            render={<Link href="/account-settings/profile" className={menuItemClasses} />}
          >
            <User size={16} strokeWidth={1.5} />
            <span>{t('account')}</span>
          </DropdownMenuItem>

          {/* Addresses */}
          <DropdownMenuItem disabled render={<Link href="#" className={menuItemClasses} />}>
            <MapPinHouse size={16} strokeWidth={1.5} />
            <span>{t('addresses')}</span>
          </DropdownMenuItem>

          {/* Orders */}
          <DropdownMenuItem render={<Link href="/orders" className={menuItemClasses} />}>
            <ScrollText size={16} strokeWidth={1.5} />
            <span>{t('orders')}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Dashboard */}
          {user?.role === 'ADMIN' && (
            <>
              <DropdownMenuItem disabled render={<Link href="#" className={menuItemClasses} />}>
                <Settings size={16} strokeWidth={1.5} />
                <span>{t('dashboard')}</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
            </>
          )}

          {/* Log out */}
          <DropdownMenuItem
            nativeButton
            render={<button onClick={handleLogout} className="flex w-full cursor-pointer gap-2" />}
          >
            <LogOut size={16} strokeWidth={1.5} />
            <span className="text-ds-text-plain font-medium">{t('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
