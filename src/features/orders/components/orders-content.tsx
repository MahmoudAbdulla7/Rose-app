'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import Pagination from '@/shared/components/pagination';
import { useOrders, getOrdersQueryKey } from '@/shared/hooks/use-orders.hook';
import { fetchOrders } from '@/shared/lib/apis/orders/user-order-list.api';
import OrderCard from './order-card';
import OrdersEmptyState from './orders-empty-state';

export default function OrdersPageContent() {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? '1';
    const queryClient = useQueryClient();

    const { orders, metadata, isLoading } = useOrders({ page });

    function handleHoverPage(hoveredPage: number) {
        if (hoveredPage < 1 || String(hoveredPage) === page) return;

        const hoverParams = { page: String(hoveredPage) };
        queryClient.prefetchQuery({
            queryKey: getOrdersQueryKey(hoverParams),
            queryFn: () => fetchOrders(hoverParams),
        });
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            <h1 className="mb-6 text-2xl font-bold">Orders</h1>

            {isLoading ? (
                <p className="text-ds-text-muted text-sm">Loading orders...</p>
            ) : orders.length === 0 ? (
                <OrdersEmptyState />
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}

            {metadata && (
                <div className="mt-6">
                    <Pagination totalPages={metadata.totalPages} onHoverPage={handleHoverPage} />
                </div>
            )}
        </div>
    );
}