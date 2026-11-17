import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'div'> & {
  hideCart?: boolean;
  /** the card on the dark sale block: a square photo and a shorter text part, like `ProductCard` */
  onDark?: boolean;
};

/** The shape of `ProductCard`: a 3:4 photo, the rating, two lines of the name, the price, the cart button. */
export const ProductCardSkeleton = ({ className, hideCart, onDark, ...props }: Props) => {
  return (
    <div className={cn('flex flex-col', className)} {...props}>
      <Skeleton className={cn('aspect-3/4 w-full rounded-xl', onDark && 'aspect-square')} />
      <div className={cn('flex h-48 flex-col gap-3 pt-3', onDark && 'h-44')}>
        <div className='space-y-0.5'>
          <div className='flex h-5 items-center'>
            <Skeleton className='h-3.5 w-28' />
          </div>
          <div className='flex h-10 flex-col justify-center gap-1.5'>
            <Skeleton className='h-3.5 w-full' />
            <Skeleton className='h-3.5 w-2/3' />
          </div>
        </div>
        <div className='mt-auto flex h-6 items-center'>
          <Skeleton className='h-5 w-32' />
        </div>
        {!hideCart && <Skeleton className='h-10 w-full rounded-xl' />}
      </div>
    </div>
  );
};
