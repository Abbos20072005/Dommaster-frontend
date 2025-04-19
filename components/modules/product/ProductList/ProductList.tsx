'use client';

import React from 'react';

import { ProductCard } from '@/components/modules/product';
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
  products: Product[];
};

export const ProductList = ({ view = 'carousel', products, className, ...props }: Props) => {
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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {view === 'carousel' && (
        <>
          <div className={cn('relative overflow-y-auto py-4 md:hidden', className)} {...props}>
            <div className='flex gap-2'>
              {products.map((product) => (
                <ProductCard key={product.id} className='min-w-[200px]' product={product} />
              ))}
            </div>
          </div>
          <Carousel className='hidden md:block' opts={{ align: 'start' }}>
            <CarouselContent className={cn('py-4', className)} {...props}>
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className='basis-[230px] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'
                >
                  <ProductCard className='h-full' product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      )}
    </>
  );
};
