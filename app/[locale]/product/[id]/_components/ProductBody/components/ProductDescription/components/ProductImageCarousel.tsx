'use client';

import Image from 'next/image';
import * as React from 'react';

import type { CarouselApi } from '@/components/ui/carousel';

import { ImageLightbox } from '@/components/ImageLightbox';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface ProductImageCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}

export const ProductImageCarousel = ({
  product,
  className,
  ...props
}: ProductImageCarouselProps) => {
  const [emblaApi, setEmplaApi] = React.useState<CarouselApi>();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [modalIndex, setModalIndex] = React.useState<number | null>(null);

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

  return (
    <div className={cn('space-y-2', className)} {...props}>
      <Carousel setApi={setEmplaApi}>
        <CarouselContent>
          {product.images.map((image, index) => (
            <CarouselItem key={image.id}>
              <button
                className='relative mx-auto block aspect-square w-full max-w-[450px] cursor-zoom-in'
                type='button'
                onClick={() => setModalIndex(index)}
              >
                <Image
                  fill
                  alt={product.name || 'Buildex'}
                  className='rounded-md object-contain'
                  src={image.image}
                  priority={index === 0}
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel
        className='hidden md:block'
        opts={{
          align: 'start',
          containScroll: 'keepSnaps',
          dragFree: true
        }}
      >
        <CarouselContent className='-ml-0'>
          {product.images.map((image, i) => (
            <CarouselItem key={image.id} className='min-w-0 basis-[62px] pl-0'>
              <button
                className={cn(
                  'focus-visible:ring-foreground aspect-square size-15 border-0 border-b p-1 hover:bg-transparent',
                  i === selectedIndex && 'border-primary'
                )}
                onClick={() => scrollTo(i)}
                onKeyDown={handleKeyDown}
              >
                <Image
                  alt={product.name || 'Buildex'}
                  className='size-full rounded-md object-contain'
                  height={60}
                  src={image.image}
                  width={60}
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='-left-3 size-8' />
        <CarouselNext className='-right-3 size-8' />
      </Carousel>
      <div className='mr-1 flex h-1 justify-center gap-1 md:hidden'>
        {product.images.map((image, i) => (
          <span
            key={image.id}
            className={cn('bg-muted-foreground/50 block size-1.5 shrink-0 rounded-full', {
              'bg-primary': selectedIndex === i
            })}
          />
        ))}
      </div>
      <ImageLightbox
        alt={product.name || 'Buildex'}
        images={product.images.map((image) => ({ id: image.id, src: image.image }))}
        index={modalIndex}
        onClose={() => setModalIndex(null)}
      />
    </div>
  );
};
