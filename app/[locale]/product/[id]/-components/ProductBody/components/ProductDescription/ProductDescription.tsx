import React from 'react';

import { ProductImageCarousel, ProductPropertiesPreview } from './components';

interface Props {
  product: Product;
}

export const ProductDescription = ({ product }: Props) => {
  return (
    <div className='grid gap-6 md:grid-cols-[3fr_2fr]'>
      <ProductImageCarousel images={product.images} />
      <div className='hidden md:block'>
        <ProductPropertiesPreview properties={product.properties} />
      </div>
    </div>
  );
};
