import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = React.ComponentProps<'div'> & {
  view?: 'carousel' | 'grid';
  products: Product[];
  hideCart?: boolean;
  hideControl?: boolean;
  /** the list lies on a dark background: light text */
  onDark?: boolean;
  /** overrides the carousel item width, e.g. `lg:basis-1/5` next to a side menu */
  itemClassName?: string;
};

export const ProductList = ({
  view = 'carousel',
  hideControl,
  hideCart,
  onDark,
  products,
  className,
  itemClassName,
  ...props
}: Props) => {
  return (
    <>
      {view === 'grid' && (
        <div
          className={cn(
            // 2 columns on a phone, 3 on a tablet, 5 on a laptop and wider. With fewer (wider) columns the
// 288px high photo is cropped, so 5 is used from `lg`
'grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:gap-x-4 lg:grid-cols-5',
            className
          )}
          {...props}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              hideCart={hideCart}
              hideControl={hideControl}
              onDark={onDark}
              product={product}
            />
          ))}
        </div>
      )}
      {view === 'carousel' && (
        <>
          <div className={cn('relative overflow-y-auto py-4 md:hidden', className)} {...props}>
            <div className='flex gap-3'>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  className='max-w-[170px] min-w-[170px]'
                  hideCart={hideCart}
                  hideControl={hideControl}
                  onDark={onDark}
                  product={product}
                />
              ))}
            </div>
          </div>
          <Carousel className='hidden md:block' opts={{ align: 'start' }}>
            <CarouselContent className={cn('py-4', className)} {...props}>
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className={cn(
                    'basis-[230px] sm:basis-1/2 md:basis-1/3 lg:basis-1/6',
                    itemClassName
                  )}
                >
                  <ProductCard
                    className='h-full'
                    hideCart={hideCart}
                    hideControl={hideControl}
                    onDark={onDark}
                    product={product}
                  />
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
