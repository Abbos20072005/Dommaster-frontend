import { getTranslations } from 'next-intl/server';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { ProductFilterPaginated } from '@/components/ProductFilterPaginated';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { getBrandById, getSales } from '@/utils/api/requests';

interface Props {
  params: Promise<{ id: string }>;
}

const SearchPage = async ({ params }: Props) => {
  const t = await getTranslations();
  const { id } = await params;
  const brandResponse = await getBrandById({ id });
  const brand = brandResponse.data.result;
  const salesResponse = await getSales();
  const sales = salesResponse.data.result;

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
      name: t('Sales'),
      type: 'RADIO',
      request_var: 'sale_id',
      filter_items: sales.map((sale) => ({
        value: String(sale.id),
        label: sale.name
      }))
    }
  ];

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 md:mt-4'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{brand.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='mb-4 font-bold sm:text-lg md:text-2xl'>{brand.name}</h1>
        <ProductFilterPaginated filters={filters} queries={{ brand: brand.id }} />
      </BaseLayout>
    </div>
  );
};

export default SearchPage;
