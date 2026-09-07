'use client';

import { BrushCleaning, CheckCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAllNotificationsAction } from '@/features/layout/lib/actions/delete-notification.action';
import { markAllNotificationsReadAction } from '@/features/layout/lib/actions/mark-as-read.action';
import { notificationKeys } from '../../hooks/notification.keys';

interface NotificationsToolbarProps {
  hasNotifications: boolean;
  unreadCount: number;
  isLoading: boolean;
}

export default function NotificationsToolbar({
  hasNotifications,
  unreadCount,
  isLoading,
}: NotificationsToolbarProps) {
  // Translation
  const t = useTranslations('header.notifications');

  // Query
  const queryClient = useQueryClient();

  // Mutation
  const markAllReadMutation = useMutation({
    mutationFn: markAllNotificationsReadAction,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });
    },
  });

  const deleteAllNotificationsMutation = useMutation({
    mutationFn: deleteAllNotificationsAction,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });
    },
  });

  return (
    <div className="dark:bg-ds-default text-ds-text-plain flex cursor-default justify-between p-2.5 text-xs">
      {/* Clear all */}
      <button
        type="button"
        onClick={() => deleteAllNotificationsMutation.mutate()}
        disabled={!hasNotifications || isLoading || deleteAllNotificationsMutation.isPending}
        className="dark:disabled:hover:text-ds-text-muted disabled:text-ds-text-muted dark:hover:text-ds-text-default flex cursor-pointer items-center gap-1.5 hover:text-zinc-950 disabled:cursor-default"
      >
        <BrushCleaning size={18} strokeWidth={1.5} />
        <span>{t('clearAll')}</span>
      </button>

      {/* Mark all as read */}
      <button
        type="button"
        onClick={() => markAllReadMutation.mutate()}
        disabled={
          !hasNotifications || isLoading || markAllReadMutation.isPending || unreadCount === 0
        }
        className="dark:disabled:hover:text-ds-text-muted disabled:text-ds-text-muted dark:hover:text-ds-text-default flex cursor-pointer items-center gap-1.5 hover:text-zinc-950 disabled:cursor-default"
      >
        <CheckCheck size={15} strokeWidth={1.5} />
        <span>{t('markAllRead')}</span>
      </button>
    </div>
  );
}
