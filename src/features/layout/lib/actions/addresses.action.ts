'use server';

import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getAuthHeaders } from '@/shared/lib/utils/auth-headers';
import type { Address, AddressPayload } from '../types/address';

export async function createAddressAction(payload: AddressPayload) {
  const endpoint = buildApiEndpoint('addresses');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  const data: IAPIResponse<Address> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}

export async function updateAddressAction(id: string, payload: AddressPayload) {
  const endpoint = buildApiEndpoint(`addresses/${id}`);

  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: await getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  const data: IAPIResponse<Address> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}

export async function deleteAddressAction(id: string) {
  const endpoint = buildApiEndpoint(`addresses/${id}`);

  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: await getAuthHeaders(),
  });

  const data: IAPIResponse<null> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}
