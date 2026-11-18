'use client';

import React from 'react';

import { useIsDesktop } from '@/components/DeviceProvider';

import { ProductImagesDesktop, ProductImagesMobile } from './components';

interface Props {
  product: Product;
}

export const ProductImages = ({ product }: Props) => {
  const isDesktop = useIsDesktop();

  // one variant only: the server picks it by the User-Agent, the browser by the screen width
  return (
    <div className='relative'>
      {isDesktop ? (
        <ProductImagesDesktop product={product} />
      ) : (
        <ProductImagesMobile product={product} />
      )}
    </div>
  );
};
