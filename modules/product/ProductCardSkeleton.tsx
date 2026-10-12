import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'div'> & {
  hideCart?: boolean;
};

export const ProductCardSkeleton = ({ className, hideCart, ...props }: Props) => {
  return (
    <div
      className={cn(
        'flex h-[480px] flex-col',
        className
      )}
      {...props}
    >
      <Skeleton className='h-[288px] w-full rounded-xl' />
      <div className='flex flex-1 flex-col gap-3 pt-3'>
        <Skeleton className='h-5 w-20' />
        <div className='flex-1 space-y-1.5'>
          <Skeleton className='h-3.5 w-full' />
          <Skeleton className='h-3.5 w-3/4' />
        </div>
        <Skeleton className='h-4 w-24' />
        {!hideCart && <Skeleton className='h-10 w-full rounded-xl' />}
      </div>
    </div>
  );
};
