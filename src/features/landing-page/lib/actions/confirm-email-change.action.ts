'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import type {
  IConfirmEmailChangePayload,
  IConfirmEmailChangeResponsePayload,
} from '../types/change-email';
import { resolveMediaUrl } from '../utils/resolve-media-url.utils';

export async function confirmEmailChangeAction(
  body: IConfirmEmailChangePayload,
): Promise<IAPIResponse<IConfirmEmailChangeResponsePayload>> {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    return {
      status: false,
      code: 401,
      message: 'Authentication required',
    };
  }

  const endpoint = buildApiEndpoint('users/email/confirm');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token),
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as IAPIResponse<IConfirmEmailChangeResponsePayload>;

  if (!data.status || !data.payload?.user) {
    return data;
  }

  return {
    ...data,
    payload: {
      user: {
        ...data.payload.user,
        photo: resolveMediaUrl(data.payload.user.photo) ?? data.payload.user.photo,
      },
    },
  };
}
