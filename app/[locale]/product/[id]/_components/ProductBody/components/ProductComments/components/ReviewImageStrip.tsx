'use client';

import Image from 'next/image';
import React from 'react';

import { ImageLightbox } from '@/components/ImageLightbox';
import { cn } from '@/lib/utils';

interface Props {
  images: { id: number | string; src: string }[];
  alt: string;
  /** thumbnails shown before the "+N" tile */
  limit?: number;
  className?: string;
  size?: 'sm' | 'md';
}

/** A row of rounded photo tiles; the last one says "+N" when there are more. A tile opens the viewer. */
export const ReviewImageStrip = ({ images, alt, limit = 10, className, size = 'md' }: Props) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  if (images.length === 0) return null;

  const shown = images.slice(0, limit);
  const rest = images.length - shown.length;

  return (
    <>
      <div className={cn('flex flex-wrap gap-1.5', className)}>
        {shown.map((image, index) => (
          <button
            key={image.id}
            type='button'
            className={cn(
              'relative shrink-0 cursor-zoom-in overflow-hidden rounded-xl',
              size === 'md' ? 'size-16 md:size-20' : 'size-14 md:size-16'
            )}
            onClick={() => setOpenIndex(index)}
          >
            <Image fill alt={alt} className='object-cover' sizes='80px' src={image.src} />
            {rest > 0 && index === shown.length - 1 && (
              <span className='absolute inset-0 grid place-items-center bg-black/50 text-sm font-bold text-white'>
                +{rest}
              </span>
            )}
          </button>
        ))}
      </div>
      <ImageLightbox
        alt={alt}
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
};
