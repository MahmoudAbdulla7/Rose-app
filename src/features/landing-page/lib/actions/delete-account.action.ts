'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

export async function deleteAccountAction(): Promise<IAPIResponse<null>> {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(buildApiEndpoint('users/account'), {
    method: 'DELETE',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token),
    },
  });

  const data = (await response.json()) as IAPIResponse<null>;

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to delete account');
  }

  return data;
}
