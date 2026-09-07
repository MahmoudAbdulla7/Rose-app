'use server';

import type { IUser } from '@/features/auth/lib/types/auth';
import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import type {
  IProfileResponsePayload,
  IUpdateProfileInput,
  IUpdateProfilePayload,
} from '../types/profile';
import { resolveMediaUrl } from '../utils/resolve-media-url.utils';

export async function updateProfileAction({
  firstName,
  lastName,
  phone,
  photo,
}: IUpdateProfileInput): Promise<IUser> {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error('Authentication required');
  }

  const body: IUpdateProfilePayload = {
    firstName,
    lastName,
    phone,
    ...(photo ? { photo } : {}),
  };

  const response = await fetch(buildApiEndpoint('users/profile'), {
    method: 'PATCH',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token),
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as IAPIResponse<IProfileResponsePayload>;

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to update profile');
  }

  const user = data.payload.user;

  return {
    ...user,
    photo: resolveMediaUrl(user.photo) ?? user.photo,
  };
}
