'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useAuth } from '@/modules/auth';
import { getViewedProducts } from '@/utils/api/requests';

import { ProductList } from '../ProductList/ProductList';
import { ProductListSkeleton } from '../ProductListSkeleton';

interface Props {
  className?: string;
}

/** "Recently viewed products" carousel — shown to signed-in customers, hidden when empty. */
export const RecentlyViewedProducts = ({ className }: Props) => {
  const t = useTranslations();
  const { user } = useAuth();
  const getViewedProductsQuery = useQuery({
    queryKey: ['products', 'recentlyViewed'],
    staleTime: 0,
    enabled: !!user,
    queryFn: () => getViewedProducts()
  });

  const viewedProducts = getViewedProductsQuery.data?.data.result.content;

  if (getViewedProductsQuery.isLoading)
    return (
      <section className={className}>
        <h2 className='text-lg font-bold md:text-2xl'>{t('Recently viewed products')}</h2>
        <ProductListSkeleton />
      </section>
    );

  if (!viewedProducts?.length) return null;

  return (
    <section className={className}>
      <h2 className='text-lg font-bold md:text-2xl'>{t('Recently viewed products')}</h2>
      <ProductList products={viewedProducts} />
    </section>
  );
};
