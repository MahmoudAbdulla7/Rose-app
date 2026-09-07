import type { IOrder } from '@/shared/lib/types/orders';
import { cn } from '@/shared/lib/utils';
import {
    formatOrderDate,
    formatOrderNumber,
    getOrderStatusDetail,
    getOrderStatusSummary,
    getPaymentMethodDisplay,
    isOrderPaid,
} from '@/shared/lib/utils/order-status.utils';
import { Check } from 'lucide-react';
import OrderItemsList from './order-items-list';
import OrderStatusBadge from './order-status-badge';

type OrderCardProps = {
    order: IOrder;
};

export default function OrderCard({ order }: OrderCardProps) {
    const summary = getOrderStatusSummary(order.status);
    const deliveryDetail = getOrderStatusDetail(order.status);
    const paymentMethod = getPaymentMethodDisplay(order.paymentMethod);
    const paid = isOrderPaid(order.paymentStatus);

    const DeliveryIcon = deliveryDetail.icon;
    const PaymentMethodIcon = paymentMethod.icon;

    return (
        <div className="overflow-hidden rounded-xl border">
            <div className="bg-maroon-600 flex items-center justify-between px-4 py-3 text-white">
                <span className="font-semibold">Order {formatOrderNumber(order.id)}</span>
                <span className="text-sm opacity-90">Created in: {formatOrderDate(new Date(order.createdAt).toISOString())}</span>
            </div>

            <div className="bg-ds-surface-muted space-y-3 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold">
                            Total Price: <span>{order.total} EGP</span>
                        </p>
                        {paid && <OrderStatusBadge label="Paid" variant="success" icon={Check} />}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Status:</span>
                        <OrderStatusBadge label={summary.label} variant={summary.variant} />
                    </div>
                </div>

                <div className="space-y-1 text-sm">
                    <p className="flex items-center gap-1.5">
                        <span className="font-medium">Payment Method:</span>
                        <PaymentMethodIcon className="size-4" aria-hidden="true" />
                        {paymentMethod.label}
                    </p>
                    <p className="flex items-center gap-1.5">
                        <span className="font-medium">Delivery Status:</span>
                        <DeliveryIcon
                            className={cn('size-4',
                                deliveryDetail.variant === 'success' && 'text-green-600',
                                deliveryDetail.variant === 'danger' && 'text-red-600',
                                deliveryDetail.variant === 'warning' && 'text-amber-600',
                                deliveryDetail.variant === 'info' && 'text-blue-600',
                                deliveryDetail.variant === 'neutral' && 'text-gray-600',
                            )}
                            aria-hidden="true"
                        />
                        <span
                            className={cn(
                                deliveryDetail.variant === 'success' && 'text-green-600',
                                deliveryDetail.variant === 'danger' && 'text-red-600',
                                deliveryDetail.variant === 'warning' && 'text-amber-600',
                                deliveryDetail.variant === 'info' && 'text-blue-600',
                                deliveryDetail.variant === 'neutral' && 'text-gray-600',
                            )}
                        >
                            {deliveryDetail.label}
                        </span>
                    </p>
                </div>

                <div>
                    <p className="mb-2 text-sm font-medium">Order Items:</p>
                    <OrderItemsList items={order.orderItems} />
                </div>
            </div>
        </div>
    );
}