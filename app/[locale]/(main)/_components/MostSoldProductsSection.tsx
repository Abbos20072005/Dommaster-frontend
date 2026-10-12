'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { BaseLayout } from '@/components/layout';
import { ProductListSkeleton, ProductSection } from '@/modules/product';
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
        <BaseLayout>
          <div className='flex items-center justify-between gap-3'>
            <h2 className='text-lg font-bold md:text-2xl'>{t('Bestsellers')}</h2>
          </div>
          <ProductListSkeleton />
        </BaseLayout>
      </section>
    );

  if (!products.length) return null;

  return (
    <section>
      <BaseLayout>
        <ProductSection
          href='/bestsellers'
          products={products}
          title={<h2 className='text-lg font-bold md:text-2xl'>{t('Bestsellers')}</h2>}
        />
      </BaseLayout>
    </section>
  );
};
