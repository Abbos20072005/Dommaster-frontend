import { getTranslations } from 'next-intl/server';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { Filter } from '@/components/modules/filter';
import { ProductList } from '@/components/modules/product';
import { productsData } from '@/fake-data/products';
import { getProducts } from '@/utils/api/requests';
import { getQueryClient } from '@/utils/getQueryClient';

import { MobileFilterDrawer, ProductsSortBySelect } from './-components';

interface Props {
  searchParams: Promise<{ q: string }>;
}

const SearchPage = async ({ searchParams }: Props) => {
  const { q, ...rest } = await searchParams;
  const t = await getTranslations();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', q, rest],
    queryFn: () => getProducts({ config: { params: { q, ...rest } } })
  });

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='pt-4'>
        <h1 className='mb-4 font-bold sm:text-lg md:text-2xl'>
          {t('Search results for: {search}', {
            search: q,
            productQty: productsData.length
          })}
        </h1>
        <div className='gap-8 lg:flex'>
          <aside className='hidden w-52 lg:block xl:w-60'>
            <Filter />
          </aside>
          <div className='lg:flex-1'>
            <div className='mb-4 flex items-center justify-between'>
              <ProductsSortBySelect />
              <MobileFilterDrawer />
            </div>
            <ProductList view='grid' products={productsData} />
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default SearchPage;
