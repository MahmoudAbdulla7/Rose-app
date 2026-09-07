'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { deleteNotificationAction } from '@/features/layout/lib/actions/delete-notification.action';
import { markNotificationReadAction } from '@/features/layout/lib/actions/mark-as-read.action';
import type { Notification } from '@/features/layout/lib/types/notification';
import { cn } from '@/shared/lib/utils';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import {
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/shared/ui/dropdown-menu';
import { notificationKeys } from '../../hooks/notification.keys';

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  // Translation
  const t = useTranslations('header.notifications');

  // Query
  const queryClient = useQueryClient();

  // Mutation
  const markNotificationReadMutation = useMutation({
    mutationFn: markNotificationReadAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotificationAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });
    },
  });

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        className={cn(
          'hover:[&_p:last-of-type]:text-ds-text-muted flex min-h-30.5 flex-col p-4',
          notification.isRead && 'bg-ds-soft',
        )}
      >
        {/* Title */}
        <p className="text-ds-text-plain w-full text-start font-semibold">{notification.title}</p>

        {/* Message */}
        <p className="text-ds-text-muted line-clamp-3 w-full text-start text-sm">
          {notification.message}
        </p>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="dark:bg-ds-default">
          {/* Mark as read */}
          <DropdownMenuItem
            onClick={() => markNotificationReadMutation.mutate(notification.id)}
            disabled={notification.isRead || markNotificationReadMutation.isPending}
            className="cursor-pointer"
          >
            <Check size={18} strokeWidth={1.5} />
            <span>{t('markRead')}</span>
          </DropdownMenuItem>

          {/* Delete */}
          <DropdownMenuItem
            onClick={() => deleteNotificationMutation.mutate(notification.id)}
            disabled={deleteNotificationMutation.isPending}
            className="cursor-pointer"
          >
            <Trash2 size={18} strokeWidth={1.5} className="[&_path]:stroke-ds-danger" />
            <span>{t('delete')}</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
