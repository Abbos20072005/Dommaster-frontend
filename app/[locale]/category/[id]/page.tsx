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
import { getBrands, getCategoryById } from '@/utils/api/requests';

import { CategoryChips } from '../_components/CategoryChips';
import { getCatalogFilters } from '../_lib/catalogFilters';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const categoryResponse = await getCategoryById({ id });
  const category = categoryResponse.data.result;

  return {
    title: category?.name
  };
}

const CategoryPage = async ({ params }: Props) => {
  const { id } = await params;
  const t = await getTranslations();
  const [categoryResponse, brandsResponse] = await Promise.all([
    getCategoryById({ id }),
    getBrands()
  ]);
  const category = categoryResponse.data.result;
  // the first page of products is in the HTML: the crawler sees the products and their links
  const initialProducts = await getInitialProducts({ category: +id });

  // a category without a name must not be shown with an empty title and H1
  if (!category?.name) return notFound();

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t('Catalog'), path: '/catalog' },
          { name: category.name }
        ])}
      />
      <MobileHeader />
      <BaseLayout className='mt-2 space-y-4 md:mt-4 md:space-y-6'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/catalog'>{t('Catalog')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-lg leading-8 font-bold md:text-2xl lg:text-3xl'>{category.name}</h1>
        <Suspense>
          <BannerCarousel bare placement='catalog' />
        </Suspense>
        <CategoryChips
          hrefOf={(subId) => `/category/${id}/${subId}`}
          items={category.sub_categories}
        />
        {/* all products of the category, with the price and brand filters */}
        <ProductFilterPaginated
          attributeCategoryIds={category.sub_categories.flatMap((sub) =>
            (sub.product_item_categories ?? []).map((item) => item.id)
          )}
          filters={getCatalogFilters(t, brandsResponse.data.result ?? [])}
          initialProducts={initialProducts}
          queries={{ category: +id }}
          hideCategories
        />
      </BaseLayout>
    </div>
  );
};

export default CategoryPage;
