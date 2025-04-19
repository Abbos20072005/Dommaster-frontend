import { getTranslations } from 'next-intl/server';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { ProductFilterPaginated } from '@/components/ProductFilterPaginated';
import { getBrands } from '@/utils/api/requests';

interface Props {
  searchParams: Promise<{ q: string }>;
}

const SearchPage = async ({ searchParams }: Props) => {
  const { q } = await searchParams;
  const t = await getTranslations();
  const brandsResponse = await getBrands();
  const brands = brandsResponse.data.result || [];

  const filters: Filter[] = [
    {
      request_var: 'price',
      type: 'SLIDER',
      name: t('Price'),
      filter_items: [],
      from: 0,
      to: 1000000
    },
    {
      name: t('Brand'),
      type: 'RADIO',
      request_var: 'brand',
      filter_items: brands.map((brand) => ({
        value: String(brand.id),
        label: brand.name
      }))
    }
  ];

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
