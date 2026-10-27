'use client';

import type { ImageProps } from 'next/image';

import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';

// A photo whose shape is close to the shape of its slot fills it; any other photo is shown
// whole (the empty space is white). Product photos often reach their edges, so even a crop of
// 5-7% cuts a part of the product: only a difference of up to 3% is filled.
const MAX_DEVIATION = 1.03;

export const CardImage = ({ className, onLoad, ...props }: ImageProps) => {
  const ref = React.useRef<HTMLImageElement>(null);
  const [fit, setFit] = React.useState<'cover' | 'contain'>('cover');

  // measured on load, when the photo is already there (the server HTML) and when the slot
  // changes its size (the number of columns of the grid changes with the window)
  const measure = React.useCallback(() => {
    const image = ref.current;
    const slot = image?.parentElement;
    if (!image?.naturalWidth || !image.naturalHeight || !slot?.clientWidth || !slot.clientHeight) {
      return;
    }
    const ratio = image.naturalWidth / image.naturalHeight / (slot.clientWidth / slot.clientHeight);
    setFit(ratio > MAX_DEVIATION || ratio < 1 / MAX_DEVIATION ? 'contain' : 'cover');
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
    <Image
      {...props}
      ref={ref}
      className={cn(fit === 'cover' ? 'object-cover' : 'object-contain', className)}
      onLoad={(event) => {
        measure();
        onLoad?.(event);
      }}
    />
  );
};
