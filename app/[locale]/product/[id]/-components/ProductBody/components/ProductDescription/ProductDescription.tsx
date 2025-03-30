import React from 'react';

import {
  ProductDetailsPreview,
  ProductImageCarousel,
  ProductPropertiesPreview
} from './components';

interface Props {
  product: Product;
}

export const ProductDescription = ({ product }: Props) => {
  return (
    <div className='grid gap-8 md:grid-cols-[2fr_3fr]'>
      <ProductImageCarousel images={product.images} />
      <div>
        <ProductDetailsPreview description={product.description} />
        <ProductPropertiesPreview properties={product.properties} />
      </div>
    </div>
  );
};
