import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

import { BannerCarousel } from '@/app/[locale]/(main)/_components/BannerCarousel';
import { JsonLd } from '@/components/JsonLd';
import { BaseLayout, MobileHeader } from '@/components/layout';
import { breadcrumbJsonLd } from '@/lib/jsonLd';
import { ProductFilterPaginated } from '@/components/ProductFilterPaginated';
import { getInitialProducts } from '@/components/ProductFilterPaginated/getInitialProducts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { orNotFound } from '@/lib/orNotFound';
import { metaOverride } from '@/lib/seo';
import { categoryHref } from '@/lib/urls';
import { getBrands, getItemCategoryById } from '@/utils/api/requests';

interface Props {
  params: Promise<{ id: string; subId: string; itemId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { itemId } = await params;
  const itemCategoryResponse = await orNotFound(getItemCategoryById({ id: itemId }));
  const itemCategory = itemCategoryResponse.data.result;

  return {
    title: itemCategory?.name,
    ...metaOverride(itemCategory)
  };
}

const ItemCategoryPage = async ({ params }: Props) => {
  const { id, subId, itemId } = await params;
  const t = await getTranslations();
  // the category first: one that does not exist is a 404, not a 500 of the brands request
  const itemCategoryResponse = await orNotFound(getItemCategoryById({ id: itemId }));
  const itemCategory = itemCategoryResponse.data.result;
  // const salesResponse = await getSales();
  // const sales = salesResponse.data.result;

  if (!itemCategory) return notFound();

  const brandsResponse = await getBrands({ config: { params: { item_category_id: itemId } } });
  const brands = brandsResponse.data.result || [];

  // [category, sub-category, item category]: the levels of the address
  const crumbs = (itemCategory.breadcrumbs ?? []).slice(0, 3).map((crumb) => ({
    id: crumb.id,
    slug: crumb.slug
  }));

  const initialProducts = await getInitialProducts({ item_category: +itemId });

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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t('Catalog'), path: '/catalog' },
          { name: itemCategory.breadcrumbs?.[0]?.name, path: categoryHref(...crumbs.slice(0, 1)) },
          { name: itemCategory.breadcrumbs?.[1]?.name, path: categoryHref(...crumbs.slice(0, 2)) },
          { name: itemCategory.name, path: categoryHref(...crumbs) }
        ])}
      />
      <MobileHeader />
      <BaseLayout className='mt-2 space-y-4 md:mt-4 md:space-y-8'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/catalog'>{t('Catalog')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={categoryHref(...crumbs.slice(0, 1))}>
                {itemCategory.breadcrumbs?.[0].name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={categoryHref(...crumbs.slice(0, 2))}>
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
        <Suspense>
          <BannerCarousel bare placement='catalog' />
        </Suspense>
        <ProductFilterPaginated
          filters={filters}
          initialProducts={initialProducts}
          queries={{ item_category: +itemId }}
          hideCategories
        />
      </BaseLayout>
    </div>
  );
};

export default ItemCategoryPage;
