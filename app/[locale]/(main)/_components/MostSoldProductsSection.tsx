'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { BaseLayout } from '@/components/layout';
import { ProductListSkeleton, ProductSection } from '@/modules/product';
import { getMostSoldProducts } from '@/utils/api/requests';

export const MostSoldProductsSkeleton = () => {
  const t = useTranslations();

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
};

interface Props {
  /** the answer of the server (see `MostSoldProducts`): the block is drawn with it at once */
  initial?: ApiResponse<Product[]> | null;
}

export const MostSoldProductsSection = ({ initial }: Props) => {
  const t = useTranslations();
  const getMostSoldProductsQuery = useQuery({
    queryKey: ['products', 'mostSold'],
    staleTime: 0,
    queryFn: () => getMostSoldProducts().then((response) => response.data),
    initialData: initial ?? undefined
  });

  const products = getMostSoldProductsQuery.data?.result || [];

  if (getMostSoldProductsQuery.isLoading) return <MostSoldProductsSkeleton />;

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
