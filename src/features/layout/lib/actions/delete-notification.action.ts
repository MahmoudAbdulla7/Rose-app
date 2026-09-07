'use server';

import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getAuthHeaders } from '@/shared/lib/utils/auth-headers';

export async function deleteNotificationAction(id: string) {
  const endpoint = buildApiEndpoint(`notifications/${id}`);

  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: await getAuthHeaders(),
  });

  const data: IAPIResponse<null> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}

export async function deleteAllNotificationsAction() {
  const endpoint = buildApiEndpoint('notifications/clear-all');

  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: await getAuthHeaders(),
  });

  const data: IAPIResponse<null> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}
