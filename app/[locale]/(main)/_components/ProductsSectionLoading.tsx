import React from 'react';

import { BaseLayout } from '@/components/layout';
import { ProductCardSkeleton } from '@/components/modules/product';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductsSectionLoading = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <section key={index}>
          <BaseLayout>
            <h2 className='text-lg font-bold md:text-2xl'>
              <Skeleton className='h-7 w-1/2 md:h-8' />
            </h2>
            <Carousel opts={{ align: 'start' }}>
              <CarouselContent className='py-4'>
                {Array.from({ length: 10 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className='basis-[250px] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'
                  >
                    <ProductCardSkeleton />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </BaseLayout>
        </section>
      ))}
    </>
  );
};
