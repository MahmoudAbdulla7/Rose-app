import 'server-only';

import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getAuthHeaders } from '@/shared/lib/utils/auth-headers';
import type {
  GetNotificationsParams,
  NotificationPayload,
  UnreadCountPayload,
} from '../types/notification';

export async function getNotifications({
  page = 1,
  limit = 20,
}: GetNotificationsParams): Promise<NotificationPayload> {
  const endpoint = buildApiEndpoint('notifications', {
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: await getAuthHeaders(),
  });

  const data: IAPIResponse<NotificationPayload> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}

export async function getUnreadCount() {
  const endpoint = buildApiEndpoint('notifications/unread-count');

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: await getAuthHeaders(),
  });

  const data: IAPIResponse<UnreadCountPayload> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload.unreadCount;
}
