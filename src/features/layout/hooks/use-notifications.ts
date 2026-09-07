import { useInfiniteQuery } from '@tanstack/react-query';
import { notificationKeys } from './notification.keys';

const NOTIFICATIONS_LIMIT = 20;

interface UseNotificationsOptions {
  enabled?: boolean;
}

export function useNotifications({ enabled = true }: UseNotificationsOptions = {}) {
  return useInfiniteQuery({
    queryKey: notificationKeys.all,

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `/api/notifications?page=${pageParam}&limit=${NOTIFICATIONS_LIMIT}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      return response.json();
    },

    enabled,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.metadata;

      return page < totalPages ? page + 1 : undefined;
    },

    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchInterval: 30_000,
  });
}
