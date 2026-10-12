'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { ProductList, ProductListSkeleton } from '@/modules/product';
import { getMostSoldProducts } from '@/utils/api/requests';

/** Every product of the "Bestsellers" carousel (the same request as the carousel). */
export const BestsellersList = () => {
  const t = useTranslations();
  const query = useQuery({
    queryKey: ['products', 'mostSold'],
    queryFn: () => getMostSoldProducts()
  });
  const products = query.data?.data.result ?? [];

  return (
    <section className='space-y-4'>
      <h1 className='text-lg font-bold md:text-2xl lg:text-3xl'>{t('Bestsellers')}</h1>
      {query.isLoading ? (
        <ProductListSkeleton view='grid' />
      ) : (
        <ProductList view='grid' products={products} />
      )}
    </section>
  );
};
