import React from 'react';

import { ProductList } from '@/components/modules/product';
import { getViewedProducts } from '@/utils/api/requests';

export const RecentlyViewedProducts = async () => {
  const viewedProductsResponse = await getViewedProducts();

  const viewedProducts = viewedProductsResponse.data.result.content;

  if (!viewedProducts?.length) return null;

  return <ProductList products={viewedProducts} />;
};
