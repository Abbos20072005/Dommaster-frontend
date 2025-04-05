'use client';

import React from 'react';

import type { CarouselApi } from '@/components/ui/carousel';

import { ProductCard } from '@/components/modules/product';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useNestedEmblaCarousel
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'div'> & {
  view?: 'carousel' | 'grid';
  products: Product[];
};

export const ProductList = ({ view = 'carousel', products, className, ...props }: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const setLockParentScroll = useNestedEmblaCarousel(api);

  return (
    <>
      {view === 'grid' && (
        <div
          className={cn(
            'grid grid-cols-2 gap-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] md:gap-4',
            className
          )}
          {...props}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {view === 'carousel' && (
        <Carousel setApi={setApi} opts={{ align: 'start' }}>
          <CarouselContent className={cn('py-4', className)} {...props}>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className='basis-[250px] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'
              >
                <ProductCard product={product} setLockParentScroll={setLockParentScroll} />
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
