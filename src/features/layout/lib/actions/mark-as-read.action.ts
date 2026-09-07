'use server';

import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getAuthHeaders } from '@/shared/lib/utils/auth-headers';

export async function markNotificationReadAction(id: string) {
  const endpoint = buildApiEndpoint(`notifications/${id}`);

  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: await getAuthHeaders(),
    body: JSON.stringify({
      isRead: true,
    }),
  });

  const data: IAPIResponse<null> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}

export async function markAllNotificationsReadAction() {
  const endpoint = buildApiEndpoint('notifications/mark-all-read');

  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: await getAuthHeaders(),
  });

  const data: IAPIResponse<null> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}
