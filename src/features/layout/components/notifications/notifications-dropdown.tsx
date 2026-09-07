'use client';

import { Bell, BellOff } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils';
import { useAuth } from '@/shared/hooks';
import NotificationItem from './notification-item';
import NotificationsToolbar from './notifications-toolbar';
import PushNotifications from './push-notifications';
import { useNotifications } from '../../hooks/use-notifications';
import { useUnreadCount } from '../../hooks/use-unread-count';
import NotificationItemSkeleton from '../../skeletons/notification-item.skeleton';

type NotificationsDropdownProps = {
  showLabel?: boolean;
};

export default function NotificationsDropdown({ showLabel = false }: NotificationsDropdownProps) {
  // Translation
  const t = useTranslations('header.notifications');

  // Custom hooks
  const { isAuthenticated } = useAuth();
  const { data, fetchNextPage, hasNextPage, refetch, isFetchingNextPage, error, isLoading } =
    useNotifications({ enabled: isAuthenticated });
  const { data: unreadCount = 0, refetch: refetchUnreadCount } = useUnreadCount();

  // Variables
  const notifications = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);
  const hasNotifications = notifications.length > 0;

  // Functions
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    const reachedBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 20;

    if (reachedBottom && hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          refetch();
          refetchUnreadCount();
        }
      }}
    >
      <DropdownMenuTrigger
        render={
          <button
            className={cn(
              'group text-ds-text-default relative cursor-pointer items-center',
              showLabel
                ? 'inline-flex w-full gap-3 rounded-lg px-3 py-2.5'
                : 'hidden p-2 lg:inline-flex',
            )}
          />
        }
      >
        <span className={cn('shrink-0', showLabel && 'relative')}>
          <Bell className={cn(showLabel ? 'size-4' : 'size-5')} />

          {/* Mobile count */}
          {!error && unreadCount > 0 && showLabel && (
            <span className="bg-ds-primary text-ds-text-inverse absolute -inset-e-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-medium tabular-nums">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </span>

        {/* Mobile label */}
        {showLabel && (
          <span className="text-ds-text-default text-sm font-medium">{t('label')}</span>
        )}

        {/* Desktop count */}
        {!showLabel && !error && unreadCount > 0 && (
          <span
            className="bg-ds-primary text-ds-text-inverse absolute -inset-e-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-medium tabular-nums"
            aria-hidden="true"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-96" align="start">
        {/* Header */}
        <div className="bg-ds-primary-saturated text-ds-text-inverse flex justify-between p-4 text-xl font-bold">
          <div>
            {t('title')}
            {!error && ` (${unreadCount})`}
          </div>
          <PushNotifications />
        </div>

        {/* Body */}
        {error ? (
          <div className="flex justify-center p-8">
            <p className="text-center text-sm">{t('error')}</p>
          </div>
        ) : (
          <>
            <NotificationsToolbar
              hasNotifications={hasNotifications}
              unreadCount={unreadCount}
              isLoading={isLoading}
            />

            <DropdownMenuSeparator />

            {/* Content */}
            {!hasNotifications && !isLoading ? (
              // Empty state
              <div className="dark:bg-ds-default text-ds-text-muted flex flex-col items-center gap-2.5 py-20">
                <BellOff size={50} strokeWidth={1} />
                <span>{t('empty')}</span>
              </div>
            ) : (
              // Notifications list
              <div
                onScroll={handleScroll}
                className={cn(
                  'scrollbar-thumb-ds-text-subtle scrollbar-thin overflow-x-hidden overflow-y-auto',
                  notifications.length > 4 && 'max-h-120',
                  isLoading && 'min-h-120',
                )}
              >
                {isLoading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <NotificationItemSkeleton key={index} />
                    ))
                  : notifications.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
              </div>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
