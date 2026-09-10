import { useFormatter, useTranslations } from 'next-intl';

import { Badge } from '@/shared/ui/badge';
import { Separator } from '@/shared/ui/separator';
import { Category } from '../../lib/types/stats';

type CategoriesStatsProps = {
  categories?: Category[];
};

export default function CategoriesStats({ categories = [] }: CategoriesStatsProps) {
  // Translation
  const t = useTranslations('dashboard.overview.lists');

  //Hooks
  const format = useFormatter();

  // Variables
  const sortedCategories = [...categories].sort((a, b) => b.productCount - a.productCount);

  return (
    <section className="bg-ds-plain flex h-81.5 flex-col rounded-3xl p-6">
      {/* Title */}
      <h2 className="mb-4 text-2xl font-semibold">{t('allCategories')}</h2>

      {/* Empty state */}
      {sortedCategories.length === 0 ? (
        <p className="text-ds-text-muted flex flex-1 items-center justify-center">
          {t('noCategories')}
        </p>
      ) : (
        <ul className="scrollbar-thumb-ds-text-subtle flex min-h-0 flex-1 scrollbar-thin flex-col gap-2.25 overflow-y-auto pe-1">
          {/* Categories list */}
          {sortedCategories.map((category) => (
            <li key={category.id} className="flex flex-col gap-2.25">
              <div className="flex items-center justify-between gap-3">
                {/* Title */}
                <span className="min-w-0 truncate">{category.title}</span>

                {/* Count */}
                <Badge variant="subtle" className="shrink-0">
                  {format.number(category.productCount)}{' '}
                  {t('productsLabel', { count: category.productCount })}
                </Badge>
              </div>

              <Separator />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
