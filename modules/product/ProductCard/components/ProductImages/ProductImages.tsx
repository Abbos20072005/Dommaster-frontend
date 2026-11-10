'use client';

import React from 'react';

import { useMinWidth } from '@/hooks';

import { ProductImagesDesktop, ProductImagesMobile } from './components';

interface Props {
  product: Product;
}

export const ProductImages = ({ product }: Props) => {
  const isDesktop = useMinWidth(768);

  // both are in the server markup (the CSS shows one); once the screen is known the other goes
  return (
    <div className='relative'>
      {isDesktop !== false && <ProductImagesDesktop product={product} />}
      {isDesktop !== true && <ProductImagesMobile product={product} />}
    </div>
  );
};
