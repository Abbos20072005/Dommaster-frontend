'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ProductList, ProductListSkeleton } from '@/components/modules/product';
import { getViewedProducts } from '@/utils/api/requests';
import { useAuth } from '@/utils/stores';

export const RecentlyViewedProducts = () => {
  const t = useTranslations();
  const { user } = useAuth();
  const getProductByIdQuery = useQuery({
    queryKey: ['recentlyViewedProducts'],
    staleTime: 0,
    enabled: !!user,
    queryFn: () => getViewedProducts()
  });

  const viewedProducts = getProductByIdQuery.data?.data.result.content;

  if (getProductByIdQuery.isLoading)
    return (
      <section>
        <h2 className='text-lg font-bold md:text-2xl'>{t('Recently viewed products')}</h2>
        <ProductListSkeleton />
      </section>
    );

  if (!viewedProducts?.length) return null;

  return (
    <section>
      <h2 className='text-lg font-bold md:text-2xl'>{t('Recently viewed products')}</h2>
      <ProductList products={viewedProducts} />
    </section>
  );
};
