'use client';

import { useQuery } from '@tanstack/react-query';

import { UnreadCountPayload } from '../lib/types/notification';
import { notificationKeys } from './notification.keys';

export function useUnreadCount() {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: async () => {
      const response = await fetch('/api/notifications/unread-count');

      if (!response.ok) {
        throw new Error('Failed to fetch unread count');
      }

      const data: IAPIResponse<UnreadCountPayload> = await response.json();

      if (!data.status) {
        throw new Error(data.message || 'Failed to fetch unread count');
      }

      return data.payload.unreadCount;
    },
  });
}
