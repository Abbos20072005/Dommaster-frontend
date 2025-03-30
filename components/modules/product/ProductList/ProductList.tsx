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

type Props = React.ComponentProps<'div'> & {
  view?: 'carousel' | 'grid';
  products: Product[];
};

export const ProductList = ({ view = 'carousel', products }: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const setLockParentScroll = useNestedEmblaCarousel(api);

  return (
    <div>
      {view === 'grid' && (
        <div className='grid grid-cols-2 gap-2 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:gap-4'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {view === 'carousel' && (
        <Carousel setApi={setApi}>
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5'
              >
                <ProductCard product={product} setLockParentScroll={setLockParentScroll} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};
