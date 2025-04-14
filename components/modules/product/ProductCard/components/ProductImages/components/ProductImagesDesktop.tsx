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
          alt={product.name}
          className='absolute inset-0 z-0 object-contain'
          src={product.images[0].image}
          priority
        />
        {product.images.length > 1 &&
          product.images.map((image, i) => (
            <Image
              fill
              key={image.id}
              alt={product.name}
              className='absolute inset-0 z-1 object-contain'
              hidden={tab !== i}
              src={image.image}
              loading='lazy'
            />
          ))}

        {product.images.length > 1 && (
          <div className='relative z-1 flex size-full'>
            {product.images.map((image, i) => (
              <div key={image.id} className='flex-1' onMouseEnter={() => setTab(i)} />
            ))}
          </div>
        )}
      </div>

      {product.images.length > 1 && (
        <div className='mr-1 flex h-1 justify-center gap-1'>
          {product.images.map((image, i) => (
            <span
              key={image.id}
              className={cn('bg-muted-foreground/50 block size-1 shrink-0 rounded-full', {
                'bg-primary': tab === i || (i === 0 && tab === -1)
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
};
