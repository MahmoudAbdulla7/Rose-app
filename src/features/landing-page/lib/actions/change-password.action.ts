'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import type { IChangePasswordFields } from '../types/change-password';

export async function changePasswordAction(body: IChangePasswordFields): Promise<IAPIResponse<null>> {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error('Authentication required');
  }

  const endpoint = buildApiEndpoint('users/change-password');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token),
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as IAPIResponse<null>;
  
  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}
