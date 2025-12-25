'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useAuth } from '@/modules/auth';
import { ProductList, ProductListSkeleton } from '@/modules/product';
import { getViewedProducts } from '@/utils/api/requests';

export const RecentlyViewedProducts = () => {
  const t = useTranslations();
  const { user } = useAuth();
  const getProductByIdQuery = useQuery({
    queryKey: ['products', 'recentlyViewed'],
    staleTime: 0,
    enabled: !!user,
    queryFn: () => getViewedProducts()
  });

  const viewedProducts = getProductByIdQuery.data?.data.result.content;

  if (getProductByIdQuery.isLoading)
    return (
      <div className='mt-8'>
        <h2 className='text-lg font-bold md:text-2xl'>{t('Recently viewed products')}</h2>
        <ProductListSkeleton />
      </div>
    );

  if (!viewedProducts?.length) return null;

  return (
    <div className='mt-8'>
      <h2 className='text-lg font-bold md:text-2xl'>{t('Recently viewed products')}</h2>
      <ProductList products={viewedProducts} />
    </div>
  );
};
