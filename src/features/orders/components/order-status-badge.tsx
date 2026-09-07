import type { LucideIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { TStatusVariant } from '@/shared/lib/utils/order-status.utils';

const VARIANT_CLASSES: Record<TStatusVariant, string> = {
    success: 'bg-emerald-500',
    info: 'bg-blue-500',
    danger: 'bg-red-600',
    warning: 'bg-yellow-600',
    neutral: 'bg-gray-500',
};

type OrderStatusBadgeProps = {
    label: string;
    variant: TStatusVariant;
    icon?: LucideIcon;
    className?: string;
};

export default function OrderStatusBadge({ label, variant, icon: Icon, className }: OrderStatusBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-white',
                VARIANT_CLASSES[variant],
                className,
            )}
        >
            {Icon && <Icon className="size-3.5" aria-hidden="true" />}
            {label}
        </span>
    );
}