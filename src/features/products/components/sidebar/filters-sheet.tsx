'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';

import SideDrawer from '@/shared/components/side-drawer';

export type FiltersSheetProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  hasActiveFilters?: boolean;
};

/** Sheet trigger + panel for viewports below `lg`. Hidden from `lg` up via CSS. */
export default function FiltersSheet({
  children,
  footer,
  hasActiveFilters = false,
}: FiltersSheetProps) {
  // Translation
  const tFilters = useTranslations('common.filters');

  return (
    <div className="lg:hidden">
      <SideDrawer
        title={tFilters('sidebarLabel')}
        footer={footer}
        trigger={
          <>
            <SlidersHorizontal className="size-4.5 shrink-0" aria-hidden="true" />
            {tFilters('open')}
            {hasActiveFilters && (
              <span
                className="bg-ds-primary animate-in fade-in-0 zoom-in-50 absolute end-3 top-1/2 size-2 -translate-y-1/2 rounded-full duration-200"
                aria-hidden="true"
              />
            )}
          </>
        }
      >
        {children}
      </SideDrawer>
    </div>
  );
}
