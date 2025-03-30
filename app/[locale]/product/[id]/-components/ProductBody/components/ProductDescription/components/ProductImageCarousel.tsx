'use client';

import Image from 'next/image';
import * as React from 'react';

import type { CarouselApi } from '@/components/ui/carousel';

import { Icons } from '@/components/Icons';
import { ImageZoomer } from '@/components/ImageZoomer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface ProductImageCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[];
}

export const ProductImageCarousel = ({
  images,
  className,
  ...props
}: ProductImageCarouselProps) => {
  const [emblaApi, setEmplaApi] = React.useState<CarouselApi>();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowLeft') {
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        scrollNext();
      }
    },
    [scrollNext, scrollPrev]
  );

  const onSelect = React.useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  if (images.length === 0) {
    return (
      <div
        className='bg-secondary flex aspect-square size-full flex-1 items-center justify-center'
        aria-roledescription='placeholder'
        role='img'
      >
        <Icons.placeholder aria-hidden='true' className='text-muted-foreground size-9' />
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)} {...props}>
      <Carousel setApi={setEmplaApi}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image}>
              <div className='aspect-square'>
                <ImageZoomer
                  alt={image}
                  className='size-full rounded-md object-cover'
                  height={385}
                  src={image}
                  width={385}
                  priority={index === 0}
                  role='group'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {images.length > 1 ? (
        <Carousel
          className='hidden md:block'
          opts={{
            align: 'start',
            containScroll: 'keepSnaps',
            dragFree: true
          }}
        >
          <CarouselContent className='-ml-0'>
            {images.map((image, i) => (
              <CarouselItem key={i} className='min-w-0 basis-[60px] pl-0'>
                <button
                  className={cn(
                    'focus-visible:ring-foreground aspect-square size-full border-0 border-b px-1 hover:bg-transparent',
                    i === selectedIndex && 'border-primary'
                  )}
                  onClick={() => scrollTo(i)}
                  onKeyDown={handleKeyDown}
                >
                  <Image
                    alt={image}
                    className='size-full rounded-md object-cover'
                    height={60}
                    src={image}
                    width={60}
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='-left-3 size-8' />
          <CarouselNext className='-right-3 size-8' />
        </Carousel>
      ) : null}
    </div>
  );
};
