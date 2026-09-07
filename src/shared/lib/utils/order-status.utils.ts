import type { TOrderStatus, TPaymentMethod, TPaymentStatus } from '@/shared/lib/types/orders';
import type { LucideIcon } from 'lucide-react';
import {
    AlertTriangle,
    Check,
    CheckCheck,
    CreditCard,
    Loader2,
    PackageCheck,
    RotateCcw,
    Truck,
    Wallet
} from 'lucide-react';

export type TStatusVariant = 'success' | 'info' | 'danger' | 'warning' | 'neutral';

export interface IStatusDisplay {
    label: string;
    variant: TStatusVariant;
    icon: LucideIcon;
}

export function getOrderStatusSummary(status: TOrderStatus): IStatusDisplay {
    switch (status) {
        case 'DELIVERED':
            return { label: 'Done', variant: 'success', icon: CheckCheck };
        case 'CANCELLED':
            return { label: 'Cancelled', variant: 'danger', icon: AlertTriangle };
        case 'REFUNDED':
            return { label: 'Refunded', variant: 'neutral', icon: RotateCcw };
        case 'PENDING':
            return { label: 'Pending', variant: 'warning', icon: Truck };
        case 'CONFIRMED':
            return { label: 'Confirmed', variant: 'info', icon: Check };
        case 'PROCESSING':
            return { label: 'Processing', variant: 'info', icon: Loader2 };
        case 'SHIPPED':
            return { label: 'Shipped', variant: 'info', icon: PackageCheck };
        default:
            return { label: 'In Progress', variant: 'info', icon: Loader2 };
    }
}

export function getOrderStatusDetail(status: TOrderStatus): IStatusDisplay {
    switch (status) {
        case 'PENDING':
            return { label: 'Pending', variant: 'warning', icon: Truck };
        case 'CONFIRMED':
            return { label: 'Confirmed', variant: 'info', icon: Check };
        case 'PROCESSING':
            return { label: 'Processing', variant: 'info', icon: Loader2 };
        case 'SHIPPED':
            return { label: 'Shipped', variant: 'info', icon: PackageCheck };
        case 'DELIVERED':
            return { label: 'Delivered', variant: 'success', icon: CheckCheck };
        case 'CANCELLED':
            return { label: 'Cancelled', variant: 'danger', icon: AlertTriangle };
        case 'REFUNDED':
            return { label: 'Refunded', variant: 'neutral', icon: RotateCcw };
    }
}

export function getPaymentMethodDisplay(paymentMethod: TPaymentMethod): { label: string; icon: LucideIcon } {
    switch (paymentMethod) {
        case 'CASH_ON_DELIVERY':
            return { label: 'Cash', icon: Wallet };
        case 'CREDIT_CARD':
            return { label: 'Credit Card', icon: CreditCard };
    }
}

export function isOrderPaid(paymentStatus: TPaymentStatus): boolean {
    return paymentStatus === 'SUCCEEDED';
}

export function formatOrderNumber(id: string): string {
    return `#${id.slice(0, 8).toUpperCase()}`;
}

export function formatOrderDate(isoDate: string): string {
    const date = new Date(isoDate);

    const day = date.toLocaleString(undefined, { day: '2-digit' });
    const month = date.toLocaleString(undefined, { month: 'long' });
    const year = date.toLocaleString(undefined, { year: 'numeric' });
    const time = date.toLocaleString(undefined, { hour: 'numeric', minute: '2-digit' });

    return `${day} ${month}, ${year} at ${time}`;
}