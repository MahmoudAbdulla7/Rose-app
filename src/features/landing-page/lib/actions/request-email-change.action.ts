'use server';

import { cookies } from 'next/headers';

import { RESEND_COOKIE, RESEND_TIMEOUT } from '@/features/auth/lib/constants/otp.constant';
import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import type { IChangeEmailFields } from '../types/change-email';

export async function requestEmailChangeAction(
  body: IChangeEmailFields,
): Promise<IAPIResponse<null>> {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    return {
      status: false,
      code: 401,
      message: 'Authentication required',
    };
  }

  const { newEmail } = body;
  const cookieStore = await cookies();
  const resendCookie = cookieStore.get(RESEND_COOKIE)?.value;

  if (resendCookie) {
    try {
      const { email: savedEmail, expiresAt } = JSON.parse(resendCookie);

      const isSameEmail = savedEmail === newEmail;
      const isResendActive = expiresAt > Date.now();

      if (isSameEmail && isResendActive) {
        return {
          status: true,
          code: 200,
          message: '',
          payload: null,
        };
      }
    } catch {
      // Ignore invalid cookie and continue.
    }
  }

  const endpoint = buildApiEndpoint('users/email/request');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token),
    },
    body: JSON.stringify(body),
  });

  const result = (await response.json()) as IAPIResponse<null>;

  if (result.status) {
    const expiresAt = Date.now() + RESEND_TIMEOUT * 1000;

    cookieStore.set(RESEND_COOKIE, JSON.stringify({ email: newEmail, expiresAt }), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: RESEND_TIMEOUT,
    });
  }

  return result;
}
