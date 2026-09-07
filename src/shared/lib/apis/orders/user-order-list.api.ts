import type {
    IOrderResponse,
    ISingleOrderResponse,
    ICreateOrderResponse,
    IOrderSearchParams,
    TPaymentMethod,
} from '../../types/orders';

async function request<T>(endpoint: string, init?: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        ...init,
    });

    if (!response.ok) {
        throw new Error(`Orders request failed: ${response.status}`);
    }

    return response.json();
}

export function fetchOrders(page: Partial<IOrderSearchParams> = {}): Promise<IOrderResponse> {
    const query = new URLSearchParams(page as Record<string, string>).toString();
    return request(`/api/orders?${query}&limit=10`);
}

export function fetchOrderById(id: string): Promise<ISingleOrderResponse> {
    return request(`/api/orders/${id}`);
}

type CreateNewOrderInput = {
    addressId: string;
    paymentMethod: TPaymentMethod;
    couponCode?: string;
    notes?: string;
};

export function createOrder(input: CreateNewOrderInput): Promise<ICreateOrderResponse> {
    return request('/api/orders', {
        method: 'POST',
        body: JSON.stringify(input),
    });
}