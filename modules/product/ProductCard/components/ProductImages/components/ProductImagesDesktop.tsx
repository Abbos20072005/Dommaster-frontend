'use client';

import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';

interface Props {
  product: Product;
}

export const ProductImagesDesktop = ({ product }: Props) => {
  const [tab, setTab] = React.useState(0);

  return (
    <div className='relative hidden md:block'>
      <div className='relative aspect-square bg-white'>
        {product.images.length > 0 &&
          product.images.map((image, i) => (
            <Image
              fill
              key={image.id}
              alt={product.name || 'Buildex'}
              className='absolute inset-0 z-1 object-contain'
              hidden={tab !== i}
              src={image.image}
              priority={i === 0}
            />
          ))}

        {product.images.length > 0 && (
          <div className='relative z-1 flex size-full'>
            {product.images.map((image, i) => (
              <div key={image.id} className='flex-1' onMouseEnter={() => setTab(i)} />
            ))}
          </div>
        )}
      </div>

      {product.images.length > 1 && (
        <div className='absolute inset-x-0 bottom-2 z-2 flex justify-center gap-1'>
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
