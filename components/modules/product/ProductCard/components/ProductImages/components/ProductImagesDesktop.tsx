'use client';

import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';

interface Props {
  product: Product;
}

export const ProductImagesDesktop = ({ product }: Props) => {
  const [tab, setTab] = React.useState(-1);

  return (
    <div className='hidden md:block' onMouseLeave={() => setTab(-1)}>
      <div className='relative aspect-square'>
        <Image
          fill
          alt={product.title}
          className='absolute inset-0 z-0'
          src={product.cover_image}
          priority
        />
        {product.images.map((image, i) => (
          <Image
            fill
            key={image}
            alt={product.title}
            className='absolute inset-0 z-1'
            hidden={tab !== i}
            src={image}
            loading='lazy'
          />
        ))}
        <div className='relative z-1 flex size-full'>
          {product.images.map((image, i) => (
            <div key={image} className='flex-1' onMouseEnter={() => setTab(i)} />
          ))}
        </div>
      </div>
      <div className='mr-1 flex h-1 justify-center gap-1'>
        {product.images.map((image, i) => (
          <span
            key={image}
            className={cn('bg-muted-foreground/50 block size-1 shrink-0 rounded-full', {
              'bg-primary': tab === i || (i === 0 && tab === -1)
            })}
          />
        ))}
      </div>
    </div>
  );
};
