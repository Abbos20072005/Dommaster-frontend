import React from 'react';

import { ProductDescriptionPreview, ProductImageCarousel } from './components';

interface Props {
  product: Product;
}

export const ProductDescription = ({ product }: Props) => {
  return (
    <div className='grid gap-6 md:grid-cols-[3fr_2fr]'>
      <ProductImageCarousel product={product} />
      {!!product.description && (
        <div className='hidden md:block'>
          <ProductDescriptionPreview description={product.description} />
        </div>
      )}
    </div>
  );
};


