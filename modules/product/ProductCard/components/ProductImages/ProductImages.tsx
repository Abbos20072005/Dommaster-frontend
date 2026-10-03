import React from 'react';

import { ProductImagesDesktop, ProductImagesMobile } from './components';

interface Props {
  product: Product;
}

export const ProductImages = ({ product }: Props) => {
  return (
    <div className='relative'>
      <ProductImagesDesktop product={product} />
      <ProductImagesMobile product={product} />
    </div>
  );
};
