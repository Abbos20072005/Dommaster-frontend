import React from 'react';

import { ProductImagesDesktop, ProductImagesMobile } from './components';

interface Props {
  product: Product;
  setLockParentScroll?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductImages = ({ product, setLockParentScroll }: Props) => {
  return (
    <div>
      <ProductImagesDesktop product={product} />
      <ProductImagesMobile product={product} setLockParentScroll={setLockParentScroll} />
    </div>
  );
};
