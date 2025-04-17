import { getTranslations } from 'next-intl/server';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { ProductFilterPaginated } from '@/components/ProductFilterPaginated';
import { filters } from '@/fake-data/filters';

interface Props {
  searchParams: Promise<{ q: string }>;
}

const SearchPage = async ({ searchParams }: Props) => {
  const { q } = await searchParams;
  const t = await getTranslations();

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 md:mt-4'>
        <h1 className='mb-4 font-bold sm:text-lg md:text-2xl'>
          {t('Search results for: {search}', { search: q })}
        </h1>
        <ProductFilterPaginated filters={filters} />
      </BaseLayout>
    </div>
  );
};

export default SearchPage;
