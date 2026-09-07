import type { IOrderItem, IOrderItemProductSummary } from '@/shared/lib/types/orders';
import Image from 'next/image';

type OrderItemRowProps = {
    item: IOrderItem<IOrderItemProductSummary>;
};

export default function OrderItemRow({ item }: OrderItemRowProps) {
    return (
        <div className="flex gap-3 rounded-lg bg-ds-subtle p-3">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-md">
                <Image src={item.product.cover} alt={item.product.title} fill className="object-cover" />
            </div>
            <div className="min-w-0 flex flex-col justify-between">
                <p className="text-maroon-700 dark:text-soft-pink-400 truncate text-lg font-semibold">{item.product.title}</p>
                <p className="font-medium text-sm">
                    <span className='text-maroon-600 dark:text-soft-pink-500'>(x{item.quantity})</span> <span className="font-bold text-2xl">{item.price}</span> EGP
                </p>
            </div>
        </div>
    );
}