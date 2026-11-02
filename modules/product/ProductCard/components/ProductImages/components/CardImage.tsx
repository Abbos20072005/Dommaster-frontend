'use client';

import type { ImageProps } from 'next/image';

import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';

// A product photo is always shown whole (never cropped). When its shape differs from the shape
// of its slot, the rest of the slot is filled with a blurred, enlarged copy of the same photo
// instead of white bars. A difference of up to 1% is not visible and gets no backdrop.
const MAX_DEVIATION = 1.01;

/** Image for a `relative overflow-hidden` slot, used with `fill`. */
export const CardImage = ({ className, onLoad, ...props }: ImageProps) => {
  const ref = React.useRef<HTMLImageElement>(null);
  const [mismatch, setMismatch] = React.useState(false);

  // measured on load, when the photo is already there (the server HTML) and when the slot
  // changes its size (the number of columns of the grid changes with the window)
  const measure = React.useCallback(() => {
    const image = ref.current;
    const slot = image?.parentElement;
    if (!image?.naturalWidth || !image.naturalHeight || !slot?.clientWidth || !slot.clientHeight) {
      return;
    }
    const ratio = image.naturalWidth / image.naturalHeight / (slot.clientWidth / slot.clientHeight);
    setMismatch(ratio > MAX_DEVIATION || ratio < 1 / MAX_DEVIATION);
  }, []);

  React.useEffect(() => {
    measure();
    const slot = ref.current?.parentElement;
    if (!slot) return;
    const observer = new ResizeObserver(measure);
    observer.observe(slot);
    return () => observer.disconnect();
  }, [measure]);

  return (
    <>
      {mismatch && (
        <Image
          {...props}
          aria-hidden
          alt=''
          className={cn('scale-125 object-cover blur-2xl', className)}
          loading='lazy'
          priority={false}
          sizes='48px'
        />
      )}
      <Image
        {...props}
        ref={ref}
        className={cn('object-contain', className)}
        onLoad={(event) => {
          measure();
          onLoad?.(event);
        }}
      />
    </>
  );
};
