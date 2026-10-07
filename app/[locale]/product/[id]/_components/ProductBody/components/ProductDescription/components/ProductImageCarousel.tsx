'use client';

import { ImageIcon, SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import * as React from 'react';

import { ImageLightbox } from '@/components/ImageLightbox';
import { cn } from '@/lib/utils';
import { ProductControl } from '@/modules/product/ProductCard/components/ProductControl/ProductControl';

import { ShareButton } from '../../ShareButton';

interface ProductImageCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}

const HIDE_SCROLLBAR = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

export const ProductImageCarousel = ({
  product,
  className,
  ...props
}: ProductImageCarouselProps) => {
  const t = useTranslations();
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const images = product.images;
  const name = product.name || 'Buildex';

  const onScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller || !scroller.clientWidth) return;
    setIndex(Math.round(scroller.scrollLeft / scroller.clientWidth));
  };

  const goTo = (next: number) => {
    setIndex(next);
    const scroller = scrollerRef.current;
    scroller?.scrollTo({ left: next * scroller.clientWidth, behavior: 'smooth' });
  };

  if (!images.length) {
    return (
      <div
        className={cn(
          'text-muted-foreground relative flex aspect-square items-center justify-center rounded-xl border',
          className
        )}
        {...props}
      >
        <ImageIcon className='size-14 opacity-40' />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid gap-3',
        images.length > 1 && 'md:grid-cols-[64px_minmax(0,1fr)]',
        className
      )}
      {...props}
    >
      {images.length > 1 && (
        <div className='hidden content-start gap-2 md:grid'>
          {images.map((image, i) => (
            <button
              key={image.id}
              className={cn(
                'relative size-16 overflow-hidden rounded-lg border bg-white p-1 transition-colors',
                i === index ? 'border-primary' : 'hover:border-foreground/30'
              )}
              aria-label={`${name} ${i + 1}`}
              type='button'
              onClick={() => goTo(i)}
            >
              <Image
                fill
                alt={name}
                className='object-contain p-1'
                sizes='64px'
                src={image.image}
              />
            </button>
          ))}
        </div>
      )}

      <div className='min-w-0 space-y-2'>
        <div className='relative overflow-hidden bg-white md:rounded-xl md:border'>
          <div
            ref={scrollerRef}
            className={cn('flex snap-x snap-mandatory overflow-x-auto', HIDE_SCROLLBAR)}
            onScroll={onScroll}
          >
            {images.map((image, i) => (
              <button
                key={image.id}
                className='relative aspect-square w-full shrink-0 cursor-zoom-in snap-start'
                aria-label={t('Zoom in')}
                type='button'
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  fill
                  alt={name}
                  className='object-contain'
                  priority={i === 0}
                  sizes='(min-width: 768px) 520px, 100vw'
                  src={image.image}
                />
              </button>
            ))}
          </div>

          {!!product.discount && (
            <span className='bg-secondary text-foreground absolute top-3 left-3 rounded-md px-2 py-0.5 text-xs font-bold'>
              −{product.discount}%
            </span>
          )}

          <span className='text-muted-foreground bg-background/90 pointer-events-none absolute top-3 right-3 hidden items-center gap-1 rounded-md px-2 py-0.5 text-xs md:flex'>
            <SearchIcon className='size-3.5' />
            {t('Zoom in')}
          </span>

          <div className='absolute top-2 right-3 grid gap-2 md:hidden'>
            <ProductControl className='size-11 border shadow-none' product={product} />
            <ShareButton className='size-11 border shadow-none' title={name} />
          </div>

          {images.length > 1 && (
            <span className='bg-background/90 pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full border px-2.5 py-0.5 text-xs font-medium tabular-nums md:block'>
              {index + 1} / {images.length}
            </span>
          )}
        </div>

        {images.length > 1 && (
          <div className='flex justify-center gap-1.5 md:hidden'>
            {images.map((image, i) => (
              <span
                key={image.id}
                className={cn(
                  'size-1.5 rounded-full',
                  i === index ? 'bg-primary' : 'bg-muted-foreground/40'
                )}
              />
            ))}
          </div>
        )}
      </div>

      <ImageLightbox
        alt={name}
        images={images.map((image) => ({ id: image.id, src: image.image }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </div>
  );
};
