'use client';

import Image from 'next/image';
import React from 'react';

import type { CarouselApi } from '@/components/ui/carousel';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface Props {
  product: Product;
}

export const ProductImagesMobile = ({ product }: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className='md:hidden'>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {product.images.map((image, i) => (
            <CarouselItem key={image.id}>
              <div className='relative aspect-[4/3]'>
                <Image
                  fill
                  alt={product.name}
                  className='object-contain'
                  src={image.image}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  priority={i === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {product.images.length > 1 && (
        <div className='mr-1 flex h-1 justify-center gap-1'>
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
