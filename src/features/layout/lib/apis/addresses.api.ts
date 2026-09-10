import 'server-only';

import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getAuthHeaders } from '@/shared/lib/utils/auth-headers';
import type { AddressesPayload } from '@/features/layout/lib/types/address';

export async function getAddresses() {
  const endpoint = buildApiEndpoint(`addresses`);

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: await getAuthHeaders(),
  });

  const data: IAPIResponse<AddressesPayload> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload.addresses;
}
