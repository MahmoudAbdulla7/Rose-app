import 'server-only';

import type { IUser } from '@/features/auth/lib/types/auth';
import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import type { IProfileResponsePayload } from '../types/profile';
import { resolveMediaUrl } from '../utils/resolve-media-url.utils';

function withResolvedPhoto(user: IUser): IUser {
  return {
    ...user,
    photo: resolveMediaUrl(user.photo) ?? user.photo,
  };
}

export async function getProfile(): Promise<IUser> {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    const error = new Error('Authentication required');
    Object.assign(error, { status: 401 });
    throw error;
  }

  const endpoint = buildApiEndpoint('users/profile');

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token),
    },
    cache: 'no-store',
  });

  const data = (await response.json()) as IAPIResponse<IProfileResponsePayload>;

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to load profile');
  }

  return withResolvedPhoto(data.payload.user);
}
