import 'server-only';

import { getNextAuthToken } from '../../utils/auth.utils';
import { buildApiEndpoint } from '../../utils/api-endpoint-builder.utils';
import { API_HEADERS } from '../headers.options';
import type {
    IOrderResponse,
    ISingleOrderResponse,
    ICreateOrderResponse,
    IOrderSearchParams,
    TPaymentMethod,
} from '../../types/orders';

export async function getOrders(params: Partial<IOrderSearchParams> = {}): Promise<IOrderResponse> {
    const token = await getNextAuthToken();
    if (!token) throw new Error('Unauthorized');

    const endpoint = buildApiEndpoint('/orders', params);
    const response = await fetch(endpoint.toString(), {
        headers: {
            ...API_HEADERS.JSON,
            ...API_HEADERS.AUTHORIZATION(token.accessToken),
        },
    });

    return (await response.json()) as IOrderResponse;
}

export async function getOrderById(id: string): Promise<ISingleOrderResponse> {
    const token = await getNextAuthToken();
    if (!token) throw new Error('Unauthorized');

    const endpoint = buildApiEndpoint(`/orders/${id}`, {});
    const response = await fetch(endpoint.toString(), {
        headers: {
            ...API_HEADERS.JSON,
            ...API_HEADERS.AUTHORIZATION(token.accessToken),
        },
    });

    return (await response.json()) as ISingleOrderResponse;
}

type CreateNewOrderInput = {
    addressId: string;
    paymentMethod: TPaymentMethod;
    couponCode?: string;
    notes?: string;
};

export async function createNewOrder({
    addressId,
    paymentMethod,
    couponCode,
    notes,
}: CreateNewOrderInput): Promise<ICreateOrderResponse> {
    const token = await getNextAuthToken();
    if (!token) throw new Error('Unauthorized');

    const endpoint = buildApiEndpoint('/orders', {});
    const response = await fetch(endpoint.toString(), {
        method: 'POST',
        headers: {
            ...API_HEADERS.JSON,
            ...API_HEADERS.AUTHORIZATION(token.accessToken),
        },
        body: JSON.stringify({ addressId, paymentMethod, couponCode, notes }),
    });

    if (!response.ok) throw new Error('Failed to create order');
    return (await response.json()) as ICreateOrderResponse;
}