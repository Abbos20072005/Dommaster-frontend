'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import { CardImage } from './CardImage';

interface Props {
  product: Product;
}

export const ProductImagesDesktop = ({ product }: Props) => {
  const [tab, setTab] = React.useState(0);
  // the other photos are only in the DOM once the card is hovered: a catalog page has hundreds
  // of cards, and most photos are never looked at
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className='relative hidden aspect-3/4 overflow-hidden rounded-xl bg-white group-data-[on-dark]/card:rounded-none md:block'
      onMouseEnter={() => setHovered(true)}
    >
      {product.images.map((image, i) =>
        i === 0 || hovered ? (
          <CardImage
            fill
            key={image.id}
            alt={product.name || 'Buildex'}
            className={cn({ hidden: tab !== i })}
            sizes='(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, 33vw'
            src={image.image}
          />
        ) : null
      )}

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
