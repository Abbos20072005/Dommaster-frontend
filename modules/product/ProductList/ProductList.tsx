'use client';

import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { usePathname } from '@/i18n/navigation';
import { trackViewItemList } from '@/lib/analytics';
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
  /** grid only: shown across the full width after the 12th product (3 rows of 4) */
  inserted?: React.ReactNode;
};

export const ProductList = ({
  view = 'carousel',
  hideControl,
  hideCart,
  onDark,
  products,
  className,
  itemClassName,
  inserted,
  ...props
}: Props) => {
  const pathname = usePathname();

  // `view_item_list`: a product grid (a category, favorites, search) was shown
  const productIds = products.map((product) => product.id).join(',');
  React.useEffect(() => {
    if (view === 'grid' && products.length) trackViewItemList(pathname, products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, productIds, pathname]);

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
          {products.map((product, index) => (
            <React.Fragment key={product.id}>
              <ProductCard
                hideCart={hideCart}
                hideControl={hideControl}
                onDark={onDark}
                product={product}
              />
              {/* 12 fills whole rows of 2, 3 and 4 columns, so the banner never splits a row */}
              {inserted && index === 11 && products.length > 12 && (
                <div className='col-span-full overflow-hidden'>{inserted}</div>
              )}
            </React.Fragment>
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
