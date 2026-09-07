'use client';

import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { PAGE_KEY, setFilterHref } from '@/shared/lib/utils/filter.utils';
import { searchParamsToObject } from '@/shared/lib/utils/search-params.utils';
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';
import { getPageItems } from '@/shared/lib/utils/pagination.utils';

type PaginationProps = {
  totalPages: number;
  onHoverPage?: (page: number) => void;
};

export default function Pagination({ totalPages, onHoverPage }: PaginationProps) {
  const params = useSearchParams();
  const searchParams = searchParamsToObject(params);
  const currentPage = Number(params.get(PAGE_KEY)) || 1;

  if (totalPages <= 1) {
    return null;
  }

  const pageItems = getPageItems(totalPages, currentPage);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;
  const hrefForPage = (page: number) =>
    setFilterHref(searchParams, PAGE_KEY, page <= 1 ? '' : String(page));

  return (
    <ShadcnPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href={hrefForPage(1)}
            aria-disabled={isFirst}
            aria-label="Go to first page"
            className={isFirst ? 'pointer-events-none opacity-50' : ''}
            onMouseEnter={() => onHoverPage?.(1)}
          >
            <ChevronsLeft className="rtl:rotate-180" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious
            href={hrefForPage(currentPage - 1)}
            aria-disabled={isFirst}
            className={isFirst ? 'pointer-events-none opacity-50' : ''}
            onMouseEnter={() => onHoverPage?.(currentPage - 1)}
          />
        </PaginationItem>

        {pageItems.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={item}>
              <PaginationLink
                href={hrefForPage(item)}
                isActive={currentPage === item}
                onMouseEnter={() => onHoverPage?.(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={hrefForPage(currentPage + 1)}
            aria-disabled={isLast}
            className={isLast ? 'pointer-events-none opacity-50' : ''}
            onMouseEnter={() => onHoverPage?.(currentPage + 1)}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href={hrefForPage(totalPages)}
            aria-disabled={isLast}
            aria-label="Go to last page"
            className={isLast ? 'pointer-events-none opacity-50' : ''}
            onMouseEnter={() => onHoverPage?.(totalPages)}
          >
            <ChevronsRight className="rtl:rotate-180" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
