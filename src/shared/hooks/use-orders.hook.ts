'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { fetchOrders } from '../lib/apis/orders/user-order-list.api';
import type { IOrder, IOrderSearchParams } from '../lib/types/orders';

export function getOrdersQueryKey(params: Partial<IOrderSearchParams>) {
    return ['orders', params] as const;
}

export function useOrders(params: Partial<IOrderSearchParams> = {}) {
    const { status } = useSession();
    const isAuthenticated = status === 'authenticated';
    const isSessionLoading = status === 'loading';

    const { data: ordersData, isLoading } = useQuery({
        queryKey: getOrdersQueryKey(params),
        queryFn: () => fetchOrders(params),
        enabled: isAuthenticated,
    });

    const orders: IOrder[] = ordersData?.status ? ordersData.payload.data : [];
    const metadata = ordersData?.status ? ordersData.payload.metadata : null;

    return { isAuthenticated, orders, metadata, isLoading: isSessionLoading || isLoading };
}