'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ProductList, ProductListSkeleton } from '@/components/modules/product';
import { getViewedProducts } from '@/utils/api/requests';

export const RecentlyViewedProducts = () => {
  const t = useTranslations();
  const getProductByIdQuery = useQuery({
    queryKey: ['recentlyViewedProducts'],
    staleTime: 0,
    queryFn: () => getViewedProducts()
  });

  const viewedProducts = getProductByIdQuery.data?.data.result.content;

  if (getProductByIdQuery.isLoading)
    return (
      <div className='mt-8'>
        <h2 className='text-lg font-bold md:text-2xl'>{t('Frequently bought together')}</h2>
        <ProductListSkeleton />
      </div>
    );

  if (!viewedProducts?.length) return null;

  return (
    <div className='mt-8'>
      <h2 className='text-lg font-bold md:text-2xl'>{t('Frequently bought together')}</h2>
      <ProductList products={viewedProducts} />
    </div>
  );
};
