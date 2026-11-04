import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Props extends React.ComponentProps<'div'> {
  isLoading?: boolean;
}

export const FilterSkeleton = ({ className, ...props }: Props) => {
  return (
    // groups like the real filter: a heading, then the rows with a check box
    <div className={cn('space-y-6', className)} {...props}>
      {Array.from({ length: 3 }).map((_, group) => (
        <div key={group} className='space-y-3'>
          <Skeleton className='h-5 w-1/2' />
          {[70, 55, 85, 45].map((width) => (
            <div key={width} className='flex items-center gap-2'>
              <Skeleton className='size-4 shrink-0 rounded' />
              <Skeleton className='h-4' style={{ width: `${width}%` }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
