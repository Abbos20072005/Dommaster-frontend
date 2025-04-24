import React from 'react';

import { ProductCharacteristicsPreview, ProductImageCarousel } from './components';

interface Props {
  product: Product;
}

export const ProductDescription = ({ product }: Props) => {
  return (
    <div className='grid gap-6 md:grid-cols-[3fr_2fr]'>
      <ProductImageCarousel product={product} />
      {!!product.characteristics.length && (
        <div className='hidden md:block'>
          <ProductCharacteristicsPreview characteristics={product.characteristics} />
        </div>
      )}
    </div>
  );
};
