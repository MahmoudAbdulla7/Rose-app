import 'server-only';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getAuthHeaders } from '@/shared/lib/utils/auth-headers';

// Push status
export async function getPushStatus() {
  const endpoint = buildApiEndpoint('notifications/push-status');

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: await getAuthHeaders(),
  });

  const data: IAPIResponse<{
    pushConfigured: boolean;
    subscriptionCount: number;
    unreadCount: number;
  }> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}

// Vapid public key
export async function getVapidPublicKey() {
  const endpoint = buildApiEndpoint('notifications/vapid-public-key');

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: API_HEADERS.JSON,
  });

  const data: IAPIResponse<{ publicKey: string }> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Failed to get VAPID public key');
  }

  return data.payload;
}

// Register push subscription
export async function registerPushSubscription(subscription: PushSubscriptionJSON) {
  const endpoint = buildApiEndpoint('notifications/subscriptions');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify(subscription),
  });

  const data: IAPIResponse<string> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Failed to register push subscription');
  }

  return data.payload;
}

// Delete push subscription
export async function deletePushSubscription(endpoint: string) {
  const apiEndpoint = buildApiEndpoint('notifications/subscriptions');

  const response = await fetch(apiEndpoint, {
    method: 'DELETE',
    headers: await getAuthHeaders(),
    body: JSON.stringify({ endpoint }),
  });

  const data: IAPIResponse<string> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Failed to delete push subscription');
  }

  return data.payload;
}
