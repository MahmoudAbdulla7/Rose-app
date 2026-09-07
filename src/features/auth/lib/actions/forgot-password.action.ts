'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';

type ForgotPasswordBody = {
  email: string;
  redirectUrl: string;
};

type ResetPasswordBody = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};

export async function forgotPasswordAction(body: ForgotPasswordBody): Promise<IAPIResponse<null>> {
  const endpoint = buildApiEndpoint('auth/forgot-password');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as IAPIResponse<null>;

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export async function resetPasswordAction(body: ResetPasswordBody): Promise<IAPIResponse<null>> {
  const endpoint = buildApiEndpoint('auth/reset-password');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as IAPIResponse<null>;

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}
