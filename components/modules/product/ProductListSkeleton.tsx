import React from 'react';

import { ProductCardSkeleton } from '@/components/modules/product';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'div'> & {
  view?: 'carousel' | 'grid';
  count?: number;
  hideCart?: boolean;
  hideControl?: boolean;
};

export const ProductListSkeleton = ({
  view = 'carousel',
  count = 10,
  hideControl,
  hideCart,
  className,
  ...props
}: Props) => {
  return (
    <>
      {view === 'grid' && (
        <div
          className={cn(
            'grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] md:gap-4',
            className
          )}
          {...props}
        >
          {Array.from({ length: count }).map((_, index) => (
            <ProductCardSkeleton key={index} hideCart={hideCart} hideControl={hideControl} />
          ))}
        </div>
      )}
      {view === 'carousel' && (
        <Carousel opts={{ align: 'start' }}>
          <CarouselContent className={cn('py-4', className)} {...props}>
            {Array.from({ length: count }).map((_, index) => (
              <CarouselItem
                key={index}
                className='basis-[250px] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'
              >
                <ProductCardSkeleton hideCart={hideCart} hideControl={hideControl} />
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
