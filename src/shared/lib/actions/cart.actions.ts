'use server';

import { buildApiEndpoint } from '../utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '../utils/auth.utils';
import { API_HEADERS } from '../apis/headers.options';
import type { ICartItem, IAddToCart, IRemoveFromCart, IUpdateCartQuantity } from '../types/cart';

export async function addToCart(data: IAddToCart): Promise<IAPIResponse<ICartItem>> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const endpoint = buildApiEndpoint('/cart', {});

  const response = await fetch(endpoint.toString(), {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  return (await response.json()) as IAPIResponse<ICartItem>;
}

export async function removeFromCart(data: IRemoveFromCart): Promise<IAPIResponse<ICartItem>> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const endpoint = buildApiEndpoint('/cart', {
    productId: data.productId,
  });

  const response = await fetch(endpoint.toString(), {
    method: 'DELETE',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  return (await response.json()) as IAPIResponse<ICartItem>;
}

export async function updateCartQuantity(
  data: IUpdateCartQuantity,
): Promise<IAPIResponse<ICartItem>> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const endpoint = buildApiEndpoint('/cart', {});

  const response = await fetch(endpoint.toString(), {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  return (await response.json()) as IAPIResponse<ICartItem>;
}
