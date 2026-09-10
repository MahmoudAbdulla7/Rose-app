'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import type {
  ChangePasswordInput,
  ProfilePayload,
  UpdateProfileInput,
} from '@/features/profile/lib/types/profile';

async function getAuthorizationHeader() {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) throw new Error('Authentication required');

  return API_HEADERS.AUTHORIZATION(token);
}

async function parseResponse<T>(response: Response): Promise<T> {
  const data: IAPIResponse<T> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}

export async function getProfile() {
  const response = await fetch(buildApiEndpoint('users/profile'), {
    headers: {
      ...API_HEADERS.JSON,
      ...(await getAuthorizationHeader()),
    },
    cache: 'no-store',
  });

  return parseResponse<ProfilePayload>(response);
}

export async function updateProfileAction(payload: UpdateProfileInput) {
  const response = await fetch(buildApiEndpoint('users/profile'), {
    method: 'PATCH',
    headers: {
      ...API_HEADERS.JSON,
      ...(await getAuthorizationHeader()),
    },
    body: JSON.stringify(payload),
  });

  return parseResponse<ProfilePayload>(response);
}

export async function uploadProfilePhotoAction(formData: FormData) {
  const response = await fetch(buildApiEndpoint('upload'), {
    method: 'POST',
    headers: await getAuthorizationHeader(),
    body: formData,
  });

  return parseResponse<{ url: string }>(response);
}

export async function changePasswordAction(payload: ChangePasswordInput) {
  const response = await fetch(buildApiEndpoint('users/change-password'), {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
      ...(await getAuthorizationHeader()),
    },
    body: JSON.stringify(payload),
  });

  return parseResponse<unknown>(response);
}

export async function deleteAccountAction() {
  const response = await fetch(buildApiEndpoint('users/account'), {
    method: 'DELETE',
    headers: {
      ...API_HEADERS.JSON,
      ...(await getAuthorizationHeader()),
    },
  });

  return parseResponse<unknown>(response);
}
