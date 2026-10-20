'use client';

import type { ImageProps } from 'next/image';

import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';

// Photos of a normal shape fill the whole slot; very wide or very tall ones are shown fully (empty space above/below or on the sides)
const MIN_RATIO = 0.5;
const MAX_RATIO = 1.1;

export const CardImage = ({ className, onLoad, ...props }: ImageProps) => {
  const [fit, setFit] = React.useState<'cover' | 'contain'>('cover');

  return (
    <Image
      {...props}
      className={cn(fit === 'cover' ? 'object-cover' : 'object-contain', className)}
      onLoad={(e) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth && naturalHeight) {
          const ratio = naturalWidth / naturalHeight;
          setFit(ratio < MIN_RATIO || ratio > MAX_RATIO ? 'contain' : 'cover');
        }
        onLoad?.(e);
      }}
    />
  );
};
