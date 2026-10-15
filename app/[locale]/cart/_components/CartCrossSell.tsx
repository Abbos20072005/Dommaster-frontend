'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ProductList } from '@/modules/product';
import { getCartCrossSell } from '@/utils/api/requests';

/**
 * The "Don't forget" block of the cart. The key lies under ['products', 'cart'], which every cart
 * change invalidates: an added product leaves the list on the next request.
 */
export const CartCrossSell = () => {
  const t = useTranslations();
  const getCrossSellQuery = useQuery({
    queryKey: ['products', 'cart', 'crossSell'],
    staleTime: 0,
    queryFn: () => getCartCrossSell()
  });

  const products = getCrossSellQuery.data?.data.result;
  if (!products?.length) return null;

  return (
    <section className='mt-8'>
      <h2 className='text-lg font-bold md:text-2xl'>{t("Don't forget")}</h2>
      <ProductList products={products} />
    </section>
  );
};
