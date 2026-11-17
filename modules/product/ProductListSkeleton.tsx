import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { ProductCardSkeleton } from './ProductCardSkeleton';

type Props = React.ComponentProps<'div'> & {
  view?: 'carousel' | 'grid';
  count?: number;
  hideCart?: boolean;
};

export const ProductListSkeleton = ({
  view = 'carousel',
  count = 10,
  hideCart,
  className,
  ...props
}: Props) => {
  return (
    <>
      {view === 'grid' && (
        <div
          className={cn(
            // the same columns as `ProductList`
            'grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:gap-x-4 lg:grid-cols-5',
            className
          )}
          {...props}
        >
          {Array.from({ length: count }).map((_, index) => (
            <ProductCardSkeleton key={index} hideCart={hideCart} />
          ))}
        </div>
      )}
      {view === 'carousel' && (
        <Carousel opts={{ align: 'start' }}>
          <CarouselContent className={cn('py-4', className)} {...props}>
            {Array.from({ length: count }).map((_, index) => (
              <CarouselItem
                key={index}
                className='basis-[230px] sm:basis-1/2 md:basis-1/3 lg:basis-1/6'
              >
                <ProductCardSkeleton hideCart={hideCart} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </>
  );
};
