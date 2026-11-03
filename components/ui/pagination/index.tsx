'use client';

import type { FC } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { Link, usePathname } from '@/i18n/navigation';
import { useFilter } from '@/modules/filter';

import { DOTS, usePagination } from './hooks/usePagination';
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationPrimitive
} from './pagination-primitive';

interface Props {
  totalCount?: number;
}

export const Pagination: FC<Props> = ({ totalCount = 0 }) => {
  const { filter } = useFilter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const limit = filter.page_size;

  const currentPage = filter.page;
  const pagesCount = Math.ceil(totalCount / limit);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    limit
  });

  /** The address of a page: a plain link (the crawler follows it), the other parameters stay. */
  const hrefOf = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) params.delete('page');
    else params.set('page', String(page));
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < pagesCount;

  return (
    <PaginationPrimitive>
      <PaginationContent>
        {hasPrevious ? (
          <PaginationLink asChild className='hidden gap-1 pl-2.5 md:flex' size='sm'>
            <Link aria-label='Go to previous page' href={hrefOf(currentPage - 1)} rel='prev'>
              <ChevronLeft className='h-4 w-4' />
              <span>Previous</span>
            </Link>
          </PaginationLink>
        ) : (
          <PaginationPrevious
            disabled
            className='text-muted-foreground hover:text-muted-foreground hidden cursor-not-allowed md:flex'
          />
        )}

        {paginationRange.map((pageNumber, index) =>
          pageNumber === DOTS ? (
            <PaginationEllipsis key={`${pageNumber}${index}`} />
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink asChild isActive={currentPage === pageNumber} size='iconSm'>
                <Link href={hrefOf(pageNumber)}>{pageNumber}</Link>
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {hasNext && currentPage !== lastPage ? (
          <PaginationLink asChild className='hidden gap-1 pr-2.5 md:flex' size='sm'>
            <Link aria-label='Go to next page' href={hrefOf(currentPage + 1)} rel='next'>
              <span>Next</span>
              <ChevronRight className='h-4 w-4' />
            </Link>
          </PaginationLink>
        ) : (
          <PaginationNext
            disabled
            className='text-muted-foreground hover:text-muted-foreground hidden cursor-not-allowed md:flex'
          />
        )}
      </PaginationContent>
    </PaginationPrimitive>
  );
};
