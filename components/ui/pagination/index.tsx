'use client';

import type { FC } from 'react';

import { useFilter } from '@/components/modules/filter';
import { cn } from '@/lib/utils';

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
  const { filter, setFilterItem } = useFilter();
  const limit = filter.page_size;

  const currentPage = filter.page;
  const pagesCount = Math.ceil(totalCount / limit);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    limit
  });

  const onPageChange = (page: number) => {
    if (page < 1) page = 1;
    if (page > pagesCount) page = pagesCount;
    setFilterItem('page', page);
  };

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <PaginationPrimitive>
      <PaginationContent>
        <PaginationPrevious
          className={cn('hidden md:flex', {
            'text-muted-foreground hover:text-muted-foreground cursor-not-allowed':
              currentPage === 1
          })}
          onClick={() => onPageChange(currentPage - 1)}
        />

        {paginationRange.map((pageNumber, index) =>
          pageNumber === DOTS ? (
            <PaginationEllipsis key={`${pageNumber}${index}`} />
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={currentPage === pageNumber}
                size='iconSm'
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationNext
          className={cn('hidden md:flex', {
            'text-muted-foreground hover:text-muted-foreground hidden cursor-not-allowed md:flex':
              currentPage === lastPage
          })}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </PaginationContent>
    </PaginationPrimitive>
  );
};
