import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Props extends React.ComponentProps<'div'> {
  isLoading?: boolean;
}

export const FilterSkeleton = ({ className, ...props }: Props) => {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {Array.from({ length: 3 }).map((_, index) => (
        <React.Fragment key={index}>
          <Skeleton className='h-5 w-full' />
          <Skeleton className='h-5 w-3/4' />
          <Skeleton className='h-5 w-1/4' />
          <Skeleton className='h-5 w-2/4' />
        </React.Fragment>
      ))}
    </div>
  );
};
