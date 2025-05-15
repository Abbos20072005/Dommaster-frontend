import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'div'> & {};

export const ProductCardSkeleton = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'bg-background flex h-full flex-col rounded-lg border p-3 transition-shadow hover:shadow-md sm:p-4',
        className
      )}
      {...props}
    >
      <div className='flex h-6 items-center justify-between'>
        <Skeleton className='h-5 w-27' />
        <Skeleton className='size-5 rounded-full' />
      </div>
      <Skeleton className='mb-1 aspect-[4/3] w-full rounded-md' />
      <div className='mb-2'>
        <Skeleton className='mb-2 h-3.5 w-27' />
        <Skeleton className='mb-2 h-3.5 w-full' />
        <Skeleton className='mb-2 h-3.5 w-full' />
        <Skeleton className='mb-2 h-3.5 w-3/4' />
      </div>
      <Skeleton className='mb-2 h-5 w-27' />
      <Skeleton className='h-8 w-full' />
    </div>
  );
};
