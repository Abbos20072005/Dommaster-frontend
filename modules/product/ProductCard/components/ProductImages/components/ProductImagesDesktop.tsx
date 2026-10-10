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
    <div className='relative hidden aspect-square overflow-hidden rounded-lg bg-white md:block'>
      {product.images.map((image, i) => (
        <Image
          fill
          key={image.id}
          alt={product.name || 'Buildex'}
          className={cn('object-contain', { hidden: tab !== i })}
          priority={i === 0}
          sizes='(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, 33vw'
          src={image.image}
        />
      ))}

      {product.images.length > 1 && (
        <div className='absolute inset-0 z-1 flex'>
          {product.images.map((image, i) => (
            <div key={image.id} className='flex-1' onMouseEnter={() => setTab(i)} />
          ))}
        </div>
      )}

      {product.images.length > 1 && (
        <div className='absolute inset-x-0 bottom-2 z-2 flex justify-center gap-1'>
          {product.images.map((image, i) => (
            <span
              key={image.id}
              className={cn('bg-muted-foreground/50 block size-1 shrink-0 rounded-full', {
                'bg-primary': tab === i
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
};
