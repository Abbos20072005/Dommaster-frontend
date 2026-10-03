'use client';

import { XIcon } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import type { CarouselApi } from '@/components/ui/carousel';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
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
      <Dialog open={modalIndex !== null} onOpenChange={(open) => !open && setModalIndex(null)}>
        <DialogContent
          hideCloseButton
          overlayClassName='bg-[rgba(0,0,0,0.75)] backdrop-blur-[2px]'
          className='top-0 left-0 flex h-dvh max-w-none translate-x-0 translate-y-0 items-center justify-center rounded-none border-0 bg-transparent p-4 shadow-none sm:max-w-none sm:rounded-none'
          aria-describedby={undefined}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalIndex(null);
          }}
        >
          <DialogTitle className='sr-only'>{product.name || 'Buildex'}</DialogTitle>
          <DialogClose className='absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md transition-colors hover:bg-white'>
            <XIcon className='size-5' />
            <span className='sr-only'>Close</span>
          </DialogClose>
          <Carousel className='w-full max-w-3xl' opts={{ startIndex: modalIndex ?? 0 }}>
            <CarouselContent>
              {product.images.map((image) => (
                <CarouselItem key={image.id}>
                  <div className='relative h-[85vh] w-full'>
                    <Image
                      fill
                      alt={product.name || 'Buildex'}
                      className='object-contain'
                      src={image.image}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {product.images.length > 1 && (
              <>
                <CarouselPrevious className='left-2' />
                <CarouselNext className='right-2' />
              </>
            )}
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
};
