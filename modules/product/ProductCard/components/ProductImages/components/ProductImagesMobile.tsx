'use client';

import React from 'react';

import type { CarouselApi } from '@/components/ui/carousel';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

import { CardImage } from './CardImage';

interface Props {
  product: Product;
}

export const ProductImagesMobile = ({ product }: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  // the other photos are only in the DOM once the card is touched (a catalog page has hundreds)
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      className='relative overflow-hidden rounded-xl bg-white group-data-[on-dark]/card:rounded-none md:hidden'
      onPointerDown={() => setTouched(true)}
    >
      <Carousel setApi={setApi}>
        <CarouselContent className='ml-0'>
          {product.images.map((image, i) => (
            <CarouselItem key={image.id} className='relative aspect-3/4 overflow-hidden pl-0'>
              {(i === 0 || touched) && (
                <CardImage fill alt={product.name || 'Buildex'} sizes='50vw' src={image.image} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {product.images.length > 1 && (
        <div className='absolute inset-x-0 bottom-2 flex justify-center gap-1'>
          {product.images.map((image, i) => (
            <span
              key={image.id}
              className={cn('bg-muted-foreground/50 block size-1 shrink-0 rounded-full', {
                'bg-primary': current - 1 === i
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
};
