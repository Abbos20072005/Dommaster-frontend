'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { ViewAllButton } from '@/components/ViewAllButton';
import { ProductList, ProductListSkeleton } from '@/modules/product';
import { getMostSoldProducts } from '@/utils/api/requests';

export const MostSoldProductsSection = () => {
  const t = useTranslations();
  const getMostSoldProductsQuery = useQuery({
    queryKey: ['products', 'mostSold'],
    staleTime: 0,
    queryFn: () => getMostSoldProducts()
  });

  const products = getMostSoldProductsQuery.data?.data.result || [];

  if (getMostSoldProductsQuery.isLoading)
    return (
      <section>
        <h2 className='text-lg font-bold md:text-2xl'>{t('Bestsellers')}</h2>
        <ProductListSkeleton />
      </section>
    );

  if (!products.length) return null;

  return (
    <section>
      <div className='flex items-center justify-between gap-3'>
        <h2 className='text-lg font-bold md:text-2xl'>{t('Bestsellers')}</h2>
        <ViewAllButton href='/search?sort_by=rating' />
      </div>
      <ProductList products={products} />
    </section>
  );
};
