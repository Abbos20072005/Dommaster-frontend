'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CarouselContentProps extends React.ComponentProps<typeof Swiper> {}

const Carousel = ({ className, modules = [], ...props }: CarouselContentProps) => {
  return (
    <Swiper
      className={cn('relative', className)}
      modules={[Navigation, Pagination, A11y, ...modules]}
      {...props}
    />
  );
};

interface CarouselItemProps extends React.ComponentProps<typeof SwiperSlide> {}

const CarouselItem = ({ ...props }: CarouselItemProps) => {
  return <SwiperSlide {...props} />;
};

const CarouselPrevious = ({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { slidePrev, allowSlidePrev, isHorizontal } = useSwiper();

  return (
    <Button
      className={cn(
        'absolute hidden size-10 rounded-full shadow-sm disabled:hidden md:flex',
        isHorizontal()
          ? 'top-1/2 -left-4 -translate-y-1/2'
          : '-top-5 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!allowSlidePrev}
      size={size}
      variant={variant}
      data-slot='carousel-previous'
      onClick={() => slidePrev()}
      {...props}
    >
      <ChevronLeft className='mr-0.5 size-5' />
      <span className='sr-only'>Previous slide</span>
    </Button>
  );
};

const CarouselNext = ({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { slideNext, allowSlideNext, isHorizontal } = useSwiper();

  return (
    <Button
      className={cn(
        'absolute hidden size-10 rounded-full shadow-sm disabled:hidden md:flex',
        isHorizontal()
          ? 'top-1/2 -right-4 -translate-y-1/2'
          : '-bottom-5 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!allowSlideNext}
      size={size}
      variant={variant}
      data-slot='carousel-next'
      onClick={() => slideNext()}
      {...props}
    >
      <ChevronRight className='ml-0.5 size-5' />
      <span className='sr-only'>Next slide</span>
    </Button>
  );
};

export { Carousel, CarouselItem, CarouselNext, CarouselPrevious };
