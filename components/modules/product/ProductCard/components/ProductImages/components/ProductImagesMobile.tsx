'use client';

import Image from 'next/image';
import React from 'react';

import type { CarouselApi } from '@/components/ui/carousel';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface Props {
  product: Product;
  setLockParentScroll?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductImagesMobile = ({ product, setLockParentScroll }: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api || !setLockParentScroll) return;
    api.on('pointerDown', () => setLockParentScroll(true));
    api.on('pointerUp', () => setLockParentScroll(false));
  }, [api, setLockParentScroll]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const stopPropagation = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div className='md:hidden'>
      <Carousel
        setApi={setApi}
        onMouseDown={stopPropagation}
        onMouseMove={stopPropagation}
        onPointerDown={stopPropagation}
        onTouchMove={stopPropagation}
        onTouchStart={stopPropagation}
      >
        <CarouselContent>
          {product.images.map((image, i) => (
            <CarouselItem key={image.id}>
              <div className='relative aspect-square'>
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
