'use client';

import { useState } from 'react';
import type { IOrderItem, IOrderItemProductSummary } from '@/shared/lib/types/orders';
import OrderItemRow from './order-item-row';
import { cn } from '@/shared/lib/utils';
import { ChevronDown } from 'lucide-react';

const VISIBLE_COUNT = 4;

type OrderItemsListProps = {
    items: IOrderItem<IOrderItemProductSummary>[];
};

export default function OrderItemsList({ items }: OrderItemsListProps) {
    const [expanded, setExpanded] = useState(false);
    const visibleItems = expanded ? items : items.slice(0, VISIBLE_COUNT);
    const hasMore = items.length > VISIBLE_COUNT;

    return (
        <div className='relative'>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {visibleItems.map((item) => (
                    <OrderItemRow key={item.id} item={item} />
                ))}
            </div>
            {hasMore && (
                <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    className={cn(`text-maroon-600 dark:text-soft-pink-600 cursor-pointer text-center font-medium hover:underline w-full flex flex-col justify-center items-center ${!expanded ? 'absolute bottom-0 py-5 bg-linear-to-b from-transparent to-ds-subtle via-20% to-40% ' : ''}`)}
                >
                    {expanded ? 'Show Less' : 'Show All'}
                    <ChevronDown className={cn(`${expanded ? 'rotate-180' : '' }`)} strokeWidth={2} />
                </button>
            )}
        </div>
    );
}