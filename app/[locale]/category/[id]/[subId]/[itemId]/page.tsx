import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
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
import { getBrands, getItemCategoryById } from '@/utils/api/requests';

interface Props {
  params: Promise<{ id: string; subId: string; itemId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { itemId } = await params;
  const itemCategoryResponse = await getItemCategoryById({ id: itemId });
  const itemCategory = itemCategoryResponse.data.result;

  return {
    title: itemCategory?.name
  };
}

const ItemCategoryPage = async ({ params }: Props) => {
  const { id, subId, itemId } = await params;
  const t = await getTranslations();
  const brandsResponse = await getBrands();
  const brands = brandsResponse.data.result || [];

  const itemCategoryResponse = await getItemCategoryById({ id: itemId });
  const itemCategory = itemCategoryResponse.data.result;
  // const salesResponse = await getSales();
  // const sales = salesResponse.data.result;

  if (!itemCategory) return notFound();

  const filters: Filter[] = [
    {
      request_var: 'price',
      type: 'SLIDER',
      name: t('Price'),
      filter_items: [],
      from: 0,
      to: 100000000
    },
    {
      name: t('Brands'),
      type: 'RADIO',
      request_var: 'brand',
      filter_items: brands.map((brand) => ({
        value: String(brand.id),
        label: brand.name
      }))
    }
    // {
    //   name: t('Sales'),
    //   type: 'RADIO',
    //   request_var: 'sale_id',
    //   filter_items: sales.map((sale) => ({
    //     value: String(sale.id),
    //     label: sale.name
    //   }))
    // }
  ];

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 space-y-4 md:mt-4 md:space-y-8'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/category/${id}`}>
                {itemCategory.breadcrumbs?.[0].name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/category/${id}/${subId}`}>
                {itemCategory.breadcrumbs?.[1].name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{itemCategory.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-lg leading-8 font-bold md:text-2xl lg:text-3xl'>{itemCategory.name}</h1>
        <ProductFilterPaginated
          filters={filters}
          queries={{ item_category: +itemId }}
          hideCategories
        />
      </BaseLayout>
    </div>
  );
};

export default ItemCategoryPage;
