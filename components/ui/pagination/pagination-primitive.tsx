import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import type { ButtonProps } from '@/components/ui/button';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    aria-label='pagination'
    className={cn('mx-auto flex w-full justify-center', className)}
    role='navigation'
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'ul'> & { ref?: React.RefObject<HTMLUListElement | null> }) => (
  <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'li'> & { ref?: React.RefObject<HTMLLIElement | null> }) => (
  <li ref={ref} className={cn('', className)} {...props} />
);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof Button>;

const PaginationLink = ({ isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <Button
    aria-current={isActive ? 'page' : undefined}
    size={size}
    variant={isActive ? 'outline' : 'ghost'}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to previous page'
    className={cn('gap-1 pl-2.5', className)}
    size='sm'
    {...props}
  >
    <ChevronLeft className='h-4 w-4' />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to next page'
    className={cn('gap-1 pr-2.5', className)}
    size='sm'
    {...props}
  >
    <span>Next</span>
    <ChevronRight className='h-4 w-4' />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span aria-hidden className={cn('flex size-8 items-center justify-center', className)} {...props}>
    <MoreHorizontal className='size-4' />
    <span className='sr-only'>More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
};
