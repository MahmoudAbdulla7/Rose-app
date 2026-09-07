'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import type { IUploadImagePayload } from '@/shared/lib/types/upload-image';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

export async function uploadImage(formData: FormData): Promise<IUploadImagePayload> {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(buildApiEndpoint('upload'), {
    method: 'POST',
    headers: {
      ...API_HEADERS.AUTHORIZATION(token),
    },
    body: formData,
  });

  const data = (await response.json()) as IAPIResponse<IUploadImagePayload>;

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to upload image');
  }

  return data.payload;
}
