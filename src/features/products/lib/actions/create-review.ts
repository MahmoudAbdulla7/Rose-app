'use server';

import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getAuthHeaders } from '@/shared/lib/utils/auth-headers';
import type { Review, ReviewInput, ReviewPayload } from '../types/review';

export async function createReviewAction(input: ReviewInput): Promise<Review> {
  const endpoint = buildApiEndpoint('/reviews');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify(input),
  });

  const data: IAPIResponse<ReviewPayload> = await response.json();

  if (!data.status) {
    console.error(data);
    throw new Error(data.message || 'Request failed');
  }

  return data.payload.review;
}
