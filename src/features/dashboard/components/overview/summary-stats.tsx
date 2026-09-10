import { CircleDollarSign, ClipboardList, Package, ReceiptText } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/utils';
import { Summary } from '../../lib/types/stats';

type SummaryStatsProps = {
  summary?: Summary;
};

export default function SummaryStats({ summary }: SummaryStatsProps) {
  // Translation
  const t = useTranslations('dashboard.overview.stats');

  //Hooks
  const format = useFormatter();

  // Variables
  const stats = [
    {
      key: 'totalProducts',
      title: t('totalProducts'),
      value: summary?.totalProducts,
      icon: <Package size={35} className="text-maroon-600 dark:text-maroon-400" />,
      bg: 'bg-maroon-50 dark:bg-maroon-950/40',
      text: 'text-maroon-600 dark:text-maroon-400',
    },
    {
      key: 'totalOrders',
      title: t('totalOrders'),
      value: summary?.totalOrders,
      icon: <ReceiptText size={35} className="text-blue-600 dark:text-blue-400" />,
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      text: 'text-blue-600 dark:text-blue-400',
    },
    {
      key: 'totalCategories',
      title: t('totalCategories'),
      value: summary?.totalCategories,
      icon: <ClipboardList size={35} className="text-purple-600 dark:text-purple-400" />,
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      text: 'text-purple-600 dark:text-purple-400',
    },
    {
      key: 'totalRevenue',
      title: t('totalRevenue'),
      value: summary?.totalRevenue,
      icon: <CircleDollarSign size={35} className="text-green-600 dark:text-green-400" />,
      bg: 'bg-green-50 dark:bg-green-950/40',
      text: 'text-green-600 dark:text-green-400',
    },
  ] as const;

  return (
    <section className="bg-ds-plain rounded-3xl p-5">
      <div className="grid grid-cols-2 gap-3">
        {/* Card */}
        {stats.map((stat) => (
          <article
            key={stat.key}
            className={cn('flex flex-col items-start rounded-3xl p-4', stat.bg)}
          >
            {/* Icon */}
            {stat.icon}

            {/* Value */}
            <span className={`mt-3 text-2xl font-semibold ${stat.text}`}>
              {format.number(stat.value ?? 0)}
              {stat.key === 'totalRevenue' && (
                <span className="ms-1 text-sm font-medium">{summary?.currency}</span>
              )}
            </span>

            {/* Title */}
            <span className="font-medium">{stat.title}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
